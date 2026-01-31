import React from "react";
import Header from "@/Components/HeaderHU";
import Footer from "@/Components/FooterHU";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Calendar,
    Award,
    ChevronRight,
    CheckCircle2,
    ClipboardList,
    MapPin,
    Clock,
    ArrowRight,
    Images,
    TrendingUp,
} from "lucide-react";

interface LayananItem {
    id_layanan: number;
    layanan: string;
    bidang: string;
    deskripsi_layanan: string;
}

interface Jadwal {
    layanan: { layanan: string };
    tanggal_mulai: string;
    tanggal_akhir: string;
    waktu_mulai: string;
    waktu_akhir: string;
    lokasi: string;
}

interface Berita {
    id_berita: number;
    judul: string;
    tanggal_publikasi: string;
    ringkasan: string;
    gambar: string;
    slug: string;
}
interface ProgramItem {
    id_program: number;
    judul: string;
    excerpt: string;
    image: string;
    status: string;
    slug: string;
}

interface PageProps {
    layanan: Record<string, LayananItem[]>;
    jadwalTerdekat: Jadwal[];
    umkmTerlayani: number;
    nagariTerliput: number;
    jumlahInstansi: number;
    jumlahUmkm: number;
    dokumentasiTerbaru: any[];
    mainNews: Berita | null;
    beritaLain: Berita[];
    programPlut: ProgramItem[];
}

