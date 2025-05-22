<?php

namespace App\Http\Controllers\MobilSopir;

use App\Http\Controllers\Controller;
use App\Models\Sopir;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class KelolaSopirController extends Controller
{
    public function show()
    {
        $sopir = Sopir::all();

        return Inertia::render('Pegawai/ListSopir', [
            'sopir' => $sopir,
        ]);
    }

    public function create()
    {
        return Inertia::render('Pegawai/TambahSopir');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'no_hp' => 'required|string|min:12|max:13',
            'alamat' => 'required|string|max:255',
        ]);

        Sopir::create($validated);

        return redirect()->route('sopir.list')->with('success', 'Sopir berhasil ditambahkan');
    }

    public function edit($id_sopir)
    {
        $sopir = Sopir::findOrFail($id_sopir);

        return Inertia::render('Pegawai/EditSopir', [
            'sopir' => $sopir,
        ]);
    }

    public function update(Request $request, $id_sopir)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'no_hp' => 'required|string|min:12|max:13',
            'alamat' => 'required|string|max:255',
        ]);

        $sopir = Sopir::findOrFail($id_sopir);
        $sopir->update($validated);

        return redirect()->route('sopir.list')->with('success', 'Data sopir berhasil diperbaharui');
    }

    public function updateStatus(Request $request, $id_sopir)
    {
        $request->validate([
            'status' => ['required', Rule::in(['aktif', 'nonaktif', 'cuti'])],
        ]);

        $mobil = Sopir::findOrFail($id_sopir);
        $mobil->status = $request->status;
        $mobil->save();

        return redirect()->back()->with('success', 'Status sopir berhasil diperbaharui');
    }
}
