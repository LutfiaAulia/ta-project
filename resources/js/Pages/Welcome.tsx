import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Calendar,
    Users,
    Award,
    MapPin,
    Phone,
    Mail,
    Menu,
    X,
    ChevronRight,
    CheckCircle,
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

interface PageProps {
    layanan: Record<string, LayananItem[]>;
    jadwalTerdekat: Jadwal[];
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

    const {
        layanan,
        jadwalTerdekat,
        umkmTerlayani,
        nagariTerliput,
        jumlahInstansi,
        jumlahUmkm,
        dokumentasiTerbaru,
    } = usePage().props as unknown as {
        layanan: Record<string, LayananItem[]>;
        jadwalTerdekat: Jadwal[];
        umkmTerlayani: number;
        nagariTerliput: number;
        jumlahInstansi: number;
        jumlahUmkm: number;
        dokumentasiTerbaru: any;
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const services = [
        {
            icon: <Users className="w-8 h-8" />,
            title: "Konsultasi Usaha",
            description:
                "Pendampingan dan konsultasi untuk mengembangkan usaha UMKM Anda",
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Legalitas NIB",
            description:
                "Bantuan pengurusan Nomor Induk Berusaha dan perizinan usaha",
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Sertifikat Halal",
            description:
                "Fasilitasi pengurusan sertifikat halal untuk produk UMKM",
        },
    ];

    const stats = [
        { number: `${umkmTerlayani}`, label: "UMKM Terlayani" },
        { number: `${nagariTerliput}`, label: "Nagari Terjangkau" },
        { number: `${jumlahInstansi}`, label: "Instansi Terdaftar" },
        { number: `${jumlahUmkm}`, label: "UMKM Promosi" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 text-gray-800">
            {/* Header */}
            <header className="bg-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-16 h-16 bg-white rounded-lg shadow p-2">
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div>
                                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                                    Dinas Koperasi, Usaha Kecil, dan Menengah
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Provinsi Sumatera Barat
                                </p>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div
                            className={`transform transition-all duration-1000 ${
                                isVisible
                                    ? "translate-x-0 opacity-100"
                                    : "-translate-x-10 opacity-0"
                            }`}
                        >
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                Mendekatkan Pelayanan,
                                <br />
                                <span className="text-green-200">
                                    Mendukung UMKM
                                </span>{" "}
                                Berkembang
                            </h2>
                            <p className="text-green-100 mb-8 text-lg max-w-lg">
                                Pelayanan langsung ke masyarakat melalui mobil
                                klinik dan promosi produk-produk lokal unggulan.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/login"
                                    className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                                >
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Booking Mobil Klinik
                                </Link>

                                <Link
                                    href="/list/umkm/promosi"
                                    className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-400 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                                >
                                    Lihat Produk UMKM
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Link>
                            </div>
                        </div>
                        <div
                            className={`flex justify-center lg:justify-end transform transition-all duration-1000 delay-300 ${
                                isVisible
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-10 opacity-0"
                            }`}
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 bg-white rounded-2xl opacity-20 transform rotate-6"></div>
                                <img
                                    src="/images/mobilklinik.jpg"
                                    alt="Mobil Klinik UMKM"
                                    className="relative max-h-80 w-full object-cover rounded-2xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Layanan Unggulan Kami
                        </h3>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Berbagai layanan profesional untuk mendukung
                            pertumbuhan dan legalitas usaha UMKM Anda
                        </p>
                    </div>
                    {Object.entries(layanan).length === 0 && (
                        <p className="text-center text-gray-500">
                            Tidak ada layanan saat ini.
                        </p>
                    )}
                    {Object.entries(layanan).map(([bidang, daftarLayanan]) => (
                        <div key={bidang} className="mb-12">
                            <h4 className="text-2xl font-bold mb-6">
                                {bidang}
                            </h4>

                            {daftarLayanan.length === 0 ? (
                                <p className="text-gray-500 italic">
                                    Tidak ada layanan.
                                </p>
                            ) : (
                                <div className="grid md:grid-cols-3 gap-6">
                                    {daftarLayanan.map((item) => (
                                        <div
                                            key={item.id_layanan}
                                            className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1"
                                        >
                                            <h5 className="text-xl font-semibold mb-2">
                                                {item.layanan}
                                            </h5>
                                            <p className="text-gray-600 text-sm">
                                                {item.deskripsi_layanan}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Mobile Clinic Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Layanan Mobil Klinik untuk Masyarakat
                            </h3>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                Mobil klinik UMKM memberikan layanan konsultasi
                                usaha, legalitas seperti NIB, perizinan halal,
                                hingga akses permodalan langsung ke daerah Anda.
                            </p>

                            <div className="bg-green-50 rounded-xl p-6 mb-8">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-green-600" />
                                    Jadwal Layanan Terdekat
                                </h4>
                                <div className="space-y-3">
                                    {jadwalTerdekat.length === 0 && (
                                        <p className="text-gray-600">
                                            Tidak ada jadwal terdekat.
                                        </p>
                                    )}
                                    {jadwalTerdekat.map((jadwal, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-white rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {jadwal.lokasi}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {formatTanggalRange(
                                                        jadwal.tanggal_mulai,
                                                        jadwal.tanggal_akhir
                                                    )}
                                                </p>
                                            </div>
                                            <span className="text-green-600 text-sm font-medium">
                                                {jadwal.waktu_mulai} -{" "}
                                                {jadwal.waktu_akhir}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 blur-lg"></div>
                                <img
                                    src="/images/mobilklinik.jpg"
                                    alt="Mobil Klinik UMKM"
                                    className="relative rounded-full w-80 h-80 object-cover shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dokumentasi Terbaru Slider */}
            <section className="bg-white py-8 border-t border-gray-200">
                <div className="overflow-hidden whitespace-nowrap relative">
                    <div className="animate-scroll flex items-center space-x-6">
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
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 overflow-hidden">
                                    <img
                                        src="/logo.png"
                                        alt="Logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div>
                                    <h4 className="font-bold">
                                        Dinas Koperasi dan UMKM
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        Provinsi Sumatera Barat
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-4 max-w-md">
                                Mendukung pertumbuhan UMKM melalui layanan
                                terpadu dan inovasi yang berkelanjutan.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Layanan</h5>
                            <ul className="space-y-2 text-gray-400">
                                {Object.values(layanan).flat().length === 0 && (
                                    <li className="text-gray-500 italic">
                                        Tidak ada layanan.
                                    </li>
                                )}

                                {Object.values(layanan)
                                    .flat()
                                    .map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href="#"
                                                className="hover:text-white transition-colors"
                                            >
                                                {item.layanan}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Kontak</h5>
                            <div className="space-y-2 text-gray-400">
                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    <span className="text-sm">
                                        Jl.Khatib Sulaiman No.11, Padang,
                                        Sumatera Barat
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2" />
                                    <span className="text-sm">
                                        (0751) 7055292-7055298
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span className="text-sm">
                                        info@diskopumkm-sumbar.go.id
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 Dinas Koperasi dan UMKM Provinsi Sumatera
                            Barat. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
