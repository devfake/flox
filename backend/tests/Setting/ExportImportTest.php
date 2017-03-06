<?php

  use App\AlternativeTitle;
  use App\Episode;
  use App\Item;
  use App\Services\Storage;
  use Illuminate\Foundation\Testing\DatabaseMigrations;
  use Illuminate\Http\UploadedFile;

  class ExportImportTest extends TestCase {

    use DatabaseMigrations;

    protected $user;

    public function setUp()
    {
      parent::setUp();

      $this->user = factory(App\User::class)->create();
    }

    /** @test */
    public function it_should_export_a_backup_file()
    {
      $filename = 'flox-export-test.json';
      $path = base_path('../public/exports/' . $filename);

      $this->removeExportFile($path);
      $this->createTv();
      $this->createMovie();

      $storage = Mockery::mock(app(Storage::class))->makePartial();
      $storage->shouldReceive('createExportFilename')->once()->andReturn($filename);
      $this->app->instance(Storage::class, $storage);

      $this->actingAs($this->user)->json('GET', 'api/export')->assertResponseStatus(200);

      $file = (array) json_decode(file_get_contents($path));

      $this->assertArrayHasKey('items', $file);
      $this->assertArrayHasKey('episodes', $file);
      $this->assertArrayHasKey('alternative_titles', $file);

      $this->assertCount(2, $file['items']);
      $this->assertCount(4, $file['episodes']);
      $this->assertCount(0, $file['alternative_titles']);

      $this->removeExportFile($path);
    }

    /** @test */
    public function it_should_import_a_backup_file()
    {
      $this->callImport('export.json');

      $this->assertCount(5, Item::all());
      $this->assertCount(143, Episode::all());
      $this->assertCount(25, AlternativeTitle::all());
    }

    /** @test */
    public function it_should_abort_import_if_not_json()
    {
      $this->callImport('wrong-file.txt');
      $this->seeStatusCode(422);
    }

    private function callImport($filename)
    {
      $path = __DIR__ . '/../fixtures/flox/' . $filename;

      $file = new UploadedFile($path, $filename);

      $this->actingAs($this->user)->json('POST', 'api/import', ['import' => $file]);
    }

    private function removeExportFile($path)
    {
      if(file_exists($path)) {
        unlink($path);
      }
    }
  }
