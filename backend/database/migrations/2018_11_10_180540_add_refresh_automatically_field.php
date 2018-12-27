<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRefreshAutomaticallyField extends Migration
{
    public function up()
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->boolean('refresh_automatically')->default(0);
        });
    }
  
    public function down() {}
}
