<?php

namespace App\Console\Commands;

use App\Console\Commands\Winpail\ProcessFactory as WinpailProcessFactory;
use Illuminate\Process\Exceptions\ProcessTimedOutException;
use Illuminate\Support\Facades\Process;
use Laravel\Pail\Console\Commands\PailCommand;
use Laravel\Pail\File;
use Laravel\Pail\Options;
use Laravel\Pail\ProcessFactory;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Process\Exception\ProcessSignaledException;

use function Termwind\render;
use function Termwind\renderUsing;

#[AsCommand(name: 'app:winpail')]
class Winpail extends PailCommand
{
    /**
     * {@inheritDoc}
     */
    protected $signature = 'app:winpail
        {--filter= : Filter the logs by the given value}
        {--message= : Filter the logs by the given message}
        {--level= : Filter the logs by the given level}
        {--auth= : Filter the logs by the given authenticated ID}
        {--user= : Filter the logs by the given authenticated ID (alias for --auth)}
        {--timeout=3600 : The maximum execution time in seconds}';

    /**
     * Execute the console command.
     */
    public function handle(ProcessFactory $_): void
    {
        $processFactory = app()->make(WinpailProcessFactory::class);

        renderUsing($this->output);
        render(<<<'HTML'
            <div class="max-w-150 mx-2 mt-1 flex">
                <div>
                    <span class="px-1 bg-blue uppercase text-white">INFO</span>
                    <span class="flex-1">
                        <span class="ml-1 ">Tailing application logs.</span>
                    </span>
                </div>
                <span class="flex-1"></span>
                <span class="text-gray ml-1">
                    <span class="text-gray">Press Ctrl+C to exit</span>
                </span>
            </div>
            HTML,
        );

        render(<<<'HTML'
            <div class="max-w-150 mx-2 flex">
                <div>
                </div>
                <span class="flex-1"></span>
                <span class="text-gray ml-1">
                    <span class="text-gray">Use -v|-vv to show more details</span>
                </span>
            </div>
            HTML,
        );

        $this->file = new File(storage_path('pail/'.uniqid().'.pail'));
        $this->file->create();
        $this->trap([2, 15], fn () => $this->file->destroy());

        $options = Options::fromCommand($this);

        assert($this->file instanceof File);

        try {
            Process::timeout(3600)
                ->tty(false)
                ->run('Powershell -Command \'Get-Content "./storage/logs/laravel.log" -Wait\'');
            $processFactory->run($this->file, $this->output, $this->laravel->basePath(), $options);
        } catch (ProcessSignaledException $e) {
            if (in_array($e->getSignal(), [2, 15], true)) {
                $this->newLine();
            }
        } catch (ProcessTimedOutException $e) {
            $this->components->info('Maximum execution time exceeded.');
        } finally {
            $this->file?->destroy();
        }
    }
}
