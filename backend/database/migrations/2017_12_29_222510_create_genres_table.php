<?php

use App\Services\Models\GenreService;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGenresTable extends Migration
{
  private $genreService;

  public function __construct()
  {
    $this->genreService = app(GenreService::class);
  }

  public function up()
  {
    Schema::create('genres', function (Blueprint $table) {
      $table->integer('id');
      $table->string('name');
    });

    if( ! app()->runningUnitTests()) {
      try {
        $this->genreService->updateGenreLists();
      } catch (\Exception $e) {
        echo 'Can not connect to the TMDb Service on "CreateGenresTable". Error: ' . $e->getMessage();
        echo 'Make sure you set your TMDb API Key in .env';
        
        abort(500);
      }
    }
  }

  public function down() {}
}
