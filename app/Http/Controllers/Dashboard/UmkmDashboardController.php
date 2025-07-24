<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\IdentitasUmkm;
use App\Models\Promosi;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UmkmDashboardController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        $umkm = Umkm::where('user_id', $user->id)->first();

        $identitas = IdentitasUmkm::where('id_umkm', $umkm->id)->first();

        if (!$identitas) {
            return redirect('/umkm/data/umkm')->with('error', 'Identitas UMKM belum diisi.');
        }

        $produk = Promosi::where('id_umkm', $umkm->id)
            ->select('id_promosi as id', 'nama_produk', 'harga_produk', 'foto_produk')
            ->get();

        return Inertia::render('Umkm/DashboardUmkm', [
            'umkm' => $umkm ? [
                'nama_usaha' => $identitas->nama_usaha,
                'pemilik' => $user->nama,
                'nib' => $user->nib,
                'alamat' => $identitas->alamat_detail,
                'status' => $user->status,
            ] : null,
            'products' => $produk,
        ]);
    }
}
