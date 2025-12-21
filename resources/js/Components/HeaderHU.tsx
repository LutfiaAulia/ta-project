import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import {
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    ClipboardList,
    Truck,
    Store,
    LayoutGrid,
    Briefcase,
} from "lucide-react";

interface SubItem {
    name: string;
    href: string;
}

interface NavItem {
    name: string;
    href: string;
    icon: any;
    id: string;
    subItems?: SubItem[];
}

const navItems: NavItem[] = [
    {
        name: "Profil",
        href: "#",
        id: "profil",
        icon: ClipboardList,
        subItems: [
            {
                name: "Struktur & Maklumat",
                href: "/profile/struktur-organisasi",
            },
            { name: "Tugas dan Fungsi", href: "/profile/tugas-dan-fungsi" },
            { name: "Visi dan Misi", href: "/profile/visi-dan-misi" },
        ],
    },
    { name: "Layanan", href: "/layanan", icon: Briefcase, id: "layanan" },
    { name: "Mobil Klinik", href: "/login", icon: Truck, id: "mobil" },
    {
        name: "Promosi UKM",
        href: "/list/umkm/promosi",
        icon: Store,
        id: "promosi",
    },
    {
        name: "Media",
        href: "#",
        id: "media",
        icon: LayoutGrid,
        subItems: [
            { name: "Berita", href: "/berita" },
            { name: "Galeri Kegiatan", href: "/media/galeri" },
        ],
    },
];

export default function HeaderHU() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-[100] transition-all duration-300 ${
                scrolled
                    ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200 py-2"
                    : "bg-white py-4"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo & Brand */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-green-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <img
                                src="/logo plut.png"
                                alt="Logo"
                                className="relative w-12 h-12 md:w-14 md:h-14 object-contain transition-transform group-hover:scale-105"
                            />
                        </div>

                        <div className="hidden sm:block">
                            <h1 className="text-sm md:text-base font-black text-slate-800 leading-tight tracking-tight uppercase">
                                PLUT-KUMKM
                            </h1>
                            <p className="text-[10px] md:text-xs font-bold text-green-600 tracking-[0.15em] uppercase">
                                Provinsi Sumatera Barat
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <div
                                key={item.id}
                                className="relative group/nav"
                                onMouseEnter={() => setOpenDropdown(item.id)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                        openDropdown === item.id
                                            ? "bg-green-50 text-green-700"
                                            : "text-slate-600 hover:text-green-600 hover:bg-slate-50"
                                    }`}
                                >
                                    {item.name}
                                    {item.subItems && (
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${
                                                openDropdown === item.id
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    )}
                                </Link>

                                {/* Dropdown Desktop */}
                                {item.subItems && openDropdown === item.id && (
                                    <div className="absolute top-full left-0 w-64 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden p-2">
                                            {item.subItems.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-green-600 hover:text-white transition-all group/sub"
                                                >
                                                    {sub.name}
                                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover/sub:opacity-100 -translate-x-2 group-hover/sub:translate-x-0 transition-all" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="ml-4 pl-4 border-l border-slate-200">
                            <Link
                                href="/pegawai/login"
                                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-green-600 transition-colors shadow-lg shadow-slate-200"
                            >
                                Masuk
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-slate-100 ${
                    isMenuOpen
                        ? "max-h-[80vh] opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <div key={item.id} className="space-y-1">
                            {item.subItems ? (
                                <>
                                    <button
                                        onClick={() =>
                                            setOpenDropdown(
                                                openDropdown === item.id
                                                    ? null
                                                    : item.id
                                            )
                                        }
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${
                                            openDropdown === item.id
                                                ? "bg-green-50 text-green-700"
                                                : "bg-slate-50 text-slate-700"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5 text-green-600" />
                                            {item.name}
                                        </div>
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform ${
                                                openDropdown === item.id
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                    <div
                                        className={`pl-12 space-y-1 overflow-hidden transition-all duration-300 ${
                                            openDropdown === item.id
                                                ? "max-h-48 py-2"
                                                : "max-h-0"
                                        }`}
                                    >
                                        {item.subItems.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className="block py-3 text-sm font-semibold text-slate-500 hover:text-green-600"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 text-slate-700 font-bold hover:bg-green-50 hover:text-green-700 transition-all"
                                >
                                    <item.icon className="w-5 h-5 text-green-600" />
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}
                    <div className="pt-4">
                        <Link
                            href="/login"
                            className="block w-full py-4 bg-green-600 text-white text-center rounded-2xl font-bold shadow-lg shadow-green-100"
                        >
                            Masuk Ke Sistem
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
