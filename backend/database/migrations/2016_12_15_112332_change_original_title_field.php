<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeOriginalTitleField extends Migration
{
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->string('original_title')->nullable()->change();
        });
    }

    public function down() {}
}
