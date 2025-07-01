<?php

namespace App\Http\Controllers\PelayananUmkm;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\BookingPelayananUmkm;
use App\Models\Layanan;
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
            $booking = Booking::withCount('bookingPelayananUmkm')
                ->whereIn('status_booking', ['Diterima', 'Selesai'])
                ->orderByDesc('tanggal_mulai')
                ->get();
        } else {
            $booking = Booking::withCount('bookingPelayananUmkm')
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
                'jumlah_umkm_terdaftar' => $booking->booking_pelayanan_umkm_count,
            ];
        });

        return Inertia::render('Pegawai/PelayananUmkm/ListBookingTerlaksana', [
            'booking' => $result,
        ]);
    }


    public function showUmkm($id_booking)
    {
        $umkm = BookingPelayananUmkm::with(['pelayanan', 'layanan'])
            ->where('id_booking', $id_booking)
            ->get()
            ->map(function ($item) use ($id_booking) {
                return [
                    'id_bopel' => $item->id_bopel,
                    'id_booking' => $id_booking,
                    'nama_lengkap' => $item->pelayanan->nama_lengkap,
                    'nik' => $item->pelayanan->nik,
                    'nama_usaha' => $item->pelayanan->nama_usaha,
                    'nib' => $item->pelayanan->nib,
                    'layanan' => $item->layanan?->layanan ?? '-',
                ];
            });

        return Inertia::render('Pegawai/PelayananUmkm/ListUmkm', [
            'umkm' => $umkm,
            'id_booking' => $id_booking,
        ]);
    }

    public function create($id_booking)
    {
        $layanan = Layanan::where('status', 'aktif')->get();

        return Inertia::render('Pegawai/PelayananUmkm/TambahUmkmPeg', [
            'id_booking' => $id_booking,
            'layanan' => $layanan,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'jenis_kelamin' => 'required|string|max:255',
            'nik' => 'required|string|max:20',
            'alamat_lengkap' => 'nullable|string',
            'email' => 'nullable|email',
            'no_hp' => 'nullable|string|max:20',
            'nama_usaha' => 'required|string|max:255',
            'bentuk_usaha' => 'nullable|string|max:100',
            'sektor_usaha' => 'nullable|string|max:100',
            'legalitas_usaha' => 'nullable|string|max:100',
            'pembiayaan' => 'nullable|string|max:100',
            'nib' => 'required|string|max:50',
            'alamat_usaha' => 'nullable|string|max:255',
            'modal_usaha' => 'required|string|max:50',
            'total_aset' => 'required|string|max:50',
            'omset' => 'required|string|max:50',
            'pengeluaran' => 'required|string|max:50',
            'pendapat_bersih' => 'required|string|max:50',
            'pelatihan' => 'nullable|string|max:255',
            'permasalahan' => 'nullable|string',

            'id_booking' => 'required|exists:booking,id_booking',
            'id_layanan' => 'required|exists:layanan,id_layanan',
        ]);

        $pelayanan = PelayananUmkm::create([
            'nama_lengkap' => $request->nama_lengkap,
            'jenis_kelamin' => $request->jenis_kelamin,
            'nik' => $request->nik,
            'alamat_lengkap' => $request->alamat_lengkap,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'nama_usaha' => $request->nama_usaha,
            'bentuk_usaha' => $request->bentuk_usaha,
            'sektor_usaha' => $request->sektor_usaha,
            'legalitas_usaha' => $request->legalitas_usaha,
            'pembiayaan' => $request->pembiayaan,
            'nib' => $request->nib,
            'alamat_usaha' => $request->alamat_usaha,
            'modal_usaha' => $request->modal_usaha,
        ]);

        BookingPelayananUmkm::create([
            'id_booking' => $request->id_booking,
            'id_pelayanan' => $pelayanan->id_pelayanan,
            'id_layanan' => $request->id_layanan,
            'total_aset' => $request->total_aset,
            'omset' => $request->omset,
            'pengeluaran' => $request->pengeluaran,
            'pendapat_bersih' => $request->pendapat_bersih,
            'pelatihan' => $request->pelatihan,
            'permasalahan' => $request->permasalahan,
        ]);

        return redirect()->route('umkmlayan.list', ['id' => $request->id_booking])->with('success', 'Data UMKM berhasil disimpan.');
    }

    public function edit($id)
    {
        $booking = BookingPelayananUmkm::with('pelayanan')->findOrFail($id);
        $layanan = Layanan::select('id_layanan', 'layanan')->where('status', 'aktif')->get();

        return Inertia::render('Pegawai/PelayananUmkm/EditUmkm', [
            'umkm' => [
                'id_bopel' => $booking->id_bopel,
                'id_pelayanan' => $booking->id_pelayanan,

                'nama_lengkap' => $booking->pelayanan->nama_lengkap,
                'jenis_kelamin' => $booking->pelayanan->jenis_kelamin,
                'nik' => $booking->pelayanan->nik,
                'alamat_lengkap' => $booking->pelayanan->alamat_lengkap,
                'email' => $booking->pelayanan->email,
                'no_hp' => $booking->pelayanan->no_hp,
                'nama_usaha' => $booking->pelayanan->nama_usaha,
                'bentuk_usaha' => $booking->pelayanan->bentuk_usaha,
                'sektor_usaha' => $booking->pelayanan->sektor_usaha,
                'legalitas_usaha' => $booking->pelayanan->legalitas_usaha,
                'pembiayaan' => $booking->pelayanan->pembiayaan,
                'nib' => $booking->pelayanan->nib,
                'alamat_usaha' => $booking->pelayanan->alamat_usaha,
                'modal_usaha' => $booking->pelayanan->modal_usaha,

                'id_layanan' => $booking->id_layanan,
                'total_aset' => $booking->total_aset,
                'omset' => $booking->omset,
                'pengeluaran' => $booking->pengeluaran,
                'pendapat_bersih' => $booking->pendapat_bersih,
                'pelatihan' => $booking->pelatihan,
                'permasalahan' => $booking->permasalahan,
            ],
            'layanan' => $layanan,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'jenis_kelamin' => 'required|string|max:255',
            'nik' => 'required|string|max:50',
            'nama_usaha' => 'required|string|max:255',
            'nib' => 'required|string|max:100',

            'modal_usaha' => 'required',
            'total_aset' => 'required',
            'omset' => 'required',
            'pengeluaran' => 'required',
            'pendapat_bersih' => 'required',
            'id_layanan' => 'required|integer',
        ]);

        $booking = BookingPelayananUmkm::findOrFail($id);
        $umkm = PelayananUmkm::findOrFail($booking->id_pelayanan);

        $umkm->update([
            'nama_lengkap' => $request->nama_lengkap,
            'jenis_kelamin' => $request->jenis_kelamin,
            'nik' => $request->nik,
            'alamat_lengkap' => $request->alamat_lengkap,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'nama_usaha' => $request->nama_usaha,
            'bentuk_usaha' => $request->bentuk_usaha,
            'sektor_usaha' => $request->sektor_usaha,
            'legalitas_usaha' => $request->legalitas_usaha,
            'pembiayaan' => $request->pembiayaan,
            'nib' => $request->nib,
            'alamat_usaha' => $request->alamat_usaha,
            'modal_usaha' => $request->modal_usaha,
        ]);

        $booking->update([
            'id_layanan' => $request->id_layanan,
            'total_aset' => $request->total_aset,
            'omset' => $request->omset,
            'pengeluaran' => $request->pengeluaran,
            'pendapat_bersih' => $request->pendapat_bersih,
            'pelatihan' => $request->pelatihan,
            'permasalahan' => $request->permasalahan,
        ]);

        $id_booking = $booking->id_booking;

        return redirect()->route('umkmlayan.list', ['id' => $id_booking])
            ->with('success', 'Data UMKM berhasil diperbarui');
    }

    public function destroy($id)
    {
        $bookingPelayananUmkm = BookingPelayananUmkm::findOrFail($id);
        $id_booking = $bookingPelayananUmkm->id_booking;
        $bookingPelayananUmkm->delete();

        return redirect()->route('umkmlayan.list', ['id' => $id_booking])
            ->with('success', 'Data UMKM berhasil dihapus.');
    }
}
