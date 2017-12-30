<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddReleaseDatesToEpisodes extends Migration
{
    public function up()
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->integer('release_episode')->nullable();
            $table->integer('release_season')->nullable();
        });
    }

    public function down() {}
}
