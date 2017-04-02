<?php

  namespace App\Http\Controllers;

  use App\Services\FileParser;
  use App\Setting;
  use GuzzleHttp\Exception\ConnectException;
  use Symfony\Component\HttpFoundation\Request;
  use Symfony\Component\HttpFoundation\Response;

  class FileParserController {

    private $parser;

    public function __construct(FileParser $parser)
    {
      increaseTimeLimit();

      $this->parser = $parser;
    }

    /**
     * Call flox-file-parser.
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function call()
    {
      try {
        $files = $this->parser->fetch();
      } catch(ConnectException $e) {
        return response("Can't connect to file-parser. Make sure the server is running.", Response::HTTP_NOT_FOUND);
      }

      return $this->updateDatabase($files);
    }

    /**
     * Will be called from flox-file-parser itself.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function receive(Request $request)
    {
      $content = json_decode($request->getContent());

      return $this->updateDatabase($content);
    }

    public function last_fetch()
    {
      $settings = Setting::first();

      if( ! $settings) {
        $settings = Setting::create([
          'show_genre' => 0,
          'show_date' => 1,
          'episode_spoiler_protection' => 1,
        ]);
      }

      $result = $settings->last_fetch_to_file_parser->timestamp ?? 0;

      return ["last_fetch_to_file_parser" => $result];
    }

    /**
     * @param $files
     * @return \Illuminate\Http\JsonResponse
     */
    private function updateDatabase($files)
    {
      return $this->parser->updateDatabase($files);
    }
  }
