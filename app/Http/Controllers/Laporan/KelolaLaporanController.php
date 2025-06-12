<?php

namespace App\Http\Controllers\Laporan;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Dokumentasi;
use Illuminate\Http\Request;
use App\Models\Laporan;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class KelolaLaporanController extends Controller
{
    public function show()
    {
        $laporan = Laporan::with('booking')
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'id_laporan'   => $item->id_laporan,
                    'jadwal'       => optional($item->booking)->jadwal,
                    'judul'        => $item->judul,
                    'lokasi'       => optional($item->booking)->lokasi,
                    'nama_penulis' => $item->nama_penulis,
                ];
            });

        return Inertia::render('Pegawai/Laporan/ListLaporan', [
            'laporan' => $laporan,
        ]);
    }

    public function create()
    {
        $bookingLaporan = Laporan::pluck('id_booking')->unique();
        $booking = Booking::with('instansi:id,nama_instansi')
            ->where('status_booking', 'Diterima')
            ->whereNotIn('id_booking', $bookingLaporan)
            ->select('id_booking', 'id_instansi', 'tanggal_mulai', 'tanggal_akhir')
            ->orderByDesc('tanggal_mulai')
            ->get()
            ->map(function ($booking) {
                return [
                    'id_booking'     => $booking->id_booking,
                    'nama_instansi'  => $booking->instansi->nama_instansi ?? '-',
                    'tanggal_mulai'  => $booking->tanggal_mulai->format('d-m-Y'),
                    'tanggal_akhir'  => $booking->tanggal_akhir->format('d-m-Y'),
                ];
            });

        return Inertia::render('Pegawai/Laporan/TambahLaporan', [
            'booking' => $booking,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_booking' => 'required|exists:booking,id_booking',
            'judul' => 'required|string|max:255',
            'dasar' => 'required|string',
            'maksud' => 'required|string',
            'tujuan' => 'required|string',
            'biaya' => 'required|string',
            'ringkasan_pelaksana' => 'required|string',
            'kesimpulan' => 'required|string',
            'saran' => 'required|string',
            'nama_penulis' => 'required|string|max:100',
            'foto_dokumentasi' => 'required|array',
            'foto_dokumentasi.*' => 'image|max:2048',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $laporan = Laporan::create([
            'id_booking' => $request->id_booking,
            'judul' => $request->judul,
            'dasar' => $request->dasar,
            'maksud' => $request->maksud,
            'tujuan' => $request->tujuan,
            'biaya' => $request->biaya,
            'ringkasan_pelaksana' => $request->ringkasan_pelaksana,
            'kesimpulan' => $request->kesimpulan,
            'saran' => $request->saran,
            'nama_penulis' => $request->nama_penulis,
            'id_pegawai' => Auth::user()->pegawai->id ?? Auth::id(),
        ]);

        if ($request->hasFile('foto_dokumentasi')) {
            foreach ($request->file('foto_dokumentasi') as $file) {
                $path = $file->store('laporan/foto', 'public');

                Dokumentasi::create([
                    'id_laporan' => $laporan->id_laporan,
                    'nama_file' => $file->getClientOriginalName(),
                    'path_file' => $path,
                ]);
            }
        }

        return redirect()->route('laporan.list')->with('success', 'Laporan berhasil disimpan.');
    }
}
