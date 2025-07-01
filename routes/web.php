<?php

use App\Http\Controllers\Auth\LoginPegawaiController;
use App\Http\Controllers\Auth\LoginUmkmController;
use App\Http\Controllers\Booking\BookingController;
use App\Http\Controllers\Booking\RiwayatBooking;
use App\Http\Controllers\Dashboard\PegawaiDashboardController;
use App\Http\Controllers\Dashboard\UmkmDashboardController;
use App\Http\Controllers\Kategori\KelolaKategoriController;
use App\Http\Controllers\KelolaHUController;
use App\Http\Controllers\Laporan\KelolaLaporanController;
use App\Http\Controllers\Layanan\KelolaLayananController;
use App\Http\Controllers\MobilSopir\KelolaMobilController;
use App\Http\Controllers\MobilSopir\KelolaSopirController;
use App\Http\Controllers\PelayananUmkm\KelolaPelayananUmkmController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Promosi\KelolaDataUmkmController;
use App\Http\Controllers\Promosi\KelolaPromosiController;
use App\Http\Controllers\Promosi\KelolaShowPromosiController;
use App\Http\Controllers\SuratMasuk\KelolaDisposisiController;
use App\Http\Controllers\SuratMasuk\KelolaSuratController;
use App\Http\Controllers\User\KelolaProfilController;
use App\Http\Controllers\User\KelolaUserController;
use App\Models\Pegawai;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ================= HALAMAN UTAMA ================= //

Route::get('/', [KelolaHUController::class, 'beranda'])->name('home');
Route::get('/list/umkm/promosi', [KelolaShowPromosiController::class, 'show'])->name('list.umkm.promosi');

// ==================== ROUTE UNTUK DIAKSES BANYAK ROLE ==================== //
Route::middleware(['auth'])->group(function () {
    Route::get('/surat/{filename}', [RiwayatBooking::class, 'showSurat'])->name('surat.show');
});

