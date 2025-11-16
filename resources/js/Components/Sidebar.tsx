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
    const [akunOpen, setAkunOpen] = useState(false);

    const { auth } = usePage().props as any;
    const role: string = auth?.role || "";

    const currentUrl = new URL(window.location.href);
    const typeParam = currentUrl.searchParams.get("type");
    const isAkunActive = route().current("user.show");

    useEffect(() => {
        if (isAkunActive) setAkunOpen(true);
    }, [isAkunActive]);

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
        "flex items-center gap-4 p-2.5 rounded-lg transition-all text-[15px]";
    const hover = "hover:bg-green-600 hover:text-white cursor-pointer";
    const active = "bg-green-600 text-white font-medium";

    return (
        <div className="w-64 h-screen bg-green-700 text-white flex flex-col fixed shadow-lg">
            {/* Header */}
            <div className="w-64 h-[74px] flex items-center gap-3 px-[18px] bg-green-800 shadow-md">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                <div className="text-sm font-medium leading-tight">
                    <p>Dinas Koperasi UKM</p>
                    <p>Sumatera Barat</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-hide">
                {/* Dashboard */}
                <Link
                    href={getDashboardRoute()}
                    className={`${baseItem} ${
                        route().current(
                            `${role.toLowerCase().replace(" ", "")}.dashboard`
                        ) && !window.location.href.includes("user/show")
                            ? active
                            : hover
                    }`}
                >
                    <FaTh />
                    <span>Beranda</span>
                </Link>

                {/* List Booking */}
                {canAccess(["Admin", "Kepala Bidang", "Pegawai Lapangan"]) && (
                    <Link
                        href={route("booking.listBooking")}
                        className={`${baseItem} ${
                            route().current("booking.listBooking")
                                ? active
                                : hover
                        }`}
                    >
                        <FaClipboardList />
                        <span>List Booking</span>
                    </Link>
                )}

                {/* Pelaksanaan */}
                {canAccess(["Admin", "Pegawai Lapangan"]) && (
                    <Link
                        href={route("bookinglaksana.list")}
                        className={`${baseItem} ${
                            route().current("bookinglaksana.list")
                                ? active
                                : hover
                        }`}
                    >
                        <FaStore />
                        <span>Data Pelaksanaan Mobil Klinik</span>
                    </Link>
                )}

                {/* Laporan */}
                {canAccess([
                    "Admin",
                    "Kepala Bidang",
                    "Kepala Dinas",
                    "Pegawai Lapangan",
                ]) && (
                    <Link
                        href={route("laporan.list")}
                        className={`${baseItem} ${
                            route().current("laporan.list") ? active : hover
                        }`}
                    >
                        <FaFileAlt />
                        <span>Laporan</span>
                    </Link>
                )}

                {/* Surat Masuk */}
                {canAccess(["Administrasi Umum", "Kepala Dinas"]) && (
                    <Link
                        href={route("surat.list")}
                        className={`${baseItem} ${
                            route().current("surat.list") ? active : hover
                        }`}
                    >
                        <FaInbox />
                        <span>Surat Masuk</span>
                    </Link>
                )}

                {/* Disposisi */}
                {canAccess(["Administrasi Umum", "Kepala Dinas"]) && (
                    <Link
                        href={route("disposisi.list")}
                        className={`${baseItem} ${
                            route().current("disposisi.list") ? active : hover
                        }`}
                    >
                        <FaShareSquare />
                        <span>Disposisi</span>
                    </Link>
                )}

                {/* ADMIN SECTION */}
                {canAccess(["Admin"]) && (
                    <>
                        {/* Kelola Akun dropdown */}
                        <button
                            onClick={() => setAkunOpen(!akunOpen)}
                            className={`${baseItem} justify-between w-full ${
                                isAkunActive || akunOpen ? active : hover
                            }`}
                        >
                            <span className="flex items-center gap-4">
                                <FaUsersCog /> Kelola Akun
                            </span>
                            <FaChevronDown
                                className={`transition-transform duration-300 ${
                                    akunOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {akunOpen && (
                            <div className="ml-7 mt-1 space-y-1">
                                <Link
                                    href={route("user.show", {
                                        type: "pegawai",
                                    })}
                                    className={`${baseItem} text-sm px-3 ${
                                        isAkunActive && typeParam === "pegawai"
                                            ? active
                                            : hover
                                    }`}
                                >
                                    <FaUsersCog className="text-xs" />
                                    Pegawai
                                </Link>

                                <Link
                                    href={route("user.show", {
                                        type: "instansi",
                                    })}
                                    className={`${baseItem} text-sm px-3 ${
                                        isAkunActive && typeParam === "instansi"
                                            ? active
                                            : hover
                                    }`}
                                >
                                    <FaUsersCog className="text-xs" />
                                    Instansi
                                </Link>

                                <Link
                                    href={route("user.show", {
                                        type: "umkm",
                                    })}
                                    className={`${baseItem} text-sm px-3 ${
                                        isAkunActive && typeParam === "umkm"
                                            ? active
                                            : hover
                                    }`}
                                >
                                    <FaUsersCog className="text-xs" />
                                    UMKM
                                </Link>
                            </div>
                        )}

                        {/* Menu Admin lain */}
                        <Link
                            href={route("bidang.list")}
                            className={`${baseItem} ${
                                route().current("bidang.list") ? active : hover
                            }`}
                        >
                            <FaLayerGroup />
                            <span>Kelola Bidang Layanan</span>
                        </Link>

                        <Link
                            href={route("layanan.list")}
                            className={`${baseItem} ${
                                route().current("layanan.list") ? active : hover
                            }`}
                        >
                            <FaFileAlt />
                            <span>Kelola Layanan</span>
                        </Link>

                        <Link
                            href={route("legpro.list")}
                            className={`${baseItem} ${
                                route().current("legpro.list") ? active : hover
                            }`}
                        >
                            <FaFileAlt />
                            <span>Kelola Legalitas Produk</span>
                        </Link>

                        <Link
                            href={route("mobil.list")}
                            className={`${baseItem} ${
                                route().current("mobil.list") ? active : hover
                            }`}
                        >
                            <FaCar />
                            <span>Kelola Mobil</span>
                        </Link>

                        <Link
                            href={route("sopir.list")}
                            className={`${baseItem} ${
                                route().current("sopir.list") ? active : hover
                            }`}
                        >
                            <FaUserTie />
                            <span>Kelola Sopir</span>
                        </Link>

                        <Link
                            href={route("kategori.list")}
                            className={`${baseItem} ${
                                route().current("kategori.list")
                                    ? active
                                    : hover
                            }`}
                        >
                            <FaTags />
                            <span>Kelola Kategori</span>
                        </Link>

                        <Link
                            href={route("pegawai.kelola.promosi")}
                            className={`${baseItem} ${
                                route().current("pegawai.kelola.promosi") &&
                                !window.location.href.includes("user/show")
                                    ? active
                                    : hover
                            }`}
                        >
                            <FaShoppingBag />
                            <span>Kelola Promosi</span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
