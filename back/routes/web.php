<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::prefix('administration/')->middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::get('tableau-de-bord', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('messagerie')->name('messagerie.')->group(function () {
        Route::get('/', [\App\Http\Controllers\MessageControlleur::class, 'index'])->name('index');
        Route::get('/create', [\App\Http\Controllers\MessageControlleur::class, 'create'])->name('create');
        Route::post('/', [\App\Http\Controllers\MessageControlleur::class, 'store'])->name('store');
        Route::get('/{message}', [\App\Http\Controllers\MessageControlleur::class, 'show'])->name('show');
    });

    Route::resource('secours', \App\Http\Controllers\Secours\SecoursControlleur::class);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
