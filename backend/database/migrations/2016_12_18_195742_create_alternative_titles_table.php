<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlternativeTitlesTable extends Migration
{
    public function up()
    {
        Schema::create('alternative_titles', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tmdb_id');
            $table->string('title')->index();
            $table->string('country');
        });
    }

    public function down() {}
}
