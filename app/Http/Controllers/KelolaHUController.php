<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Layanan;
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

        $layananList = Layanan::all(['id_layanan', 'layanan']);

        return Inertia::render('Welcome', [
            'jadwalTerdekat' => $jadwalTerdekat,
            'layanan' => $layananList,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
