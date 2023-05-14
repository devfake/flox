<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCreditCastsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('credit_casts', function (Blueprint $table) {
            $table->integer('id');
            $table->integer('item_id');
            $table->integer('person_id');
            $table->string('character');
            $table->string('known_for_department');
            $table->string('credit_id');
            $table->string('order');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('credit_casts');
    }
}
