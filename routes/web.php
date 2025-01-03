<?php

use App\Http\Middleware\RedirectToDashboardMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\EncryptHistoryMiddleware;

Route::middleware([RedirectToDashboardMiddleware::class, EncryptHistoryMiddleware::class])->group(function () {
    Route::get('/registration', function () {
        return Inertia::render('Registration');
    })->name('registration');
    Route::get('/login', function () {
        return Inertia::render('Login');
    })->name('login');
    Route::get('/forgot', function () {
        return Inertia::render('ForgotPassword');
    })->name('forgot');
});

Route::middleware(['auth:sanctum', EncryptHistoryMiddleware::class])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard/List');
    })->name('dashboard');
    Route::get('/kanban', function () {
        return Inertia::render('Dashboard/Kanban');
    })->name('kanban');
});
