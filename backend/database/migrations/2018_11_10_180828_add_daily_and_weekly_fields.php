<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDailyAndWeeklyFields extends Migration
{
    public function up()
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->boolean('daily_reminder')->default(0);
            $table->boolean('weekly_reminder')->default(0);
        });
    }
  
    public function down() {}
}
