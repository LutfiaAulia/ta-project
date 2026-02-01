import React, { useState } from "react";
import LayoutUmkm from "@/Components/LayoutUmkm";
import LayoutPegawai from "@/Components/Layout";
import { usePage, router, Link } from "@inertiajs/react";
import { Plus, Search, Edit2, Trash2, Eye, Package } from "lucide-react"; // Install lucide-react jika belum

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
        produk.nama_produk.toLowerCase().includes(search.toLowerCase()),
    );

    const Layout = user_type === "umkm" ? LayoutUmkm : LayoutPegawai;

    // Helper untuk warna status
    const getStatusBadge = (status: string) => {
        const styles = {
            diterima: "bg-emerald-100 text-emerald-700 border-emerald-200",
            diajukan: "bg-amber-100 text-amber-700 border-amber-200",
            ditolak: "bg-rose-100 text-rose-700 border-rose-200",
        };
        const currentStyle =
            styles[status as keyof typeof styles] ||
            "bg-gray-100 text-gray-700";

        return (
            <span
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${currentStyle}`}
            >
                {status || "Unknown"}
            </span>
        );
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-16">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Kelola Produk
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Kelola katalog produk UMKM Anda di sini.
                        </p>
                    </div>

                    {user_type === "umkm" && (
                        <Link
                            href="/umkm/create/produk"
                            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
                        >
                            <Plus size={18} />
                            <span>Tambah Produk</span>
                        </Link>
                    )}
                </div>

                {/* Filter & Search */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Cari produk berdasarkan nama..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-16 text-center">
                                        No
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Informasi Produk
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Harga
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredProduk.length > 0 ? (
                                    filteredProduk.map((produk, index) => (
                                        <tr
                                            key={produk.id_promosi}
                                            className="hover:bg-gray-50/80 transition-colors group"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-400 text-center font-medium">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                        <Package size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                            {produk.nama_produk}
                                                        </div>
                                                        <div className="text-xs text-gray-500 line-clamp-1 max-w-[300px]">
                                                            {
                                                                produk.deskripsi_produk
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    Rp{" "}
                                                    {produk.harga_produk.toLocaleString(
                                                        "id-ID",
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {getStatusBadge(produk.status)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {produk.status ===
                                                    "diajukan" ? (
                                                        <Link
                                                            href={
                                                                (user_type ===
                                                                "umkm"
                                                                    ? "/umkm"
                                                                    : "/pegawai") +
                                                                `/edit/produk/${produk.id_promosi}`
                                                            }
                                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                            title="Detail"
                                                        >
                                                            <Eye size={18} />
                                                        </Link>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    router.visit(
                                                                        (user_type ===
                                                                        "umkm"
                                                                            ? "/umkm"
                                                                            : "/pegawai") +
                                                                            `/edit/produk/${produk.id_promosi}`,
                                                                    )
                                                                }
                                                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                                title="Edit"
                                                            >
                                                                <Edit2
                                                                    size={18}
                                                                />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    if (
                                                                        confirm(
                                                                            "Yakin ingin menghapus produk ini?",
                                                                        )
                                                                    ) {
                                                                        router.delete(
                                                                            (user_type ===
                                                                            "umkm"
                                                                                ? "/umkm"
                                                                                : "/pegawai") +
                                                                                `/destroy/produk/${produk.id_promosi}`,
                                                                        );
                                                                    }
                                                                }}
                                                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                                title="Hapus"
                                                            >
                                                                <Trash2
                                                                    size={18}
                                                                />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-gray-400"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <Package
                                                    size={40}
                                                    className="text-gray-200"
                                                />
                                                <p>
                                                    Belum ada produk yang
                                                    ditemukan.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProdukUmkm;
