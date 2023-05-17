<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonsTable extends Migration
{
  public function up()
  {
    Schema::create('persons', function (Blueprint $table) {
      $table->integer('id');
      $table->string('name');
      $table->string('profile_path')->nullable();
      $table->unsignedDecimal('popularity');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
      Schema::dropIfExists('persons');
  }
}
