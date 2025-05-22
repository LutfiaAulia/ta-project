<?php

namespace App\Http\Controllers\Booking;


use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Pegawai;
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

    public function listAllBooking()
    {
        $booking = Booking::with(['instansi.user:id,nama', 'layanan:id_layanan,layanan as nama_layanan'])
            ->latest()
            ->get();

        return Inertia::render('Pegawai/ListBooking', [
            'booking' => $booking,
        ]);
    }

    public function showBook($id)
    {
        $booking = Booking::with([
            'layanan:id_layanan,layanan as nama_layanan',
            'instansi',
            'pegawaiLapangan.user:id,nama,status'
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

        return Inertia::render('Pegawai/DetailBooking', [
            'booking' => array_merge($booking->toArray(), [
                'pegawailap' => $pegawaiTerpilih,
            ]),
            'pegawaiLapangan' => $pegawaiLapangan,
        ]);
    }
}
