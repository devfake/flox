<?php

  namespace App\Http\Controllers;

  use App\Services\FileParser;
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
        $this->parser->fetch();
      } catch(ConnectException $e) {
        return response("Can't connect to file-parser. Make sure the server is running.", Response::HTTP_NOT_FOUND);
      } catch(\Exception $e) {
        return response("Error in file-parser:" . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
      }
    }

    /**
     * Will be called from flox-file-parser itself.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function receive(Request $request)
    {
      error_log("FileParserController.receive called");
      $content = json_decode($request->getContent());

      return $this->updateDatabase($content);
    }

    /**
     * @return mixed
     */
    public function lastFetched()
    {
      return $this->parser->lastFetched();
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
