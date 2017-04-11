<?php

  namespace App\Services\Models;

  use App\Item as Model;
  use App\Item;
  use App\Services\IMDB;
  use App\Services\Storage;
  use App\Services\TMDB;

  class ItemService {

    private $model;
    private $tmdb;
    private $storage;
    private $alternativeTitleService;
    private $episodeService;
    private $imdb;

    /**
     * @param Model                   $model
     * @param TMDB                    $tmdb
     * @param Storage                 $storage
     * @param AlternativeTitleService $alternativeTitleService
     * @param EpisodeService          $episodeService
     * @param IMDB                    $imdb
     */
    public function __construct(
      Model $model,
      TMDB $tmdb,
      Storage $storage,
      AlternativeTitleService $alternativeTitleService,
      EpisodeService $episodeService,
      IMDB $imdb
    ){
      $this->model = $model;
      $this->tmdb = $tmdb;
      $this->storage = $storage;
      $this->alternativeTitleService = $alternativeTitleService;
      $this->episodeService = $episodeService;
      $this->imdb = $imdb;
    }

    /**
     * @param $data
     * @return Model
     */
    public function create($data)
    {
      $data = $this->makeDataComplete($data);

      $item = $this->model->store($data);

      $this->episodeService->create($item);
      $this->alternativeTitleService->create($item);

      $this->storage->downloadPoster($item->poster);
      $this->storage->downloadBackdrop($item->backdrop);

      return $item;
    }

    /**
     * Search against TMDb and IMDb for more informations.
     * We don't need to get more informations if we add the item from the subpage.
     *
     * @param $data
     * @return array
     */
    public function makeDataComplete($data)
    {
      if( ! isset($data['imdb_id'])) {
        $details = $this->tmdb->details($data['tmdb_id'], $data['media_type']);
        $title = $details->name ?? $details->title;

        $data['imdb_id'] = $data['imdb_id'] ?? $this->parseImdbId($details);
        $data['youtube_key'] = $data['youtube_key'] ?? $this->parseYoutubeKey($details, $data['media_type']);
        $data['overview'] = $data['overview'] ?? $details->overview;
        $data['tmdb_rating'] = $data['tmdb_rating'] ?? $details->vote_average;
        $data['backdrop'] = $data['backdrop'] ?? $details->backdrop_path;
        $data['slug'] = $data['slug'] ?? (str_slug($title) != '' ? str_slug($title) : 'no-slug-available');
      }

      $data['imdb_rating'] = $this->parseImdbRating($data);

      return $data;
    }

    /**
     * If the user clicks to fast on adding item,
     * we need to re-fetch the rating from IMDb.
     *
     * @param $data
     *
     * @return float|null
     */
    private function parseImdbRating($data)
    {
      if( ! isset($data['imdb_rating'])) {
        $imdbId = $data['imdb_id'];

        if($imdbId) {
          return $this->imdb->parseRating($imdbId);
        }

        return  null;
      }

      // Otherwise we already have the rating saved.
      return $data['imdb_rating'];
    }

    /**
     * TV shows needs an extra append for external ids.
     *
     * @param $details
     * @return mixed
     */
    public function parseImdbId($details)
    {
      return $details->external_ids->imdb_id ?? ($details->imdb_id ?? null);
    }

    /**
     * Get the key for the youtube trailer video. Fallback with english trailer.
     *
     * @param $details
     * @param $mediaType
     * @return string|null
     */
    public function parseYoutubeKey($details, $mediaType)
    {
      if(isset($details->videos->results[0])) {
        return $details->videos->results[0]->key;
      }

      // Try to fetch details again with english language as fallback.
      $videos = $this->tmdb->videos($details->id, $mediaType, 'en');

      return $videos->results[0]->key ?? null;
    }

    /**
     * @param $data
     * @param $mediaType
     * @return Item
     */
    public function createEmpty($data, $mediaType)
    {
      $mediaType = mediaType($mediaType);

      $data = [
        'name' => getFileName($data),
        'src' => $data->changed->src ?? $data->src,
        'subtitles' => $data->changed->subtitles ?? $data->subtitles,
      ];

      return $this->model->storeEmpty($data, $mediaType);
    }

    /**
     * Delete movie or tv show (with episodes and alternative titles).
     * Also remove the poster image file.
     *
     * @param $itemId
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function remove($itemId)
    {
      $item = $this->model->find($itemId);

      if( ! $item) {
        return response('Not Found', 404);
      }

      $tmdbId = $item->tmdb_id;

      $item->delete();

      // Delete all related episodes, alternative titles and images.
      $this->episodeService->remove($tmdbId);
      $this->alternativeTitleService->remove($tmdbId);
      $this->storage->removePoster($item->poster);
      $this->storage->removeBackdrop($item->backdrop);
    }

    /**
     * Return all items with pagination.
     *
     * @param $type
     * @param $orderBy
     * @return mixed
     */
    public function getWithPagination($type, $orderBy)
    {
      $orderType = $orderBy == 'rating' ? 'asc' : 'desc';

      $items = $this->model->orderBy($orderBy, $orderType)->with('latestEpisode')->withCount('episodesWithSrc');

      if($type == 'tv' || $type == 'movie') {
        $items = $items->where('media_type', $type);
      }

      return $items->simplePaginate(config('app.LOADING_ITEMS'));
    }

    /**
     * Update rating for a movie.
     *
     * @param $itemId
     * @param $rating
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function changeRating($itemId, $rating)
    {
      $item = $this->model->find($itemId);

      if( ! $item) {
        return response('Not Found', 404);
      }

      $item->update([
        'rating' => $rating,
      ]);
    }

    /**
     * Search for all items by title in our database.
     *
     * @param $title
     * @return mixed
     */
    public function search($title)
    {
      return $this->model->findByTitle($title)->with('latestEpisode')->withCount('episodesWithSrc')->get();
    }

    /**
     * Parse full genre list of all movies and tv shows in our database and save them.
     */
    public function updateGenre()
    {
      increaseTimeLimit();

      $items = $this->model->all();

      $items->each(function($item) {
        $genres = $this->tmdb->details($item->tmdb_id, $item->media_type)->genres;
        $data = collect($genres)->pluck('name')->all();

        $item->update([
          'genre' => implode($data, ', '),
        ]);
      });
    }

    /**
     * See if we can find a item by title, fp_name, tmdb_id or src in our database.
     *
     * If we search from file-parser, we also need to filter the results by media_type.
     * If we have e.g. 'Avatar' as tv show, we don't want results like the 'Avatar' movie.
     *
     * @param $type
     * @param $value
     * @param $mediaType
     * @return mixed
     */
    public function findBy($type, $value, $mediaType = null)
    {
      if($mediaType) {
        $mediaType = mediaType($mediaType);
      }

      switch($type) {
        case 'title':
          return $this->model->findByTitle($value, $mediaType)->first();
        case 'title_strict':
          return $this->model->findByTitleStrict($value, $mediaType)->first();
        case 'fp_name':
          return $this->model->findByFPName($value, $mediaType)->first();
        case 'tmdb_id':
          return $this->model->findByTmdbId($value)->first();
        case 'src':
          return $this->model->findBySrc($value)->first();
      }

      return null;
    }
  }
