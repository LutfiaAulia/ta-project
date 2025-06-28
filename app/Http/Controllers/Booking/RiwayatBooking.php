<?php

namespace App\Http\Controllers\Booking;


use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Mobil;
use App\Models\Pegawai;
use App\Models\Sopir;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class RiwayatBooking extends Controller
{
    public function riwayat()
    {
        $instansi = Auth::user()->instansi;

        if (!$instansi) {
            abort(403, 'Akun ini bukan instansi atau belum memiliki data instansi.');
        }

        $booking = Booking::where('id_instansi', $instansi->id)->get();

        return Inertia::render('Instansi/RiwayatBooking', [
            'booking' => $booking,
        ]);
    }

    public function show($id)
    {
        $booking = Booking::with(['layanan:id_layanan,layanan as nama_layanan'])->findOrFail($id);

        return Inertia::render('Instansi/DetailBookingIns', [
            'booking' => $booking
        ]);
    }

    public function showSurat($filename)
    {
        $filePath = storage_path("app/public/surat/{$filename}");

        if (file_exists($filePath)) {
            return response()->file($filePath);
        }

        abort(404, 'Surat tidak ditemukan');
    }

    //Pegawai
    public function listAllBooking()
    {
        $user = Auth::user();
        $pegawai = $user->pegawai;
        $role = $pegawai->role ?? null;

        $query = Booking::with([
            'instansi.user:id,nama',
            'layanan:id_layanan,layanan as nama_layanan'
        ])->latest();

        if ($role === "Pegawai Lapangan") {
            $query->whereIn('status_booking', ['Diterima', 'Selesai'])
                ->whereHas('pegawailapangan', function ($q) use ($pegawai) {
                    $q->where('pegawai.id', $pegawai->id);
                });
        }

        $booking = $query->get();

        return Inertia::render('Pegawai/Booking/ListBooking', [
            'booking' => $booking,
            'auth' => [
                'role' => $role,
                'user' => $user,
            ],
        ]);
    }



    public function showBook($id)
    {
        $booking = Booking::with([
            'layanan:id_layanan,layanan as nama_layanan',
            'instansi',
            'pegawaiLapangan.user:id,nama,status',
            'mobil:id_mobil,nama_mobil,plat_mobil',
            'sopir:id_sopir,nama',
        ])->findOrFail($id);

        $pegawaiLapangan = Pegawai::where('role', 'pegawai lapangan')
            ->whereHas('user', function ($query) {
                $query->where('status', 'aktif');
            })
            ->with('user')
            ->get()
            ->map(function ($pegawai) {
                return [
                    'id' => $pegawai->id,
                    'nama' => $pegawai->user->nama,
                    'status' => $pegawai->user->status,
                ];
            });

        $pegawaiTerpilih = $booking->pegawaiLapangan->map(function ($pegawai) {
            return [
                'id' => $pegawai->id,
                'nama' => $pegawai->user->nama,
                'status' => $pegawai->user->status,
            ];
        });

        $mobil = Mobil::where('status', 'aktif')
            ->get(['id_mobil', 'nama_mobil', 'plat_mobil'])
            ->map(function ($mobil) {
                return [
                    'id' => $mobil->id_mobil,
                    'nama' => $mobil->nama_mobil . ' - ' . $mobil->plat_mobil,
                ];
            });

        $sopir = Sopir::where('status', 'aktif')
            ->get(['id_sopir', 'nama'])
            ->map(function ($sopir) {
                return [
                    'id' => $sopir->id_sopir,
                    'nama' => $sopir->nama,
                ];
            });

        return Inertia::render('Pegawai/Booking/DetailBooking', [
            'booking' => array_merge($booking->toArray(), [
                'pegawailap' => $pegawaiTerpilih,
                'mobil' => $booking->mobil ? [
                    'id' => $booking->mobil->id_mobil,
                    'nama' => $booking->mobil->nama_mobil . ' - ' . $booking->mobil->plat_mobil,
                ] : null,
                'sopir' => $booking->sopir ? [
                    'id' => $booking->sopir->id_sopir,
                    'nama' => $booking->sopir->nama,
                ] : null,
            ]),
            'pegawaiLapangan' => $pegawaiLapangan,
            'mobil' => $mobil,
            'sopir' => $sopir,
        ]);
    }
}
