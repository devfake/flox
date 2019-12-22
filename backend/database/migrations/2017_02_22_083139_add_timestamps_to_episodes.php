<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTimestampsToEpisodes extends Migration
{
    public function up()
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->dropColumn('created_at');
        });

        Schema::table('episodes', function (Blueprint $table) {
            $table->timestamps();
        });
    }

    public function down() {}
}
