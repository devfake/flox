<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Episode;

class ImportEpisode implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $episodes;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($episodes)
    {
      $this->episodes = json_decode($episodes);
    }

  /**
   * Execute the job.
   *
   * @param Episode $episode
   * @return void
   * 
   * @throws \Exception
   */
    public function handle(Episode $episode)
    {
      foreach($this->episodes as $ep) {
        logInfo("Importing episode", [$ep->name]);
        try {
          $ep = collect($ep)->except('id')->toArray();
          
          $episode->create($ep);
        } catch(\Exception $e) {
          logInfo("Failed:", [$e]);
          throw $e;
        }
      }
    }
}
