<?php

use App\Http\Controllers\Auth\LoginPegawaiController;
use App\Http\Controllers\Booking\BookingController;
use App\Http\Controllers\Booking\RiwayatBooking;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Halaman utama
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// ========== ROUTE UNTUK INSTANSI(AUTH DEFAULT) ========== //
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Instansi/DashboardIns'))->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Booking
    Route::get('/booking/riwayat', [RiwayatBooking::class, 'riwayat'])->name('booking.riwayat');
    Route::get('/booking/create', [BookingController::class, 'create'])->name('booking.create');
    Route::post('/booking/store', [BookingController::class, 'store'])->name('booking.store');
    Route::get('/booking/{id}/show', [RiwayatBooking::class, 'show'])->name('booking.show');
    Route::get('/surat/{filename}', [RiwayatBooking::class, 'showSurat'])->name('surat.show');
});

// ========== AUTH PEGAWAI ========== //
Route::prefix('pegawai')->group(function () {
    // Login & logout pegawai
    Route::get('/login', [LoginPegawaiController::class, 'showLoginForm'])->name('pegawai.login.form');
    Route::post('/login', [LoginPegawaiController::class, 'login'])->name('pegawai.login');
    Route::post('/logout', [LoginPegawaiController::class, 'logout'])->name('pegawai.logout');

    // Route khusus untuk pegawai yang sudah login
    Route::middleware('auth:pegawai')->group(function () {
        Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('pegawai.dashboard');
        // Tambah route lain khusus pegawai di sini
    });
});

require __DIR__ . '/auth.php';
