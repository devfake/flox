<?php

namespace App\Console\Commands;

use App\Services\Models\ItemService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class History extends Command {

    protected $signature = 'flox:history';
    protected $description = 'Set History-flag for all items';

    private $itemService;

    public function __construct(ItemService $itemService)
    {
        parent::__construct();

        $this->itemService = $itemService;
    }

    public function handle()
    {
        logInfo("Set all items to historic");
        DB::table('items')->update(array('is_historic' => 1));
    }
}
