<?php

namespace App\Http\Controllers\Monitoring;

use App\Http\Controllers\Controller;
use App\Models\KeuanganUmkm;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KelolaKeuanganUmkmController extends Controller
{
    public function indexRiwayatAdmin()
    {
        $riwayat = KeuanganUmkm::with(['umkm.identitas'])
            ->orderBy('tahun', 'desc')
            ->get()
            ->groupBy(function ($item) {
                return $item->umkm->identitas->nama_usaha ?? 'UMKM Tidak Terdaftar';
            });

        return Inertia::render('Pegawai/MonitoringUmkm/RiwayatKeuangan', [
            'riwayat_kelompok' => $riwayat
        ]);
    }

    public function index()
    {
        $userId = Auth::id();

        $umkm = Umkm::where('user_id', $userId)
            ->with('riwayatKeuangan')
            ->firstOrFail();

        return Inertia::render('Umkm/RiwayatKeuangan', [
            'umkm' => $umkm,
            'riwayat' => $umkm->riwayatKeuangan,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tahun' => 'required|numeric|max:' . date('Y'),
            'aset' => 'required|numeric|min:0',
            'omset' => 'required|numeric|min:0',
            'jumlah_karyawan' => 'required|numeric|min:0',
        ]);

        $umkm = Umkm::where('user_id', Auth::id())->firstOrFail();

        KeuanganUmkm::updateOrCreate(
            [
                'umkm_id' => $umkm->id,
                'tahun' => $request->tahun,
            ],
            [
                'aset' => $request->aset,
                'omset' => $request->omset,
                'jumlah_karyawan' => $request->jumlah_karyawan,
            ]
        );

        return redirect()->back()->with('message', 'Data keuangan berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $keuangan = KeuanganUmkm::findOrFail($id);
        $umkm = Umkm::where('user_id', Auth::id())->firstOrFail();

        if ($keuangan->umkm_id != $umkm->id) {
            abort(403, 'Anda tidak berhak menghapus data ini.');
        }

        $keuangan->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus.');
    }
}
