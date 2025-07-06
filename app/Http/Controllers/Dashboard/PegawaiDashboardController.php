<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\BookingPelayananUmkm;
use App\Models\Disposisi;
use App\Models\Laporan;
use App\Models\Layanan;
use App\Models\Mobil;
use App\Models\Pegawai;
use App\Models\Promosi;
use App\Models\Sopir;
use App\Models\SuratMasuk;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PegawaiDashboardController extends Controller
{
    public function dashboardKabid(Request $request)
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

        $year = $request->get('year', date('Y'));

        $totalBookingDiajukan = Booking::where('status_booking', 'diajukan')
            ->whereYear('tanggal_mulai', $year)
            ->count();

        $totalBookingDiterima = Booking::where('status_booking', 'diterima')
            ->whereYear('tanggal_mulai', $year)
            ->count();

        $totalBookingSelesai = Booking::where('status_booking', 'selesai')
            ->whereYear('tanggal_mulai', $year)
            ->count();

        $totalBookingDitolak = Booking::where('status_booking', 'ditolak')
            ->whereYear('tanggal_mulai', $year)
            ->count();

        $umkmPerKabupaten = DB::table('booking_pelayananumkm')
            ->join('booking', 'booking_pelayananumkm.id_booking', '=', 'booking.id_booking')
            ->whereYear('booking.tanggal_mulai', $year)
            ->select('booking.kabupaten_kota', DB::raw('COUNT(*) as jumlah'))
            ->groupBy('booking.kabupaten_kota')
            ->get();


        $layananPopuler = DB::table('booking_pelayananumkm')
            ->join('booking', 'booking_pelayananumkm.id_booking', '=', 'booking.id_booking')
            ->join('layanan', 'booking_pelayananumkm.id_layanan', '=', 'layanan.id_layanan')
            ->whereYear('booking.tanggal_mulai', $year)
            ->select('layanan.layanan', DB::raw('COUNT(*) as jumlah'))
            ->groupBy('layanan.layanan')
            ->orderByDesc('jumlah')
            ->limit(5)
            ->get();


        $bookingTrend = Booking::select(
            DB::raw('MONTH(tanggal_mulai) as bulan'),
            DB::raw('COUNT(*) as booking')
        )
            ->whereYear('tanggal_mulai', $year)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->get()
            ->map(function ($item) use ($year) {
                $bulan = date('M', mktime(0, 0, 0, $item->bulan, 1));
                $bookingIds = Booking::whereYear('tanggal_mulai', $year)
                    ->whereMonth('tanggal_mulai', $item->bulan)
                    ->pluck('id_booking');

                $umkmCount = DB::table('booking_pelayananumkm')
                    ->whereIn('id_booking', $bookingIds)
                    ->count();

                return [
                    'bulan' => $bulan,
                    'booking' => $item->booking,
                    'umkm' => $umkmCount,
                ];
            });

        $bookingPerTahun = Booking::select(
            DB::raw('YEAR(tanggal_mulai) as tahun'),
            DB::raw('COUNT(*) as jumlah'),
        )
            ->groupBy('tahun')->orderBy('tahun')->get();

        $umkmPerBooking = Booking::select('tanggal_mulai', 'tanggal_akhir')
            ->whereNotNull('tanggal_mulai')
            ->whereNotNull('tanggal_akhir')
            ->where('status_booking', 'selesai')
            ->whereYear('tanggal_mulai', $year)
            ->orderByDesc('tanggal_mulai')
            ->limit(5)
            ->get()
            ->map(function ($item) use ($year) {
                $bookingIds = Booking::whereDate('tanggal_mulai', $item->tanggal_mulai)
                    ->whereDate('tanggal_akhir', $item->tanggal_akhir)
                    ->where('status_booking', 'selesai')
                    ->whereYear('tanggal_mulai', $year)
                    ->pluck('id_booking');

                $umkmCount = DB::table('booking_pelayananumkm')
                    ->whereIn('id_booking', $bookingIds)
                    ->count();

                $tanggalMulai = Carbon::parse($item->tanggal_mulai);
                $tanggalAkhir = Carbon::parse($item->tanggal_akhir);

                if ($tanggalMulai->format('M') === $tanggalAkhir->format('M')) {
                    $tanggalLabel = $tanggalMulai->format('j') . '-' . $tanggalAkhir->format('j M');
                } else {
                    $tanggalLabel = $tanggalMulai->format('j M') . ' - ' . $tanggalAkhir->format('j M');
                }

                return [
                    'tanggal' => $tanggalLabel,
                    'jumlah' => $umkmCount,
                    'booking' => count($bookingIds),
                ];
            });

        return Inertia::render('Pegawai/KabidDashboard', [
            'year' => (int) $year,
            'stats' => $stats,
            'recentBookings' => $recentBookings,
            'bookingStatus' => [
                ['name' => 'Selesai',   'value' => $totalBookingSelesai,  'color' => '#16a34a'],
                ['name' => 'Diajukan',  'value' => $totalBookingDiajukan, 'color' => '#f59e0b'],
                ['name' => 'Diterima',  'value' => $totalBookingDiterima, 'color' => '#3b82f6'],
                ['name' => 'Ditolak',   'value' => $totalBookingDitolak,  'color' => '#dc2626'],
            ],
            'umkmPerKabupaten' => $umkmPerKabupaten,
            'layananPopuler' => $layananPopuler,
            'bookingTrend' => $bookingTrend,
            'bookingPerTahun' => $bookingPerTahun,
            'umkmPerBooking' => $umkmPerBooking,
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

    public function dashboardKadin(Request $request)
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

        $year = $request->get('year', date('Y'));

        $totalBookingDiajukan = Booking::where('status_booking', 'diajukan')
            ->whereYear('tanggal_mulai', $year)
            ->count();

        $totalBookingDiterima = Booking::where('status_booking', 'diterima')
            ->whereYear('tanggal_mulai', $year)
            ->count();

        $totalBookingSelesai = Booking::where('status_booking', 'selesai')
            ->whereYear('tanggal_mulai', $year)
            ->count();

        $totalBookingDitolak = Booking::where('status_booking', 'ditolak')
            ->whereYear('tanggal_mulai', $year)
            ->count();

        $umkmPerKabupaten = DB::table('booking_pelayananumkm')
            ->join('booking', 'booking_pelayananumkm.id_booking', '=', 'booking.id_booking')
            ->whereYear('booking.tanggal_mulai', $year)
            ->select('booking.kabupaten_kota', DB::raw('COUNT(*) as jumlah'))
            ->groupBy('booking.kabupaten_kota')
            ->get();


        $layananPopuler = DB::table('booking_pelayananumkm')
            ->join('booking', 'booking_pelayananumkm.id_booking', '=', 'booking.id_booking')
            ->join('layanan', 'booking_pelayananumkm.id_layanan', '=', 'layanan.id_layanan')
            ->whereYear('booking.tanggal_mulai', $year)
            ->select('layanan.layanan', DB::raw('COUNT(*) as jumlah'))
            ->groupBy('layanan.layanan')
            ->orderByDesc('jumlah')
            ->limit(5)
            ->get();


        $bookingTrend = Booking::select(
            DB::raw('MONTH(tanggal_mulai) as bulan'),
            DB::raw('COUNT(*) as booking')
        )
            ->whereYear('tanggal_mulai', $year)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->get()
            ->map(function ($item) use ($year) {
                $bulan = date('M', mktime(0, 0, 0, $item->bulan, 1));
                $bookingIds = Booking::whereYear('tanggal_mulai', $year)
                    ->whereMonth('tanggal_mulai', $item->bulan)
                    ->pluck('id_booking');

                $umkmCount = DB::table('booking_pelayananumkm')
                    ->whereIn('id_booking', $bookingIds)
                    ->count();

                return [
                    'bulan' => $bulan,
                    'booking' => $item->booking,
                    'umkm' => $umkmCount,
                ];
            });

        $bookingPerTahun = Booking::select(
            DB::raw('YEAR(tanggal_mulai) as tahun'),
            DB::raw('COUNT(*) as jumlah'),
        )
            ->groupBy('tahun')->orderBy('tahun')->get();

        $umkmPerBooking = Booking::select('tanggal_mulai', 'tanggal_akhir')
            ->whereNotNull('tanggal_mulai')
            ->whereNotNull('tanggal_akhir')
            ->where('status_booking', 'selesai')
            ->whereYear('tanggal_mulai', $year)
            ->orderByDesc('tanggal_mulai')
            ->limit(5)
            ->get()
            ->map(function ($item) use ($year) {
                $bookingIds = Booking::whereDate('tanggal_mulai', $item->tanggal_mulai)
                    ->whereDate('tanggal_akhir', $item->tanggal_akhir)
                    ->where('status_booking', 'selesai')
                    ->whereYear('tanggal_mulai', $year)
                    ->pluck('id_booking');

                $umkmCount = DB::table('booking_pelayananumkm')
                    ->whereIn('id_booking', $bookingIds)
                    ->count();

                $tanggalMulai = Carbon::parse($item->tanggal_mulai);
                $tanggalAkhir = Carbon::parse($item->tanggal_akhir);

                if ($tanggalMulai->format('M') === $tanggalAkhir->format('M')) {
                    $tanggalLabel = $tanggalMulai->format('j') . '-' . $tanggalAkhir->format('j M');
                } else {
                    $tanggalLabel = $tanggalMulai->format('j M') . ' - ' . $tanggalAkhir->format('j M');
                }

                return [
                    'tanggal' => $tanggalLabel,
                    'jumlah' => $umkmCount,
                    'booking' => count($bookingIds),
                ];
            });

        return Inertia::render('Pegawai/KadinDashboard', [
            'year' => (int) $year,
            'stats' => [
                'total_surat_masuk' => $totalSuratMasuk,
                'surat_sudah_disposisi' => $suratSudahDisposisi,
                'surat_belum_disposisi' => $suratBelumDisposisi,
                'laporan_selesai' => $laporanSelesai,
            ],
            'recentLaporan' => $recentLaporan,
            'recentSurat' => $recentSurat,
            'bookingStatus' => [
                ['name' => 'Selesai',   'value' => $totalBookingSelesai,  'color' => '#16a34a'],
                ['name' => 'Diajukan',  'value' => $totalBookingDiajukan, 'color' => '#f59e0b'],
                ['name' => 'Diterima',  'value' => $totalBookingDiterima, 'color' => '#3b82f6'],
                ['name' => 'Ditolak',   'value' => $totalBookingDitolak,  'color' => '#dc2626'],
            ],
            'umkmPerKabupaten' => $umkmPerKabupaten,
            'layananPopuler' => $layananPopuler,
            'bookingTrend' => $bookingTrend,
            'bookingPerTahun' => $bookingPerTahun,
            'umkmPerBooking' => $umkmPerBooking,
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

    public function dashboardAdmin(Request $request)
    {
        $year = $request->get('year', date('Y'));

        $totalBooking = Booking::count();
        $totalBookingDiajukan = Booking::where('status_booking', 'diajukan')
            ->whereYear('tanggal_mulai', $year)
            ->count();

        $totalBookingDiterima = Booking::where('status_booking', 'diterima')
            ->whereYear('tanggal_mulai', $year)
            ->count();

        $totalBookingSelesai = Booking::where('status_booking', 'selesai')
            ->whereYear('tanggal_mulai', $year)
            ->count();

        $totalBookingDitolak = Booking::where('status_booking', 'ditolak')
            ->whereYear('tanggal_mulai', $year)
            ->count();


        $totalUMKM = BookingPelayananUmkm::count();
        $totalProduk = Promosi::count();
        $totalMobil = Mobil::where('status', 'aktif')->count();
        $totalSopir = Sopir::where('status', 'aktif')->count();
        $totalLayanan = Layanan::where('status', 'aktif')->count();


        $umkmPerKabupaten = DB::table('booking_pelayananumkm')
            ->join('booking', 'booking_pelayananumkm.id_booking', '=', 'booking.id_booking')
            ->whereYear('booking.tanggal_mulai', $year)
            ->select('booking.kabupaten_kota', DB::raw('COUNT(*) as jumlah'))
            ->groupBy('booking.kabupaten_kota')
            ->get();


        $layananPopuler = DB::table('booking_pelayananumkm')
            ->join('booking', 'booking_pelayananumkm.id_booking', '=', 'booking.id_booking')
            ->join('layanan', 'booking_pelayananumkm.id_layanan', '=', 'layanan.id_layanan')
            ->whereYear('booking.tanggal_mulai', $year)
            ->select('layanan.layanan', DB::raw('COUNT(*) as jumlah'))
            ->groupBy('layanan.layanan')
            ->orderByDesc('jumlah')
            ->limit(5)
            ->get();


        $bookingTrend = Booking::select(
            DB::raw('MONTH(tanggal_mulai) as bulan'),
            DB::raw('COUNT(*) as booking')
        )
            ->whereYear('tanggal_mulai', $year)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->get()
            ->map(function ($item) use ($year) {
                $bulan = date('M', mktime(0, 0, 0, $item->bulan, 1));
                $bookingIds = Booking::whereYear('tanggal_mulai', $year)
                    ->whereMonth('tanggal_mulai', $item->bulan)
                    ->pluck('id_booking');

                $umkmCount = DB::table('booking_pelayananumkm')
                    ->whereIn('id_booking', $bookingIds)
                    ->count();

                return [
                    'bulan' => $bulan,
                    'booking' => $item->booking,
                    'umkm' => $umkmCount,
                ];
            });

        $bookingPerTahun = Booking::select(
            DB::raw('YEAR(tanggal_mulai) as tahun'),
            DB::raw('COUNT(*) as jumlah'),
        )
            ->groupBy('tahun')->orderBy('tahun')->get();

        $umkmPerBooking = Booking::select('tanggal_mulai', 'tanggal_akhir')
            ->whereNotNull('tanggal_mulai')
            ->whereNotNull('tanggal_akhir')
            ->where('status_booking', 'selesai')
            ->whereYear('tanggal_mulai', $year)
            ->orderByDesc('tanggal_mulai')
            ->limit(5)
            ->get()
            ->map(function ($item) use ($year) {
                $bookingIds = Booking::whereDate('tanggal_mulai', $item->tanggal_mulai)
                    ->whereDate('tanggal_akhir', $item->tanggal_akhir)
                    ->where('status_booking', 'selesai')
                    ->whereYear('tanggal_mulai', $year)
                    ->pluck('id_booking');

                $umkmCount = DB::table('booking_pelayananumkm')
                    ->whereIn('id_booking', $bookingIds)
                    ->count();

                $tanggalMulai = Carbon::parse($item->tanggal_mulai);
                $tanggalAkhir = Carbon::parse($item->tanggal_akhir);

                if ($tanggalMulai->format('M') === $tanggalAkhir->format('M')) {
                    $tanggalLabel = $tanggalMulai->format('j') . '-' . $tanggalAkhir->format('j M');
                } else {
                    $tanggalLabel = $tanggalMulai->format('j M') . ' - ' . $tanggalAkhir->format('j M');
                }

                return [
                    'tanggal' => $tanggalLabel,
                    'jumlah' => $umkmCount,
                    'booking' => count($bookingIds),
                ];
            });

        return Inertia::render('Pegawai/AdminDashboard', [
            'year' => (int) $year,
            'statistik' => [
                'totalBooking' => $totalBooking,
                'totalBookingDijukan' => $totalBookingDiajukan,
                'totalBookingSelesai' => $totalBookingSelesai,
                'totalBookingDiterima' => $totalBookingDiterima,
                'totalBookingDitolak' => $totalBookingDitolak,
                'totalUMKM' => $totalUMKM,
                'totalProduk' => $totalProduk,
                'totalMobil' => $totalMobil,
                'totalSopir' => $totalSopir,
                'totalLayanan' => $totalLayanan,
            ],
            'bookingStatus' => [
                ['name' => 'Selesai',   'value' => $totalBookingSelesai,  'color' => '#16a34a'],
                ['name' => 'Diajukan',  'value' => $totalBookingDiajukan, 'color' => '#f59e0b'],
                ['name' => 'Diterima',  'value' => $totalBookingDiterima, 'color' => '#3b82f6'],
                ['name' => 'Ditolak',   'value' => $totalBookingDitolak,  'color' => '#dc2626'],
            ],
            'umkmPerKabupaten' => $umkmPerKabupaten,
            'layananPopuler' => $layananPopuler,
            'bookingTrend' => $bookingTrend,
            'bookingPerTahun' => $bookingPerTahun,
            'umkmPerBooking' => $umkmPerBooking,
        ]);
    }
}
