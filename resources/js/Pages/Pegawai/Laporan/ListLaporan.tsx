import React, { useState, useEffect } from "react";
import Layout from "@/Components/Layout";
import { Link } from "@inertiajs/react";

type LaporanEntry = {
    id_laporan: number;
    jadwal: string;
    judul: string;
    lokasi: string;
    nama_penulis: string;
};

type ListLaporanProps = {
    laporan: LaporanEntry[];
};

const ListLaporan: React.FC<ListLaporanProps> = ({ laporan }) => {
    const [search, setSearch] = useState("");
    const [filteredLaporan, setFilteredLaporan] =
        useState<LaporanEntry[]>(laporan);

    useEffect(() => {
        const keyword = search.toLowerCase();
        const filtered = laporan.filter(
            (lapor) =>
                lapor.judul.toLowerCase().includes(keyword) ||
                lapor.lokasi.toLowerCase().includes(keyword) ||
                lapor.nama_penulis.toLowerCase().includes(keyword) ||
                new Date(lapor.jadwal).toLocaleDateString().includes(keyword)
        );
        setFilteredLaporan(filtered);
    }, [search, laporan]);

    return (
        <Layout>
            <div className="p-4 max-w-screen-lg mx-auto">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Daftar Laporan
                </h1>

                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Cari laporan..."
                        className="border px-3 py-2 rounded text-sm w-1/3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link
                        href="/pegawai/create/laporan"
                        className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded"
                    >
                        + Tambah
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2">No</th>
                                <th className="border px-2 py-2">Jadwal</th>
                                <th className="border px-2 py-2">Judul</th>
                                <th className="border px-2 py-2">Lokasi</th>
                                <th className="border px-2 py-2">
                                    Nama Penulis
                                </th>
                                <th className="border px-2 py-2">Aksi</th>{" "}
                                {/* Tambah kolom aksi */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLaporan.length > 0 ? (
                                filteredLaporan.map((lapor, index) => (
                                    <tr key={lapor.id_laporan}>
                                        <td className="border px-2 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {new Date(
                                                lapor.jadwal
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {lapor.judul}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {lapor.lokasi}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {lapor.nama_penulis}
                                        </td>
                                        <td className="border px-2 py-2 text-center space-x-1">
                                            <Link
                                                href={`/pegawai/edit/laporan/${lapor.id_laporan}`}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                method="delete"
                                                as="button"
                                                href={`/pegawai/destroy/laporan/${lapor.id_laporan}`}
                                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                                onClick={(e) => {
                                                    if (
                                                        !confirm(
                                                            "Yakin ingin menghapus laporan ini?"
                                                        )
                                                    ) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                Hapus
                                            </Link>
                                            <Link
                                                href={`/pegawai/laporan/pdf/${lapor.id_laporan}`}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
                                                target="_blank"
                                            >
                                                PDF
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada laporan tersedia.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default ListLaporan;
