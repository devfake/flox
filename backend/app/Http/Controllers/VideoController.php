<?php

  namespace App\Http\Controllers;

  use Illuminate\Support\Facades\File;
  use App\Episode;
  use App\Item;

  class VideoController {

    private $tv;
    private $movie;

    public function __construct(Episode $tv, Item $movie)
    {
      $this->tv = $tv;
      $this->movie = $movie;
    }

    public function serve($type, $id)
    {
      try {
        $src = $this->getSrc($type, $id);

        if( ! $src) {
          throw new \Exception('No src file for id "' . $id . '"');
        }

        if ( ! File::exists($src)) {
          throw new \Exception('File does not exist: ' . $src);
        }
      } catch (\Exception $e) {
        return response('File not found: ' . $e->getMessage(), 404);
      }

      return response()->file($src, [
        'Content-Type' => 'video/mp4',
        'Accept-Ranges' => 'bytes',
      ]);
    }

    private function getSrc($type, $id)
    {
      if ($type != 'tv' && $type != 'movie') {
        throw new \Exception('Unknown type "' . $type . '" in route');
      }

      return $this->{$type}->findOrFail($id)->src;
    }
  }
