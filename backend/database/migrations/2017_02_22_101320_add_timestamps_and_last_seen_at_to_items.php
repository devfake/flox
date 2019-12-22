<?php

  use App\Item;
  use Illuminate\Support\Facades\Schema;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Database\Migrations\Migration;

  class AddTimestampsAndLastSeenAtToItems extends Migration {

    private $items;

    public function up()
    {
      $this->items = Item::get(['id', 'created_at']);

      Schema::table('items', function (Blueprint $table) {
        $table->dropColumn('created_at');
      });

      Schema::table('items', function (Blueprint $table) {
        $table->timestamps();
        $table->timestamp('last_seen_at')->nullable();
      });

      $this->repopulateCreatedAt();
    }

    /**
     * We can't change an integer field to a timestamp field.
     * So we need to remove the current created_at integer field,
     * create the new timestamp fields, and repopulate the old created_at data.
     */
    private function repopulateCreatedAt()
    {
      $this->items->map(function ($item) {
        $item->created_at = $item->created_at;
        $item->updated_at = $item->created_at;
        $item->last_seen_at = $item->created_at;
        $item->save();
      });
    }

    public function down() {}
  }
