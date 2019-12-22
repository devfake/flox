<?php

  namespace App\Console\Commands;

  use App\Services\Models\ItemService;
  use Illuminate\Console\Command;

  class Refresh extends Command {

    protected $signature = 'flox:refresh';
    protected $description = 'Refresh informations for all items';

    private $itemService;

    public function __construct(ItemService $itemService)
    {
      parent::__construct();

      $this->itemService = $itemService;
    }

    public function handle()
    {
      $this->itemService->refreshAll();
    }
  }
