<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFPNameFieldToEpisodesAndItems extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->string('fp_name')->nullable();
        });

        Schema::table('episodes', function (Blueprint $table) {
            $table->string('fp_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn('fp_name');
        });

        Schema::table('episodes', function (Blueprint $table) {
            $table->dropColumn('fp_name');
        });
    }
}
