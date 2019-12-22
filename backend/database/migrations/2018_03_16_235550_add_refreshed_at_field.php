<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRefreshedAtField extends Migration
{
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->timestamp('refreshed_at')->nullable();
        });
    }
    
    public function down() {}
}
