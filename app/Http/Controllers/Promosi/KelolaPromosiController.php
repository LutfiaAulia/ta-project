<?php

namespace App\Http\Controllers\Promosi;

use App\Http\Controllers\Controller;
use App\Models\Promosi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelolaPromosiController extends Controller
{
    public function show()
    {
        $promosi = Promosi::all();
        return Inertia::render('Umkm/ProdukUmkm', [
            'promosi' => $promosi,
        ]);
    }

    public function create()
    {
        return Inertia::render('Umkm/TambahProduk');
    }
}
