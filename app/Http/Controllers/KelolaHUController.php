<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\BidangLayanan;
use App\Models\Booking;
use App\Models\Galeri;
use App\Models\Instansi;
use App\Models\PelayananUmkm;
use App\Models\Program;
use App\Models\Umkm;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class KelolaHUController extends Controller
{
    public function beranda()
    {
        $beritaTerbaru = Berita::select('judul', 'slug', 'ringkasan', 'gambar', 'tanggal_publikasi')
            ->where('tanggal_publikasi', '<=', Carbon::now())
            ->orderBy('tanggal_publikasi', 'desc')
            ->limit(6)
            ->get();

        $mainNews = $beritaTerbaru->first();

        $beritaLain = $beritaTerbaru->skip(1)->values();

        $programPlut = Program::select('id_program', 'judul', 'excerpt', 'image', 'slug', 'status')
            ->whereIn('status', ['active', 'upcoming'])
            ->orderBy('id_program', 'asc')
            ->limit(3)
            ->get();

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

        $dokumentasiTerbaru = Galeri::orderBy('created_at', 'desc')
            ->limit(10)
            ->get(['id_galeri', 'gambar', 'created_at']);


        return Inertia::render('Welcome', [
            'programPlut' => $programPlut,
            'jadwalTerdekat' => $jadwalTerdekat,
            'layanan' => $layananGrouped,
            'umkmTerlayani' => $umkmTerlayani,
            'nagariTerliput' => $nagariTerliput,
            'jumlahInstansi' => $jumlahInstansi,
            'jumlahUmkm' => $jumlahUmkm,
            'dokumentasiTerbaru' => $dokumentasiTerbaru,
            'beritaTerbaru' => $beritaTerbaru,
            'mainNews' => $mainNews,
            'beritaLain' => $beritaLain,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
