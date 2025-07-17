<?php

namespace App\Http\Controllers\PelayananUmkm;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Layanan;
use App\Models\LegalitasProduk;
use App\Models\PelayananUmkm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KelolaPelayananUmkmController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $role = $user->pegawai->role ?? null;
        $pegawaiId = $user->pegawai->id ?? null;

        if ($role === 'Admin') {
            $booking = Booking::withCount('pelayananUmkm')
                ->whereIn('status_booking', ['Diterima', 'Selesai'])
                ->orderByDesc('tanggal_mulai')
                ->get();
        } else {
            $booking = Booking::withCount('pelayananUmkm')
                ->whereIn('status_booking', ['Diterima', 'Selesai'])
                ->whereHas('pegawaiLapangan', function ($query) use ($pegawaiId) {
                    $query->where('id', $pegawaiId);
                })
                ->orderByDesc('tanggal_mulai')
                ->get();
        }

        $result = $booking->map(function ($booking) {
            return [
                'id_booking' => $booking->id_booking,
                'tanggal_mulai' => $booking->tanggal_mulai,
                'tanggal_akhir' => $booking->tanggal_akhir,
                'waktu_mulai' => $booking->waktu_mulai,
                'waktu_akhir' => $booking->waktu_akhir,
                'acara' => $booking->acara,
                'jumlah_umkm' => $booking->peserta,
                'jumlah_umkm_terdaftar' => $booking->pelayanan_umkm_count,
            ];
        });

        return Inertia::render('Pegawai/PelayananUmkm/ListBookingTerlaksana', [
            'booking' => $result,
        ]);
    }


    public function showUmkm($id_booking)
    {
        $booking = Booking::findOrFail($id_booking);

        $umkm = PelayananUmkm::with('layanan')
            ->where('id_booking', $id_booking)
            ->get()
            ->map(function ($item) {
                return [
                    'id_pelayanan' => $item->id_pelayanan,
                    'id_booking' => $item->id_booking,
                    'nama_lengkap' => $item->nama_lengkap,
                    'nik' => $item->nik,
                    'nama_usaha' => $item->nama_usaha,
                    'layanan' => $item->layanan?->layanan ?? '-',
                ];
            });

        return Inertia::render('Pegawai/PelayananUmkm/ListUmkm', [
            'umkm' => $umkm,
            'id_booking' => $id_booking,
            'tanggal_mulai' => $booking->tanggal_mulai->format('Y-m-d'),
            'tanggal_akhir' => $booking->tanggal_akhir->format('Y-m-d'),
        ]);
    }

    public function create($id_booking)
    {
        $layanan = Layanan::where('status', 'aktif')->get();
        $legpro = LegalitasProduk::where('status', 'aktif')->get();

        return Inertia::render('Pegawai/PelayananUmkm/TambahUmkmPeg', [
            'id_booking' => $id_booking,
            'layanan' => $layanan,
            'legpro' => $legpro,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'jenis_kelamin' => 'required|string|max:255',
            'umur' => 'required|string|max:5',
            'nik' => 'required|string|max:20',
            'pendidikan' => 'required|string|max:255',
            'no_hp' => 'nullable|string|max:20',
            'nama_usaha' => 'required|string|max:255',
            'legalitas_usaha' => 'required|string|max:100',
            'legalitas_produk' => 'required|array',
            'legalitas_produk.*' => 'exists:legalitas_produk,id_legpro',
            'alamat_usaha' => 'required|string|max:255',
            'kabupaten_kota' => 'required|string|max:100',
            'kecamatan' => 'required|string|max:100',
            'kenagarian_kelurahan' => 'required|string|max:100',
            'tenaga_kerja' => 'required|integer',
            'aset' => 'required|integer',
            'omset' => 'required|integer',
            'pendapatan_bersih' => 'required|integer',
            'pelatihan' => 'nullable|string|max:255',
            'tindak_lanjut' => 'nullable|string',

            'id_booking' => 'required|exists:booking,id_booking',
            'id_layanan' => 'required|exists:layanan,id_layanan',
        ]);

        $umkm = PelayananUmkm::create($request->except('legalitas_produk'));
        $umkm->legalitas_produk()->sync($request->legalitas_produk);

        return redirect()->route('umkmlayan.list', ['id' => $request->id_booking])->with('success', 'Data UMKM berhasil disimpan.');
    }

    public function edit($id_pelayanan)
    {
        $umkm = PelayananUmkm::with('legalitasProduk')->findOrFail($id_pelayanan);

        $layanan = Layanan::select('id_layanan', 'layanan')->where('status', 'aktif')->get();
        $legpro = LegalitasProduk::select('id_legpro', 'singkatan')->where('status', 'aktif')->get();

        $legalitasIds = $umkm->legalitasProduk->pluck('id_legpro')->map(fn($id) => (string)$id)->toArray();

        $umkmData = $umkm->toArray();
        $umkmData['legalitas_produk'] = $legalitasIds;

        return Inertia::render('Pegawai/PelayananUmkm/EditUmkm', [
            'umkm' => $umkmData,
            'layanan' => $layanan,
            'legalitas_produk' => $legpro,
        ]);
    }


    public function update(Request $request, $id_pelayanan)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'jenis_kelamin' => 'required|string|max:255',
            'umur' => 'required|string|max:5',
            'nik' => 'required|string|max:20',
            'pendidikan' => 'required|string|max:255',
            'no_hp' => 'nullable|string|max:20',
            'nama_usaha' => 'required|string|max:255',
            'legalitas_usaha' => 'required|string|max:100',
            'legalitas_produk' => 'required|array',
            'legalitas_produk.*' => 'exists:legalitas_produk,id_legpro',
            'alamat_usaha' => 'required|string|max:255',
            'kabupaten_kota' => 'required|string|max:100',
            'kecamatan' => 'required|string|max:100',
            'kenagarian_kelurahan' => 'required|string|max:100',
            'tenaga_kerja' => 'required|integer',
            'aset' => 'required|integer',
            'omset' => 'required|integer',
            'pendapatan_bersih' => 'required|integer',
            'pelatihan' => 'nullable|string|max:255',
            'tindak_lanjut' => 'nullable|string',
            'id_layanan' => 'required|exists:layanan,id_layanan',
        ]);

        $umkm = PelayananUmkm::findOrFail($id_pelayanan);
        $umkm->update($request->except('legalitas_produk'));

        $umkm->legalitasProduk()->sync($request->legalitas_produk);

        return redirect()->route('umkmlayan.list', ['id' => $umkm->id_booking])
            ->with('success', 'Data UMKM berhasil diperbarui.');
    }

    public function destroy($id_pelayanan)
    {
        $umkm = PelayananUmkm::findOrFail($id_pelayanan);
        $id_booking = $umkm->id_booking;
        $umkm->delete();

        return redirect()->route('umkmlayan.list', ['id' => $id_booking])
            ->with('success', 'Data UMKM berhasil dihapus.');
    }
}
