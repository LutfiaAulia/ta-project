<?php

namespace App\Http\Controllers\Kategori;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class KelolaKategoriController extends Controller
{
    public function show()
    {
        $kategori = Kategori::all();

        return Inertia::render('Pegawai/Kategori/ListKategori', [
            'kategori' => $kategori,
        ]);
    }

    public function create()
    {
        return Inertia::render('Pegawai/Kategori/TambahKategori');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_kategori' => 'required|string|max:255|unique:kategori,nama_kategori',

        ]);

        Kategori::create($validated);

        return redirect()->route('kategori.list')->with('success', 'Kategori berhasil ditambahkan');
    }

    public function edit($id_kategori)
    {
        $kategori = Kategori::findOrFail($id_kategori);

        return Inertia::render('Pegawai/Kategori/EditKategori', [
            'kategori' => $kategori,
        ]);
    }

    public function update(Request $request, $id_kategori)
    {
        $validated = $request->validate([
            'nama_kategori' => [
                'required',
                'string',
                'max:255',
                Rule::unique('kategori', 'nama_kategori')->ignore($id_kategori, 'id_kategori'),
            ],
        ]);

        $kategori = Kategori::findOrFail($id_kategori);
        $kategori->update($validated);

        return redirect()->route('kategori.list')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy($id_kategori)
    {
        $kategori = Kategori::findOrFail($id_kategori);
        $kategori->delete();

        return redirect()->route('kategori.list')->with('success', 'Kategori berhasil dihapus');
    }
}
