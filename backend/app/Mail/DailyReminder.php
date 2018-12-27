<?php

namespace App\Mail;

use App\Services\Storage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DailyReminder extends Mailable
{
    use Queueable, SerializesModels;
    
    private $episodes;
    private $movies;

    /**
     * Create a new message instance.
     *
     * @param $episodes
     * @param $movies
     */
    public function __construct($episodes, $movies)
    {
      $this->episodes = $episodes;
      $this->movies = $movies;
    }

    /**
     * Build the message.
     *
     * @param Storage $storage
     * 
     * @return $this
     */
    public function build(Storage $storage)
    {
        $lang = collect(json_decode($storage->parseLanguage()));
        $headline = $lang['daily reminder'];
        $date = date(config('app.DATE_FORMAT_PATTERN'));
        
        return $this->view('mails.compiled.daily')->with([
          'headline' => $headline,
          'episodesHeadline' => $lang['episodes today'],
          'moviesHeadline' => $lang['movies today'],
          'episodes' => $this->episodes,
          'movies' => $this->movies,
          'date' => $date,
        ])->subject("$headline $date");
    }
}
