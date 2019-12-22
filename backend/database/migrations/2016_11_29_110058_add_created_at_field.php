<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCreatedAtField extends Migration
{
    public function up()
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->integer('created_at')->nullable();
        });
    }

    public function down() {}
}
