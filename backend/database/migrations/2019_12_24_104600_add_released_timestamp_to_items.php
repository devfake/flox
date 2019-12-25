<?php

use App\Item;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddReleasedTimestampToItems extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->timestamp('released_timestamp')->nullable();
        });

        Item::query()->each(function (Item $item) {
          $item->update([
            'released_timestamp' => Carbon::parse($item->released),
          ]);
        });
    }

    public function down(){}
}
