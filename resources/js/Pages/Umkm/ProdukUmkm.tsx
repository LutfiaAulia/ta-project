import React from "react";
import Layout from "@/Components/LayoutUmkm";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";

type Promosi = {
    id: number;
    nama_produk: string;
    deskripsi: string;
    harga: number;
};

const ListProdukUMKM: React.FC<PageProps<{ promosi: Promosi[] }>> = ({
    promosi,
}) => {
    return (
        <Layout>
            <div className="p-4 w-full max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Produk UMKM</h1>

                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 rounded px-3 py-1 text-sm w-64"
                    />
                    <Link
                        href="/umkm/create/produk"
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-4 py-2 rounded"
                    >
                        + Tambah
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2 text-center w-[40px]">
                                    No
                                </th>
                                <th className="border px-2 py-2 w-[200px]">
                                    Nama Produk
                                </th>
                                <th className="border px-2 py-2">Deskripsi</th>
                                <th className="border px-2 py-2 text-center w-[100px]">
                                    Harga
                                </th>
                                <th className="border px-2 py-2 text-center w-[80px]">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {promosi.length > 0 ? (
                                promosi.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="border px-2 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {item.nama_produk}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {item.deskripsi}
                                        </td>
                                        <td className="border px-2 py-2 text-center">
                                            {item.harga.toLocaleString("id-ID")}
                                        </td>
                                        <td className="border px-2 py-2 text-center space-x-2">
                                            <Link
                                                href={`/umkm/edit/produk/${item.id}`}
                                                className="inline-block text-yellow-500 hover:text-yellow-600"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                as="button"
                                                method="delete"
                                                href={`/umkm/delete/produk/${item.id}`}
                                                className="inline-block text-red-500 hover:text-red-600"
                                                onClick={(e) => {
                                                    if (
                                                        !confirm(
                                                            `Yakin ingin menghapus produk "${item.nama_produk}"?`
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
                                        colSpan={5}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada produk UMKM.
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

export default ListProdukUMKM;
