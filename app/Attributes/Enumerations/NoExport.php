<?php

namespace App\Attributes\Enumerations;

use Attribute;

#[Attribute(Attribute::TARGET_CLASS|Attribute::TARGET_PROPERTY)]
class NoExport
{
    //
}