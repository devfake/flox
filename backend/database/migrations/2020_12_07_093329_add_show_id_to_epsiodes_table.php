<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddShowIdToEpsiodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->bigInteger('show_id')->unsigned();
            $table->bigInteger('season_id')->unsigned();
            $table->foreign('show_id')->references('id')->on('shows');
            //
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('epsiodes', function (Blueprint $table) {
            //
        });
    }
}
