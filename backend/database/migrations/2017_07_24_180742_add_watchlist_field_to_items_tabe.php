<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddWatchlistFieldToItemsTabe extends Migration
{
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->boolean('watchlist')->default(false);
        });
    }

    public function down() {}
}
