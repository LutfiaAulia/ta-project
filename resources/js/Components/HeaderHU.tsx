import { useState, useEffect } from "react";
import { Link} from "@inertiajs/react";
import {
    Menu,
    X,
    ChevronRight,
    Home as HomeIcon,
    ClipboardList,
    Truck,
    Store,
} from "lucide-react";

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div>
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
        </div>
    );
}
