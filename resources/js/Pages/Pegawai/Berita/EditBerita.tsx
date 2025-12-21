import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";
// Import Quill
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

type Props = {
    berita: {
        id_berita: number;
        judul: string;
        slug: string;
        gambar: string | null;
        tanggal_publikasi: string;
        ringkasan: string;
        konten: string;
    };
};

const EditBerita: React.FC<Props> = ({ berita }) => {
    const [form, setForm] = useState<BeritaForm>({
        judul: berita.judul,
        slug: berita.slug,
        gambar: null,
        tanggal_publikasi: berita.tanggal_publikasi?.slice(0, 10),
        ringkasan: berita.ringkasan,
        konten: berita.konten,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Toolbar editor
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "clean"],
        ],
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        setForm((prev) => {
            let newState: Record<string, any> = {};

            if (type === "file") {
                const fileInput = e.target as HTMLInputElement;
                if (fileInput.files && fileInput.files[0]) {
                    newState[name] = fileInput.files[0];
                } else {
                    return prev;
                }
            } else {
                newState[name] = value;
            }

            if (name === "judul") {
                newState.slug = generateSlug(value);
            }

            return { ...prev, ...newState };
        });

        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Handler khusus konten editor
    const handleKontenChange = (value: string) => {
        setForm((prev) => ({ ...prev, konten: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(
            `/pegawai/update/berita/${berita.id_berita}`,
            {
                _method: "PUT",
                ...form,
            },
            {
                forceFormData: true,
                onError: (err) => setErrors(err),
            }
        );
    };

    const renderError = (field: string) =>
        errors[field] && (
            <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
        );

    return (
        <Layout>
            <div className="max-w-screen-lg mx-auto p-8 sm:p-12">
                <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
                    Edit Berita
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100"
                >
                    {/* Judul */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Judul Berita
                        </label>
                        <input
                            type="text"
                            name="judul"
                            value={form.judul}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded-lg"
                        />
                        {renderError("judul")}
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Slug
                        </label>
                        <input
                            type="text"
                            name="slug"
                            value={form.slug}
                            readOnly
                            className="w-full border px-4 py-2 rounded-lg bg-gray-100 text-gray-500"
                        />
                    </div>

                    {/* Tanggal Publikasi */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Tanggal Publikasi
                        </label>
                        <input
                            type="date"
                            name="tanggal_publikasi"
                            value={form.tanggal_publikasi}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded-lg"
                        />
                        {renderError("tanggal_publikasi")}
                    </div>

                    {/* Gambar */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Gambar Utama
                        </label>

                        {berita.gambar && (
                            <img
                                src={`/storage/${berita.gambar}`}
                                alt="Gambar Lama"
                                className="w-32 h-20 object-cover rounded-md border mb-3"
                            />
                        )}

                        <input
                            type="file"
                            name="gambar"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded-lg"
                        />

                        {form.gambar && (
                            <p className="text-xs text-gray-600 mt-1">
                                File baru: {form.gambar.name}
                            </p>
                        )}

                        {renderError("gambar")}
                    </div>

                    {/* Ringkasan */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Ringkasan
                        </label>
                        <textarea
                            name="ringkasan"
                            value={form.ringkasan}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border px-4 py-2 rounded-lg"
                        />
                        {renderError("ringkasan")}
                    </div>

                    {/* Konten (Ganti Textarea ke Quill) */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Konten Berita
                        </label>
                        <div className="bg-white">
                            <ReactQuill
                                theme="snow"
                                value={form.konten}
                                onChange={handleKontenChange}
                                modules={modules}
                                className="mb-12 h-64"
                            />
                        </div>
                        {renderError("konten")}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end pt-10">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                        >
                            Update Berita
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditBerita;
