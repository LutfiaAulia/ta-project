<?php

namespace App\Http\Controllers\Promosi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelolaDataUmkmController extends Controller
{
    public function show()
    {
        return Inertia::render('Umkm/IdentitasUmkm');
    }
}
