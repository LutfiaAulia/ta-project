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
        $layananList = Layanan::where('status', 'aktif')
            ->select('id_layanan as id', 'layanan as nama')
            ->get();

        $bookings = Booking::where('status_booking', 'Diterima')
            ->select('tanggal_mulai', 'tanggal_akhir')
            ->get();

        $bookedDates = [];

        foreach ($bookings as $booking) {
            $start = \Carbon\Carbon::parse($booking->tanggal_mulai);
            $end = \Carbon\Carbon::parse($booking->tanggal_akhir);

            for ($date = $start; $date->lte($end); $date->addDay()) {
                $bookedDates[] = $date->format('Y-m-d');
            }
        }

        $bookedDates = array_unique($bookedDates);

        return Inertia::render('Instansi/BookingIns', [
            'layananList' => $layananList,
            'selectedLayanan' => [],
            'bookedDates' => array_values($bookedDates),
            'today' => now()->format('Y-m-d'),
        ]);
    }


    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_mulai',
            'waktu_mulai' => 'required|date_format:H:i',
            'waktu_akhir' => 'required|date_format:H:i',
            'acara' => 'required|string|max:255',
            'peserta' => 'required|integer',
            'layanan' => 'required|array',
            'layanan.*' => 'exists:layanan,id_layanan',
            'kabupaten_kota' => 'required|string|max:255',
            'kecamatan' => 'required|string|max:255',
            'kenagarian_kelurahan' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'no_hp' => 'required|string|min:12|max:13',
            'surat' => 'required|file|mimes:pdf|max:200',
        ]);

        if ($request->tanggal_mulai === $request->tanggal_akhir) {
            if (strtotime($request->waktu_akhir) <= strtotime($request->waktu_mulai)) {
                return back()->withErrors(['waktu_akhir' => 'Waktu akhir harus lebih besar'])->withInput();
            }
        }

        $suratPath = $request->file('surat')->store('surat', 'public');

        $booking = Booking::create([
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_akhir' => $request->tanggal_akhir,
            'waktu_mulai' => $request->waktu_mulai,
            'waktu_akhir' => $request->waktu_akhir,
            'acara' => $request->acara,
            'peserta' => $request->peserta,
            'kabupaten_kota' => $request->kabupaten_kota,
            'kecamatan' => $request->kecamatan,
            'kenagarian_kelurahan' => $request->kenagarian_kelurahan,
            'lokasi' => $request->lokasi,
            'no_hp' => $request->no_hp,
            'surat' => $suratPath,
            'status_booking' => 'Diajukan',
            'id_instansi' => Auth::user()->instansi->id,
        ]);

        $booking->layanan()->attach(array_map('intval', $request->layanan));


        return redirect()->route('booking.create')->with('success', 'Booking berhasil disimpan!');
    }

    public function verifikasi(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'pegawailap' => 'required|array',
            'pegawailap.*' => 'exists:pegawai,id',
            'id_mobil' => 'required|exists:mobil,id_mobil',
            'id_sopir' => 'required|exists:sopir,id_sopir',
        ]);

        $booking = Booking::findOrFail($id);

        $booking->update([
            'status_booking' => 'Diterima',
            'id_mobil' => $request->id_mobil,
            'id_sopir' => $request->id_sopir,
        ]);

        $booking->pegawaiLapangan()->attach(array_map('intval', $request->pegawailap));

        return redirect()->route('booking.listBooking')->with('success', 'Booking berhasil diverifikasi.');
    }

    public function tolak(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'alasan_ditolak' => 'required|string|max:255',
        ]);

        $booking = Booking::findOrFail($id);

        $booking->update([
            'status_booking' => 'Ditolak',
            'alasan_ditolak' => $request->alasan_ditolak,
        ]);

        return redirect()->route('booking.listBooking')->with('success', 'Booking berhasil ditolak.');
    }
}
