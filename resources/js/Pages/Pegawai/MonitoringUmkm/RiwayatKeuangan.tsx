import React, { useState } from "react";
import LayoutPegawai from "@/Components/Layout";
import { usePage, Head } from "@inertiajs/react";
import {
    FaHistory,
    FaSearch,
    FaChevronDown,
    FaChevronUp,
    FaUsers,
    FaStore,
    FaPrint,
} from "react-icons/fa";

interface Keuangan {
    id_keuangan: number;
    tahun: number;
    aset: number;
    omset: number;
    jumlah_karyawan: number;
    umkm: {
        identitas?: {
            nama_usaha: string;
        };
    };
}

interface PageProps {
    riwayat_kelompok: Record<string, Keuangan[]>;
}

// Helper untuk route (Jika tidak menggunakan plugin Ziggy secara global)
// declare var route: any;

const RiwayatKeuangan: React.FC = () => {
    const { riwayat_kelompok = {} } = usePage().props as unknown as PageProps;
    const [search, setSearch] = useState("");
    const [expandedUmkm, setExpandedUmkm] = useState<string | null>(null);

    // State untuk filter tahun cetak
    const [tahunCetak, setTahunCetak] = useState("");

    // Filter berdasarkan search bar
    const filteredKeys = Object.keys(riwayat_kelompok).filter((nama) =>
        nama.toLowerCase().includes(search.toLowerCase()),
    );

    // Fungsi untuk memicu download/cetak PDF
    const handleCetak = () => {
        // Mengarahkan ke route backend yang menangani PDF
        const url = (window as any).route("monitoring.cetak", {
            tahun: tahunCetak,
        });
        window.open(url, "_blank");
    };

    const formatRupiah = (nominal: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(nominal);
    };

    // Mendapatkan daftar tahun unik untuk dropdown filter
    const daftarTahun = Array.from(
        new Set(
            Object.values(riwayat_kelompok)
                .flat()
                .map((item) => item.tahun),
        ),
    ).sort((a, b) => b - a);

    return (
        <LayoutPegawai>
            <Head title="Riwayat Keuangan UMKM" />

            <div className="pt-24 pb-12 px-6 bg-gray-50 min-h-screen">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Header Card */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3.5 bg-gradient-to-br from-emerald-500 to-green-700 rounded-2xl shadow-lg text-white">
                                <FaHistory size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight text-left">
                                    Riwayat UMKM
                                </h2>
                                <p className="text-sm text-gray-500 font-medium">
                                    Laporan aset, omset, dan karyawan tahunan
                                </p>
                            </div>
                        </div>

                        {/* Tombol Cetak & Filter Tahun */}
                        <div className="flex items-center gap-3 self-start md:self-center bg-gray-50 p-2 rounded-2xl border border-gray-200">
                            <div className="px-3 border-r border-gray-200">
                                <label className="block text-[10px] uppercase font-bold text-gray-400">
                                    Filter Tahun
                                </label>
                                <select
                                    value={tahunCetak}
                                    onChange={(e) =>
                                        setTahunCetak(e.target.value)
                                    }
                                    className="block w-full p-0 bg-transparent border-none text-sm font-bold text-gray-700 focus:ring-0 cursor-pointer"
                                >
                                    <option value="">Semua</option>
                                    {daftarTahun.map((thn) => (
                                        <option key={thn} value={thn}>
                                            {thn}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={handleCetak}
                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 shadow-emerald-200"
                            >
                                <FaPrint size={14} />
                                Cetak Laporan
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                            <FaSearch size={14} />
                        </span>
                        <input
                            type="text"
                            placeholder="Cari nama UMKM..."
                            className="w-full pl-10 pr-4 py-3 bg-white border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* List UMKM Accordion */}
                    <div className="space-y-3">
                        {filteredKeys.map((namaUmkm, index) => (
                            <div
                                key={namaUmkm}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                            >
                                <button
                                    onClick={() =>
                                        setExpandedUmkm(
                                            expandedUmkm === namaUmkm
                                                ? null
                                                : namaUmkm,
                                        )
                                    }
                                    className="w-full flex items-center justify-between px-6 py-5 hover:bg-emerald-50/30 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-8 text-lg font-black text-black">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center shadow-sm">
                                            <FaStore size={18} />
                                        </div>

                                        <div className="text-left ml-1">
                                            <h3 className="font-bold text-gray-800 text-lg leading-none mb-1">
                                                {namaUmkm}
                                            </h3>
                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
                                                {
                                                    riwayat_kelompok[namaUmkm]
                                                        .length
                                                }{" "}
                                                Tahun Terdata
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-2 rounded-full bg-gray-50 text-gray-400">
                                        {expandedUmkm === namaUmkm ? (
                                            <FaChevronUp size={14} />
                                        ) : (
                                            <FaChevronDown size={14} />
                                        )}
                                    </div>
                                </button>

                                {/* Table Detail (Tampil saat di-klik) */}
                                {expandedUmkm === namaUmkm && (
                                    <div className="px-6 pb-6 animate-fadeIn">
                                        <div className="overflow-x-auto rounded-xl border border-emerald-100">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-emerald-50/50 text-black border-b border-emerald-100">
                                                    <tr>
                                                        <th className="px-6 py-3 font-bold text-center w-20">
                                                            Tahun
                                                        </th>
                                                        <th className="px-6 py-3 font-bold">
                                                            Aset
                                                        </th>
                                                        <th className="px-6 py-3 font-bold">
                                                            Omset
                                                        </th>
                                                        <th className="px-6 py-3 font-bold text-center">
                                                            Karyawan
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {riwayat_kelompok[
                                                        namaUmkm
                                                    ].map((item) => (
                                                        <tr
                                                            key={
                                                                item.id_keuangan
                                                            }
                                                            className="hover:bg-emerald-50/10 transition-colors"
                                                        >
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="font-black text-gray-700">
                                                                    {item.tahun}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-emerald-600 font-bold">
                                                                {formatRupiah(
                                                                    item.aset,
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 text-green-600 font-bold">
                                                                {formatRupiah(
                                                                    item.omset,
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <div className="flex items-center justify-center gap-2 text-gray-600">
                                                                    <FaUsers
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-emerald-400"
                                                                    />
                                                                    <span className="font-semibold">
                                                                        {
                                                                            item.jumlah_karyawan
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredKeys.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                            <p className="text-gray-400 font-medium italic">
                                Tidak ada data UMKM yang ditemukan.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </LayoutPegawai>
    );
};

export default RiwayatKeuangan;
