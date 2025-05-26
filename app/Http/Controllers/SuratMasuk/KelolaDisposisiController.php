<?php

namespace App\Http\Controllers\SuratMasuk;

use App\Http\Controllers\Controller;
use App\Models\Disposisi;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KelolaDisposisiController extends Controller
{
    public function show()
    {
        $disposisi = Disposisi::with(['pegawai.user', 'surat_masuk'])->get();

        return Inertia::render('Pegawai/Disposisi/ListDisposisi', [
            'disposisi' => $disposisi->map(fn($item) => [
                'id_disposisi' => $item->id,
                'isi' => $item->isi,
                'tanggal' => $item->tanggal,
                'tujuan' => $item->tujuan,
                'catatan' => $item->catatan,
                'user' => [
                    'nama' => $item->pegawai->user->nama ?? 'Tidak diketahui',
                ],
                'surat' => [
                    'no_surat' => $item->surat_masuk->no_surat ?? '-',
                ],
            ]),
        ]);
    }

    public function create($id)
    {
        $surat = SuratMasuk::with('booking.instansi')->findOrFail($id);

        return Inertia::render('Pegawai/Disposisi/TambahDisposisi', [
            'surat' => [
                'id_surat' => $surat->id_surat,
                'no_surat' => $surat->no_surat,
                'asal_surat' => $surat->booking && $surat->booking->instansi
                    ? $surat->booking->instansi->nama_instansi
                    : '-',
                'perihal' => $surat->perihal,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'isi' => 'required|string',
            'tanggal' => 'required|date',
            'tujuan' => 'required|string',
            'catatan' => 'required|string',
            'id_surat' => 'required|exists:surat_masuk,id_surat',
        ]);

        Disposisi::create([
            'isi' => $request->isi,
            'tanggal' => $request->tanggal,
            'tujuan' => $request->tujuan,
            'catatan' => $request->catatan,
            'id_surat' => $request->id_surat,
            'id_pegawai' => Auth::user()->pegawai->id ?? Auth::id(),
        ]);

        return redirect()->route('disposisi.list')->with('susccess', 'Disposisi berhasil di tambahkan');
    }
}
