<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSubpageFieldsToItemsTable extends Migration
{
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->string('backdrop')->nullable();
            $table->string('slug')->nullable();
            $table->string('youtube_key')->nullable();
            $table->string('imdb_id')->nullable();
            $table->text('overview')->nullable();
            $table->string('tmdb_rating')->nullable();
            $table->string('imdb_rating')->nullable();
        });
    }

    public function down()
    {
        Schema::table('items', function (Blueprint $table) {
            //
        });
    }
}
