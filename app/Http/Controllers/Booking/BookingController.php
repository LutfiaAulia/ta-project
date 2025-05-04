<?php

namespace App\Http\Controllers\Booking;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Layanan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class BookingController extends Controller
{
    public function create(): Response
    {
        $layananList = Layanan::select('id_layanan as id', 'layanan as nama')->get();

        $bookedDates = Booking::pluck('jadwal')->map(fn ($date) => $date->format('Y-m-d'));

        return Inertia::render('Instansi/BookingIns', [
            'layananList' => $layananList,
            'selectedLayanan' => [],
            'bookedDates' => $bookedDates,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'jadwal' => 'required|date',
            'acara' => 'required|string|max:255',
            'peserta' => 'required|integer',
            'layanan' => 'required|array',
            'layanan.*' => 'exists:layanan,id_layanan',
            'lokasi' => 'required|string|max:255',
            'no_hp' => 'required|string|min:12|max:13',
            'surat' => 'required|file|mimes:pdf|max:200',
        ]);

        $suratPath = $request->file('surat')->store('surat', 'public');

        $booking = Booking::create([
            'jadwal' => $request->jadwal,
            'acara' => $request->acara,
            'peserta' => $request->peserta,
            'lokasi' => $request->lokasi,
            'no_hp' => $request->no_hp,
            'surat' => $suratPath,
            'status_booking' => 'Diajukan',
            'id_instansi' => Auth::user()->id,
        ]);

        $booking->layanan()->attach(array_map('intval', $request->layanan));


        return redirect()->route('booking.create')->with('success', 'Booking berhasil disimpan!');
    }
}
