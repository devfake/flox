<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSubtitlesFieldForEpisodesAndItems extends Migration
{
    public function up()
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->text('subtitles')->nullable();
        });

        Schema::table('items', function (Blueprint $table) {
            $table->text('subtitles')->nullable();
        });
    }

    public function down() {}
}
