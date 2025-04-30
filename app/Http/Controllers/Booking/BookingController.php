<?php

namespace App\Http\Controllers\Booking;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class BookingController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Instansi/BookingIns');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'jadwal' => 'required|date',
            'acara' => 'required|string|max:255',
            'peserta' => 'required|integer',
            'layanan' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'no_hp' => 'required|string|min:12|max:13',
            'surat' => 'required|file|mimes:pdf|max:200',
        ]);

        $suratPath = $request->file('surat')->store('surat', 'public');

        $booking = Booking::create([
            'jadwal' => $request->jadwal,
            'acara' => $request->acara,
            'peserta' => $request->peserta,
            'layanan' => $request->layanan,
            'lokasi' => $request->lokasi,
            'no_hp' => $request->no_hp,
            'surat' => $suratPath,
            'status_booking' => 'Diajukan',
            'id_instansi' => Auth::user()->id,
        ]);

        return redirect()->route('booking.create')->with('success', 'Booking berhasil disimpan!');
    }

    public function riwayat()
    {
        $booking = Booking::where('id_instansi', Auth::id())->get();

        return Inertia::render('Instansi/RiwayatBooking', [
            'booking' => $booking,
        ]);
    }

    public function show($id)
    {
        $booking = Booking::findOrFail($id);

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
