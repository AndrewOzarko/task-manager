<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/registration', [AuthenticationController::class, 'registration']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [UserController::class, 'logout']);

    Route::get('/tasks', [TaskController::class, 'list']);
    Route::get('/tasks/{task}', [TaskController::class, 'getTaskById']);
    Route::post('/tasks', [TaskController::class, 'create']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::delete('/tasks/{task}', [TaskController::class, 'delete']);




});
