<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEpisodesTable extends Migration
{
    public function up()
    {
        Schema::create('episodes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('season_number');
            $table->integer('episode_number');;
            $table->integer('seen')->default(0);
        });
    }

    public function down() {}
}
