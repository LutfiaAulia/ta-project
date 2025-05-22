<?php

use App\Http\Controllers\Auth\LoginPegawaiController;
use App\Http\Controllers\Booking\BookingController;
use App\Http\Controllers\Booking\RiwayatBooking;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\KelolaUserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ================= HALAMAN UTAMA ================= //
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// ==================== ROUTE UNTUK DIAKSES BANYAK ROLE ==================== //
Route::middleware(['auth'])->group(function () {
    Route::get('/surat/{filename}', [RiwayatBooking::class, 'showSurat'])->name('surat.show');
});

// ========== ROUTE UNTUK INSTANSI (user_type: instansi) ========== //
Route::middleware(['auth', 'verified', 'check.user.type:instansi'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Instansi/DashboardIns'))->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Booking
    Route::get('/booking/riwayat', [RiwayatBooking::class, 'riwayat'])->name('booking.riwayat');
    Route::get('/booking/create', [BookingController::class, 'create'])->name('booking.create');
    Route::post('/booking/store', [BookingController::class, 'store'])->name('booking.store');
    Route::get('/booking/{id}/show', [RiwayatBooking::class, 'show'])->name('booking.show');
});

// ========== ROUTE UNTUK PEGAWAI (user_type: pegawai) ========== //
Route::prefix('pegawai')->group(function () {
    Route::get('/login', [LoginPegawaiController::class, 'showLoginForm'])->name('pegawai.login.form');
    Route::post('/login', [LoginPegawaiController::class, 'login'])->name('pegawai.login');
    Route::post('/logout', [LoginPegawaiController::class, 'logout'])->name('pegawai.logout');

    Route::middleware(['auth', 'check.user.type:pegawai'])->group(function () {
        Route::get('/dashboard', fn() => Inertia::render('Pegawai/Dashboard'))->name('pegawai.dashboard');
        Route::get('/booking/listBooking', [RiwayatBooking::class, 'listAllBooking'])->name('booking.listBooking');
        Route::get('/booking/{id}', [RiwayatBooking::class, 'showBook'])->name('booking.showbook');
        Route::post('/booking/{id}/verifikasi', [BookingController::class, 'verifikasi'])->name('booking.verif');
        Route::post('/booking/{id}/tolak', [BookingController::class, 'tolak'])->name('booking.tolak');
        Route::get('/show/user', [KelolaUserController::class, 'show'])->name('user.show');
        Route::get('/create/user', [KelolaUserController::class, 'create'])->name('user.create');
        Route::post('/store/user', [KelolaUserController::class, 'store'])->name('user.store');
        Route::patch('/status/user/{type}/{id}', [KelolaUserController::class, 'updateStatus'])->name('user.updateStatus');
        Route::get('/edit/user/{id}', [KelolaUserController::class, 'edit'])->name('user.edit');
        Route::put('/update/user/{id}', [KelolaUserController::class, 'update'])->name('user.update');
    });
});

require __DIR__ . '/auth.php';
