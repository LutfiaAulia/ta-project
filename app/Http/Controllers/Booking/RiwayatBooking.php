<?php

namespace App\Http\Controllers\Booking;


use App\Http\Controllers\Controller;
use App\Models\Booking;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class RiwayatBooking extends Controller
{
    public function riwayat()
    {
        $booking = Booking::where('user_id', Auth::id())->get();

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
}
