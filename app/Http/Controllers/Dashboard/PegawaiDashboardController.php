<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\BookingPelayananUmkm;
use App\Models\Disposisi;
use App\Models\Laporan;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PegawaiDashboardController extends Controller
{
    public function dashboardKabid()
    {
        $stats = [
            'diajukan' => Booking::where('status_booking', 'Diajukan')->count(),
            'diterima' => Booking::where('status_booking', 'Diterima')->count(),
            'ditolak' => Booking::where('status_booking', 'Ditolak')->count(),
            'selesai' => Booking::where('status_booking', 'Selesai')->count(),
        ];

        $recentBookings = Booking::with('instansi')
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(function ($b) {
                return [
                    'id' => $b->id,
                    'instansi' => $b->instansi->nama_instansi ?? '-',
                    'tanggal' => $b->created_at->format('Y-m-d'),
                    'status' => $b->status_booking,
                ];
            });

        return Inertia::render('Pegawai/KabidDashboard', [
            'stats' => $stats,
            'recentBookings' => $recentBookings,
        ]);
    }

    public function dashboardAdm()
    {
        $idSuratDidisposisi = Disposisi::pluck('id_surat')->toArray();

        $total = SuratMasuk::count();
        $sudah = SuratMasuk::whereIn('id_surat', $idSuratDidisposisi)->count();
        $belum = SuratMasuk::whereNotIn('id_surat', $idSuratDidisposisi)->count();

        $recentSurat = SuratMasuk::with(['booking.instansi'])
            ->latest('created_at')
            ->limit(5)
            ->get()
            ->map(function ($surat) use ($idSuratDidisposisi) {
                return [
                    'id' => $surat->id_surat,
                    'nomor' => $surat->nomor_surat,
                    'perihal' => $surat->perihal,
                    'dari' => $surat->booking->instansi->nama_instansi ?? '-',
                    'status_disposisi' => in_array($surat->id_surat, $idSuratDidisposisi) ? 'Sudah' : 'Belum',
                ];
            });

        $idBookingYangSudahAdaSurat = SuratMasuk::pluck('id_booking')->toArray();

        $bookingBelumPunyaSurat = Booking::where('status_booking', 'Diterima')
            ->whereNotIn('id_booking', $idBookingYangSudahAdaSurat)
            ->count();

        return Inertia::render('Pegawai/AdmDashboard', [
            'stats' => [
                'total' => $total,
                'disposisi_sudah' => $sudah,
                'disposisi_belum' => $belum,
                'belum_dibuat_surat' => $bookingBelumPunyaSurat,
            ],
            'recentSurat' => $recentSurat,
        ]);
    }

    public function dashboardKadin()
    {
        $totalSuratMasuk = SuratMasuk::count();

        $idSuratDidisposisi = Disposisi::pluck('id_surat')->toArray();
        $suratSudahDisposisi = SuratMasuk::whereIn('id_surat', $idSuratDidisposisi)->count();
        $suratBelumDisposisi = SuratMasuk::whereNotIn('id_surat', $idSuratDidisposisi)->count();

        $laporanSelesai = Booking::where('status_booking', 'Selesai')->count();

        $recentLaporan = Laporan::with(['booking.instansi'])
            ->latest('created_at')
            ->limit(5)
            ->get()
            ->map(fn($laporan) => [
                'id' => $laporan->id_laporan,
                'booking_id' => $laporan->id_booking,
                'nama_penulis' => $laporan->nama_penulis ?? '-',
                'tanggal' => $laporan->created_at->format('d-m-Y'),
                'judul' => $laporan->judul,
            ]);

        $recentSurat = SuratMasuk::with(['booking.instansi'])
            ->latest('created_at')
            ->limit(5)
            ->get()
            ->map(fn($surat) => [
                'id' => $surat->id_surat,
                'nomor' => $surat->no_surat,
                'perihal' => $surat->perihal,
                'dari' => $surat->booking->instansi->nama_instansi ?? '-',
                'status_disposisi' => in_array($surat->id_surat, $idSuratDidisposisi) ? 'Sudah' : 'Belum',
            ]);

        return Inertia::render('Pegawai/KadinDashboard', [
            'stats' => [
                'total_surat_masuk' => $totalSuratMasuk,
                'surat_sudah_disposisi' => $suratSudahDisposisi,
                'surat_belum_disposisi' => $suratBelumDisposisi,
                'laporan_selesai' => $laporanSelesai,
            ],
            'recentLaporan' => $recentLaporan,
            'recentSurat' => $recentSurat,
        ]);
    }

    public function dashboardLapangan()
    {
        $pegawaiId = Auth::user()->pegawai->id;

        $bookingIds = DB::table('booking_pegawai')
            ->where('id_pegawai', $pegawaiId)
            ->pluck('id_booking');

        $totalBooking = count($bookingIds);

        $totalUmkmDilayani = BookingPelayananUmkm::whereIn('id_booking', $bookingIds)->count();

        $totalLaporan = Laporan::whereIn('id_booking', $bookingIds)->count();

        $bookings = Booking::whereIn('id_booking', $bookingIds)
            ->orderByDesc('tanggal_mulai')
            ->get()
            ->map(function ($b) {
                return [
                    'id_booking' => $b->id_booking,
                    'tanggal_mulai' => $b->tanggal_mulai->format('d-m-Y'),
                    'acara' => $b->acara,
                    'lokasi' => $b->lokasi ?? '-',
                    'status_booking' => $b->status_booking,
                    'sudah_input_umkm' => $b->bookingPelayananUmkm()->exists(),
                    'sudah_buat_laporan' => $b->laporan()->exists(),
                ];
            });


        return Inertia::render('Pegawai/PeglapDashboard', [
            'stats' => [
                'total_booking' => $totalBooking,
                'total_umkm_dilayani' => $totalUmkmDilayani,
                'total_laporan' => $totalLaporan,
            ],
            'bookings' => $bookings,
        ]);
    }
}
