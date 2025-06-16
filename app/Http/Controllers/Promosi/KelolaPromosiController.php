<?php

namespace App\Http\Controllers\Promosi;

use App\Http\Controllers\Controller;
use App\Models\Promosi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KelolaPromosiController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $id_umkm = $user->user_type === 'umkm' && $user->umkm ? $user->umkm->id : null;

        $promosi = Promosi::select('id_promosi', 'nama_produk', 'deskripsi_produk', 'harga_produk')
            ->where('id_umkm', $id_umkm)
            ->get();

        return Inertia::render('Umkm/ProdukUmkm', [
            'promosi' => $promosi,
        ]);
    }

    public function create()
    {
        return Inertia::render('Umkm/TambahProduk');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_produk' => 'required|string|max:255',
            'kategori_produk' => 'required|string|max:100',
            'sub_kategori' => 'nullable|string|max:100',
            'harga_produk' => 'required|numeric',
            'deskripsi_produk' => 'required|string',
            'foto_produk' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $fotoPath = null;
        if ($request->hasFile('foto_produk')) {
            $fotoPath = $request->file('foto_produk')->store('foto_produk', 'public');
        }

        $user = Auth::user();
        $id_umkm = $user->user_type === 'umkm' && $user->umkm
            ? $user->umkm->id
            : null;

        Promosi::create([
            'nama_produk' => $request->nama_produk,
            'kategori_produk' => $request->kategori_produk,
            'sub_kategori' => $request->sub_kategori,
            'harga_produk' => $request->harga_produk,
            'deskripsi_produk' => $request->deskripsi_produk,
            'foto_produk' => $fotoPath,
            'id_umkm' => $id_umkm,
            'user_type' => $user->user_type,
        ]);

        return redirect()->route('umkm.produk')->with('success', 'Produk berhasil ditambahkan');
    }
}
