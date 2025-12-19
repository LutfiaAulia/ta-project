import React from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";

interface Galeri {
    id_galeri: number;
    judul: string;
    slug: string;
    gambar: string | null;
    tanggal: string;
}

interface FlashPayload {
    flash: {
        success?: string;
        message?: string;
    };
}

const FlashMessage = () => {
    const { flash } = usePage().props as unknown as FlashPayload;
    const displayMessage = flash?.success || flash?.message;

    if (!displayMessage) return null;

    return (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-md mx-auto max-w-7xl">
            {displayMessage}
        </div>
    );
};

const ListGaleri: React.FC<PageProps<{ galeri: Galeri[] }>> = ({ galeri }) => {
    const { delete: inertiaDelete } = useForm();

    const handleDelete = (id: number, judul: string) => {
        if (
            confirm(
                `Apakah Anda yakin ingin menghapus foto kegiatan: "${judul}"? Tindakan ini tidak dapat dibatalkan.`
            )
        ) {
            inertiaDelete(route("destroy.galeri", id));
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="p-4 w-full max-w-7xl mx-auto">
                    <FlashMessage />

                    <div className="p-5 flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Daftar Galeri Kegiatan
                        </h2>
                        <Link
                            href={route("create.galeri")}
                            className="bg-blue-600 hover:bg-blue-700 transition duration-150 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md flex items-center justify-center"
                        >
                            + Tambah Foto Baru
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
                                        Judul Kegiatan
                                    </th>
                                    <th className="px-4 py-3 text-left w-[150px] font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal Kegiatan
                                    </th>
                                    <th className="px-4 py-3 text-center w-[150px] font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {galeri.length > 0 ? (
                                    galeri.map((item, index) => (
                                        <tr
                                            key={item.id_galeri}
                                            className="hover:bg-blue-50/50 transition duration-100"
                                        >
                                            <td className="px-4 py-4 whitespace-nowrap text-center text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                {item.gambar ? (
                                                    <img
                                                        src={`/storage/${item.gambar}`}
                                                        alt={item.judul}
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
                                                <div className="text-[10px] text-gray-400 mt-1 font-normal break-all">
                                                    URL: {item.slug}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                                                {new Date(
                                                    item.tanggal
                                                ).toLocaleDateString("id-ID", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-center space-x-2">
                                                <Link
                                                    href={route(
                                                        "edit.galeri",
                                                        item.id_galeri
                                                    )}
                                                    className="bg-yellow-500 hover:bg-yellow-600 transition duration-150 text-white px-3 py-1 rounded text-xs font-medium shadow-md hover:shadow-lg"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            item.id_galeri,
                                                            item.judul
                                                        )
                                                    }
                                                    className="bg-red-600 hover:bg-red-700 transition duration-150 text-white px-3 py-1 rounded text-xs font-medium shadow-md hover:shadow-lg"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-10 text-gray-500 italic"
                                        >
                                            Belum ada dokumentasi kegiatan.
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

export default ListGaleri;
