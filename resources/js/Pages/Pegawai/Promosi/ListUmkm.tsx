import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { Link, usePage } from "@inertiajs/react";

interface Umkm {
    id: number;
    nib: string;
    nama_pemilik: string;
    nama_usaha: string;
}

const ListUmkm: React.FC = () => {
    const { daftar_umkm = [] } = usePage().props as { daftar_umkm?: Umkm[] };

    const [search, setSearch] = useState("");

    const filteredUmkm = daftar_umkm.filter((umkm) =>
        umkm.nib.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Kelola Data Promosi</h1>

                {/* Input search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Cari berdasarkan NIB..."
                        className="border rounded px-3 py-2 w-45 sm:w-48 text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-300 text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-2 py-2 w-[50px]">
                                    No
                                </th>
                                <th className="border px-4 py-2">NIB</th>
                                <th className="border px-4 py-2">Nama</th>
                                <th className="border px-4 py-2">Usaha</th>
                                <th className="border px-4 py-2 text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUmkm.length > 0 ? (
                                filteredUmkm.map((umkm, index) => (
                                    <tr key={umkm.id}>
                                        <td className="border px-2 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {umkm.nib}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {umkm.nama_pemilik}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {umkm.nama_usaha}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            <Link
                                                href={route(
                                                    "pegawai.show.promosi",
                                                    { id_umkm: umkm.id }
                                                )}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Lihat
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada UMKM yang sesuai pencarian.
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
