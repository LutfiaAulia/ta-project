import React, { useState, useCallback } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";

type BeritaForm = {
    judul: string;
    slug: string;
    gambar: File | null; 
    tanggal_publikasi: string; 
    ringkasan: string;
    konten: string;
};

const generateSlug = (text: string): string => {
    return text.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') 
        .replace(/[\s_-]+/g, '-') 
        .replace(/^-+|-+$/g, '');
};

type Props = {};

const TambahBerita: React.FC<Props> = () => {
    const [form, setForm] = useState<BeritaForm>({
        judul: "",
        slug: "",
        gambar: null,
        tanggal_publikasi: new Date().toISOString().split('T')[0],
        ringkasan: "",
        konten: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type } = e.target;

        setForm((prev) => {
            let newState: Partial<BeritaForm> = { [name]: value };

            if (type === 'file') {
                const file = (e.target as HTMLInputElement).files?.[0] || null;
                newState = { [name]: file };
            }

            if (name === 'judul') {
                newState.slug = generateSlug(value);
            }

            return { ...prev, ...newState } as BeritaForm;
        });

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!form.judul.trim())
            newErrors.judul = "Judul berita wajib diisi";
        if (!form.gambar)
            newErrors.gambar = "Gambar utama wajib diunggah";
        if (!form.tanggal_publikasi)
            newErrors.tanggal_publikasi = "Tanggal publikasi wajib diisi";
        if (!form.ringkasan.trim())
            newErrors.ringkasan = "Ringkasan berita wajib diisi";
        if (!form.konten.trim())
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

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
                    
                    {/* Input Judul */}
                    <div>
                        <label htmlFor="judul" className="block mb-1 font-medium text-gray-700">
                            Judul Berita
                        </label>
                        <input
                            id="judul"
                            type="text"
                            name="judul"
                            value={form.judul}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            placeholder="Masukkan judul berita"
                        />
                        {renderError("judul")}
                    </div>

                    {/* Otomatis Slug (Read-only) */}
                    <div>
                        <label htmlFor="slug" className="block mb-1 font-medium text-gray-700">
                            Slug (Otomatis)
                        </label>
                        <input
                            id="slug"
                            type="text"
                            name="slug"
                            value={form.slug}
                            readOnly
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                            placeholder="Slug akan terisi otomatis"
                        />
                        {renderError("slug")}
                    </div>
                    
                    {/* Input Tanggal */}
                    <div>
                        <label htmlFor="tanggal" className="block mb-1 font-medium text-gray-700">
                            Tanggal Publikasi
                        </label>
                        <input
                            id="tanggal"
                            type="date"
                            name="tanggal"
                            value={form.tanggal_publikasi}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                        {renderError("tanggal")}
                    </div>

                    {/* Input Gambar (File) */}
                    <div>
                        <label htmlFor="gambar" className="block mb-1 font-medium text-gray-700">
                            Gambar Utama
                        </label>
                        <input
                            id="gambar"
                            type="file"
                            name="gambar"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100
                                border border-gray-300 rounded-lg p-2"
                        />
                        {/* Tampilkan nama file yang terpilih */}
                        {form.gambar && <p className="text-xs text-gray-600 mt-1">File terpilih: {form.gambar.name}</p>}
                        {renderError("gambar")}
                    </div>

                    {/* Input Ringkasan */}
                    <div>
                        <label htmlFor="ringkasan" className="block mb-1 font-medium text-gray-700">
                            Ringkasan Berita (Maksimal 2-3 Kalimat)
                        </label>
                        <textarea
                            id="ringkasan"
                            name="ringkasan"
                            value={form.ringkasan}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg resize-y focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            rows={3}
                            placeholder="Masukkan ringkasan singkat berita"
                        />
                        {renderError("ringkasan")}
                    </div>
                    
                    {/* Input Konten */}
                    <div>
                        <label htmlFor="konten" className="block mb-1 font-medium text-gray-700">
                            Konten Berita
                        </label>
                        <textarea
                            id="konten"
                            name="konten"
                            value={form.konten}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg resize-y focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            rows={10}
                            placeholder="Masukkan seluruh isi konten berita di sini"
                        />
                        {renderError("konten")}
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-base px-6 py-2 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-[1.01]"
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