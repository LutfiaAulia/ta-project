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

        return Inertia::render('Pegawai/Layanan/ListLayanan', [
            'layanan' => $layanan,
        ]);
    }

    public function create()
    {
        return Inertia::render('Pegawai/Layanan/TambahLayanan');
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

        return Inertia::render('Pegawai/Layanan/EditLayanan', [
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

    public function updateStatus(Request $request, $id_layanan){
        $request->validate([
            'status' => ['required', Rule::in(['aktif', 'nonaktif'])],
        ]);

        $layanan = Layanan::findOrFail($id_layanan);
        $layanan->status = $request->status;
        $layanan->save();

        return redirect()->back()->with('success', 'Status layanan berhasil diperbaharui');
    }
}
