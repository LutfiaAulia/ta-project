import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import {
    Menu,
    X,
    ChevronRight,
    Home as HomeIcon,
    ClipboardList,
    Truck,
    Store,
    Newspaper,
    Image as ImageIcon,
    LayoutGrid,
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

// Data Menu Navigasi
const navItems: NavItem[] = [
    {
        name: "Profil",
        href: "#",
        id: "profil",
        icon: ClipboardList,
        subItems: [
            {
                name: "Struktur Organisasi dan Maklumat Pelayanan",
                href: "/profile/struktur-organisasi",
            },
            { name: "Tugas dan Fungsi", href: "/profile/tugas-dan-fungsi" },
            { name: "Visi dan Misi", href: "/profile/visi-dan-misi" },
        ],
    },
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
            { name: "Galeri", href: "/profile/galeri" },
        ],
    },
];

export default function Welcome() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div>
            <header className="bg-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 group transition-opacity hover:opacity-90"
                        >
                            <div className="w-16 h-16 bg-white rounded-lg shadow p-2 group-hover:shadow-md transition-shadow">
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div>
                                <h1 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-green-600 transition-colors">
                                    Dinas Koperasi, Usaha Kecil, dan Menengah
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Provinsi Sumatera Barat
                                </p>
                            </div>
                        </Link>

                        {/* Navigasi Desktop */}
                        <nav className="hidden md:flex space-x-8 h-full">
                            {navItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative flex items-center"
                                    onMouseEnter={() =>
                                        item.subItems &&
                                        setOpenDropdown(item.id)
                                    }
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-gray-600 hover:text-green-600 font-medium transition-colors text-lg flex items-center py-4"
                                    >
                                        {item.name}
                                        {item.subItems && (
                                            <ChevronRight
                                                className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
                                                    openDropdown === item.id
                                                        ? "rotate-90"
                                                        : "rotate-0"
                                                }`}
                                            />
                                        )}
                                    </Link>

                                    {/* Dropdown Menu Desktop */}
                                    {item.subItems &&
                                        openDropdown === item.id && (
                                            <div className="absolute top-full left-0 w-64 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 z-20 py-2 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                                {item.subItems.map(
                                                    (subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors font-medium border-l-4 border-transparent hover:border-green-500"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    )
                                                )}
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

                {/* Navigasi Mobile */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${
                        isMenuOpen
                            ? "max-h-screen opacity-100 py-4 bg-gray-50 border-t"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="px-4 space-y-1">
                        {navItems.map((item) => (
                            <div key={item.id} className="py-1">
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
                                            className="w-full flex items-center justify-between p-3 rounded-xl text-gray-900 font-bold hover:bg-green-100 transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <item.icon className="w-5 h-5 mr-3 text-green-600" />
                                                {item.name}
                                            </div>
                                            <ChevronRight
                                                className={`w-4 h-4 transform transition-transform ${
                                                    openDropdown === item.id
                                                        ? "rotate-90"
                                                        : ""
                                                }`}
                                            />
                                        </button>
                                        <div
                                            className={`pl-12 space-y-1 overflow-hidden transition-all ${
                                                openDropdown === item.id
                                                    ? "max-h-60 mt-2 mb-4"
                                                    : "max-h-0"
                                            }`}
                                        >
                                            {item.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    onClick={() =>
                                                        setIsMenuOpen(false)
                                                    }
                                                    className="block py-2 text-gray-600 hover:text-green-600 text-sm font-medium"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center p-3 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-bold transition-colors"
                                    >
                                        <item.icon className="w-5 h-5 mr-3 text-green-600" />
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </header>
        </div>
    );
}
