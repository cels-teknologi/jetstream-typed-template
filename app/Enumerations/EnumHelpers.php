<?php

namespace App\Enumerations;

trait EnumHelpers
{
    public static function values()
    {
        $reflector = new \ReflectionClass(self::class);
        if ($reflector->isSubclassOf(\BackedEnum::class)) {
            return \array_map(fn ($case) => $case->value, self::cases());
        }
    }
}