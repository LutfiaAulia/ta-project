import React, { useState, useEffect } from "react";
import {
    FaTh,
    FaClipboardList,
    FaStore,
    FaFileAlt,
    FaInbox,
    FaShareSquare,
    FaUsersCog,
    FaCar,
    FaUserTie,
    FaShoppingBag,
    FaChevronDown,
    FaTags,
    FaLayerGroup,
} from "react-icons/fa";
import { Link, usePage } from "@inertiajs/react";

const Sidebar: React.FC = () => {
    const { auth } = usePage().props as any;
    const role: string = auth?.role || "";

    const [openMK, setOpenMK] = useState(false);
    const [openSurat, setOpenSurat] = useState(false);
    const [openUmkm, setOpenUmkm] = useState(false);
    const [openAdmin, setOpenAdmin] = useState(false);
    const [akunOpen, setAkunOpen] = useState(false);
    const [openHU, setOpenHU] = useState(false);

    const currentUrl = new URL(window.location.href);
    const typeParam = currentUrl.searchParams.get("type");
    const isAkunActive = route().current("user.show");

    useEffect(() => {
        // Group: Mobil Klinik
        if (
            route().current("booking.listBooking") ||
            route().current("bookinglaksana.list") ||
            route().current("laporan.list")
        ) {
            setOpenMK(true);
        }

        // Group: Surat Menyurat
        if (
            route().current("surat.list") ||
            route().current("disposisi.list")
        ) {
            setOpenSurat(true);
        }

        // Group: UMKM
        if (
            route().current("kategori.list") ||
            route().current("pegawai.kelola.promosi")
        ) {
            setOpenUmkm(true);
        }

        // Group: Admin (termasuk Kelola Akun)
        if (
            route().current("bidang.list") ||
            route().current("layanan.list") ||
            route().current("legpro.list") ||
            route().current("mobil.list") ||
            route().current("sopir.list") ||
            route().current("user.show")
        ) {
            setOpenAdmin(true);

            if (route().current("user.show")) {
                setAkunOpen(true);
            }
        }

        // Group: HU
        if (
            route().current("berita.list") ||
            route().current("pegawai.kelola.promosi")
        ) {
            setOpenHU(true);
        }
    }, []);

    const canAccess = (roles: string[]) => roles.includes(role);

    const getDashboardRoute = () => {
        switch (role) {
            case "Admin":
                return route("admin.dashboard");
            case "Kepala Dinas":
                return route("kadin.dashboard");
            case "Kepala Bidang":
                return route("kabid.dashboard");
            case "Pegawai Lapangan":
                return route("lapangan.dashboard");
            case "Administrasi Umum":
                return route("adm.dashboard");
            default:
                return route("pegawai.login.form");
        }
    };

    const baseItem =
        "flex items-center gap-4 p-2.5 rounded-lg transition-all duration-200 text-sm";

    const hover =
        "hover:bg-green-600 hover:shadow-md hover:scale-[1.01] cursor-pointer";

    const active = "bg-green-600 shadow-lg text-white font-semibold";

    const subItem =
        "flex items-center gap-3 p-2 rounded-lg transition-all duration-200 text-xs";
    const subHover = "hover:bg-green-500 hover:text-white cursor-pointer";
    const subActive = "bg-green-500 text-white font-medium";

    const groupHeader =
        "flex justify-between items-center px-3 py-2 mt-3 text-sm font-bold bg-green-800 rounded-lg hover:bg-green-600 cursor-pointer shadow-md";

    return (
        <div className="w-64 h-screen bg-green-700 text-white flex flex-col fixed shadow-2xl z-20">
            {/* Header */}
            <div className="w-64 h-[74px] flex items-center gap-3 px-4 bg-green-800 shadow-xl border-b border-green-600">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                <div className="text-base font-extrabold leading-tight">
                    <p>Dinas Koperasi UKM</p>
                    <p>Sumatera Barat</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
                {/* ==================== DASHBOARD ==================== */}
                <Link
                    href={getDashboardRoute()}
                    className={`${baseItem} ${
                        route().current(
                            `${role.toLowerCase().replace(" ", "")}.dashboard`
                        ) && !window.location.href.includes("user/show")
                            ? active
                            : hover
                    } font-medium`}
                >
                    <FaTh className="text-base" />
                    <span>Beranda</span>
                </Link>
                <hr className="my-2 border-green-600/50" />

                {/* ==================== GRUP: MOBIL KLINIK ==================== */}
                {canAccess(["Admin", "Kepala Bidang", "Pegawai Lapangan"]) && (
                    <div>
                        <div
                            className={groupHeader}
                            onClick={() => setOpenMK(!openMK)}
                        >
                            <span className="flex items-center gap-3">
                                <FaCar /> Mobil Klinik
                            </span>
                            <FaChevronDown
                                className={`transition-transform duration-300 ${
                                    openMK ? "rotate-180" : ""
                                }`}
                            />
                        </div>

                        {openMK && (
                            <div className="ml-4 mt-1 space-y-1">
                                {canAccess([
                                    "Admin",
                                    "Kepala Bidang",
                                    "Pegawai Lapangan",
                                ]) && (
                                    <Link
                                        href={route("booking.listBooking")}
                                        className={`${subItem} ${
                                            route().current(
                                                "booking.listBooking"
                                            )
                                                ? subActive
                                                : subHover
                                        }`}
                                    >
                                        <FaClipboardList className="text-xs" />
                                        List Booking
                                    </Link>
                                )}

                                {canAccess(["Admin", "Pegawai Lapangan"]) && (
                                    <Link
                                        href={route("bookinglaksana.list")}
                                        className={`${subItem} ${
                                            route().current(
                                                "bookinglaksana.list"
                                            )
                                                ? subActive
                                                : subHover
                                        }`}
                                    >
                                        <FaStore className="text-xs" /> Data
                                        Pelaksanaan
                                    </Link>
                                )}

                                {canAccess([
                                    "Admin",
                                    "Kepala Bidang",
                                    "Kepala Dinas",
                                    "Pegawai Lapangan",
                                ]) && (
                                    <Link
                                        href={route("laporan.list")}
                                        className={`${subItem} ${
                                            route().current("laporan.list")
                                                ? subActive
                                                : subHover
                                        }`}
                                    >
                                        <FaFileAlt className="text-xs" />
                                        Laporan
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* ==================== GRUP: SURAT MENYURAT ==================== */}
                {canAccess(["Administrasi Umum", "Kepala Dinas"]) && (
                    <div>
                        <div
                            className={groupHeader}
                            onClick={() => setOpenSurat(!openSurat)}
                        >
                            <span className="flex items-center gap-3">
                                <FaInbox /> Surat Menyurat
                            </span>
                            <FaChevronDown
                                className={`transition-transform duration-300 ${
                                    openSurat ? "rotate-180" : ""
                                }`}
                            />
                        </div>

                        {openSurat && (
                            <div className="ml-4 mt-1 space-y-1">
                                <Link
                                    href={route("surat.list")}
                                    className={`${subItem} ${
                                        route().current("surat.list")
                                            ? subActive
                                            : subHover
                                    }`}
                                >
                                    <FaInbox className="text-xs" /> Surat Masuk
                                </Link>

                                <Link
                                    href={route("disposisi.list")}
                                    className={`${subItem} ${
                                        route().current("disposisi.list")
                                            ? subActive
                                            : subHover
                                    }`}
                                >
                                    <FaShareSquare className="text-xs" />
                                    Disposisi
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* ==================== GRUP: PROMOSI UMKM ==================== */}
                {canAccess(["Admin"]) && (
                    <div>
                        <div
                            className={groupHeader}
                            onClick={() => setOpenUmkm(!openUmkm)}
                        >
                            <span className="flex items-center gap-3">
                                <FaShoppingBag /> Manajemen Promosi UMKM
                            </span>
                            <FaChevronDown
                                className={`transition-transform duration-300 ${
                                    openUmkm ? "rotate-180" : ""
                                }`}
                            />
                        </div>

                        {openUmkm && (
                            <div className="ml-4 mt-1 space-y-1">
                                <Link
                                    href={route("kategori.list")}
                                    className={`${subItem} ${
                                        route().current("kategori.list")
                                            ? subActive
                                            : subHover
                                    }`}
                                >
                                    <FaTags className="text-xs" /> Kelola
                                    Kategori
                                </Link>

                                <Link
                                    href={route("pegawai.kelola.promosi")}
                                    className={`${subItem} ${
                                        route().current(
                                            "pegawai.kelola.promosi"
                                        )
                                            ? subActive
                                            : subHover
                                    }`}
                                >
                                    <FaShoppingBag className="text-xs" /> Kelola
                                    Promosi
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* ==================== GRUP: MANAJEMEN DATA (ADMIN) ==================== */}
                {canAccess(["Admin"]) && (
                    <div>
                        <div
                            className={groupHeader}
                            onClick={() => setOpenAdmin(!openAdmin)}
                        >
                            <span className="flex items-center gap-3">
                                <FaUsersCog /> Manajemen Data
                            </span>
                            <FaChevronDown
                                className={`transition-transform duration-300 ${
                                    openAdmin ? "rotate-180" : ""
                                }`}
                            />
                        </div>

                        {openAdmin && (
                            <div className="ml-4 mt-1 space-y-1">
                                {/* Kelola Akun */}
                                <button
                                    onClick={() => setAkunOpen(!akunOpen)}
                                    className={`${baseItem} justify-between w-full p-2 ${
                                        isAkunActive || akunOpen
                                            ? active
                                            : hover
                                    }`}
                                >
                                    <span className="flex items-center gap-4 text-sm font-medium">
                                        <FaUsersCog className="text-base" />{" "}
                                        Kelola Akun
                                    </span>
                                    <FaChevronDown
                                        className={`transition-transform duration-300 ${
                                            akunOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                {akunOpen && (
                                    <div className="ml-4 mt-1 space-y-1 border-l border-green-600/50 pl-2">
                                        <Link
                                            href={route("user.show", {
                                                type: "pegawai",
                                            })}
                                            className={`${subItem} ${
                                                isAkunActive &&
                                                typeParam === "pegawai"
                                                    ? subActive
                                                    : subHover
                                            }`}
                                        >
                                            <FaUserTie className="text-xs" />
                                            Pegawai
                                        </Link>

                                        <Link
                                            href={route("user.show", {
                                                type: "instansi",
                                            })}
                                            className={`${subItem} ${
                                                isAkunActive &&
                                                typeParam === "instansi"
                                                    ? subActive
                                                    : subHover
                                            }`}
                                        >
                                            <FaUsersCog className="text-xs" />
                                            Instansi
                                        </Link>

                                        <Link
                                            href={route("user.show", {
                                                type: "umkm",
                                            })}
                                            className={`${subItem} ${
                                                isAkunActive &&
                                                typeParam === "umkm"
                                                    ? subActive
                                                    : subHover
                                            }`}
                                        >
                                            <FaUsersCog className="text-xs" />
                                            UMKM
                                        </Link>
                                    </div>
                                )}

                                {/* Menu Admin lainnya */}
                                <Link
                                    href={route("bidang.list")}
                                    className={`${subItem} ${
                                        route().current("bidang.list")
                                            ? subActive
                                            : subHover
                                    }`}
                                >
                                    <FaLayerGroup className="text-xs" /> Kelola
                                    Bidang Layanan
                                </Link>

                                <Link
                                    href={route("layanan.list")}
                                    className={`${subItem} ${
                                        route().current("layanan.list")
                                            ? subActive
                                            : subHover
                                    }`}
                                >
                                    <FaFileAlt className="text-xs" /> Kelola
                                    Layanan
                                </Link>

                                <Link
                                    href={route("legpro.list")}
                                    className={`${subItem} ${
                                        route().current("legpro.list")
                                            ? subActive
                                            : subHover
                                    }`}
                                >
                                    <FaFileAlt className="text-xs" /> Kelola
                                    Legalitas Produk
                                </Link>

                                <Link
                                    href={route("mobil.list")}
                                    className={`${subItem} ${
                                        route().current("mobil.list")
                                            ? subActive
                                            : subHover
                                    }`}
                                >
                                    <FaCar className="text-xs" /> Kelola Mobil
                                </Link>

                                <Link
                                    href={route("sopir.list")}
                                    className={`${subItem} ${
                                        route().current("sopir.list")
                                            ? subActive
                                            : subHover
                                    }`}
                                >
                                    <FaUserTie className="text-xs" /> Kelola
                                    Sopir
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* ==================== GRUP: MANAJEMEN HU ==================== */}
                {canAccess(["Admin"]) && (
                    <div>
                        <div
                            className={groupHeader}
                            onClick={() => setOpenHU(!openHU)}
                        >
                            <span className="flex items-center gap-3">
                                <FaShoppingBag /> Manajemen Halaman Utama
                            </span>
                            <FaChevronDown
                                className={`transition-transform duration-300 ${
                                    openHU ? "rotate-180" : ""
                                }`}
                            />
                        </div>

                        {openHU && (
                            <div className="ml-4 mt-1 space-y-1">
                                <Link
                                    href={route("berita.list")}
                                    className={`${subItem} ${
                                        route().current("berita.list")
                                            ? subActive
                                            : subHover
                                    }`}
                                >
                                    <FaTags className="text-xs" /> Kelola Berita
                                </Link>

                                <Link
                                    href={route("profil-organisasi.show")}
                                    className={`${subItem} ${
                                        route().current(
                                            "profil-organisasi.show"
                                        )
                                            ? subActive
                                            : subHover
                                    }`}
                                >
                                    <FaShoppingBag className="text-xs" /> Kelola
                                    Profil Organisasi
                                </Link>

                                <Link
                                    href={route("index.galeri")}
                                    className={`${subItem} ${
                                        route().current(
                                            "index.galeri"
                                        )
                                            ? subActive
                                            : subHover
                                    }`}
                                >
                                    <FaShoppingBag className="text-xs" /> Kelola
                                    Galeri
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
