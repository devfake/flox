<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGenreItemTable extends Migration
{
    public function up()
    {
        Schema::create('genre_item', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('item_id');
            $table->integer('genre_id');
        });

        // We dont need the genre column more.
        Schema::table('items', function (Blueprint $table) {
          $table->dropColumn('genre');
        });
    }
    
    public function down() {}
}
