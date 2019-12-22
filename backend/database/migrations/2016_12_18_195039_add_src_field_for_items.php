<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSrcFieldForItems extends Migration
{
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->text('src')->nullable();
        });
    }

    public function down() {}
}
