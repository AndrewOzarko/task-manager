<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $casts = [
        'status' => 'integer',
        'priority' => 'integer',
    ];

    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
    ];
}
