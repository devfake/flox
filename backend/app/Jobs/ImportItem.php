<?php

namespace App\Jobs;

use App\Item;
use App\Services\Models\ItemService;
use App\Services\Storage;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ImportItem implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $item;

    /**
     * Create a new job instance.
     *
     * @param $item
     */
    public function __construct($item)
    {
      $this->item = json_decode($item);
    }

  /**
   * Execute the job.
   *
   * @param ItemService $itemService
   * @param Storage $storage
   * 
   * @return void
   * 
   * @throws \Exception
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

        Item::create((array) $item);
      } catch(\Exception $e) {
        logInfo("Failed:", [$e]);
        throw $e;
      }
    }
}
