<?php

  namespace App\Services;

  use DiDom\Document;

  class IMDB {

    private $document;

    public function __construct(Document $document)
    {
      $this->document = $document;
    }

    public function parseRating($id)
    {
      $document = $this->document->loadHtmlFile('http://www.imdb.com/title/' . $id);

      // We don't need to check if we found a result if we loop over them.
      foreach($document->find('.ratingValue strong span') as $rating) {
        return $rating->text();
      }

      return null;
    }
  }