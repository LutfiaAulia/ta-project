<?php

namespace App\Http\Controllers\Layanan;

use App\Http\Controllers\Controller;
use App\Models\BidangLayanan;
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
        $bidang = BidangLayanan::where('status', 'aktif')->get();

        return Inertia::render('Pegawai/Layanan/TambahLayanan', [
            'bidang' => $bidang,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_bidang' => 'required|exists:bidang_layanan,id_bidang',
            'layanan' => 'required|string|max:255|unique:layanan,layanan',
            'deskripsi_layanan' => 'required|string',
        ]);

        $validated['status'] = 'aktif';

        Layanan::create($validated);

        return redirect()->route('layanan.list')->with('success', 'Layanan berhasil ditambahkan.');
    }

    public function edit($id_layanan)
    {
        $layanan = Layanan::findOrFail($id_layanan);
        $bidang = BidangLayanan::all();

        return Inertia::render('Pegawai/Layanan/EditLayanan', [
            'layanan' => $layanan,
            'bidang' => $bidang,
        ]);
    }

    public function update(Request $request, $id_layanan)
    {
        $validated = $request->validate([
            'id_bidang' => 'required|exists:bidang_layanan,id_bidang',
            'layanan' => [
                'required',
                'string',
                'max:255',
                Rule::unique('layanan', 'layanan')->ignore($id_layanan, 'id_layanan'),
            ],
            'deskripsi_layanan' => 'required|string',
        ]);

        $layanan = Layanan::findOrFail($id_layanan);
        $layanan->update($validated);

        return redirect()->route('layanan.list')->with('success', 'Layanan berhasil diperbarui.');
    }

    public function updateStatus(Request $request, $id_layanan)
    {
        $request->validate([
            'status' => ['required', Rule::in(['aktif', 'nonaktif'])],
        ]);

        $layanan = Layanan::findOrFail($id_layanan);
        $layanan->status = $request->status;
        $layanan->save();

        return redirect()->back()->with('success', 'Status layanan berhasil diperbaharui');
    }
}
