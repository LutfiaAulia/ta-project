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
}
