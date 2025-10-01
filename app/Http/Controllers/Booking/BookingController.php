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
use Carbon\Carbon;

class BookingController extends Controller
{
    public function create(): Response
    {
        $layananList = Layanan::where('status', 'aktif')
            ->select('id_layanan as id', 'layanan as nama')
            ->get();

        $bookings = Booking::select('tanggal_mulai', 'tanggal_akhir', 'status_booking')
            ->whereIn('status_booking', ['Diajukan', 'Diterima'])
            ->get();

        $bookedDates = [];

        foreach ($bookings as $booking) {
            $start = \Carbon\Carbon::parse($booking->tanggal_mulai);
            $end = \Carbon\Carbon::parse($booking->tanggal_akhir);

            for ($date = $start; $date->lte($end); $date->addDay()) {
                $bookedDates[] = [
                    'tanggal' => $date->format('Y-m-d'),
                    'status' => strtolower($booking->status_booking),
                ];
            }
        }

        $bookedDates = array_values($bookedDates);

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

    public function showReschedule($id)
    {
        $booking = Booking::findOrFail($id);

        $bookings = Booking::select('tanggal_mulai', 'tanggal_akhir', 'status_booking')
            ->whereIn('status_booking', ['Diajukan', 'Diterima'])
            ->get();

        $bookedDates = [];
        foreach ($bookings as $b) {
            $start = \Carbon\Carbon::parse($b->tanggal_mulai);
            $end = \Carbon\Carbon::parse($b->tanggal_akhir);

            for ($date = $start; $date->lte($end); $date->addDay()) {
                $bookedDates[] = [
                    'tanggal' => $date->format('Y-m-d'),
                    'status' => strtolower($b->status_booking),
                ];
            }
        }

        return Inertia::render('Instansi/ReschBooking', [
            'booking' => $booking,
            'bookedDates' => $bookedDates,
        ]);
    }

    public function reschedule(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_mulai',
            'waktu_mulai' => 'required|date_format:H:i',
            'waktu_akhir' => 'required|date_format:H:i',
        ]);

        if ($request->tanggal_mulai === $request->tanggal_akhir) {
            if (strtotime($request->waktu_akhir) <= strtotime($request->waktu_mulai)) {
                return back()->withErrors(['waktu_akhir' => 'Waktu akhir harus lebih besar'])->withInput();
            }
        }

        $booking = Booking::findOrFail($id);

        $booking->update([
            'tanggal_mulai'  => $request->tanggal_mulai,
            'tanggal_akhir'  => $request->tanggal_akhir,
            'waktu_mulai'    => $request->waktu_mulai,
            'waktu_akhir'    => $request->waktu_akhir,
            'status_booking' => 'Diajukan',
            'id_mobil'       => null,
            'id_sopir'       => null,
        ]);

        $booking->pegawaiLapangan()->detach();

        return redirect()->route('booking.riwayat')->with(
            'success',
            'Booking berhasil direschedule, status kembali menjadi Diajukan.'
        );
    }


    public function pdfBookingByStatus(Request $request): Response
    {
        $status = $request->query('status');

        $bookings = Booking::with(['instansi', 'pegawaiLapangan'])
            ->when($status, function ($query) use ($status) {
                $query->where('status_booking', $status);
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($b) {
                return [
                    'id_booking'       => $b->id_booking,
                    'nama_instansi'    => $b->instansi?->nama_instansi ?? '-',
                    'acara'            => $b->acara ?? '-',
                    'tanggal_mulai'    => $b->tanggal_mulai
                        ? Carbon::parse($b->tanggal_mulai)->format('d-m-Y')
                        : '-',
                    'tanggal_akhir'    => $b->tanggal_akhir
                        ? Carbon::parse($b->tanggal_akhir)->format('d-m-Y')
                        : '-',
                    'waktu_mulai'      => $b->waktu_mulai
                        ? Carbon::parse($b->waktu_mulai)->format('H:i')
                        : '-',
                    'waktu_akhir'      => $b->waktu_akhir
                        ? Carbon::parse($b->waktu_akhir)->format('H:i')
                        : '-',
                    'lokasi'           => $b->lokasi,
                    'status_booking'   => $b->status_booking,
                    'pegawai_lapangan' => $b->pegawaiLapangan
                        ? $b->pegawaiLapangan->map(fn($p) => $p->user->nama)->toArray()
                        : [],

                    'mobil'            => $b->mobil?->nama_mobil ?? '-',
                    'sopir'            => $b->sopir?->nama ?? '-',
                ];
            });

        return Inertia::render('Pegawai/Booking/PdfBooking', [
            'bookings' => $bookings,
            'status'   => $status,
        ]);
    }
}
