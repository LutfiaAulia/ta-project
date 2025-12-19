<?php

namespace App\Http\Controllers\ProfilOrganisasi;

use App\Http\Controllers\Controller;
use App\Models\ProfilOrganisasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KelolaProfilOrganisasiController extends Controller
{
    public function show()
    {
        $profilOrganisasi = ProfilOrganisasi::first();

        return Inertia::render('Pegawai/ProfilOrganisasi/ProfilOrganisasi', [
            'profilOrganisasi' => $profilOrganisasi,
        ]);
    }

    public function update(Request $request)
    {
        $profil = ProfilOrganisasi::first();

        $validated = $request->validate([
            'visi' => 'required|string',
            'misi' => 'required|string',
            'tugas' => 'required|string',
            'fungsi' => 'required|string',
            'maklumat_pelayanan' => 'required|string',
            'gambar_struktur' => 'nullable|image|max:2048',
        ]);

        $validated['id_pegawai'] = Auth::id();

        if ($request->hasFile('gambar_struktur')) {
            if ($profil && $profil->gambar_struktur) {
                Storage::disk('public')->delete($profil->gambar_struktur);
            }

            $validated['gambar_struktur'] = $request->file('gambar_struktur')->store('profil', 'public');
        }
        
        ProfilOrganisasi::updateOrCreate(
            ['id_proforg' => $profil?->id_proforg ?? 1],
            $validated
        );

        return redirect()->back()->with('success', 'Profil organisasi berhasil diperbarui!');
    }
}
