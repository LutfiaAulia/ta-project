import React from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";

interface Program {
    id_program: number;
    judul: string;
    slug: string;
    image: string | null;
    status: "active" | "inactive" | "upcoming";
    is_open: boolean;
    created_at: string;
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

const ListProgram: React.FC<PageProps<{ program: Program[] }>> = ({
    program,
}) => {
    const { delete: inertiaDelete } = useForm();

    const handleDelete = (id: number, judul: string) => {
        if (
            confirm(
                `Apakah Anda yakin ingin menghapus program: "${judul}"? Semua data terkait akan ikut terhapus.`,
            )
        ) {
            inertiaDelete(route("destroy.program", id));
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="p-4 w-full max-w-7xl mx-auto">
                    <FlashMessage />

                    <div className="p-5 flex justify-between items-center mb-6 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Manajemen Program PLUT
                            </h2>
                            <p className="text-sm text-gray-500">
                                Kelola program pemberdayaan UMKM di sini.
                            </p>
                        </div>
                        <Link
                            href={route("create.program")}
                            className="bg-indigo-600 hover:bg-indigo-700 transition duration-150 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md flex items-center"
                        >
                            <span className="mr-2">+</span> Tambah Program
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                        No
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                        Info Program
                                    </th>
                                    <th className="px-6 py-4 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                        Pendaftaran
                                    </th>
                                    <th className="px-6 py-4 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {program.length > 0 ? (
                                    program.map((item, index) => (
                                        <tr
                                            key={item.id_program}
                                            className="hover:bg-gray-50 transition duration-100"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-12 w-20">
                                                        {item.image ? (
                                                            <img
                                                                src={`/storage/${item.image}`}
                                                                alt={item.judul}
                                                                className="h-12 w-20 object-cover rounded-lg border border-gray-200"
                                                                onError={(
                                                                    e,
                                                                ) => {
                                                                    e.currentTarget.src =
                                                                        "https://placehold.co/80x50?text=No+Image";
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="h-12 w-20 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] text-gray-400 italic border border-dashed border-gray-300">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-gray-900">
                                                            {item.judul}
                                                        </div>
                                                        <div className="text-xs text-gray-400">
                                                            Slug: {item.slug}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        item.status === "active"
                                                            ? "bg-green-100 text-green-700"
                                                            : item.status ===
                                                                "upcoming"
                                                              ? "bg-blue-100 text-blue-700"
                                                              : "bg-gray-100 text-gray-700"
                                                    }`}
                                                >
                                                    {item.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                {item.is_open ? (
                                                    <span className="flex items-center justify-center text-green-600 font-medium">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                                        Terbuka
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">
                                                        Ditutup
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <div className="flex justify-center space-x-2">
                                                    <Link
                                                        href={route(
                                                            "edit.program",
                                                            item.id_program,
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1.5 rounded-md transition duration-150"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id_program,
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
                                            className="px-6 py-12 text-center text-gray-500 italic"
                                        >
                                            Belum ada program yang dibuat. Klik
                                            tombol "Tambah Program" untuk
                                            memulai.
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

export default ListProgram;
