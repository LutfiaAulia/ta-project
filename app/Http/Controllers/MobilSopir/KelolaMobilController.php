<?php

namespace App\Http\Controllers\MobilSopir;

use App\Http\Controllers\Controller;
use App\Models\Mobil;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class KelolaMobilController extends Controller
{
    public function show()
    {
        $mobil = Mobil::all();

        return Inertia::render('Pegawai/Mobil/ListMobil', [
            'mobil' => $mobil,
        ]);
    }

    public function create()
    {
        return Inertia::render('Pegawai/Mobil/TambahMobil');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_mobil' => 'required|string|max:255',
            'plat_mobil' => 'required|string|max:10',

        ]);

        Mobil::create($validated);

        return redirect()->route('mobil.list')->with('success', 'Mobil berhasil ditambahkan');
    }

    public function edit($id_mobil)
    {
        $mobil = Mobil::findOrFail($id_mobil);

        return Inertia::render('Pegawai/Mobil/EditMobil', [
            'mobil' => $mobil,
        ]);
    }

    public function update(Request $request, $id_mobil)
    {
        $validated = $request->validate([
            'nama_mobil' => 'required|string|max:255',
            'plat_mobil' => 'required|string|max:10',
        ]);

        $mobil = Mobil::findOrFail($id_mobil);
        $mobil->update($validated);

        return redirect()->route('mobil.list')->with('success', 'Data mobil berhasil diperbarui');
    }

    public function updateStatus(Request $request, $id_mobil)
    {
        $request->validate([
            'status' => ['required', Rule::in(['aktif', 'nonaktif', 'service'])],
        ]);

        $mobil = Mobil::findOrFail($id_mobil);
        $mobil->status = $request->status;
        $mobil->save();

        return redirect()->back()->with('success', 'Status mobil berhasil diperbaharui');
    }
}
