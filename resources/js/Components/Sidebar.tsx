import React, { useState } from "react";
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
} from "react-icons/fa";
import { Link } from "@inertiajs/react";

const Sidebar: React.FC = () => {
    const [akunOpen, setAkunOpen] = useState(false);

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
                <Link
                    href={route("pegawai.dashboard")}
                    className="flex items-center gap-3 p-2 rounded hover:bg-green-500 transition cursor-pointer"
                >
                    <FaInbox />
                    <span>Surat Masuk</span>
                </Link>
                <Link
                    href={route("pegawai.dashboard")}
                    className="flex items-center gap-3 p-2 rounded hover:bg-green-500 transition cursor-pointer"
                >
                    <FaShareSquare />
                    <span>Disposisi</span>
                </Link>
                <button
                    onClick={() => setAkunOpen(!akunOpen)}
                    className="flex items-center gap-14 p-2 rounded hover:bg-green-500 transition cursor-pointer"
                >
                    <span className="flex items-center gap-3">
                        <FaUsersCog />
                        Kelola Akun
                    </span>
                    <FaChevronDown
                        className={`transition-transform duration-300 ${
                            akunOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {akunOpen && (
                    <div className="ml-8 space-y-1">
                        <Link
                            href={route('user.show', { type: 'pegawai' })}
                            className="block px-4 py-2 rounded hover:bg-green-500 flex items-center gap-2"
                        >
                            <FaUsersCog className="text-xs" /> Pegawai
                        </Link>
                        <Link
                            href={route('user.show', { type: 'instansi' })}
                            className="block px-4 py-2 rounded hover:bg-green-500 flex items-center gap-2"
                        >
                            <FaUsersCog className="text-xs" /> Instansi
                        </Link>
                        <Link
                            href={route('user.show', { type: 'umkm' })}
                            className="block px-4 py-2 rounded hover:bg-green-500 flex items-center gap-2"
                        >
                            <FaUsersCog className="text-xs" /> UMKM
                        </Link>
                    </div>
                )}
                <Link
                    href={route("pegawai.dashboard")}
                    className="flex items-center gap-3 p-2 rounded hover:bg-green-500 transition cursor-pointer"
                >
                    <FaFileAlt />
                    <span>Kelola Layanan</span>
                </Link>
                <Link
                    href={route("pegawai.dashboard")}
                    className="flex items-center gap-3 p-2 rounded hover:bg-green-500 transition cursor-pointer"
                >
                    <FaCar />
                    <span>Kelola Mobil</span>
                </Link>
                <Link
                    href={route("pegawai.dashboard")}
                    className="flex items-center gap-3 p-2 rounded hover:bg-green-500 transition cursor-pointer"
                >
                    <FaUserTie />
                    <span>Kelola Sopir</span>
                </Link>
                <Link
                    href={route("pegawai.dashboard")}
                    className="flex items-center gap-3 p-2 rounded hover:bg-green-500 transition cursor-pointer"
                >
                    <FaShoppingBag />
                    <span>Kelola Promosi</span>
                </Link>
            </ul>
        </div>
    );
};

export default Sidebar;
