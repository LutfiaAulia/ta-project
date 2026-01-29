import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { Head, Link, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const generateSlug = (text: string): string => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
];

const TambahBerita = () => {
    const { data, setData, post, processing, errors } = useForm({
        judul: "",
        slug: "",
        gambar: null as File | null,
        tanggal_publikasi: new Date().toISOString().split("T")[0],
        ringkasan: "",
        konten: "",
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleJudulChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData((prev) => ({
            ...prev,
            judul: value,
            slug: generateSlug(value),
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("gambar", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("berita.store"), {
            forceFormData: true,
        });
    };

    return (
        <Layout>
            <Head title="Tambah Berita" />

            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Navigasi */}
                    <div className="pt-20 flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Tambah Berita Baru
                        </h2>
                        <Link
                            href={route("berita.list")}
                            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                        >
                            &larr; Batal & Kembali
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 md:p-8 space-y-6"
                        >
                            {/* Judul & Slug */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Judul Berita
                                    </label>
                                    <input
                                        type="text"
                                        value={data.judul}
                                        onChange={handleJudulChange}
                                        placeholder="Contoh: Kegiatan Bakti Sosial..."
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition ${
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Slug (Otomatis)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Tanggal & Gambar */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Publikasi
                                    </label>
                                    <input
                                        type="date"
                                        value={data.tanggal_publikasi}
                                        onChange={(e) =>
                                            setData(
                                                "tanggal_publikasi",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                    />
                                    {errors.tanggal_publikasi && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.tanggal_publikasi}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Gambar Utama
                                    </label>
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 transition bg-gray-50 p-2 text-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="h-32 mx-auto object-cover rounded-md shadow-sm"
                                            />
                                        ) : (
                                            <div className="py-4">
                                                <p className="text-xs text-gray-500">
                                                    Klik untuk upload gambar
                                                    utama (Max 2MB)
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {errors.gambar && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.gambar}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Ringkasan */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ringkasan Berita
                                </label>
                                <textarea
                                    value={data.ringkasan}
                                    onChange={(e) =>
                                        setData("ringkasan", e.target.value)
                                    }
                                    rows={2}
                                    placeholder="Tulis ringkasan singkat untuk tampilan depan..."
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition ${
                                        errors.ringkasan
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {errors.ringkasan && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.ringkasan}
                                    </p>
                                )}
                            </div>

                            {/* Konten (Quill) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Konten Berita Lengkap
                                </label>
                                <div
                                    className={`rounded-lg overflow-hidden border ${errors.konten ? "border-red-500" : "border-gray-300"}`}
                                >
                                    <ReactQuill
                                        theme="snow"
                                        value={data.konten}
                                        onChange={(content) =>
                                            setData("konten", content)
                                        }
                                        modules={modules}
                                        formats={formats}
                                        className="bg-white min-h-[300px]"
                                        placeholder="Tulis isi berita lengkap di sini..."
                                    />
                                </div>
                                {errors.konten && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.konten}
                                    </p>
                                )}
                            </div>

                            {/* Action Button */}
                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-10 rounded-lg shadow-md transition disabled:opacity-50"
                                >
                                    {processing
                                        ? "Memproses..."
                                        : "Publikasikan Berita"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TambahBerita;
