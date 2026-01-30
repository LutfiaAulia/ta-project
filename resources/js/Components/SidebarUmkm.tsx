import React from "react";
import {
    FaTh,
    FaStore,
    FaShoppingBag,
    FaChartLine,
    FaChevronDown,
} from "react-icons/fa";
import { Link } from "@inertiajs/react";

const SidebarUmkm: React.FC = () => {
    const baseItem =
        "flex items-center gap-4 p-2.5 rounded-lg transition-all duration-200 text-sm";
    const hover =
        "hover:bg-green-600 hover:shadow-md hover:scale-[1.01] cursor-pointer";
    const active = "bg-green-600 shadow-lg text-white font-semibold";

    return (
        <div className="w-64 h-screen bg-green-700 text-white flex flex-col fixed shadow-2xl z-20">
            {/* Header */}
            <div className="w-64 h-[74px] flex items-center gap-3 px-4 bg-green-800 shadow-xl border-b border-green-600">
                <img src="/logo plut.png" alt="Logo" className="h-10 w-auto" />
                <div className="text-base font-extrabold leading-tight">
                    <p>PLUT-KUMKM</p>
                    <p>Sumatera Barat</p>
                </div>
            </div>

            {/* Menu Container */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
                {/* ==================== BERANDA ==================== */}
                <Link
                    href={route("umkm.dashboard")}
                    className={`${baseItem} ${
                        route().current("umkm.dashboard") ? active : hover
                    } font-medium`}
                >
                    <FaTh className="text-base" />
                    <span>Beranda</span>
                </Link>

                <hr className="my-2 border-green-600/50" />

                {/* ==================== MANAJEMEN USAHA ==================== */}
                <div className="px-3 py-2 mt-3 text-xs font-bold text-green-200 uppercase tracking-wider">
                    Manajemen Usaha
                </div>

                <Link
                    href={route("umkm.data")}
                    className={`${baseItem} ${
                        route().current("umkm.data") ? active : hover
                    }`}
                >
                    <FaStore className="text-base" />
                    <span>Profil UMKM</span>
                </Link>

                {/* Menu baru untuk input Omset & Aset */}
                <Link
                    href={route("umkm.dashboard")}
                    className={`${baseItem} ${
                        route().current("umkm.keuangan") ? active : hover
                    }`}
                >
                    <FaChartLine className="text-base" />
                    <span>Omset & Aset</span>
                </Link>

                <Link
                    href={route("umkm.produk")}
                    className={`${baseItem} ${
                        route().current("umkm.produk") ? active : hover
                    }`}
                >
                    <FaShoppingBag className="text-base" />
                    <span>Produk UMKM</span>
                </Link>
            </div>
        </div>
    );
};

export default SidebarUmkm;
