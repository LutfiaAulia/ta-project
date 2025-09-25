<?php

namespace App\Http\Controllers\Promosi;

use App\Http\Controllers\Controller;
use App\Models\IdentitasUmkm;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelolaShowPromosiController extends Controller
{
    public function show(Request $request)
    {
        $search = $request->query('search');
        $kategori = $request->query('kategori');

        $query = IdentitasUmkm::with(['kategori_umkm', 'sosial_media', 'umkm.promosi.legalitasProduk']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama_usaha', 'like', "%$search%")
                    ->orWhere('kabupaten_kota', 'like', "%$search%")
                    ->orWhere('kanagarian_kelurahan', 'like', "%$search%");
            });
        }

        if ($kategori && $kategori !== 'Semua') {
            $query->whereHas('kategori_umkm', function ($q) use ($kategori) {
                $q->where('nama_kategori', $kategori);
            });
        }

        $umkmList = $query->get()->map(function ($identitas) {
            $instagram = $identitas->sosial_media->firstWhere('platform', 'instagram');
            $whatsapp = $identitas->sosial_media->firstWhere('platform', 'whatsapp');
            $facebook = $identitas->sosial_media->firstWhere('platform', 'facebook');

            return [
                'id' => $identitas->id_identitas,
                'nama_usaha' => $identitas->nama_usaha,
                'lokasi' => "{$identitas->kabupaten_kota}, {$identitas->kanagarian_kelurahan}",
                'alamat_detail' => $identitas->alamat_detail,
                'deskripsi' => $identitas->deskripsi,
                'foto_usaha' => $identitas->foto_usaha,
                'latitude' => $identitas->latitude,
                'longitude' => $identitas->longitude,
                'no_hp' => $identitas->umkm?->no_hp ?? null,

                // sosial media
                'instagram' => $instagram?->url,
                'whatsapp' => $whatsapp?->url,
                'facebook' => $facebook?->url,

                // kategori
                'kategori' => $identitas->kategori_umkm->pluck('nama_kategori')->implode(', '),

                // produk
                'products' => $identitas->umkm?->promosi
                    ->where('status', 'diterima')
                    ->map(function ($p) {
                        return [
                            'id' => $p->id,
                            'nama_produk' => $p->nama_produk,
                            'harga_produk' => $p->harga_produk,
                            'foto_produk' => $p->foto_produk,
                            'deskripsi_produk' => $p->deskripsi_produk,
                            'legalitas_produk' => $p->legalitasProduk->map(fn($l) => [
                                'id_legpro' => $l->id_legpro,
                                'singkatan' => $l->singkatan,
                            ])->values()->toArray(),
                        ];
                    })->values()
                    ->toArray() ?? [],
            ];
        });

        $kategori_umkm = Kategori::pluck('nama_kategori')->prepend('Semua');

        return Inertia::render('ListUmkm', [
            'daftar_umkm' => $umkmList,
            'kategori_umkm' => $kategori_umkm,
        ]);
    }

    public function detail($id)
    {
        $identitas = IdentitasUmkm::with(['kategori_umkm', 'sosial_media', 'umkm.promosi.legalitasProduk'])
            ->findOrFail($id);

        $instagram = $identitas->sosial_media->firstWhere('platform', 'instagram');
        $whatsapp = $identitas->sosial_media->firstWhere('platform', 'whatsapp');
        $facebook = $identitas->sosial_media->firstWhere('platform', 'facebook');

        return Inertia::render('DetailUmkm', [
            'umkm' => [
                'id' => $identitas->id_identitas,
                'nama_usaha' => $identitas->nama_usaha,
                'lokasi' => "{$identitas->kabupaten_kota}, {$identitas->kanagarian_kelurahan}",
                'alamat_detail' => $identitas->alamat_detail,
                'deskripsi' => $identitas->deskripsi,
                'foto_usaha' => $identitas->foto_usaha,
                'latitude' => $identitas->latitude,
                'longitude' => $identitas->longitude,
                'no_hp' => $identitas->umkm?->no_hp ?? null,

                'instagram' => $instagram?->url,
                'whatsapp' => $whatsapp?->url,
                'facebook' => $facebook?->url,

                'kategori' => $identitas->kategori_umkm->pluck('nama_kategori')->implode(', '),

                'products' => $identitas->umkm?->promosi
                    ->where('status', 'diterima')
                    ->map(function ($p) {
                        return [
                            'id' => $p->id,
                            'nama_produk' => $p->nama_produk,
                            'harga_produk' => $p->harga_produk,
                            'foto_produk' => $p->foto_produk,
                            'deskripsi_produk' => $p->deskripsi_produk,
                            'legalitas_produk' => $p->legalitasProduk->map(fn($l) => [
                                'id_legpro' => $l->id_legpro,
                                'singkatan' => $l->singkatan,
                            ]),
                        ];
                    }) ?? [],
            ],
        ]);
    }
}
