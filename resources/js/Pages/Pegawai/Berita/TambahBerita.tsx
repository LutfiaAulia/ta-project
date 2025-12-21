import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type BeritaForm = {
    judul: string;
    slug: string;
    gambar: File | null;
    tanggal_publikasi: string;
    ringkasan: string;
    konten: string;
};

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
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
];

const TambahBerita: React.FC = () => {
    const [form, setForm] = useState<BeritaForm>({
        judul: "",
        slug: "",
        gambar: null,
        tanggal_publikasi: new Date().toISOString().split("T")[0],
        ringkasan: "",
        konten: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        setForm((prev) => {
            let newState: Partial<BeritaForm> = { [name]: value };
            if (type === "file") {
                const file = (e.target as HTMLInputElement).files?.[0] || null;
                newState = { [name]: file };
            }
            if (name === "judul") {
                newState.slug = generateSlug(value);
            }
            return { ...prev, ...newState } as BeritaForm;
        });
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleQuillChange = (content: string) => {
        setForm((prev) => ({ ...prev, konten: content }));
        setErrors((prev) => ({ ...prev, konten: "" }));
    };

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!form.judul.trim()) newErrors.judul = "Judul berita wajib diisi";
        if (!form.gambar) newErrors.gambar = "Gambar utama wajib diunggah";
        if (!form.tanggal_publikasi)
            newErrors.tanggal_publikasi = "Tanggal publikasi wajib diisi";
        if (!form.ringkasan.trim())
            newErrors.ringkasan = "Ringkasan berita wajib diisi";
        if (!form.konten || form.konten === "<p><br></p>")
            newErrors.konten = "Konten berita wajib diisi";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        router.post("/pegawai/store/berita", form, {
            forceFormData: true,
            onError: (errors) => {
                setErrors(errors as { [key: string]: string });
            },
        });
    };

    const renderError = (field: string) =>
        errors[field] ? (
            <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
        ) : null;

    return (
        <Layout>
            <div className="max-w-screen-lg mx-auto p-8 sm:p-12">
                <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
                    Tambah Berita Baru
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100"
                >
                    {/* Input Judul */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Judul Berita
                        </label>
                        <input
                            type="text"
                            name="judul"
                            value={form.judul}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Masukkan judul berita"
                        />
                        {renderError("judul")}
                    </div>

                    {/* Input Slug */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Slug (Otomatis)
                        </label>
                        <input
                            type="text"
                            value={form.slug}
                            readOnly
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* Input Tanggal */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Tanggal Publikasi
                        </label>
                        <input
                            type="date"
                            name="tanggal_publikasi"
                            value={form.tanggal_publikasi}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                        />
                    </div>

                    {/* Input Gambar */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Gambar Utama
                        </label>
                        <input
                            type="file"
                            name="gambar"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                        {renderError("gambar")}
                    </div>

                    {/* Input Ringkasan */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Ringkasan Berita
                        </label>
                        <textarea
                            name="ringkasan"
                            value={form.ringkasan}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                            rows={3}
                        />
                        {renderError("ringkasan")}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Konten Berita
                        </label>
                        <div className="bg-white">
                            <ReactQuill
                                theme="snow"
                                value={form.konten}
                                onChange={handleQuillChange}
                                modules={modules}
                                formats={formats}
                                className="rounded-lg"
                                placeholder="Tulis isi berita lengkap dengan penomoran dan paragraf..."
                            />
                        </div>
                        {renderError("konten")}
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200"
                        >
                            Publikasikan Berita
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default TambahBerita;
