<?php

  use Illuminate\Support\Facades\Schema;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Database\Migrations\Migration;

  class AddLastFetchToFileParserField extends Migration
  {
    public function up()
    {
      Schema::table('settings', function (Blueprint $table) {
        $table->timestamp('last_fetch_to_file_parser')->nullable();
      });
    }

    public function down() {}
  }
