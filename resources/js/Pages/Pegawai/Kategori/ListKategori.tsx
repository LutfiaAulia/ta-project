import React from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link, router } from "@inertiajs/react";

type Kategori = {
    id_kategori: number;
    nama_kategori: string;
};

const ListKategori: React.FC<PageProps<{ kategori: Kategori[] }>> = ({
    kategori,
}) => {
    const handleDelete = (id: number) => {
        if (confirm("Yakin ingin menghapus kategori ini?")) {
            router.delete(`/pegawai/destroy/kategori/${id}`);
        }
    };

    return (
        <Layout>
            <div className="p-4 w-full max-w-7xl mx-auto">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Daftar Kategori
                </h1>

                <div className="flex justify-end mb-4">
                    <Link
                        href={"/pegawai/create/kategori"}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded flex items-center justify-center"
                    >
                        + Tambah
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2 w-[50px] text-center">
                                    No
                                </th>
                                <th className="border px-2 py-2">
                                    Nama Kategori
                                </th>
                                <th className="border px-2 py-2 text-center w-[180px]">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {kategori.map((item, index) => (
                                <tr key={item.id_kategori}>
                                    <td className="border px-2 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {item.nama_kategori}
                                    </td>
                                    <td className="border px-2 py-2 text-center space-x-2">
                                        <Link
                                            href={`/pegawai/edit/kategori/${item.id_kategori}`}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id_kategori)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {kategori.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada layanan tersedia.
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

export default ListKategori;
