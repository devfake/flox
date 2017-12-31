<?php

  namespace Tests\Services;

  use App\Genre;
  use App\Item;
  use App\Services\Models\GenreService;
  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Illuminate\Support\Facades\DB;
  use Tests\TestCase;
  use Tests\Traits\Factories;
  use Tests\Traits\Fixtures;
  use Tests\Traits\Mocks;

  class GenreServiceTest extends TestCase {
    
    use RefreshDatabase;
    use Factories;
    use Fixtures;
    use Mocks;
    
    /** @test */
    public function it_should_update_the_genre_table()
    {
      $this->createGuzzleMock(
        $this->tmdbFixtures('movie/genres'),
        $this->tmdbFixtures('tv/genres')
      );
      
      $service = app(GenreService::class);
      
      $genresBeforeUpdate = Genre::all();
      
      $service->updateGenreLists();

      $genresAfterUpdate = Genre::all();
      
      $this->assertCount(0, $genresBeforeUpdate);
      $this->assertCount(27, $genresAfterUpdate);
    }
    
    /** @test */
    public function it_should_sync_genres_for_an_item()
    {
      $genreIds = [28, 12, 16];
      
      $this->createGuzzleMock(
        $this->tmdbFixtures('movie/genres'),
        $this->tmdbFixtures('tv/genres')
      );

      $item = $this->createMovie();

      $service = app(GenreService::class);
      $service->updateGenreLists();

      $itemBeforeUpdate = Item::first();
      
      $service->sync($item, $genreIds);
      
      $itemAfterUpdate = Item::first();
      
      $this->assertCount(0, $itemBeforeUpdate->genre);
      $this->assertCount(count($genreIds), $itemAfterUpdate->genre);
    }
  }
