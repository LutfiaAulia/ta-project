<?php

use App\Http\Controllers\Booking\BookingController;
use App\Http\Controllers\Booking\RiwayatBooking;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Response;
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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    //Booking
    Route::get('/booking/riwayat', [RiwayatBooking::class, 'riwayat'])->name('booking.riwayat');
    Route::get('/booking/create', [BookingController::class, 'create'])->name('booking.create');
    Route::post('/booking/store', [BookingController::class, 'store'])->name('booking.store');
    Route::get('/booking/{id}/show', [RiwayatBooking::class, 'show'])->name('booking.show');
    Route::get('/surat/{filename}', [RiwayatBooking::class, 'showSurat'])->name('surat.show');
});

require __DIR__.'/auth.php';
