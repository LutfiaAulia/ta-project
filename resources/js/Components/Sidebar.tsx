import React from "react";
import { FaTh, FaClipboardList, FaStore, FaFileAlt } from "react-icons/fa";
import { Link } from "@inertiajs/react";

const Sidebar: React.FC = () => {
    return (
        <div className="w-60 h-screen bg-green-600 text-white flex flex-col fixed">
            {/* Logo Section */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-green-500">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                <div className="text-sm leading-tight font-medium">
                    <p>Dinas Koperasi UKM</p>
                    <p>Sumatera Barat</p>
                </div>
            </div>

            {/* Menu Section */}
            <ul className="flex flex-col mt-6 space-y-1 px-4">
                <Link
                    href={route("pegawai.dashboard")}
                    className={`flex items-center gap-3 p-2 rounded ${
                        route().current("pegawai.dashboard")
                            ? "bg-green-500"
                            : "hover:bg-green-500"
                    } transition cursor-pointer`}
                >
                    <FaTh />
                    <span>Beranda</span>
                </Link>
                <Link
                    href={route("booking.listBooking")}
                    className="flex items-center gap-3 p-2 rounded hover:bg-green-500 transition cursor-pointer"
                >
                    <FaClipboardList />
                    <span>List Booking</span>
                </Link>
                <Link
                    href={route("pegawai.dashboard")}
                    className="flex items-center gap-3 p-2 rounded hover:bg-green-500 transition cursor-pointer"
                >
                    <FaStore />
                    <span>Data UMKM</span>
                </Link>
                <Link
                    href={route("pegawai.dashboard")}
                    className="flex items-center gap-3 p-2 rounded hover:bg-green-500 transition cursor-pointer"
                >
                    <FaFileAlt />
                    <span>Laporan</span>
                </Link>
            </ul>
        </div>
    );
};

export default Sidebar;