export default function Welcome() {
    const {
        layanan,
        programPlut,
        jadwalTerdekat,
        umkmTerlayani,
        nagariTerliput,
        jumlahInstansi,
        jumlahUmkm,
        dokumentasiTerbaru,
        mainNews,
        beritaLain,
    } = usePage().props as unknown as PageProps;

    // --- Helper Functions ---
    const formatTanggalRange = (tanggalMulai: string, tanggalAkhir: string) => {
        const start = new Date(tanggalMulai);
        const end = new Date(tanggalAkhir);
        if (isNaN(start.getTime())) return "-";

        const optionsDay = { day: "numeric" } as const;
        const optionsMonthYear = { month: "long", year: "numeric" } as const;

        if (start.toDateString() === end.toDateString()) {
            return start.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        }
        if (
            start.getMonth() === end.getMonth() &&
            start.getFullYear() === end.getFullYear()
        ) {
            return `${start.toLocaleDateString(
                "id-ID",
                optionsDay,
            )}–${end.toLocaleDateString(
                "id-ID",
                optionsDay,
            )} ${start.toLocaleDateString("id-ID", optionsMonthYear)}`;
        }
        return `${start.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
        })} – ${end.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })}`;
    };

    const formatTanggalPublikasi = (tanggal: string) => {
        const date = new Date(tanggal.split(" ")[0]);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const stats = [
        {
            number: umkmTerlayani,
            label: "UMKM Terlayani",
            icon: <CheckCircle2 className="w-6 h-6" />,
        },
        {
            number: nagariTerliput,
            label: "Nagari Terjangkau",
            icon: <MapPin className="w-6 h-6" />,
        },
        {
            number: jumlahInstansi,
            label: "Instansi Terkait",
            icon: <Award className="w-6 h-6" />,
        },
        {
            number: jumlahUmkm,
            label: "Produk Promosi",
            icon: <TrendingUp className="w-6 h-6" />,
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900 overflow-x-hidden">
            <Head title="Beranda - Mobil Klinik UMKM" />

            <Header />

            {/* Hero Section */}
            <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/rumahgd.jpg"
                        alt="Pelayanan UMKM"
                        className="w-full h-full object-cover scale-105 animate-[soft-zoom_20s_ease-in-out_infinite_alternate]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-900/70 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-bold mb-6 backdrop-blur-sm uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Pelayanan Aktif di Sumatera Barat
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
                            Mendekatkan Layanan, Meningkatkan{" "}
                            <span className="text-green-400">UMKM</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-200 mb-10 opacity-90 leading-relaxed font-light">
                            Berkomitmen menghadirkan layanan prima bagi pelaku
                            UMKM guna mengakselerasi pertumbuhan usaha yang
                            unggul dan berdaya saing di kancah lokal maupun
                            nasional.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/layanan"
                                className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-green-900/40 flex items-center gap-2 group"
                            >
                                Cek Layanan{" "}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section (Floating) */}
            <section className="relative z-20 -mt-12 md:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="mb-4 p-3 rounded-2xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-500">
                                {stat.icon}
                            </div>
                            <p className="text-2xl md:text-3xl font-black text-slate-800 mb-1">
                                {stat.number.toLocaleString("id-ID")}
                            </p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION: Program PLUT dari Database */}
            <section className="pt-24 pb-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                                Program Unggulan{" "}
                                <span className="text-green-600">PLUT</span>
                            </h2>
                            <p className="text-slate-500 font-medium text-lg">
                                Inisiatif strategis untuk mendukung transformasi
                                dan akselerasi UMKM di Sumatera Barat.
                            </p>
                        </div>
                        {/* Navigasi program */}
                        <Link
                            href="/program"
                            className="text-green-700 font-bold flex items-center gap-2 hover:gap-3 transition-all"
                        >
                            Lihat Semua Program{" "}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {programPlut && programPlut.length > 0 ? (
                            programPlut.map((prog) => (
                                <Link
                                    key={prog.id_program}
                                    href={`/program/${prog.slug}`}
                                    className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col"
                                >
                                    {/* Image Header */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={
                                                prog.image?.startsWith(
                                                    "/storage/",
                                                )
                                                    ? prog.image
                                                    : `/storage/${prog.image}`
                                            }
                                            alt={prog.judul}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* FLOAT BADGE STATUS */}
                                        <div className="absolute top-5 left-5 z-10">
                                            {prog.status === "active" ? (
                                                <div className="bg-green-600/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 border border-white/20">
                                                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                                    AKTIF
                                                </div>
                                            ) : (
                                                <div className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 border border-white/20">
                                                    <span className="w-2 h-2 bg-blue-200 rounded-full"></span>
                                                    SEGERA HADIR
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                            <span className="text-white text-xs font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-lg">
                                                Detail Program
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-green-600 transition-colors leading-tight">
                                            {prog.judul}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {prog.excerpt}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                                PLUT-KUMKM
                                            </span>
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-green-600 group-hover:text-white transition-all flex items-center justify-center">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 text-slate-400 italic">
                                Belum ada data program yang dipublikasikan.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Berita Section */}
            <section className="pt-12 pb-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                                Berita Terbaru
                            </h2>
                            <p className="text-slate-500 font-medium">
                                Informasi terkini seputar kegiatan dan
                                perkembangan UMKM.
                            </p>
                        </div>
                        <Link
                            href="/berita"
                            className="hidden md:flex items-center gap-2 text-green-700 font-bold hover:gap-3 transition-all"
                        >
                            Lihat Semua <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main News */}
                        <div className="lg:col-span-8">
                            {mainNews ? (
                                <Link
                                    href={`/berita/${mainNews.slug}`}
                                    className="group relative block h-[400px] md:h-[500px] overflow-hidden rounded-[2.5rem] shadow-2xl bg-slate-900"
                                >
                                    <img
                                        src={
                                            mainNews.gambar?.startsWith(
                                                "/storage/",
                                            )
                                                ? mainNews.gambar
                                                : `/storage/${mainNews.gambar}`
                                        }
                                        className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-1000"
                                        alt={mainNews.judul}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-0 p-8 md:p-12">
                                        <div className="flex items-center gap-3 text-green-400 text-xs font-bold mb-4 uppercase tracking-widest">
                                            <span className="px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-lg border border-green-500/30">
                                                Berita Utama
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" />{" "}
                                                {formatTanggalPublikasi(
                                                    mainNews.tanggal_publikasi,
                                                )}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-green-300 transition-colors">
                                            {mainNews.judul}
                                        </h3>
                                        <p className="text-slate-300 line-clamp-2 text-lg opacity-80 font-light">
                                            {mainNews.ringkasan}
                                        </p>
                                    </div>
                                </Link>
                            ) : (
                                <div className="h-full bg-slate-200 rounded-[2.5rem] flex items-center justify-center italic text-slate-400">
                                    Berita tidak tersedia
                                </div>
                            )}
                        </div>

                        {/* Side News List */}
                        <div className="lg:col-span-4 flex flex-col">
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex-grow">
                                <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2">
                                    <ClipboardList className="text-green-600 w-6 h-6" />{" "}
                                    Berita Lainnya
                                </h3>
                                <div className="space-y-8">
                                    {beritaLain.slice(0, 4).map((item) => (
                                        <Link
                                            key={item.id_berita}
                                            href={`/berita/${item.slug}`}
                                            className="group block border-b border-slate-50 pb-6 last:border-0 last:pb-0"
                                        >
                                            <h4 className="font-bold text-slate-800 leading-snug group-hover:text-green-600 transition-colors line-clamp-2 mb-2">
                                                {item.judul}
                                            </h4>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <Calendar className="w-3 h-3" />{" "}
                                                {formatTanggalPublikasi(
                                                    item.tanggal_publikasi,
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Clinic Highlight */}
            <section className="py-24 bg-green-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-green-900/30 skew-x-12 translate-x-32"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-[1.2]">
                                Layanan Mobil Klinik <br />
                                <span className="text-green-400">
                                    Untuk Kemajuan UMKM
                                </span>
                            </h2>
                            <p className="text-xl text-green-100/70 mb-10 leading-relaxed font-light">
                                Kami percaya jarak bukan penghalang kemajuan.
                                Mobil Klinik hadir memberikan pendampingan
                                profesional langsung di lokasi Anda.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                {[
                                    "NIB & Izin Usaha",
                                    "Sertifikasi Halal",
                                    "Konsultasi Bisnis",
                                    "Branding & Promosi",
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 text-white font-semibold"
                                    >
                                        <div className="p-1 bg-green-500 rounded-full">
                                            <CheckCircle2 className="w-4 h-4 text-green-950" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/layanan"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-green-950 rounded-2xl font-black hover:bg-green-50 transition-all shadow-2xl group"
                            >
                                Lihat Semua Layanan{" "}
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Schedule Card */}
                        <div className="relative">
                            <div className="absolute -inset-6 bg-green-500/20 rounded-[3rem] blur-3xl"></div>
                            <div className="relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden shadow-black/40">
                                <div className="bg-green-600 p-8 text-white">
                                    <h4 className="text-xl font-bold flex items-center gap-3">
                                        <Calendar className="w-6 h-6" /> Jadwal
                                        Terdekat
                                    </h4>
                                </div>
                                <div className="p-8 space-y-8">
                                    {jadwalTerdekat.length > 0 ? (
                                        jadwalTerdekat
                                            .slice(0, 3)
                                            .map((jadwal, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex gap-6 items-start group/item"
                                                >
                                                    <div className="flex-shrink-0 w-16 h-16 bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-500 group-hover/item:bg-green-600 group-hover/item:text-white transition-all duration-300">
                                                        <span className="text-[10px] font-black uppercase tracking-tighter">
                                                            Bulan
                                                        </span>
                                                        <span className="text-2xl font-black leading-none">
                                                            {new Date(
                                                                jadwal.tanggal_mulai,
                                                            ).getDate()}
                                                        </span>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h5 className="font-bold text-slate-800 text-lg group-hover/item:text-green-700 transition-colors leading-tight mb-2">
                                                            {jadwal.lokasi}
                                                        </h5>
                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-400 text-xs font-bold">
                                                            <span className="flex items-center gap-1.5">
                                                                <Clock className="w-4 h-4 text-green-600" />{" "}
                                                                {
                                                                    jadwal.waktu_mulai
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                    jadwal.waktu_akhir
                                                                }{" "}
                                                                WIB
                                                            </span>
                                                            <span className="flex items-center gap-1.5">
                                                                <Calendar className="w-4 h-4 text-green-600" />{" "}
                                                                {formatTanggalRange(
                                                                    jadwal.tanggal_mulai,
                                                                    jadwal.tanggal_akhir,
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="py-12 text-center text-slate-400 italic">
                                            Jadwal kunjungan sedang diperbarui.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Preview */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest mb-4">
                                <Images className="w-3 h-3" /> Visual
                                Dokumentasi
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                                Aktivitas Terkini
                            </h2>
                            <p className="text-slate-500 font-medium">
                                Potret Kegiatan yang Kami Lakukan.
                            </p>
                        </div>
                        <Link
                            href="/media/galeri"
                            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all flex items-center gap-2 group"
                        >
                            Buka Galeri{" "}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {dokumentasiTerbaru.slice(0, 6).map((item: any) => (
                            <div
                                key={item.id_galeri}
                                className="group relative aspect-square overflow-hidden rounded-3xl bg-slate-100 border border-slate-100 shadow-sm"
                            >
                                <img
                                    src={
                                        item.gambar.startsWith("/storage/")
                                            ? item.path_file
                                            : `/storage/${item.gambar}`
                                    }
                                    alt="Dokumentasi"
                                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-green-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="p-3 bg-white rounded-full text-green-900 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            {/* CSS Animation */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes soft-zoom {
                    0% { transform: scale(1.0); }
                    100% { transform: scale(1.15); }
                }
            `,
                }}
            />
        </div>
    );
}
