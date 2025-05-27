<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('messagerie')->name('messagerie.')->group(function () {
        Route::get('/', [\App\Http\Controllers\MessageController::class, 'index'])->name('index');
        Route::get('/create', [\App\Http\Controllers\MessageController::class, 'create'])->name('create');
        Route::post('/', [\App\Http\Controllers\MessageController::class, 'store'])->name('store');
        Route::get('/{message}', [\App\Http\Controllers\MessageController::class, 'show'])->name('show');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
