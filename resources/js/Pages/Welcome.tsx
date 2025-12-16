import Header from "@/Components/HeaderHU";
import Footer from "@/Components/FooterHU";
import { Link, usePage } from "@inertiajs/react";
import {
    Calendar,
    Award,
    ChevronRight,
    CheckCircle,
    Home as HomeIcon,
    ClipboardList,
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
}

export default function Welcome() {
    function formatTanggalRange(tanggalMulai: string, tanggalAkhir: string) {
        const start = new Date(tanggalMulai);
        const end = new Date(tanggalAkhir);

        const optionsDay = { day: "numeric" } as const;
        const optionsMonthYear = { month: "long", year: "numeric" } as const;

        if (
            start.getDate() === end.getDate() &&
            start.getMonth() === end.getMonth() &&
            start.getFullYear() === end.getFullYear()
        ) {
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
                optionsDay
            )}–${end.toLocaleDateString(
                "id-ID",
                optionsDay
            )} ${start.toLocaleDateString("id-ID", optionsMonthYear)}`;
        }

        return `${start.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })} – ${end.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })}`;
    }

    function formatTanggalPublikasi(tanggal: string): string {
        const datePart = tanggal.split(" ")[0];
        const date = new Date(datePart);

        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
        } as const;

        return date.toLocaleDateString("id-ID", options);
    }

    const {
        layanan,
        jadwalTerdekat,
        umkmTerlayani,
        nagariTerliput,
        jumlahInstansi,
        jumlahUmkm,
        dokumentasiTerbaru,
        mainNews,
        beritaLain,
    } = usePage().props as unknown as PageProps;

    const stats = [
        { number: `${umkmTerlayani}`, label: "UMKM Terlayani" },
        { number: `${nagariTerliput}`, label: "Nagari Terjangkau" },
        { number: `${jumlahInstansi}`, label: "Instansi Terdaftar" },
        { number: `${jumlahUmkm}`, label: "UMKM Promosi" },
    ];

    return (
        <div>
            <Header />
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
                <img
                    src="/images/mobilklinik.jpg"
                    alt="Pelayanan UMKM"
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                />
                <div className="relative max-w-4xl text-center p-8 z-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                        Mendekatkan Pelayanan, Mendukung UMKM Berkembang
                    </h1>
                    <p className="text-lg mb-8 opacity-90">
                        Pelayanan langsung ke masyarakat melalui mobil klinik
                        dan promosi produk-produk lokal unggulan.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-12 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <p className="text-4xl font-extrabold text-green-600">
                                    {stat.number}
                                </p>
                                <p className="text-gray-600 mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Berita Terbaru */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
                        Informasi Terbaru
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Kolom Berita Utama */}
                        {mainNews && (
                            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden">
                                <Link
                                    href={`/berita/${mainNews.slug}`}
                                    className="block group"
                                >
                                    <div className="grid md:grid-cols-2">
                                        <img
                                            src={
                                                mainNews?.gambar
                                                    ? mainNews.gambar.startsWith(
                                                          "/storage/"
                                                      )
                                                        ? mainNews.gambar
                                                        : `/storage/${mainNews.gambar}`
                                                    : "placeholder.jpg"
                                            }
                                            alt={
                                                mainNews?.judul ||
                                                "Gambar Berita"
                                            }
                                            className="w-full h-64 md:h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                                        />
                                        {/* Berita Utama Content */}
                                        <div className="p-6 flex flex-col justify-center">
                                            <h3 className="text-sm font-semibold text-blue-700 mb-1 flex items-center">
                                                <Award className="w-4 h-4 mr-1" />
                                                BERITA UTAMA
                                            </h3>
                                            <p className="text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-green-600 line-clamp-3">
                                                {mainNews.judul}
                                            </p>
                                            <span className="text-xs font-semibold text-gray-500 block mb-3">
                                                <Calendar className="w-3 h-3 inline mr-1 -mt-0.5" />
                                                {formatTanggalPublikasi(
                                                    mainNews.tanggal_publikasi
                                                )}
                                            </span>
                                            <p className="text-base text-gray-600 line-clamp-3">
                                                {mainNews.ringkasan}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="p-4 bg-gray-50 text-right">
                                    <Link
                                        href="/berita"
                                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center justify-end"
                                    >
                                        Lihat Arsip Berita
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Jika tidak ada Berita Utama */}
                        {!mainNews && (
                            <div className="lg:col-span-2 flex items-center justify-center p-8 bg-white rounded-2xl shadow-xl">
                                <p className="text-gray-500 italic">
                                    Belum ada Berita Utama yang tersedia.
                                </p>
                            </div>
                        )}

                        {/* List Berita Terbaru */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-4">
                            <h3 className="text-xl font-bold text-green-700 pb-4 mb-4 border-b border-gray-200 flex items-center">
                                <ClipboardList className="w-5 h-5 mr-2" />
                                Berita Lainnya
                            </h3>
                            <ul className="space-y-4">
                                {beritaLain.slice(0, 5).map((berita) => (
                                    <li key={berita.id_berita}>
                                        <Link
                                            href={`/berita/${berita.slug}`}
                                            className="block hover:bg-green-50 p-2 -m-2 rounded transition-colors group"
                                        >
                                            <p className="font-semibold text-gray-800 group-hover:text-green-700 line-clamp-2">
                                                {berita.judul}
                                            </p>
                                            <span className="text-xs text-gray-500 flex items-center mt-0.5">
                                                <Calendar className="w-3 h-3 inline mr-1" />
                                                {formatTanggalPublikasi(
                                                    berita.tanggal_publikasi
                                                )}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                                {beritaLain.length === 0 && (
                                    <li className="text-gray-600 italic text-sm">
                                        Belum ada berita lainnya yang tersedia.
                                    </li>
                                )}
                            </ul>
                            <div className="mt-6 text-center">
                                <Link
                                    href="/berita"
                                    className="text-gray-600 hover:text-gray-800 font-semibold text-sm underline"
                                >
                                    Lihat Semua Berita
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Layanan Unggulan */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        Layanan Unggulan Kami
                    </h2>
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <p className="text-lg text-gray-700 mb-4">
                                Mobil Klinik adalah program andalan kami untuk
                                mendekatkan layanan perizinan, konsultasi, dan
                                pendampingan UMKM langsung ke nagari-nagari.
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                                    Pelayanan Terpadu di lokasi
                                </li>
                                <li className="flex items-start text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                                    Pendaftaran NIB dan Halal di tempat
                                </li>
                                <li className="flex items-start text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                                    Konsultasi bisnis gratis
                                </li>
                            </ul>
                            <Link
                                href="/mobil-klinik"
                                className="text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition inline-flex items-center"
                            >
                                Lihat Detail Lengkap{" "}
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Clinic Section */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="relative p-4 bg-green-50 rounded-3xl shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
                                <img
                                    src="/images/mobilnya.jpg"
                                    alt="Mobil Klinik UMKM Sumatera Barat"
                                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                />
                            </div>
                        </div>

                        {/* Kolom Kiri */}
                        <div className="order-1 lg:order-2 ">
                            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                                Layanan Mobil Klinik Terdekat
                            </h3>

                            {/* Jadwal Terdekat */}
                            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 shadow-md">
                                <h4 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                                    <Calendar className="w-6 h-6 mr-3 text-blue-500" />
                                    Jadwal Terdekat Kami
                                </h4>
                                <div className="space-y-3">
                                    {jadwalTerdekat.slice(0, 3).length === 0 ? (
                                        <p className="text-gray-600 italic">
                                            Belum ada jadwal mobil klinik yang
                                            dirilis.
                                        </p>
                                    ) : (
                                        jadwalTerdekat
                                            .slice(0, 3)
                                            .map((jadwal, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-blue-200 last:border-b-0"
                                                >
                                                    <div className="mb-1 sm:mb-0">
                                                        <p className="font-semibold text-gray-900">
                                                            {jadwal.lokasi}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {formatTanggalRange(
                                                                jadwal.tanggal_mulai,
                                                                jadwal.tanggal_akhir
                                                            )}
                                                        </p>
                                                    </div>
                                                    <span className="text-blue-600 text-sm font-bold bg-blue-100 px-3 py-1 rounded-full">
                                                        {jadwal.waktu_mulai} -{" "}
                                                        {jadwal.waktu_akhir}
                                                    </span>
                                                </div>
                                            ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dokumentasi Terbaru */}
            <section className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Dokumentasi Terbaru
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {dokumentasiTerbaru.map((item: any) => {
                            const imgSrc = item.path_file.startsWith(
                                "/storage/"
                            )
                                ? item.path_file
                                : `/storage/${item.path_file}`;

                            return (
                                <div
                                    key={item.id_dokumentasi}
                                    className="inline-block min-w-[200px] max-w-[240px]"
                                >
                                    <img
                                        src={imgSrc}
                                        alt="Dokumentasi terbaru"
                                        className="rounded-lg h-40 w-full object-cover shadow"
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-center mt-8">
                        <Link
                            href="/galeri"
                            className="text-gray-600 hover:text-gray-800 font-semibold text-sm underline"
                        >
                            Lihat Semua Galeri
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
