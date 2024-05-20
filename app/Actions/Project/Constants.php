<?php

namespace App\Actions\Project;

use Cels\Utilities\CSP\CSP;
use Illuminate\Support\Js;
use Stringable;

/**
 * This is the constants provider class.
 *
 * This class **MUST** be used for all constants used in the project.
 * Please also update the constants module when modifying this class.
 *
 * @todo  fetch dynamic constants from database
 *
 * @see  resources/js/constants.ts
 */
final class Constants implements Stringable
{
    public function dump(): array
    {
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
    public function __invoke(string $var = 'constants'): string
    {
        $nonce = '';
        if (CSP::$enabled) {
            $nonce = sprintf('nonce="%s"', CSP::getSharedNonce());
        }

        return sprintf(
            sprintf(
                '<script type="text/javascript" %%s>const %s=%%s; window.%s=%s;</script>',
                $var,
                $var,
                $var,
            ),
            $nonce,
            $this->toScript(),
        );
    }

    public function __toString(): string
    {
        return $this->__invoke();
    }
}
