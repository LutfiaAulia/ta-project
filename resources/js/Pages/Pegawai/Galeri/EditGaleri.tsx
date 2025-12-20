import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { Head, Link, useForm } from "@inertiajs/react";

interface Galeri {
    id_galeri: number;
    judul: string;
    tanggal: string;
    gambar: string | null;
    keterangan?: string;
}

interface Props {
    galeri: Galeri;
}

const EditGaleri = ({ galeri }: Props) => {
    const { data, setData, post, processing, errors } = useForm({
        judul: galeri.judul || "",
        tanggal: galeri.tanggal || "",
        gambar: null as File | null,
        keterangan: galeri.keterangan || "",
        _method: "POST",
    });

    const [preview, setPreview] = useState<string | null>(
        galeri.gambar ? `/storage/${galeri.gambar}` : null
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("gambar", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("update.galeri", galeri.id_galeri), {
            forceFormData: true,
        });
    };

    return (
        <Layout>
            <Head title={`Edit - ${galeri.judul}`} />

            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="pt-20 flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Edit Galeri Kegiatan
                        </h2>
                        <Link
                            href={route("index.galeri")}
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
                                    Judul Kegiatan
                                </label>
                                <input
                                    type="text"
                                    value={data.judul}
                                    onChange={(e) =>
                                        setData("judul", e.target.value)
                                    }
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
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

                            {/* Tanggal */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tanggal Pelaksanaan
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal}
                                    onChange={(e) =>
                                        setData("tanggal", e.target.value)
                                    }
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                                        errors.tanggal
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {errors.tanggal && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.tanggal}
                                    </p>
                                )}
                            </div>

                            {/* Upload Gambar */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Foto Kegiatan
                                </label>
                                <div className="mt-1 relative border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition min-h-[200px] flex items-center justify-center overflow-hidden">
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
                                                    className="w-full h-full object-cover rounded-lg shadow-sm"
                                                />
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                                    <span className="bg-white/90 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                                                        Klik untuk Ganti Foto
                                                    </span>
                                                </div>
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
                                                <p className="mt-1 text-sm text-gray-500 font-medium">
                                                    Klik untuk pilih gambar
                                                </p>
                                                <p className="text-[10px] text-gray-400">
                                                    JPG, PNG, Max 2MB
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {errors.gambar && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.gambar}
                                    </p>
                                )}
                            </div>

                            {/* Keterangan */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Keterangan
                                </label>
                                <textarea
                                    value={data.keterangan}
                                    onChange={(e) =>
                                        setData("keterangan", e.target.value)
                                    }
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-lg shadow-md transition disabled:opacity-50"
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Update Galeri"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EditGaleri;
