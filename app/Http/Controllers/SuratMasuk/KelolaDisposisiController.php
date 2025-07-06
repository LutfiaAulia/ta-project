<?php

namespace App\Http\Controllers\SuratMasuk;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Disposisi;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KelolaDisposisiController extends Controller
{
    public function show()
    {
        $disposisi = Disposisi::with(['pegawai.user', 'surat_masuk'])->get();

        return Inertia::render('Pegawai/Disposisi/ListDisposisi', [
            'disposisi' => $disposisi->map(fn($item) => [
                'id_disposisi' => $item->id_disposisi,
                'isi' => $item->isi,
                'tanggal' => $item->tanggal,
                'tujuan' => $item->tujuan,
                'catatan' => $item->catatan,
                'user' => [
                    'nama' => $item->pegawai->user->nama ?? 'Tidak diketahui',
                ],
                'surat' => [
                    'no_surat' => $item->surat_masuk->no_surat ?? '-',
                ],
            ]),
        ]);
    }

    public function create($id_disposisi)
    {
        $surat = SuratMasuk::with('booking.instansi')->findOrFail($id_disposisi);

        return Inertia::render('Pegawai/Disposisi/TambahDisposisi', [
            'surat' => [
                'id_surat' => $surat->id_surat,
                'no_surat' => $surat->no_surat,
                'asal_surat' => $surat->booking && $surat->booking->instansi
                    ? $surat->booking->instansi->nama_instansi
                    : '-',
                'perihal' => $surat->perihal,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'isi' => 'required|string',
            'tanggal' => 'required|date',
            'tujuan' => 'required|string',
            'catatan' => 'required|string',
            'id_surat' => 'required|exists:surat_masuk,id_surat',
        ]);

        Disposisi::create([
            'isi' => $request->isi,
            'tanggal' => $request->tanggal,
            'tujuan' => $request->tujuan,
            'catatan' => $request->catatan,
            'id_surat' => $request->id_surat,
            'id_pegawai' => Auth::user()->pegawai->id ?? Auth::id(),
        ]);

        return redirect()->route('disposisi.list')->with('susccess', 'Disposisi berhasil di tambahkan');
    }

    public function edit($id_disposisi)
    {
        $disposisi = Disposisi::with([
            'pegawai.user',
            'surat_masuk.booking.instansi'
        ])->findOrFail($id_disposisi);

        $suratMasuk = $disposisi->surat_masuk;
        $booking = $suratMasuk?->booking;
        $instansi = $booking?->instansi;

        return Inertia::render('Pegawai/Disposisi/EditDisposisi', [
            'disposisi' => [
                'id_disposisi' => $disposisi->id_disposisi,
                'id_surat' => $disposisi->id_surat,
                'isi' => $disposisi->isi,
                'tanggal' => $disposisi->tanggal,
                'tujuan' => $disposisi->tujuan,
                'catatan' => $disposisi->catatan,
            ],
            'surat' => [
                'no_surat' => $suratMasuk->no_surat ?? '-',
                'asal_surat' => $instansi->nama_instansi ?? '-',
                'perihal' => $suratMasuk->perihal ?? '-',
            ],
        ]);
    }

    public function update(Request $request, $id_disposisi)
    {
        $request->validate([
            'isi' => 'required|string',
            'tanggal' => 'required|date',
            'tujuan' => 'required|string',
            'catatan' => 'required|string',
        ]);

        $disposisi = Disposisi::findOrFail($id_disposisi);

        $disposisi->update([
            'isi' => $request->isi,
            'tanggal' => $request->tanggal,
            'tujuan' => $request->tujuan,
            'catatan' => $request->catatan,
        ]);

        return redirect()->route('disposisi.list')->with('success', 'Disposisi berhasil diperbarui');
    }

    public function destroy($id_disposisi)
    {
        $disposisi = Disposisi::findOrFail($id_disposisi);
        $disposisi->delete();

        return redirect()->route('disposisi.list')->with('success', 'Surat masuk berhasil dihapus');
    }

    public function detail($id_disposisi)
    {
        $disposisi = Disposisi::with(['pegawai.user', 'surat_masuk.booking.instansi'])
            ->findOrFail($id_disposisi);

        return Inertia::render('Pegawai/Disposisi/DetailDisposisi', [
            'disposisi' => [
                'isi' => $disposisi->isi,
                'tanggal' => $disposisi->tanggal,
                'tujuan' => $disposisi->tujuan,
                'catatan' => $disposisi->catatan,
                'user' => [
                    'nama' => $disposisi->pegawai->user->nama ?? 'Tidak diketahui',
                ],
                'surat' => [
                    'no_surat' => $disposisi->surat_masuk->no_surat ?? '-',
                    'asal_surat' => $disposisi->surat_masuk?->booking?->instansi?->nama_instansi ?? '-',
                    'perihal' => $disposisi->surat_masuk->perihal ?? '-',
                ],
            ],
        ]);
    }

    //Pegawai
    public function lihatDariBooking($id_booking)
    {
        $disposisi = Disposisi::with(['pegawai.user', 'surat_masuk'])
            ->whereHas('surat_masuk', function ($q) use ($id_booking) {
                $q->where('id_booking', $id_booking);
            })
            ->get();

        $booking = Booking::find($id_booking);

        return Inertia::render('Pegawai/Booking/DaftarDisposisi', [
            'disposisi' => $disposisi->map(fn($item) => [
                'id_disposisi' => $item->id_disposisi,
                'isi' => $item->isi,
                'tujuan' => $item->tujuan,
                'catatan' => $item->catatan,
                'tanggal' => $item->tanggal,
                'user' => [
                    'nama' => $item->pegawai->user->nama ?? '-',
                ],
                'surat' => [
                    'no_surat' => $item->surat_masuk->no_surat ?? '-',
                    'asal_surat' => $item->surat_masuk->asal_surat ?? '-',
                    'perihal' => $item->surat_masuk->perihal ?? '-',
                ],
            ]),
            'booking' => [
                'id' => $id_booking,
                'acara' => $booking->acara,
            ],
        ]);
    }
}
