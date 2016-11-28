<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('tmdb_id')->unique();
            $table->string('title')->index();
            $table->string('original_title')->index();
            $table->string('poster');
            $table->string('media_type')->default('movie');
            $table->string('genre')->nullable();
            $table->string('rating');
            $table->integer('released');
            $table->integer('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('items');
    }
}