// ========== ROUTE UNTUK INSTANSI (user_type: instansi) ========== //
Route::middleware(['auth', 'verified', 'check.user.type:instansi'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Instansi/DashboardIns'))->name('dashboard');

    // Profile
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
        Route::get('/dashboardAdmin', [PegawaiDashboardController::class, 'dashboardAdmin'])->name('admin.dashboard');
        Route::get('/dashboardKadin', [PegawaiDashboardController::class, 'dashboardKadin'])->name('kadin.dashboard');
        Route::get('/dashboardKabid', [PegawaiDashboardController::class, 'dashboardKabid'])->name('kabid.dashboard');
        Route::get('/dashboardAdm', [PegawaiDashboardController::class, 'dashboardAdm'])->name('adm.dashboard');
        Route::get('/dashboardLapangan', [PegawaiDashboardController::class, 'dashboardLapangan'])->name('lapangan.dashboard');

        Route::get('/pegawai/profile', [KelolaProfilController::class, 'showPegawai'])->name('pegawai.profile');
        Route::post('/pegawai/update-profile', [KelolaProfilController::class, 'updateProfilePegawai'])->name('pegawai.profile.update');
        Route::post('/pegawai/password', [KelolaProfilController::class, 'updatePasswordPegawai'])->name('pegawai.password.update');

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

        Route::get('/list/layanan', [KelolaLayananController::class, 'show'])->name('layanan.list');
        Route::get('/create/layanan', [KelolaLayananController::class, 'create'])->name('layanan.create');
        Route::post('/store/layanan', [KelolaLayananController::class, 'store'])->name('layanan.store');
        Route::get('/edit/layanan/{id}', [KelolaLayananController::class, 'edit'])->name('layanan.edit');
        Route::put('/update/layanan/{id}', [KelolaLayananController::class, 'update'])->name('layanan.update');
        Route::put('/updateStatus/layanan/{id}', [KelolaLayananController::class, 'updateStatus'])->name('layanan.status');

        Route::get('/list/mobil', [KelolaMobilController::class, 'show'])->name('mobil.list');
        Route::get('/create/mobil', [KelolaMobilController::class, 'create'])->name('mobil.create');
        Route::post('/store/mobil', [KelolaMobilController::class, 'store'])->name('mobil.store');
        Route::get('/edit/mobil/{id}', [KelolaMobilController::class, 'edit'])->name('mobil.edit');
        Route::put('/update/mobil/{id}', [KelolaMobilController::class, 'update'])->name('mobil.update');
        Route::put('/updateStatus/mobil/{id}', [KelolaMobilController::class, 'updateStatus'])->name('mobil.status');

        Route::get('/list/sopir', [KelolaSopirController::class, 'show'])->name('sopir.list');
        Route::get('/create/sopir', [KelolaSopirController::class, 'create'])->name('sopir.create');
        Route::post('/store/sopir', [KelolaSopirController::class, 'store'])->name('sopir.store');
        Route::get('/edit/sopir/{id}', [KelolaSopirController::class, 'edit'])->name('sopir.edit');
        Route::put('/update/sopir/{id}', [KelolaSopirController::class, 'update'])->name('sopir.update');
        Route::put('/updateStatus/sopir/{id}', [KelolaSopirController::class, 'updateStatus'])->name('sopir.status');

        Route::get('/list/surat', [KelolaSuratController::class, 'show'])->name('surat.list');
        Route::get('/create/surat', [KelolaSuratController::class, 'create'])->name('surat.create');
        Route::post('/store/surat', [KelolaSuratController::class, 'store'])->name('surat.store');
        Route::get('/edit/surat/{id}', [KelolaSuratController::class, 'edit'])->name('surat.edit');
        Route::put('/update/surat/{id}', [KelolaSuratController::class, 'update'])->name('surat.update');
        Route::delete('/destroy/surat/{id}', [KelolaSuratController::class, 'destroy'])->name('surat.destroy');

        Route::get('/list/disposisi', [KelolaDisposisiController::class, 'show'])->name('disposisi.list');
        Route::get('/create/disposisi/{id}', [KelolaDisposisiController::class, 'create'])->name('disposisi.create');
        Route::post('/store/disposisi', [KelolaDisposisiController::class, 'store'])->name('disposisi.store');
        Route::get('/edit/disposisi/{id}', [KelolaDisposisiController::class, 'edit'])->name('disposisi.edit');
        Route::put('/update/disposisi/{id}', [KelolaDisposisiController::class, 'update'])->name('disposisi.update');
        Route::delete('/destroy/disposisi/{id}', [KelolaDisposisiController::class, 'destroy'])->name('disposisi.destroy');
        Route::get('/detail/disposisi/{id}', [KelolaDisposisiController::class, 'detail'])->name('disposisi.detail');

        Route::get('/list/bookingdilaksanakan', [KelolaPelayananUmkmController::class, 'show'])->name('bookinglaksana.list');
        Route::get('/list/umkmlayan/{id}', [KelolaPelayananUmkmController::class, 'showUmkm'])->name('umkmlayan.list');
        Route::get('/create/umkmlayan/{id}', [KelolaPelayananUmkmController::class, 'create'])->name('umkmlayan.create');
        Route::post('/store/umkmlayan', [KelolaPelayananUmkmController::class, 'store'])->name('umkmlayan.store');
        Route::get('/edit/umkmlayan/{id}', [KelolaPelayananUmkmController::class, 'edit'])->name('umkmlayan.edit');
        Route::put('/update/umkmlayan/{id}', [KelolaPelayananUmkmController::class, 'update'])->name('umkmlayan.update');
        Route::delete('/destroy/umkmlayan/{id}', [KelolaPelayananUmkmController::class, 'destroy'])->name('umkmlayan.destroy');

        Route::get('/list/laporan', [KelolaLaporanController::class, 'show'])->name('laporan.list');
        Route::get('/create/laporan', [KelolaLaporanController::class, 'create'])->name('laporan.create');
        Route::post('/store/laporan', [KelolaLaporanController::class, 'store'])->name('laporan.store');
        Route::get('/edit/laporan/{id}', [KelolaLaporanController::class, 'edit'])->name('laporan.edit');
        Route::put('/update/laporan/{id}', [KelolaLaporanController::class, 'update'])->name('laporan.update');
        Route::delete('/destroy/laporan/{id}', [KelolaLaporanController::class, 'destroy'])->name('laporan.destroy');

        Route::get('/kelola/promosi', [KelolaPromosiController::class, 'index'])->name('pegawai.kelola.promosi');
        Route::get('/show/promosi', [KelolaPromosiController::class, 'showPegawai'])->name('pegawai.show.promosi');
        Route::get('/edit/produk/{id}', [KelolaPromosiController::class, 'editPegawai'])->name('pegawai.edit.produk');
        Route::put('/update/produk/{id}', [KelolaPromosiController::class, 'updatePegawai'])->name('pegawai.update.produk');
        Route::delete('/destroy/produk/{id}', [KelolaPromosiController::class, 'destroyPegawai'])->name('pegawai.destroy.produk');

        Route::get('/list/kategori', [KelolaKategoriController::class, 'show'])->name('kategori.list');
        Route::get('/create/kategori', [KelolaKategoriController::class, 'create'])->name('kategori.create');
        Route::post('/store/kategori', [KelolaKategoriController::class, 'store'])->name('kategori.store');
        Route::get('/edit/kategori/{id}', [KelolaKategoriController::class, 'edit'])->name('kategori.edit');
        Route::put('/update/kategori/{id}', [KelolaKategoriController::class, 'update'])->name('kategori.update');
        Route::delete('/destroy/kategori/{id}', [KelolaKategoriController::class, 'destroy'])->name('kategori.destroy');

        Route::get('/tampilan/laporan/{id}', [KelolaLaporanController::class, 'laporan'])->name('tampilan.tempalte.laporan');
    });
});

