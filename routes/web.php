<?php

use App\Http\Middleware\RedirectToDashboardMiddleware;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
    })->name('password.email');
    Route::get('/reset/{token}/{email}', function (string $token, string $email) {
        $passwordReset = DB::table('password_reset_tokens')
            ->where('email', '=', $email)
            ->first();

        if (!$passwordReset) {
            return redirect('/');
        }
        if (!Hash::check($token, $passwordReset->token)) {
            return redirect('/');
        }

        return Inertia::render('ResetPassword', [
            'token' => $token,
            'email' => $email,
        ]);
    })->name('password.reset');

});

Route::middleware(['auth:sanctum', EncryptHistoryMiddleware::class])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard/List');
    })->name('dashboard');
    Route::get('/tasks/create', function () {
        return Inertia::render('Dashboard/Create');
    })->name('dashboard');
    Route::get('/tasks/{id}', function (int $id) {
        return Inertia::render('Dashboard/Task', [
            'taskId' => $id,
        ]);
    })->name('taskById');
    Route::get('/tasks/{id}/edit', function (int $id) {
        return Inertia::render('Dashboard/Edit', [
            'taskId' => $id,
        ]);
    })->name('editById');
    Route::get('/kanban', function () {
        return Inertia::render('Dashboard/Kanban');
    })->name('kanban');
});
