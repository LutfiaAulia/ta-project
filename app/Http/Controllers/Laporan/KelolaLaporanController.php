<?php

namespace App\Http\Controllers\Laporan;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Dokumentasi;
use Illuminate\Http\Request;
use App\Models\Laporan;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

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
                    'tanggal_mulai' => $item->booking->tanggal_mulai,
                    'tanggal_akhir' => $item->booking->tanggal_akhir,
                    'waktu_mulai' => $item->booking->waktu_mulai,
                    'waktu_akhir' => $item->booking->waktu_akhir,
                    'judul'        => $item->judul,
                    'lokasi'       => optional($item->booking)->lokasi,
                    'nama_penulis' => $item->nama_penulis,
                ];
            });

        return Inertia::render('Pegawai/Laporan/ListLaporan', [
            'laporan' => $laporan,
            'auth' => [
                'role' => Auth::user()->pegawai->role ?? null,
                'user' => Auth::user(),
            ],
        ]);
    }

    public function create()
    {
        $user = Auth::user();
        $pegawai = $user->pegawai;
        $role = $pegawai->role ?? null;

        $bookingLaporan = Laporan::pluck('id_booking')->unique();

        $query = Booking::with('instansi:id,nama_instansi')
            ->where('status_booking', 'Diterima')
            ->whereNotIn('id_booking', $bookingLaporan);

        if ($role === 'Pegawai Lapangan') {
            $query->whereHas('pegawailapangan', function ($q) use ($pegawai) {
                $q->where('pegawai.id', $pegawai->id);
            });
        }

        $booking = $query->select('id_booking', 'id_instansi', 'tanggal_mulai', 'tanggal_akhir')
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

        Booking::where('id_booking', $request->id_booking)
            ->update(['status_booking' => 'Selesai']);

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

    public function edit($id_laporan)
    {
        $laporan = Laporan::with(['booking.instansi', 'dokumentasi'])->findOrFail($id_laporan);

        return Inertia::render('Pegawai/Laporan/EditLaporan', [
            'laporan' => [
                'id' => $laporan->id_laporan,
                'id_booking' => $laporan->id_booking,
                'judul' => $laporan->judul,
                'dasar' => $laporan->dasar,
                'maksud' => $laporan->maksud,
                'tujuan' => $laporan->tujuan,
                'biaya' => $laporan->biaya,
                'ringkasan_pelaksana' => $laporan->ringkasan_pelaksana,
                'kesimpulan' => $laporan->kesimpulan,
                'saran' => $laporan->saran,
                'nama_penulis' => $laporan->nama_penulis,
                'foto_dokumentasi' => $laporan->dokumentasi->map(function ($doc) {
                    return [
                        'id' => $doc->id_dokumentasi,
                        'url' => asset('storage/' . $doc->path_file),
                    ];
                }),
            ],
            'booking' => $laporan->booking ? [
                'id_booking' => $laporan->booking->id_booking,
                'nama_instansi' => $laporan->booking->instansi->nama_instansi ?? '-',
                'tanggal_mulai' => $laporan->booking->tanggal_mulai?->format('d-m-Y') ?? '-',
                'tanggal_akhir' => $laporan->booking->tanggal_akhir?->format('d-m-Y') ?? '-',
            ] : null,
        ]);
    }

    public function update(Request $request, $id_laporan)
    {
        $laporan = Laporan::with('dokumentasi')->findOrFail($id_laporan);

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
            'foto_dokumentasi.*' => 'nullable|image|max:2048',
            'existing_foto' => 'nullable|array',
            'existing_foto.*' => 'integer|exists:dokumentasi,id_dokumentasi',
            'hapus_foto' => 'nullable|array',
            'hapus_foto.*' => 'integer|exists:dokumentasi,id_dokumentasi',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $laporan->update([
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
        ]);

        $hapusFotoIds = $request->hapus_foto ?? [];

        if (!empty($hapusFotoIds)) {
            $laporan->dokumentasi->whereIn('id_dokumentasi', $hapusFotoIds)->each(function ($doc) {
                Storage::disk('public')->delete($doc->path_file);
                $doc->delete();
            });
        }

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

        return redirect()->route('laporan.list')->with('success', 'Laporan berhasil diperbarui.');
    }
    
    public function destroy($id_laporan)
    {
        $laporan = Laporan::with('dokumentasi')->findOrFail($id_laporan);
        $id_booking = $laporan->id_booking;

        foreach ($laporan->dokumentasi as $doc) {
            Storage::disk('public')->delete($doc->path_file);
        }

        $laporan->dokumentasi()->delete();
        $laporan->delete();

        Booking::where('id_booking', $id_booking)->update(['status_booking' => 'Diterima']);


        return redirect()->route('laporan.list')->with('success', 'Laporan berhasil dihapus.');
    }

    public function laporan($id_laporan)
    {
        $laporan = Laporan::with([
            'booking.pegawaiLapangan.user',
            'booking.bookingPelayananUmkm.pelayanan',
            'booking.bookingPelayananUmkm.layanan',
            'dokumentasi',
        ])->findOrFail($id_laporan);

        $booking = $laporan->booking;

        $tanggal_mulai = $booking->tanggal_mulai;
        $tanggal_akhir = $booking->tanggal_akhir;
        $durasi = now()->parse($tanggal_mulai)->diffInDays(now()->parse($tanggal_akhir)) + 1;

        $layananList = $booking->bookingPelayananUmkm
            ->pluck('layanan.layanan')
            ->unique()
            ->values();

        $layananString = match ($layananList->count()) {
            0 => '',
            1 => $layananList[0],
            2 => $layananList[0] . ' dan ' . $layananList[1],
            default => $layananList->slice(0, -1)->join(', ') . ', dan ' . $layananList->last(),
        };

        return Inertia::render('Pegawai/Laporan/LaporanTemplate', [
            'laporan' => [
                'judul' => $laporan->judul,
                'dasar' => $laporan->dasar,
                'maksud' => $laporan->maksud,
                'tujuan' => $laporan->tujuan,
                'biaya' => $laporan->biaya,
                'ringkasan_pelaksanaan' => $laporan->ringkasan_pelaksana,
                'kesimpulan' => explode("\n", $laporan->kesimpulan),
                'saran' => explode("\n", $laporan->saran),
                'nama_penulis' => $laporan->nama_penulis,
                'tanggalLaporan' => $laporan->created_at->format('Y-m-d'),
                'tanggal_mulai' => $tanggal_mulai,
                'tanggal_akhir' => $tanggal_akhir,
                'durasi' => $durasi,
                'layanan' => $layananString,

                'personil' => $booking->pegawaiLapangan->map(function ($pegawai) {
                    return ['nama' => $pegawai->user->nama ?? 'Tidak diketahui'];
                })->concat(
                    $booking->sopir ? collect([['nama' => $booking->sopir->nama]]) : collect([])
                ),


                'pelakuUsaha' => $booking->bookingPelayananUmkm->map(function ($item) use ($booking) {
                    return [
                        'nama_lengkap' => $item->pelayanan->nama_lengkap,
                        'no_hp' => $item->pelayanan->no_hp,
                        'jenis_kelamin' => $item->pelayanan->jenis_kelamin,
                        'kenagarian_kelurahan' => $booking->kenagarian_kelurahan,
                        'email' => $item->pelayanan->email,
                    ];
                }),

                'dokumentasi' => $laporan->dokumentasi->map(function ($doc) {
                    return [
                        'id_dokumentasi' => $doc->id_dokumentasi,
                        'nama_file' => $doc->nama_file,
                        'path_file' => $doc->path_file,
                    ];
                }),
            ],
        ]);
    }
}
