<?php

  namespace App\Http\Controllers;

  use Illuminate\Support\Facades\Response;
  use Illuminate\Support\Facades\File;
  use App\Episode;
  use App\Item;

  class VideoController {

    private $tv;
    private $movie;

    private function getSrc($type, $id)
    {
      if ($type != 'tv' && $type != 'movie') {
        throw new \Exception('unknown type in route');
      }
      return $this->{$type}->find($id)->src;
    }

    public function __construct(Episode $tv, Item $movie)
    {
      $this->tv = $tv;
      $this->movie = $movie;
    }

    public function serve($type, $id) {
      try {
        $src = $this->getSrc($type, $id);

        if (!File::exists($src)) {
          throw new \Exception('file does not exist: ' . $src);
        }
      } catch (\Exception $e) {
        return Response::make("File not found: " . $e->getMessage(), 404);
      }

      return Response::file($src, [
        'Content-Type' => 'video/mp4',
        'Accept-Ranges' => 'bytes',
      ]);
    }

  }
