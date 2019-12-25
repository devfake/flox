<?php

  namespace App\Services;

  use App\Genre;
  use App\Item;
  use Carbon\Carbon;
  use GuzzleHttp\Client;
  use Illuminate\Support\Collection;
  use Illuminate\Support\Facades\Cache;
  use GuzzleHttp\Exception\ClientException;
  use Symfony\Component\HttpFoundation\Response;

  class TMDB {

    private $client;
    private $apiKey;
    private $translation;

    private $base = 'https://api.themoviedb.org';

    /**
     * Get the API Key for TMDb and create an instance of Guzzle.
     *
     * @param Client $client
     */
    public function __construct(Client $client)
    {
      $this->apiKey = config('services.tmdb.key');
      $this->translation = config('app.TRANSLATION');
      $this->client = $client;
    }

    /**
     * Search TMDb by 'title'.
     *
     * @param $title
     * @param null $mediaType
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|Collection
     */
    public function search($title, $mediaType = null)
    {
      if( ! $title) {
        return response([], Response::HTTP_UNPROCESSABLE_ENTITY);
      }

      $tv = collect();
      $movies = collect();

      if( ! $mediaType || $mediaType == 'tv') {
        $response = $this->fetchSearch($title, 'tv');
        $tv = collect($this->createItems($response, 'tv'));
      }

      if( ! $mediaType || $mediaType == 'movies' || $mediaType == 'movie') {
        $response = $this->fetchSearch($title, 'movie');
        $movies = collect($this->createItems($response, 'movie'));
      }

      $sortedEntries = $movies
        ->merge($tv)
        ->sortByDesc('popularity');

      $withExactTitles = $sortedEntries->filter(function($entry) use ($title) {
        return strtolower($entry['title']) == strtolower($title);
      });

      $rest = $sortedEntries->reject(function($entry) use ($title) {
        return strtolower($entry['title']) == strtolower($title);
      });

      return $withExactTitles->merge($rest)->values()->all();
    }

    private function fetchSearch($title, $mediaType) {
      return $this->requestTmdb($this->base . '/3/search/' . $mediaType, [
        'query' => $title,
      ]);
    }

    /**
     * Search TMDb for recommendations and similar movies.
     *
     * @param $mediaType
     * @param $tmdbId
     * @return \Illuminate\Support\Collection
     */
    public function suggestions($mediaType, $tmdbId)
    {
      $recommendations = $this->searchSuggestions($mediaType, $tmdbId, 'recommendations');
      $similar = $this->searchSuggestions($mediaType, $tmdbId, 'similar');

      $items = $recommendations->merge($similar);

      $inDB = Item::all('tmdb_id')->toArray();

      // Remove movies which already are in database.
      return $items->filter(function($item) use ($inDB) {
        return ! in_array($item['tmdb_id'], array_column($inDB, 'tmdb_id'));
      });
    }

    /**
     * @param $mediaType
     * @param $tmdbId
     * @param $type
     *
     * @return Collection
     */
    private function searchSuggestions($mediaType, $tmdbId, $type)
    {
      $response = $this->requestTmdb($this->base . '/3/' . $mediaType . '/' . $tmdbId . '/' . $type);

      return collect($this->createItems($response, $mediaType));
    }

    /**
     * Search TMDb for upcoming movies in our region.
     *
     * @return array
     */
    public function upcoming()
    {
      $cache = Cache::remember('upcoming', $this->untilEndOfDay(), function() {
        $region = getRegion($this->translation);

        $response = $this->requestTmdb($this->base . '/3/movie/upcoming', [
          'region' => $region,
        ]);

        return collect($this->createItems($response, 'movie'));
      });

      return $this->filterItems($cache);
    }

    /**
     * Search TMDb for current playing movies in our region.
     *
     * @return array
     */
    public function nowPlaying()
    {
      $cache = Cache::remember('current', $this->untilEndOfDay(), function() {
        $region = getRegion($this->translation);

        $response = $this->requestTmdb($this->base . '/3/movie/now_playing', [
          'region' => $region,
        ]);

        return collect($this->createItems($response, 'movie'));
      });

      return $this->filterItems($cache);
    }

    /**
     * Search TMDb for current popular movies and tv shows.
     *
     * @return array
     */
    public function trending()
    {
      $cache = Cache::remember('trending', $this->untilEndOfDay(), function() {
        $responseMovies = $this->fetchPopular('movie');
        $responseTv = $this->fetchPopular('tv');

        $tv = collect($this->createItems($responseTv, 'tv'));
        $movies = collect($this->createItems($responseMovies, 'movie'));

        return $tv->merge($movies)->shuffle();
      });

      return $this->filterItems($cache);
    }

    /**
     * Search TMDb by genre.
     *
     * @param $genre
     * @return array
     */
    public function byGenre($genre)
    {
      $genreId = Genre::findByName($genre)->firstOrFail()->id;

      $cache = Cache::remember('genre-' . $genre, $this->untilEndOfDay(), function() use ($genreId) {

        $responseMovies = $this->requestTmdb($this->base . '/3/discover/movie', ['with_genres' => $genreId]);
        $responseTv = $this->requestTmdb($this->base . '/3/discover/tv', ['with_genres' => $genreId]);

        $movies = collect($this->createItems($responseMovies, 'movie'));
        $tv = collect($this->createItems($responseTv, 'tv'));

        return $tv->merge($movies)->shuffle();
      });

      //$inDB = Item::findByGenreId($genreId)->get();

      return $this->filterItems($cache, $genreId);
    }

    /**
     * Merge the response with items from our database.
     *
     * @param Collection $items
     * @param null $genreId
     * @return array
     */
    private function filterItems($items, $genreId = null)
    {
      $allId = $items->pluck('tmdb_id');

      // Get all movies / tv shows that are already in our database.
      $searchInDB = Item::whereIn('tmdb_id', $allId)->with('latestEpisode')->withCount('episodesWithSrc');

      if($genreId) {
        $searchInDB->findByGenreId($genreId);
      }

      $foundInDB = $searchInDB->get()->toArray();

      // Remove them from the TMDb response.
      $filtered = $items->filter(function($item) use ($foundInDB) {
        return ! in_array($item['tmdb_id'], array_column($foundInDB, 'tmdb_id'));
      });

      $merged = $filtered->merge($foundInDB);

      // Reset array keys to display inDB items first.
      return array_values($merged->reverse()->toArray());
    }

    private function fetchPopular($mediaType)
    {
      return $this->requestTmdb($this->base . '/3/' . $mediaType . '/popular');
    }

    /**
     * @param $response
     * @param $mediaType
     * @return array
     */
    private function createItems($response, $mediaType)
    {
      $items = [];
      $response = json_decode($response->getBody());

      foreach($response->results as $result) {
        $items[] = $this->createItem($result, $mediaType);
      }

      return $items;
    }

    public function createItem($data, $mediaType)
    {
      try {
        $release = Carbon::createFromFormat('Y-m-d',
          isset($data->release_date) ? ($data->release_date ?: Item::FALLBACK_DATE) : ($data->first_air_date ?? Item::FALLBACK_DATE)
        );
      } catch (\Exception $exception) {
        $release = Carbon::createFromFormat('Y-m-d', Item::FALLBACK_DATE);
      }

      $title = $data->name ?? $data->title;

      return [
        'tmdb_id' => $data->id,
        'title' => $title,
        'slug' => getSlug($title),
        'original_title' => $data->original_name ?? $data->original_title,
        'poster' => $data->poster_path,
        'media_type' => $mediaType,
        'released' => $release->copy()->getTimestamp(),
        'released_timestamp' => $release,
        'genre_ids' => $data->genre_ids,
        'genre' => Genre::whereIn('id', $data->genre_ids)->get(),
        'episodes' => [],
        'overview' => $data->overview,
        'backdrop' => $data->backdrop_path,
        'homepage' => $data->homepage ?? null,
        'tmdb_rating' => $data->vote_average,
        'popularity' => $data->popularity ?? 0,
      ];
    }

    private function requestTmdb($url, $query = [])
    {
      $query = array_merge([
        'api_key' => $this->apiKey,
        'language' => strtolower($this->translation)
      ], $query);

      try {
        $response = $this->client->get($url, [
          'query' => $query
        ]);

        if($this->hasLimitRemaining($response)) {
          return $response;
        }
      } catch (ClientException $e) {
        // wtf? throws exception because of "bad" statuscode?
        $response = $e->getResponse();

        if($this->hasLimitRemaining($response)) {
          return $response;
        }
      }

      sleep(1);
      return $this->requestTmdb($url, $query);
    }

    /**
     * Get full movie or tv details with trailers.
     *
     * @param $tmdbId
     * @param $mediaType
     * @return mixed
     */
    public function details($tmdbId, $mediaType)
    {
      $response = $this->requestTmdb($this->base . '/3/' . $mediaType . '/' . $tmdbId, [
        'append_to_response' => 'videos,external_ids',
      ]);

      if($response->getStatusCode() != Response::HTTP_OK) {
        // ignore any error
        return json_decode('{}');
      }

      return json_decode($response->getBody());
    }

    public function videos($tmdbId, $mediaType, $translation = null)
    {
      $response = $this->requestTmdb($this->base . '/3/' . $mediaType . '/' . $tmdbId . '/videos', [
        'language' => $translation ?? $this->translation,
      ]);

      // TODO: what if it fails? error handling?
      return json_decode($response->getBody());
    }

    /**
     * Get current count of seasons.
     *
     * @param $id
     * @param $mediaType
     * @return integer | null
     */
    private function tvSeasonsCount($id, $mediaType)
    {
      if($mediaType == 'tv') {
        $response = $this->requestTmdb($this->base . '/3/tv/' . $id);

        $seasons = collect(json_decode($response->getBody())->seasons);

        return $seasons->filter(function ($season) {
          // We don't need pilots
          return $season->season_number > 0;
        })->count();
      }

      return null;
    }

    /**
     * Get all episodes of each season.
     *
     * @param $tmdbId
     * @return array
     */
    public function tvEpisodes($tmdbId)
    {
      $seasons = $this->tvSeasonsCount($tmdbId, 'tv');
      $data = [];

      for($i = 1; $i <= $seasons; $i++) {
        $response = $this->requestTmdb($this->base . '/3/tv/' . $tmdbId . '/season/' . $i);

        $data[$i] = json_decode($response->getBody());
      }

      return $data;
    }

    /**
     * Make a new request to TMDb to get the alternative titles.
     *
     * @param $item
     * @return array
     */
    public function getAlternativeTitles($item)
    {
      $response = $this->fetchAlternativeTitles($item);

      $body = json_decode($response->getBody());

      if(property_exists($body, 'titles') || property_exists($body, 'results')) {
        return $body->titles ?? $body->results;
      }

      return [];
    }

    public function fetchAlternativeTitles($item)
    {
      return $this->requestTmdb($this->base . '/3/' . $item['media_type'] . '/' . $item['tmdb_id'] . '/alternative_titles');
    }

    /**
     * Get the lists of genres from TMDb for tv shows and movies.
     */
    public function getGenreLists()
    {
      $movies = $this->requestTmdb($this->base . '/3/genre/movie/list');
      $tv = $this->requestTmdb($this->base . '/3/genre/tv/list');

      return [
        'movies' => json_decode($movies->getBody()),
        'tv' => json_decode($tv->getBody()),
      ];
    }

    /**
     * @param $response
     * @return boolean
     */
    public function hasLimitRemaining($response)
    {
      if($response->getStatusCode() == 429) {
        return false;
      }

      $rateLimit = $response->getHeader('X-RateLimit-Remaining');

      // Change it on production, good idea...
      // https://www.themoviedb.org/talk/5df7d28326dac100145530f2
      return $rateLimit ? (int) $rateLimit[0] > 1 : true;
    }

    /**
     * @return float|int
     */
    private function untilEndOfDay()
    {
      return now()->secondsUntilEndOfDay();
    }
  }
