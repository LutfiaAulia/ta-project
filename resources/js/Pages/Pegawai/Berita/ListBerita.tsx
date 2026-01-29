import React from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";

interface Berita {
    id_berita: number;
    judul: string;
    slug: string;
    gambar: string | null;
    tanggal_publikasi: string;
}

interface FlashPayload {
    flash: {
        success?: string;
    };
}

const FlashMessage = () => {
    const { flash } = usePage().props as unknown as FlashPayload;

    if (!flash || !flash.success) return null;

    return (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-md mx-auto max-w-7xl">
            {flash.success}
        </div>
    );
};

const ListBerita: React.FC<PageProps<{ berita: Berita[] }>> = ({ berita }) => {
    const { delete: inertiaDelete } = useForm();

    const handleDelete = (id: number, judul: string) => {
        if (
            confirm(
                `Apakah Anda yakin ingin menghapus berita: "${judul}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            inertiaDelete(route("berita.destroy", id));
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="p-4 w-full max-w-7xl mx-auto">
                    <FlashMessage />

                    <div className="p-5 flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Daftar Berita
                        </h2>
                        <Link
                            href={route("berita.create")}
                            className="bg-blue-600 hover:bg-blue-700 transition duration-150 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md flex items-center justify-center"
                        >
                            + Tambah Berita Baru
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left w-[50px] font-medium text-gray-500 uppercase tracking-wider">
                                        No
                                    </th>
                                    <th className="px-4 py-3 text-left w-[120px] font-medium text-gray-500 uppercase tracking-wider">
                                        Gambar
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                        Judul
                                    </th>
                                    <th className="px-4 py-3 text-left w-[120px] font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal Publikasi
                                    </th>
                                    <th className="px-4 py-3 text-center w-[150px] font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {berita.length > 0 ? (
                                    berita.map((item, index) => (
                                        <tr
                                            key={item.id_berita}
                                            className="hover:bg-blue-50/50 transition duration-100"
                                        >
                                            <td className="px-4 py-4 whitespace-nowrap text-center text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                {item.gambar ? (
                                                    <img
                                                        src={`/storage/${item.gambar}`}
                                                        alt={`Gambar ${item.judul}`}
                                                        className="w-20 h-12 object-cover rounded-md shadow-sm border border-gray-300"
                                                        onError={(e) => {
                                                            e.currentTarget.src =
                                                                "https://placehold.co/80x50/cccccc/333333?text=No+Img";
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-gray-400 text-xs italic">
                                                        Tidak ada gambar
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-gray-900 font-medium">
                                                {item.judul}
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Slug: {item.slug}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                                                {new Date(
                                                    item.tanggal_publikasi,
                                                ).toLocaleDateString("id-ID", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <div className="flex justify-center space-x-2">
                                                    <Link
                                                        href={route(
                                                            "berita.edit",
                                                            item.id_berita,
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1.5 rounded-md transition duration-150"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id_berita,
                                                                item.judul,
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1.5 rounded-md transition duration-150"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-6 text-gray-500 italic"
                                        >
                                            Saat ini tidak ada berita yang
                                            terdaftar. Silakan tambahkan berita
                                            baru.
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

export default ListBerita;
