<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSettingsTable extends Migration
{
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('show_date')->default(1);
            $table->boolean('show_genre')->default(0);
        });
    }

    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
