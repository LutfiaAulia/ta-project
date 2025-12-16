<?php

namespace App\Http\Controllers\Layanan;

use App\Http\Controllers\Controller;
use App\Models\BidangLayanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LayananPublicController extends Controller
{
    public function index()
    {
        $bidangLayanan = BidangLayanan::with(['layanan' => function ($query) {
            $query->select('id_layanan', 'id_bidang', 'layanan', 'deskripsi_layanan');
        }])
            ->orderBy('nama_bidang', 'asc')
            ->get();

        $dataLayanan = $bidangLayanan->map(fn($bidang) => [
            'id_bidang' => $bidang->id_bidang,
            'nama_bidang' => $bidang->nama_bidang,
            'layanan' => $bidang->layanan->map(fn($layanan) => [
                'id_layanan' => $layanan->id_layanan,
                'layanan' => $layanan->layanan,
                'deskripsi_layanan' => $layanan->deskripsi_layanan,
            ])->toArray(),
        ])->toArray();

        return Inertia::render('DaftarLayanan', [
            'layananGrouped' => $dataLayanan,
        ]);
    }
}
