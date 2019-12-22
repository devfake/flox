<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSrcFieldForEpisodes extends Migration
{
    public function up()
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->text('src')->nullable();
        });
    }

    public function down() {}
}
