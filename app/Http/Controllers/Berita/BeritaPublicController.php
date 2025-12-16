<?php

namespace App\Http\Controllers\Berita;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Inertia\Inertia;

class BeritaPublicController extends Controller
{
    public function show(Berita $berita)
    {
        $beritaLain = Berita::where('id_berita', '!=', $berita->id_berita)
            ->orderBy('tanggal_publikasi', 'desc')
            ->take(5)
            ->get()
            ->map(fn($item) => [
                'id_berita' => $item->id_berita,
                'judul' => $item->judul,
                'tanggal_publikasi' => $item->tanggal_publikasi,
            ]);

        return Inertia::render('DetailBerita', [
            'berita' => [
                'id_berita' => $berita->id_berita,
                'judul' => $berita->judul,
                'tanggal_publikasi' => $berita->tanggal_publikasi,
                'ringkasan' => $berita->ringkasan,
                'gambar' => $berita->gambar,
                'isi_berita' => $berita->konten,
                'penulis' => $berita->penulis ?? 'Admin',
            ],
            'beritaLain' => $beritaLain,
        ]);
    }
}
