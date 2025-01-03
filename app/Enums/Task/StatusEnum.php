<?php

namespace App\Enums\Task;

enum StatusEnum: int
{
    case Pending = 0;
    case InProgress = 1;
    case Completed = 2;

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Pending',
            self::InProgress => 'In Progress',
            self::Completed => 'Completed',
        };
    }

    public static function options(): array
    {
        return array_map(fn ($case) => [
            'value' => $case->value,
            'label' => $case->label()
        ], self::cases());
    }
}
