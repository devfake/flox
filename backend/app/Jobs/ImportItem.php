<?php

namespace App\Jobs;

use App\Services\Models\ItemService;
use App\Services\Storage;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Symfony\Component\HttpFoundation\Response;

class ImportItem implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $item;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($item)
    {
      $this->item = json_decode($item);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(ItemService $itemService, Storage $storage)
    {

      try {
        logInfo("Importing", [$this->item->title]);

        // Fallback if export was from an older version of flox (<= 1.2.2).
        if( ! isset($this->item->last_seen_at)) {
          $this->item->last_seen_at = Carbon::createFromTimestamp($this->item->created_at);
        }

        $item = $this->item;

        // For empty items (from file-parser) we don't need access to details.
        if($this->item->tmdb_id) {
          $item = $itemService->makeDataComplete((array) $this->item);
          $storage->downloadImages($item['poster'], $item['backdrop']);
        }

        $item = \App\Item::create((array) $item);

        /* $itemService->_refresh($item->id); */
      } catch(\Exception $e) {
        $this->fail();
      }
    }
}
