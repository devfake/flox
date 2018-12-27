<?php

namespace App\Mail;

use App\Services\Storage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WeeklyReminder extends Mailable
{
  use Queueable, SerializesModels;

  private $episodes;
  private $movies;
  private $startWeek;
  private $endWeek;

  /**
   * Create a new message instance.
   *
   * @param $episodes
   * @param $movies
   * @param $startWeek
   * @param $endWeek
   */
  public function __construct($episodes, $movies, $startWeek, $endWeek)
  {
    $this->episodes = $episodes;
    $this->movies = $movies;
    $this->startWeek = date(config('app.DATE_FORMAT_PATTERN'), $startWeek);
    $this->endWeek = date(config('app.DATE_FORMAT_PATTERN'), $endWeek);
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
    $headline = $lang['weekly reminder'];
    $date = $this->startWeek . ' - ' . $this->endWeek;

    return $this->view('mails.compiled.weekly')->with([
      'headline' => $headline,
      'episodes' => $this->episodes,
      'movies' => $this->movies,
      'episodesHeadline' => $lang['episodes'],
      'moviesHeadline' => $lang['movies'],
      'date' => $date,
    ])->subject("$headline $date");
  }
}
