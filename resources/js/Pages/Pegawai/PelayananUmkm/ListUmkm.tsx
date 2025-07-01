import React, { useState, useEffect } from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";

type UmkmEntry = {
    id_bopel: number;
    nama_lengkap: string;
    nik: string;
    nama_usaha: string;
    nib: string;
    layanan: string;
};

type ListUmkmProps = {
    umkm: UmkmEntry[];
    id_booking: number;
    tanggal_mulai: string;
    tanggal_akhir: string;
};

const ListUmkm: React.FC<ListUmkmProps> = ({
    umkm,
    id_booking,
    tanggal_mulai,
    tanggal_akhir,
}) => {
    const [search, setSearch] = useState("");
    const [filteredUmkm, setFilteredUmkm] = useState<UmkmEntry[]>(umkm);

    useEffect(() => {
        const filtered = umkm.filter((u) => {
            const keyword = search.toLowerCase();
            return (
                u.nama_lengkap.toLowerCase().includes(keyword) ||
                u.nik.toLowerCase().includes(keyword) ||
                u.nama_usaha.toLowerCase().includes(keyword) ||
                u.nib.toLowerCase().includes(keyword) ||
                u.layanan.toLowerCase().includes(keyword)
            );
        });
        setFilteredUmkm(filtered);
    }, [search, umkm]);

    const today = new Date();
    const mulai = new Date(tanggal_mulai);
    const akhir = new Date(tanggal_akhir);
    const isInRange = today >= mulai && today <= akhir;

    return (
        <Layout>
            <div className="p-4 max-w-screen-lg mx-auto">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Daftar UMKM Terlayani
                </h1>

                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Cari UMKM..."
                        className="border px-3 py-2 rounded text-sm w-1/3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {isInRange && (
                        <Link
                            href={`/pegawai/create/umkmlayan/${id_booking}`}
                            className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded"
                        >
                            + Tambah
                        </Link>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-xs">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2">No</th>
                                <th className="border px-2 py-2">Nama</th>
                                <th className="border px-2 py-2">NIK</th>
                                <th className="border px-2 py-2">Usaha</th>
                                <th className="border px-2 py-2">NIB</th>
                                <th className="border px-2 py-2">Layanan</th>
                                <th className="border px-2 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUmkm.length > 0 ? (
                                filteredUmkm.map((u, index) => (
                                    <tr key={u.id_bopel}>
                                        <td className="border px-2 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {u.nama_lengkap}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {u.nik}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {u.nama_usaha}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {u.nib}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {u.layanan}
                                        </td>
                                        <td className="border px-2 py-2 text-center space-x-1">
                                            <Link
                                                href={`/pegawai/edit/umkmlayan/${u.id_bopel}`}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                method="delete"
                                                as="button"
                                                href={`/pegawai/destroy/umkmlayan/${u.id_bopel}`}
                                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                                onClick={(e) => {
                                                    if (
                                                        !confirm(
                                                            "Yakin ingin menghapus UMKM ini?"
                                                        )
                                                    ) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                Hapus
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada UMKM terdaftar.
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

export default ListUmkm;
