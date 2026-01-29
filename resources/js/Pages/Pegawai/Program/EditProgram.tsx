import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { Head, Link, useForm } from "@inertiajs/react";

interface Program {
    id_program: number;
    judul: string;
    deskripsi: string;
    excerpt: string;
    image: string | null;
    status: "active" | "upcoming" | "inactive";
    is_open: boolean;
    id_pegawai: number;
}

interface Props {
    program: Program;
}

const EditProgram = ({ program }: Props) => {
    const { data, setData, post, processing, errors } = useForm({
        judul: program.judul || "",
        deskripsi: program.deskripsi || "",
        excerpt: program.excerpt || "",
        image: null as File | null,
        status: program.status || "active",
        is_open: Boolean(program.is_open) as boolean,
        id_pegawai: program.id_pegawai || "",
        _method: "PUT", 
    });

    const [preview, setPreview] = useState<string | null>(
        program.image ? `/storage/${program.image}` : null,
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("update.program", program.id_program), {
            forceFormData: true,
        });
    };

    return (
        <Layout>
            <Head title={`Edit Program - ${program.judul}`} />

            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="pt-20 flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Edit Program Pemberdayaan
                        </h2>
                        <Link
                            href={route("admin.list.program")}
                            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                        >
                            &larr; Batal & Kembali
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Judul */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Judul Program
                                </label>
                                <input
                                    type="text"
                                    value={data.judul}
                                    onChange={(e) =>
                                        setData("judul", e.target.value)
                                    }
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${
                                        errors.judul
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {errors.judul && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.judul}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Status Program */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status Program
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData(
                                                "status",
                                                e.target.value as any,
                                            )
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        <option value="active">Aktif</option>
                                        <option value="upcoming">
                                            Akan Datang
                                        </option>
                                        <option value="inactive">
                                            Non-Aktif
                                        </option>
                                    </select>
                                </div>

                                {/* Status Pendaftaran */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pendaftaran Terbuka?
                                    </label>
                                    <div className="flex items-center mt-2 space-x-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="text-indigo-600"
                                                checked={data.is_open === true}
                                                onChange={() =>
                                                    setData("is_open", true)
                                                }
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                Buka
                                            </span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="text-indigo-600"
                                                checked={data.is_open === false}
                                                onChange={() =>
                                                    setData("is_open", false)
                                                }
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                Tutup
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Ringkasan (Excerpt) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ringkasan Singkat
                                </label>
                                <input
                                    type="text"
                                    value={data.excerpt}
                                    onChange={(e) =>
                                        setData("excerpt", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                />
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Deskripsi Lengkap
                                </label>
                                <textarea
                                    value={data.deskripsi}
                                    onChange={(e) =>
                                        setData("deskripsi", e.target.value)
                                    }
                                    rows={5}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${
                                        errors.deskripsi
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                ></textarea>
                                {errors.deskripsi && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.deskripsi}
                                    </p>
                                )}
                            </div>

                            {/* Upload Gambar */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ganti Poster Program
                                </label>
                                <div className="mt-1 relative border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 transition min-h-[200px] flex items-center justify-center overflow-hidden bg-gray-50">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="w-full h-full flex flex-col items-center justify-center p-2">
                                        {preview ? (
                                            <div className="relative w-full h-48">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="w-full h-full object-contain rounded-lg shadow-sm"
                                                />
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                                    <span className="bg-white/90 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full">
                                                        Klik untuk Ganti Poster
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-sm text-gray-500 font-medium">
                                                    Klik untuk upload poster
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {errors.image && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-8 rounded-lg shadow-md transition disabled:opacity-50"
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Update Program"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EditProgram;
