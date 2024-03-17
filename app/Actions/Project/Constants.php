<?php

namespace App\Actions\Project;

use Illuminate\Support\Js;

/**
 * This is the constants provider class.
 *
 * This class **MUST** be used for all constants used in the project.
 * Please also update the constants module when modifying this class.
 *
 * @see  resources/js/constants.ts
 */
final class Constants implements \Stringable
{
    public function __construct()
    {
        //
    }

    public function dump(): array
    {
        // Put your constants here to make it accessible from
        // window.constants & import { varName } from '@/constants'

        return [
            //
        ];
    }

    public function toScript(): string
    {
        return Js::from($this->dump());
    }

    /**
     * The blade directive `@constants` for `$this->toScript()`.
     * 
     * Change the variable name from window.constants to something else
     * if it was used by some other library / your code.
     */
    public function __toString(): string
    {
        return <<<HTML
<script type="text/javascript">window.constants={$this->toScript()};</script>
HTML;
    }
}
