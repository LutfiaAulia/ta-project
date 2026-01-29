import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

const TambahProgram = () => {
    const { auth } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        judul: "",
        deskripsi: "",
        excerpt: "",
        image: null as File | null,
        status: "active",
        is_open: true as boolean,
        id_pegawai: auth.user.id,
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("store.program"));
    };

    return (
        <Layout>
            <Head title="Tambah Program PLUT" />

            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="pt-20 flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Tambah Program Pemberdayaan Baru
                        </h2>
                        <Link
                            href={route("admin.list.program")}
                            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                        >
                            &larr; Kembali ke Daftar
                        </Link>
                    </div>

                    {/* Form Card */}
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
                                    placeholder="Contoh: Pelatihan Digital Marketing UMKM"
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
                                        <option value="active">
                                            Aktif (Sedang Berjalan)
                                        </option>
                                        <option value="upcoming">
                                            Akan Datang
                                        </option>
                                        <option value="inactive">
                                            Non-Aktif / Selesai
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

                            {/* Ringkasan Singkat (Excerpt) */}
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
                                    placeholder="Ringkasan muncul di halaman depan (max 255 karakter)"
                                />
                            </div>

                            {/* Deskripsi Lengkap */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Deskripsi Lengkap Program
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
                                    placeholder="Tuliskan detail, syarat, dan tujuan program di sini..."
                                ></textarea>
                                {errors.deskripsi && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.deskripsi}
                                    </p>
                                )}
                            </div>

                            {/* Upload Gambar Utama */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Gambar Poster / Banner Program
                                </label>
                                <div className="mt-1 relative border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 transition min-h-[200px] flex items-center justify-center overflow-hidden bg-gray-50">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                    />
                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2 pointer-events-none">
                                        {preview ? (
                                            <div className="relative w-full h-48">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="w-full h-full object-contain rounded-lg shadow-sm"
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Klik untuk pilih gambar
                                                    poster
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
                                    className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-8 rounded-lg shadow-md transition duration-150 flex items-center ${
                                        processing
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Program"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TambahProgram;
