<?php

namespace App\Console\Commands\Winpail;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Process;
use Laravel\Pail\File;
use Laravel\Pail\Options;
use Laravel\Pail\Printers\CliPrinter;
use Laravel\Pail\ProcessFactory as PailProcessFactory;
use Laravel\Pail\ValueObjects\MessageLogged;
use Symfony\Component\Console\Output\OutputInterface;

class ProcessFactory extends PailProcessFactory
{
    /**
     * @inheritdoc
     */
    protected function command(File $file): string
    {
        // Powershell -Command \'Get-Content "./storage/logs/laravel.log" -Wait\'
        return 'Powershell -Command Get-Content "'.$file->__toString().'" -Wait';
        // return 'Get-Content "'.$file->__toString().'"';
    }
}