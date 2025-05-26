<?php

namespace App\Http\Controllers\SuratMasuk;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KelolaSuratController extends Controller
{
    public function show()
    {
        $suratMasuk = SuratMasuk::with('booking.instansi')->get();

        return Inertia::render('Pegawai/SuratMasuk/ListSuratMasuk', [
            'suratMasuk' => $suratMasuk,
        ]);
    }

    public function create(Request $request)
    {
        if ($request->has('id_booking')) {
            $id_booking = $request->id_booking;

            $booking = Booking::with('instansi')->findOrFail($id_booking);
            if (SuratMasuk::where('id_booking', $id_booking)->exists()) {
                return redirect()->route('surat.create')->with('error', 'Surat masuk sudah dibuat untuk booking ini.');
            }

            return Inertia::render('Pegawai/SuratMasuk/TambahSuratMasuk', [
                'booking' => [[
                    'id_booking' => $booking->id_booking,
                    'nama_instansi' => $booking->instansi->nama_instansi ?? '-',
                    'tgl_diterima' => $booking->created_at->format('d-m-Y'),
                    'surat' => $booking->surat,
                ]]
            ]);
        }

        $booking = Booking::with('instansi')
            ->where('status_booking', 'Diterima')
            ->whereNotIn('id_booking', function ($query) {
                $query->select('id_booking')->from('surat_masuk');
            })
            ->get()
            ->map(function ($item) {
                return [
                    'id_booking' => $item->id_booking,
                    'nama_instansi' => $item->instansi->nama_instansi ?? '-',
                    'tgl_diterima' => $item->created_at->format('d-m-Y'),
                    'surat' => $item->surat,
                ];
            });

        return Inertia::render('Pegawai/SuratMasuk/TambahSuratMasuk', [
            'booking' => $booking
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'no_surat' => 'required|string|max:255',
            'perihal' => 'required|string',
            'keterangan' => 'nullable|string',
            'tgl_surat' => 'required|date',
            'id_booking' => 'required|exists:booking,id_booking',
        ]);

        if (SuratMasuk::where('id_booking', $request->id_booking)->exists()) {
            return redirect()->back()->withErrors(['msg' => 'Surat masuk sudah dibuat untuk booking ini.']);
        }

        $booking = Booking::with('instansi')->findOrFail($request->id_booking);

        SuratMasuk::create([
            'no_surat' => $request->no_surat,
            //'asal_surat' => $booking->instansi->nama_instansi ?? '-',
            //'tgl_diterima' => $booking->created_at->format('d-m-Y'),
            'tgl_surat' => $request->tgl_surat,
            'perihal' => $request->perihal,
            'keterangan' => $request->keterangan,
            //'surat' => $booking->surat,
            'id_booking' => $request->id_booking,
            'id_pegawai' => Auth::user()->pegawai->id ?? Auth::id(),
        ]);

        return redirect()->route('surat.list')->with('success', 'Surat masuk berhasil ditambahkan');
    }

    public function edit($id_surat)
    {
        $surat = SuratMasuk::with('booking.instansi')->findOrFail($id_surat);

        return Inertia::render('Pegawai/SuratMasuk/EditSuratMasuk', [
            'suratMasuk' => [
                'id' => $surat->id_surat,
                'id_booking' => $surat->id_booking,
                'no_surat' => $surat->no_surat,
                'tgl_surat' => $surat->tgl_surat,
                'perihal' => $surat->perihal,
                'keterangan' => $surat->keterangan,
            ],
            'booking' => [
                'id_booking' => $surat->id_booking,
                'nama_instansi' => $surat->booking->instansi->nama_instansi ?? '-',
                'tgl_diterima' => $surat->booking->created_at->format('d-m-Y'),
                'surat' => $surat->booking->surat,
            ]
        ]);
    }

    public function update(Request $request, $id_surat){
        $request->validate([
            'no_surat' => 'required|string|max:255',
            'tgl_surat' => 'required|string',
            'perihal' => 'required|string',
            'keterangan' => 'required|string',
        ]);

        $surat = SuratMasuk::findOrFail($id_surat);

        $surat->update([
            'no_surat' => $request->no_surat,
            'tgl_surat' => $request->tgl_surat,
            'perihal' => $request->perihal,
            'keterangan' => $request->keterangan,
        ]);

        return redirect()->route('surat.list')->with('success', 'Surat masuk bershasil diperbaharui');
    }
}
