<?php

namespace App\Jobs;

use App\Services\Models\ItemService;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class UpdateItem implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  protected $itemId;

  /**
   * Create a new job instance.
   *
   * @param $itemId
   */
  public function __construct($itemId)
  {
    $this->itemId = $itemId;
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
      $itemService->refresh($this->itemId);
    } catch (\Exception $e) {
      logInfo("Failed:", [$e]);
      throw $e;
    }
  }
}
