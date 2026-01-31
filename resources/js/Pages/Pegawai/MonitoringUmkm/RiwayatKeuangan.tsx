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

const RiwayatKeuangan: React.FC = () => {
    const { riwayat_kelompok = {} } = usePage().props as unknown as PageProps;
    const [search, setSearch] = useState("");
    const [expandedUmkm, setExpandedUmkm] = useState<string | null>(null);

    const filteredKeys = Object.keys(riwayat_kelompok).filter((nama) =>
        nama.toLowerCase().includes(search.toLowerCase()),
    );

    const formatRupiah = (nominal: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(nominal);
    };

    return (
        <LayoutPegawai>
            <Head title="Riwayat Keuangan UMKM" />

            <div className="pt-24 pb-12 px-6 bg-gray-50 min-h-screen">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-gradient-to-br from-emerald-500 to-green-700 rounded-2xl shadow-lg text-white">
                            <FaHistory size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-left">
                                Riwayat UMKM
                            </h2>
                            <p className="text-sm text-gray-500 font-medium">
                                Laporan aset, omset, dan karyawan tahunan
                            </p>
                        </div>
                    </div>

                    {/* Search */}
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

                    {/* List UMKM */}
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
                                        {/* Nomor */}
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

                                    <div className="p-2 rounded-full bg-gray-50 text-gray-400 group">
                                        {expandedUmkm === namaUmkm ? (
                                            <FaChevronUp size={14} />
                                        ) : (
                                            <FaChevronDown size={14} />
                                        )}
                                    </div>
                                </button>

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
