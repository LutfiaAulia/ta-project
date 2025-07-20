import React, { useState } from "react";
import LayoutUmkm from "@/Components/LayoutUmkm";
import LayoutPegawai from "@/Components/Layout";
import { usePage, router, Link } from "@inertiajs/react";

interface Produk {
    id_promosi: number;
    nama_produk: string;
    deskripsi_produk: string;
    harga_produk: number;
    status: string;
}

interface PageProps {
    promosi?: Produk[];
    user_type?: string;
}

const ProdukUmkm: React.FC = () => {
    const { promosi = [], user_type } = usePage().props as PageProps;
    const [search, setSearch] = useState("");

    const filteredProduk = promosi.filter((produk) =>
        produk.nama_produk.toLowerCase().includes(search.toLowerCase())
    );

    // Pilih layout sesuai user_type
    const Layout = user_type === "umkm" ? LayoutUmkm : LayoutPegawai;

    return (
        <Layout>
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Produk UMKM</h1>

                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        className="border px-3 py-2 rounded text-sm w-1/3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {user_type === "umkm" && (
                        <Link
                            href="/umkm/create/produk"
                            className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded"
                        >
                            + Tambah
                        </Link>
                    )}
                </div>

                <table className="w-full table-auto border border-gray-300 text-xs">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-2 py-2 w-[50px]">No</th>
                            <th className="border px-4 py-2 text-center w-[200px]">
                                Nama Produk
                            </th>
                            <th className="border px-4 py-2 text-center">
                                Deskripsi
                            </th>
                            <th className="border px-4 py-2 text-center w-[200px]">
                                Harga
                            </th>
                            <th className="border px-4 py-2 text-center w-[100px]">
                                Status
                            </th>
                            <th className="border px-4 py-2 text-center w-[200px]">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProduk.length > 0 ? (
                            filteredProduk.map((produk, index) => (
                                <tr key={produk.id_promosi}>
                                    <td className="border px-2 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {produk.nama_produk}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {produk.deskripsi_produk}
                                    </td>
                                    <td className="border px-4 py-2 text-right">
                                        Rp{" "}
                                        {produk.harga_produk.toLocaleString(
                                            "id-ID"
                                        )}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${
                                                produk.status === "diterima"
                                                    ? "bg-green-100 text-green-700"
                                                    : produk.status ===
                                                      "diajukan"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {produk.status
                                                ? produk.status
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                  produk.status.slice(1)
                                                : "Status tidak tersedia"}
                                        </span>
                                    </td>

                                    <td className="border px-4 py-2 text-center space-x-2">
                                        {(user_type === "umkm" ||
                                            user_type === "pegawai") &&
                                            (produk.status === "diajukan" ? (
                                                <Link
                                                    href={
                                                        user_type === "umkm"
                                                            ? `/umkm/edit/produk/${produk.id_promosi}`
                                                            : `/pegawai/edit/produk/${produk.id_promosi}`
                                                    }
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                                >
                                                    Detail
                                                </Link>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            router.visit(
                                                                user_type ===
                                                                    "umkm"
                                                                    ? `/umkm/edit/produk/${produk.id_promosi}`
                                                                    : `/pegawai/edit/produk/${produk.id_promosi}`
                                                            )
                                                        }
                                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    "Yakin ingin menghapus produk ini?"
                                                                )
                                                            ) {
                                                                const route =
                                                                    user_type ===
                                                                    "umkm"
                                                                        ? `/umkm/destroy/produk/${produk.id_promosi}`
                                                                        : `/pegawai/destroy/produk/${produk.id_promosi}`;
                                                                router.delete(
                                                                    route
                                                                );
                                                            }
                                                        }}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                                    >
                                                        Hapus
                                                    </button>
                                                </>
                                            ))}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-4 text-gray-500"
                                >
                                    Belum ada produk yang ditambahkan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default ProdukUmkm;
