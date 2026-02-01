import React, { useState } from "react";
import Layout from "@/Components/LayoutUmkm";
import { router, Link } from "@inertiajs/react";
import {
    ChevronLeft,
    UploadCloud,
    CheckCircle2,
    FileText,
    Tag,
    Layers,
    Banknote,
    Image as ImageIcon,
} from "lucide-react";

type LegalitasProduk = {
    id_legpro: number;
    singkatan: string;
};

type LegalitasProps = {
    legpro: LegalitasProduk[];
};

const TambahProduk: React.FC<LegalitasProps> = ({ legpro }) => {
    const [form, setForm] = useState({
        nama_produk: "",
        kategori_produk: "",
        sub_kategori: "",
        harga_produk: "",
        legalitas_produk: [] as number[],
        deskripsi_produk: "",
        foto_produk: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setForm({ ...form, foto_produk: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setForm((prev) => {
            const current = prev.legalitas_produk;
            const exists = current.includes(id);
            return {
                ...prev,
                legalitas_produk: exists
                    ? current.filter((item) => item !== id)
                    : [...current, id],
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (key !== "legalitas_produk" && key !== "foto_produk" && value) {
                data.append(key, value as string);
            }
        });

        if (form.foto_produk) data.append("foto_produk", form.foto_produk);
        form.legalitas_produk.forEach((id) =>
            data.append("legalitas_produk[]", String(id)),
        );

        router.post("/umkm/store/produk", data);
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto p-4 md:p-8">
                {/* Header & Back Button */}
                <div className="mb-8">
                    <Link
                        href="/umkm/produk"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-4"
                    >
                        <ChevronLeft size={16} />
                        Kembali ke Daftar Produk
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Tambah Produk Baru
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Lengkapi detail informasi produk UMKM Anda.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Form Details */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
                                    <FileText
                                        size={20}
                                        className="text-indigo-500"
                                    />
                                    Informasi Umum
                                </h2>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Produk
                                    </label>
                                    <div className="relative">
                                        <Tag
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            size={18}
                                        />
                                        <input
                                            type="text"
                                            name="nama_produk"
                                            value={form.nama_produk}
                                            onChange={handleChange}
                                            placeholder="Contoh: Keripik Tempe Pedas"
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Kategori
                                        </label>
                                        <div className="relative">
                                            <Layers
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                                size={18}
                                            />
                                            <input
                                                type="text"
                                                name="kategori_produk"
                                                value={form.kategori_produk}
                                                onChange={handleChange}
                                                placeholder="Makanan"
                                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Sub Kategori
                                        </label>
                                        <input
                                            type="text"
                                            name="sub_kategori"
                                            value={form.sub_kategori}
                                            onChange={handleChange}
                                            placeholder="Camilan Tradisional"
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Harga Produk (Rp)
                                    </label>
                                    <div className="relative">
                                        <Banknote
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            size={18}
                                        />
                                        <input
                                            type="number"
                                            name="harga_produk"
                                            value={form.harga_produk}
                                            onChange={handleChange}
                                            placeholder="0"
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Deskripsi Produk
                                    </label>
                                    <textarea
                                        name="deskripsi_produk"
                                        value={form.deskripsi_produk}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Jelaskan keunggulan dan detail produk Anda..."
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Legalitas Card */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                                    <CheckCircle2
                                        size={20}
                                        className="text-emerald-500"
                                    />
                                    Legalitas & Sertifikasi
                                </h2>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {legpro.map((item) => {
                                        const isSelected =
                                            form.legalitas_produk.includes(
                                                item.id_legpro,
                                            );
                                        return (
                                            <button
                                                key={item.id_legpro}
                                                type="button"
                                                onClick={() =>
                                                    handleCheckboxChange(
                                                        item.id_legpro,
                                                    )
                                                }
                                                className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all text-xs font-bold uppercase tracking-tight
                                                    ${
                                                        isSelected
                                                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                            : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
                                                    }`}
                                            >
                                                {item.singkatan}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Photo Upload */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                                    <ImageIcon
                                        size={20}
                                        className="text-blue-500"
                                    />
                                    Foto Produk
                                </h2>

                                <div className="space-y-4">
                                    <label
                                        htmlFor="foto_produk"
                                        className={`relative group border-2 border-dashed rounded-2xl aspect-square flex flex-col items-center justify-center text-center cursor-pointer transition-all overflow-hidden
                                            ${imagePreview ? "border-indigo-500 bg-gray-50" : "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30"}`}
                                    >
                                        {imagePreview ? (
                                            <>
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="object-cover w-full h-full"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <p className="text-white text-sm font-medium">
                                                        Ubah Foto
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="p-6">
                                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <UploadCloud size={24} />
                                                </div>
                                                <p className="text-sm font-semibold text-gray-700">
                                                    Pilih Berkas
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    PNG, JPG up to 5MB
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            id="foto_produk"
                                            name="foto_produk"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>

                                    <button
                                        type="submit"
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
                                    >
                                        Simpan Produk
                                    </button>

                                    <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
                                        Pastikan data sudah benar sebelum
                                        menyimpan
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default TambahProduk;