// ========== ROUTE UNTUK UMKM (user_type: umkm) ========== //
Route::prefix('umkm')->group(function () {
    Route::get('/login', [LoginUmkmController::class, 'showLoginForm'])->name('umkm.login.form');
    Route::post('/login', [LoginUmkmController::class, 'login'])->name('umkm.login');
    Route::post('/logout', [LoginUmkmController::class, 'logout'])->name('umkm.logout');

    Route::middleware(['auth', 'check.user.type:umkm'])->group(function () {
        Route::get('/dashboard', [UmkmDashboardController::class, 'dashboard'])->name('umkm.dashboard');

        //Data Umkm
        Route::get('/data/umkm', [KelolaDataUmkmController::class, 'show'])->name('umkm.data');
        Route::post('/update-data/umkm', [KelolaDataUmkmController::class, 'update'])->name('umkm.update-data');

        //Produk Umkm
        Route::get('/list/produk', [KelolaPromosiController::class, 'show'])->name('umkm.produk');
        Route::get('/create/produk', [KelolaPromosiController::class, 'create'])->name('umkm.create');
        Route::post('/store/produk', [KelolaPromosiController::class, 'store'])->name('umkm.store');
        Route::get('/edit/produk/{id}', [KelolaPromosiController::class, 'edit'])->name('umkm.edit');
        Route::put('/update/produk/{id}', [KelolaPromosiController::class, 'update'])->name('umkm.update');
        Route::delete('/destroy/produk/{id}', [KelolaPromosiController::class, 'destroy'])->name('umkm.destroy');

        Route::get('/umkm/profile', [KelolaProfilController::class, 'show'])->name('umkm.profile');
        Route::post('/umkm/update-profile', [KelolaProfilController::class, 'updateProfile'])->name('umkm.profile.update');
        Route::post('/umkm/password', [KelolaProfilController::class, 'updatePassword'])->name('umkm.password.update');
    });
});

require __DIR__ . '/auth.php';
