<?php

  namespace App\Services;

  use App\Episode;
  use App\Item;
  use Illuminate\Support\Collection;

  class Calendar {

    /**
     * Get all formatted episodes and movies.
     *
     * @return Collection|array
     */
    public function items()
    {
      $episodes = Episode::with('calendarItem')
        ->whereHas('calendarItem')
        //->whereBetween('release_episode', [today()->subDays(7)->timestamp, today()->addDays(7)->timestamp])
        ->get(['id', 'tmdb_id', 'release_episode', 'season_number', 'episode_number']);

      $movies = Item::where('media_type', 'movie')
        //->whereBetween('released', [today()->subDays(7)->timestamp, today()->addDays(70)->timestamp])
        ->get();

      $episodesFormatted = $episodes->map(function($episode) {
        return $this->buildEvent($episode, 'tv');
      });

      $moviesFormatted = $movies->map(function($movie) {
        return $this->buildEvent($movie, 'movies');
      });

      return collect($moviesFormatted)->merge($episodesFormatted);
    }

    private function buildEvent($item, $type)
    {
      $watchlisted = $this->isOnWatchlist($item, $type) ? '1' : '0';
      return [
        'startDate' => $item->startDate,
        'id' => $item->id,
        'tmdb_id' => $item->tmdb_id,
        'type' => $type,
        'classes' => "$type watchlist-$watchlisted",
        'title' => $this->buildTitle($item, $type),
      ];
    }

    private function isOnWatchlist($item, $type)
    {
      if($type === 'tv') {
        return $item->calendarItem->watchlist;
      }

      return $item->watchlist;
    }

    private function buildTitle($item, $type)
    {
      if($type === 'tv') {
        return $item->calendarItem->title . ' ' . 'S' . $item->season_number . 'E' . $item->episode_number;
      }

      return $item->title;
    }
  }
