<?php

namespace App\Http\Controllers\Layanan;

use App\Http\Controllers\Controller;
use App\Models\Layanan;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class KelolaLayananController extends Controller
{
    public function show()
    {
        $layanan = Layanan::all();

        return Inertia::render('Pegawai/ListLayanan', [
            'layanan' => $layanan,
        ]);
    }

    public function create()
    {
        return Inertia::render('Pegawai/TambahLayanan');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'layanan' => 'required|string|max:255|unique:layanan,layanan',
        ]);

        Layanan::create($validated);

        return redirect()->route('layanan.list')->with('success', 'Layanan berhasil ditambahkan.');
    }

    public function edit($id_layanan)
    {
        $layanan = Layanan::findOrFail($id_layanan);

        return Inertia::render('Pegawai/EditLayanan', [
            'layanan' => $layanan,
        ]);
    }

    public function update(Request $request, $id_layanan)
    {
        $validated = $request->validate([
            'layanan' => [
                'required',
                'string',
                'max:255',
                Rule::unique('layanan', 'layanan')->ignore($id_layanan, 'id_layanan'),
            ],
        ]);

        $layanan = Layanan::findOrFail($id_layanan);
        $layanan->update($validated);

        return redirect()->route('layanan.list')->with('success', 'Layanan berhasil diperbarui.');
    }
}
