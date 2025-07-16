<?php

namespace App\Http\Controllers\LegalitasProduk;

use App\Http\Controllers\Controller;
use App\Models\LegalitasProduk;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class KelolaLegalitasProdukController extends Controller
{
    public function show()
    {
        $legpro = LegalitasProduk::all();

        return Inertia::render('Pegawai/LegalitasProduk/ListLegpro', [
            'legpro' => $legpro,
        ]);
    }

    public function create()
    {
        return Inertia::render('Pegawai/LegalitasProduk/TambahLegpro');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_legalitas' => 'required|string|max:255|unique:legalitas_produk,nama_legalitas',
            'singkatan' => 'required|string|max:255',
            'deskripsi' => 'required|string',
        ]);

        $validated['status'] = 'aktif';

        LegalitasProduk::create($validated);

        return redirect()->route('legpro.list')->with('success', 'Legalitas produk berhasil ditambahkan.');
    }

    public function edit($id_legpro)
    {
        $legpro = LegalitasProduk::findOrFail($id_legpro);

        return Inertia::render('Pegawai/LegalitasProduk/EditLegpro', [
            'legpro' => $legpro,
        ]);
    }

    public function update(Request $request, $id_legpro)
    {
        $validated = $request->validate([
            'nama_legalitas' => ['required', 'string', 'max:255', Rule::unique('legalitas_produk', 'nama_legalitas')->ignore($id_legpro, 'id_legpro'),],
            'singkatan' => 'required|string|max:255',
            'deskripsi' => 'required|string',
        ]);

        $legpro = LegalitasProduk::findOrFail($id_legpro);
        $legpro->update($validated);

        return redirect()->route('legpro.list')->with('success', 'Legalitas produk berhasil diperbarui.');
    }

    public function updateStatus(Request $request, $id_legpro)
    {
        $request->validate([
            'status' => ['required', Rule::in(['aktif', 'nonaktif'])],
        ]);

        $legpro = LegalitasProduk::findOrFail($id_legpro);
        $legpro->status = $request->status;
        $legpro->save();

        return redirect()->back()->with('success', 'Status legalitas produk berhasil diperbaharui');
    }
}
