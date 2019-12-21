<?php

namespace App\Console;

use App\Console\Commands\Daily;
use App\Console\Commands\Refresh;
use App\Console\Commands\Weekly;
use App\Setting;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Schema;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
      Commands\Init::class,
      Commands\DB::class,
      Refresh::class,
      Daily::class,
      Weekly::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
      if(app()->runningUnitTests()) {
        return null;
      }

      if (Schema::hasTable('settings')) {
        $settings = Setting::first();

        if ($settings->refresh_automatically) {
          $schedule->command(Refresh::class)->dailyAt('06:00');
        }

        if ($settings->daily_reminder) {
          $schedule->command(Daily::class)->dailyAt(config('app.DAILY_REMINDER_TIME'));
        }

        if ($settings->weekly_reminder) {
          $schedule->command(Weekly::class)->sundays()->at(config('app.WEEKLY_REMINDER_TIME'));
        }
      }
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
