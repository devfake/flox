<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFPNameFieldToEpisodesAndItems extends Migration
{
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->string('fp_name')->nullable();
        });

        Schema::table('episodes', function (Blueprint $table) {
            $table->string('fp_name')->nullable();
        });
    }

    public function down() {}
}
