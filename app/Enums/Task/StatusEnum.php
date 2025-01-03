<?php

namespace App\Enums\Task;

enum StatusEnum: int
{
    case Pending = 0;
    case InProgress = 1;
    case Completed = 2;
}
