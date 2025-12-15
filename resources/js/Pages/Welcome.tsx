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
    Home as HomeIcon,
    ClipboardList,
    Truck,
    Store,
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

interface SubItem {
    name: string;
    href: string;
}

interface NavItem {
    name: string;
    href: string;
    icon: any;
    subItems?: SubItem[];
}
interface Berita {
    id_berita: number;
    judul: string;
    tanggal_publikasi: string;
    ringkasan: string;
    gambar: string;
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

// Data Menu Navigasi
const navItems: NavItem[] = [
    { name: "Home", href: "/", icon: HomeIcon },
    {
        name: "Profile",
        href: "#",
        icon: ClipboardList,
        subItems: [
            {
                name: "Struktur Organisasi",
                href: "/profile/struktur-organisasi",
            },
            { name: "Tugas dan Fungsi", href: "/profile/tugas-dan-fungsi" },
            { name: "Visi dan Misi", href: "/profile/visi-dan-misi" },
            { name: "Maklumat Pelayanan", href: "/profile/maklumat-pelayanan" },
        ],
    },
    { name: "Mobil Klinik", href: "/login", icon: Truck },
    { name: "Promosi UKM", href: "/list/umkm/promosi", icon: Store },
];

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

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

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

                        {/* Navigasi Desktop */}
                        <nav className="hidden md:flex space-x-8">
                            {navItems.map((item) => (
                                <div
                                    key={item.name}
                                    className="relative h-full"
                                    onMouseEnter={() =>
                                        item.name === "Profile" &&
                                        setIsProfileDropdownOpen(true)
                                    }
                                    onMouseLeave={() =>
                                        item.name === "Profile" &&
                                        setIsProfileDropdownOpen(false)
                                    }
                                >
                                    {/* Link Menu Utama */}
                                    <Link
                                        href={item.href}
                                        className="text-gray-600 hover:text-green-600 font-medium transition-colors text-lg flex items-center py-4" // Tambahkan padding vertikal agar mudah dijangkau kursor
                                    >
                                        {item.name}
                                        {item.subItems && (
                                            <ChevronRight
                                                className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
                                                    isProfileDropdownOpen
                                                        ? "rotate-90"
                                                        : "rotate-0"
                                                }`}
                                            />
                                        )}
                                    </Link>

                                    {/* Dropdown Menu Desktop */}
                                    {item.subItems && isProfileDropdownOpen && (
                                        <div className="absolute top-full left-0 w-56 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-20 origin-top-left">
                                            <div className="py-1">
                                                {item.subItems.map(
                                                    (subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                                                            onClick={() =>
                                                                setIsProfileDropdownOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

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

                {/* Navigasi Mobile (Conditional) */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${
                        isMenuOpen
                            ? "max-h-screen opacity-100 py-2"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <div key={item.name}>
                                <button
                                    onClick={() => {
                                        if (item.subItems) {
                                            item.name === "Profile" &&
                                                setIsProfileDropdownOpen(
                                                    !isProfileDropdownOpen
                                                );
                                        } else {
                                            setIsMenuOpen(false);
                                        }
                                    }}
                                    className={`w-full text-left ${
                                        item.subItems
                                            ? "text-gray-900 font-semibold"
                                            : "text-gray-700"
                                    } hover:bg-green-50 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center justify-between`}
                                >
                                    <span className="flex items-center">
                                        <item.icon className="w-5 h-5 mr-3" />
                                        {item.name}
                                    </span>
                                    {item.subItems && (
                                        <ChevronRight
                                            className={`w-4 h-4 transform transition-transform duration-200 ${
                                                isProfileDropdownOpen
                                                    ? "rotate-90"
                                                    : "rotate-0"
                                            }`}
                                        />
                                    )}
                                </button>

                                {/* Sub-menu Mobile */}
                                {item.subItems && (
                                    <div
                                        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                                            isProfileDropdownOpen &&
                                            item.name === "Profile"
                                                ? "max-h-40 mt-1" // Atur max-h secukupnya agar cukup menampung semua sub-menu
                                                : "max-h-0"
                                        }`}
                                    >
                                        <div className="pl-8 pt-1 pb-1 space-y-1">
                                            {item.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    onClick={() =>
                                                        setIsMenuOpen(false)
                                                    }
                                                    className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md text-sm font-normal"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </header>

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
                                    href={`/berita/${mainNews.id_berita}`}
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
                                                {formatTanggalPublikasi(mainNews.tanggal_publikasi)}
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
                                            href={`/berita/${berita.id_berita}`}
                                            className="block hover:bg-green-50 p-2 -m-2 rounded transition-colors group"
                                        >
                                            <p className="font-semibold text-gray-800 group-hover:text-green-700 line-clamp-2">
                                                {berita.judul}
                                            </p>
                                            <span className="text-xs text-gray-500 flex items-center mt-0.5">
                                                <Calendar className="w-3 h-3 inline mr-1" />
                                                {formatTanggalPublikasi(berita.tanggal_publikasi)}
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
                            <a className="text-gray-400 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </a>
                            <a className="text-gray-400 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
