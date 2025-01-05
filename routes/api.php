<?php

use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/registration', [AuthenticationController::class, 'registration']);
Route::post('/forgot', [AuthenticationController::class, 'forgotPassword']);
Route::post('/reset', [AuthenticationController::class, 'resetPassword']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/tasks/options', [TaskController::class, 'getOptions']);
    Route::get('/tasks', [TaskController::class, 'list']);
    Route::get('/tasks/{task}', [TaskController::class, 'getTaskById']);
    Route::post('/tasks', [TaskController::class, 'create']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::delete('/tasks/{task}', [TaskController::class, 'delete']);

    Route::get('/logout', [UserController::class, 'logout']);

});
