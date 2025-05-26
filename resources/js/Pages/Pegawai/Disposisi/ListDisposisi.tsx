import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link, router } from "@inertiajs/react";

type Disposisi = {
    id_disposisi: number;
    isi: string;
    tanggal: string;
    tujuan: string;
    catatan: string;
    user: {
        nama: string;
    };
    surat: {
        no_surat: string;
    };
};

const ListDisposisi: React.FC<PageProps<{ disposisi: Disposisi[] }>> = ({
    disposisi,
}) => {
    const [search, setSearch] = useState("");

    const handleDelete = (id: number) => {
        if (confirm("Yakin ingin menghapus disposisi ini?")) {
            router.delete(`/pegawai/disposisi/${id}`);
        }
    };

    const filteredDisposisi = disposisi.filter(
        (item) =>
            item.tujuan.toLowerCase().includes(search.toLowerCase()) ||
            item.user.nama.toLowerCase().includes(search.toLowerCase()) ||
            item.surat.no_surat.toLowerCase().includes(search.toLowerCase())
    );

    const formatTanggal = (tanggal: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        return new Date(tanggal).toLocaleDateString("id-ID", options);
    };

    return (
        <Layout>
            <div className="p-4 w-full max-w-7xl mx-auto">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Daftar Disposisi
                </h1>

                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Cari disposisi..."
                        className="border px-3 py-2 rounded text-sm w-1/3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2 text-center w-[50px]">
                                    No
                                </th>
                                <th className="border px-2 py-2">Tanggal</th>
                                <th className="border px-2 py-2">
                                    Isi Disposisi
                                </th>
                                <th className="border px-2 py-2">Tujuan</th>
                                <th className="border px-2 py-2">Penginput</th>
                                <th className="border px-2 py-2">
                                    Nomor Surat
                                </th>
                                <th className="border px-2 py-2 text-center w-[180px]">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDisposisi.map((item, index) => (
                                <tr key={item.id_disposisi}>
                                    <td className="border px-2 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {formatTanggal(item.tanggal)}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {item.isi.length > 50
                                            ? `${item.isi.slice(0, 50)}...`
                                            : item.isi}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {item.tujuan}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {item.user.nama}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {item.surat.no_surat}
                                    </td>
                                    <td className="border px-2 py-2 text-center space-x-1">
                                        <Link
                                            href={`/pegawai/disposisi/${item.id_disposisi}`}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Detail
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id_disposisi)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredDisposisi.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada data disposisi.
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

export default ListDisposisi;
