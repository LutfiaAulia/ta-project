<?php

use App\Http\Controllers\Booking\BookingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Instansi/DashboardIns');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/ribook', function () {
    return Inertia::render('Instansi/RiwayatBooking');
})->middleware(['auth', 'verified'])->name('ribook');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/booking/create', [BookingController::class, 'create'])->name('booking.create');
    Route::post('/booking/store', [BookingController::class, 'store'])->name('booking.store');
    Route::get('/{id}/edit', [BookingController::class, 'edit'])->name('booking.edit');
    Route::put('/{id}/update', [BookingController::class, 'update'])->name('booking.update');
    Route::delete('/{id}/destroy', [BookingController::class, 'destroy'])->name('booking.destroy');
    Route::get('/booking/riwayat', [BookingController::class, 'riwayat'])->name('booking.riwayat');

});

require __DIR__.'/auth.php';
