<?php

namespace App\Jobs;

use App\Services\Models\ItemService;
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
   * 
   * @return void
   * 
   * @throws \Exception
   */
    public function handle(ItemService $itemService)
    {
      try {
        $itemService->import($this->item);
      } catch(\Exception $e) {
        logInfo("Failed:", [$e]);
        throw $e;
      }
    }
}
