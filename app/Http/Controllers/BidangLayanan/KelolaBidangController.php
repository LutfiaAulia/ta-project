<?php

namespace App\Http\Controllers\BidangLayanan;

use App\Http\Controllers\Controller;
use App\Models\BidangLayanan;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class KelolaBidangController extends Controller
{
    public function show()
    {
        $bidang = BidangLayanan::all();

        return Inertia::render('Pegawai/BidangLayanan/ListBidang', [
            'bidang' => $bidang,
        ]);
    }

    public function create()
    {
        return Inertia::render('Pegawai/BidangLayanan/TambahBidang');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_bidang' => 'required|string|max:255|unique:bidang_layanan,nama_bidang',
        ]);

        $validated['status'] = 'aktif';

        BidangLayanan::create($validated);

        return redirect()->route('bidang.list')->with('success', 'Bidang layanan berhasil ditambahkan.');
    }

    public function edit($id_bidang)
    {
        $bidang = BidangLayanan::findOrFail($id_bidang);

        return Inertia::render('Pegawai/BidangLayanan/EditBidang', [
            'bidang' => $bidang,
        ]);
    }

    public function update(Request $request, $id_bidang)
    {
        $validated = $request->validate([
            'nama_bidang' => ['required', 'string', 'max:255', Rule::unique('bidang_layanan', 'nama_bidang')->ignore($id_bidang, 'id_bidang'),]
        ]);

        $bidang = BidangLayanan::findOrFail($id_bidang);
        $bidang->update($validated);

        return redirect()->route('bidang.list')->with('success', 'Bidang layanan berhasil diperbarui.');
    }

    public function updateStatus(Request $request, $id_bidang){
        $request->validate([
            'status' => ['required', Rule::in(['aktif', 'nonaktif'])],
        ]);

        $bidang = BidangLayanan::findOrFail($id_bidang);
        $bidang->status = $request->status;
        $bidang->save();

        return redirect()->back()->with('success', 'Status bidang layanan berhasil diperbaharui');
    }
}
