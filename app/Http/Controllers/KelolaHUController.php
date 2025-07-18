<?php

namespace App\Http\Controllers;

use App\Models\BidangLayanan;
use App\Models\Booking;
use App\Models\Instansi;
use App\Models\Layanan;
use App\Models\PelayananUmkm;
use App\Models\Umkm;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class KelolaHUController extends Controller
{
    public function beranda()
    {
        $jadwalTerdekat = Booking::whereDate('tanggal_akhir', '>=', Carbon::now())
            ->where('status_booking', 'Diterima')
            ->orderBy('tanggal_mulai')
            ->limit(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id_booking,
                    'tanggal_mulai' => $item->tanggal_mulai,
                    'tanggal_akhir' => $item->tanggal_akhir,
                    'waktu_mulai' => date('H.i', strtotime($item->waktu_mulai)),
                    'waktu_akhir' => date('H.i', strtotime($item->waktu_akhir)),
                    'lokasi' => "{$item->kecamatan}, {$item->kenagarian_kelurahan}",
                ];
            });

        $layananGrouped = BidangLayanan::where('status', 'aktif')
            ->with(['layanan' => function ($query) {
                $query->select('id_layanan', 'layanan', 'id_bidang', 'deskripsi_layanan', 'status')
                    ->where('status', 'aktif');
            }])->get()->mapWithKeys(function ($bidang) {
                return [
                    $bidang->nama_bidang => $bidang->layanan->map(function ($item) use ($bidang) {
                        return [
                            'id_layanan' => $item->id_layanan,
                            'layanan' => $item->layanan,
                            'deskripsi_layanan' => $item->deskripsi_layanan,
                            'bidang' => $bidang->nama_bidang,
                        ];
                    }),
                ];
            });

        $umkmTerlayani = PelayananUmkm::whereNotNull('nik')
            ->distinct('nik')
            ->count('nik');

        $nagariTerliput = Booking::whereNotNull('kenagarian_kelurahan')
            ->where('status_booking', '!=', 'Ditolak')
            ->distinct('kenagarian_kelurahan')
            ->count('kenagarian_kelurahan');

        $jumlahInstansi = Instansi::count();

        $jumlahUmkm = Umkm::count();

        return Inertia::render('Welcome', [
            'jadwalTerdekat' => $jadwalTerdekat,
            'layanan' => $layananGrouped,
            'umkmTerlayani' => $umkmTerlayani,
            'nagariTerliput' => $nagariTerliput,
            'jumlahInstansi' => $jumlahInstansi,
            'jumlahUmkm' => $jumlahUmkm,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
