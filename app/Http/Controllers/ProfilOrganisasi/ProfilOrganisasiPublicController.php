<?php

namespace App\Http\Controllers\ProfilOrganisasi;

use App\Http\Controllers\Controller;
use App\Models\ProfilOrganisasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilOrganisasiPublicController extends Controller
{
    public function struktur()
    {
        $profil = ProfilOrganisasi::select('gambar_struktur', 'maklumat_pelayanan')->first();

        return Inertia::render('StrukturOrganisasi', [
            'profilOrganisasi' => $profil
        ]);
    }

    public function visi_misi()
    {
        $vimi = ProfilOrganisasi::select('visi', 'misi')->first();

        return Inertia::render('VisiMisi', [
            'vimi' => $vimi
        ]);
    }

    public function tugas_fungsi()
    {
        $tufu = ProfilOrganisasi::select('tugas', 'fungsi')->first();

        return Inertia::render('TugasFungsi', [
            'tufu' => $tufu
        ]);
    }
}
