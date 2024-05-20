<?php

namespace App\Providers;

use App\Actions\Project\Constants;
use Cels\Utilities\Utility as CelsUtility;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        /**
         * Comment the following line if you wish to disable CSP.
         * By default, the policy is not compatible with:
         *   - Cloudflare Rocket Loader
         *   - Cloudflare Fonts
         */
        CelsUtility::enableCSP();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Blade::directive('constants', fn ($_) => sprintf(
            "<?php echo (string) app('%s')() ?>",
            Constants::class,
        ));
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(600)->by($request->user()?->id ?: $request->ip());
        });
    }
}
