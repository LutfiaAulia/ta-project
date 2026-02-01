import React, { useState } from "react";
import LayoutUmkm from "@/Components/LayoutUmkm";
import LayoutPegawai from "@/Components/Layout";
import { router, usePage } from "@inertiajs/react";

type LegalitasProduk = {
    id_legpro: number;
    singkatan: string;
};

interface Produk {
    id_promosi: number;
    nama_produk: string;
    kategori_produk: string;
    sub_kategori: string;
    harga_produk: number;
    legalitas_produk: string[];
    deskripsi_produk: string;
    foto_produk?: string;
    status: string;
    alasan_penolakan: string;
}

interface Props {
    legalitas_produk: LegalitasProduk[];
    userType: "umkm" | "pegawai";
}

const EditProduk: React.FC<Props> = ({ userType, legalitas_produk }) => {
    const { props } = usePage() as any;
    const errors = props.errors || {};
    const produk = props.produk as Produk;
    const id_umkm = props.id_umkm as number | undefined;

    const [form, setForm] = useState({
        nama_produk: produk.nama_produk,
        kategori_produk: produk.kategori_produk,
        sub_kategori: produk.sub_kategori,
        harga_produk: produk.harga_produk,
        deskripsi_produk: produk.deskripsi_produk,
        foto_produk: null as File | null,
        legalitas_produk: Array.isArray(produk.legalitas_produk)
            ? produk.legalitas_produk.map(String)
            : [],
    });

    const [showLegalitas, setShowLegalitas] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(
        produk.foto_produk ? `/storage/${produk.foto_produk}` : null,
    );

    const isDisabled = produk.status.toLowerCase() === "diajukan";

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        if (isDisabled) return;
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return;
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

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return;
        const { value, checked } = e.target;
        setForm((prev) => {
            const updated = checked
                ? [...prev.legalitas_produk, value]
                : prev.legalitas_produk.filter((v) => v !== value);
            return { ...prev, legalitas_produk: updated };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isDisabled) return;

        const data = new FormData();
        data.append("nama_produk", form.nama_produk);
        data.append("kategori_produk", form.kategori_produk);
        data.append("sub_kategori", form.sub_kategori);
        data.append("harga_produk", form.harga_produk.toString());
        data.append("deskripsi_produk", form.deskripsi_produk);
        if (form.foto_produk) data.append("foto_produk", form.foto_produk);
        if (id_umkm) data.append("id_umkm", id_umkm.toString());

        form.legalitas_produk.forEach((val) => {
            data.append("legalitas_produk[]", val);
        });

        if (userType === "umkm") data.append("status", "diajukan");

        data.append("_method", "PUT");

        const route =
            userType === "umkm"
                ? `/umkm/update/produk/${produk.id_promosi}`
                : `/pegawai/update/produk/${produk.id_promosi}`;

        router.post(route, data, { forceFormData: true });
    };

    const [showModal, setShowModal] = useState(false);
    const [alasan, setAlasan] = useState("");

    const handleTolak = () => {
        router.put(`/pegawai/produk/${produk.id_promosi}/status`, {
            status: "ditolak",
            alasan_penolakan: alasan,
        });
        setShowModal(false);
    };

    const Layout = userType === "umkm" ? LayoutUmkm : LayoutPegawai;

    return (
        <Layout>
            <div className="max-w-5xl mx-auto p-6 bg-white shadow-sm rounded-xl my-10">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Edit Produk
                        </h1>
                        <p className="text-sm text-gray-500">
                            Perbarui informasi produk Anda di bawah ini.
                        </p>
                    </div>
                    {isDisabled && (
                        <span className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium animate-pulse">
                            Sedang Diverifikasi
                        </span>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Kolom Kiri: Input Data */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Nama Produk
                                </label>
                                <input
                                    type="text"
                                    name="nama_produk"
                                    value={form.nama_produk}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                                    required
                                    disabled={isDisabled}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Kategori
                                    </label>
                                    <input
                                        type="text"
                                        name="kategori_produk"
                                        value={form.kategori_produk}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                                        required
                                        disabled={isDisabled}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Sub Kategori
                                    </label>
                                    <input
                                        type="text"
                                        name="sub_kategori"
                                        value={form.sub_kategori}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                                        required
                                        disabled={isDisabled}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Harga (Rp)
                                </label>
                                <input
                                    type="number"
                                    name="harga_produk"
                                    value={form.harga_produk}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                                    required
                                    disabled={isDisabled}
                                />
                            </div>
                        </div>

                        {/* Kolom Kanan: Foto */}
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50">
                            <label className="block text-sm font-semibold text-gray-700 mb-4">
                                Foto Produk
                            </label>
                            <div className="relative group">
                                <label
                                    htmlFor="foto_produk"
                                    className={`relative w-56 h-56 flex items-center justify-center rounded-lg overflow-hidden border-2 border-green-400 bg-white transition-all ${
                                        !isDisabled
                                            ? "cursor-pointer hover:border-green-600 shadow-md"
                                            : ""
                                    }`}
                                >
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="text-center p-4 text-gray-400">
                                            <span className="text-4xl mb-2">
                                                📸
                                            </span>
                                            <p className="text-xs">
                                                Klik untuk ubah foto
                                            </p>
                                        </div>
                                    )}
                                    <input
                                        id="foto_produk"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        disabled={isDisabled}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Deskripsi & Legalitas */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Deskripsi Produk
                            </label>
                            <textarea
                                name="deskripsi_produk"
                                value={form.deskripsi_produk}
                                onChange={handleChange}
                                rows={4}
                                className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                                required
                                disabled={isDisabled}
                            />
                        </div>

                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-sm font-bold text-gray-700">
                                    Legalitas Produk{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowLegalitas(!showLegalitas)
                                    }
                                    className="text-sm text-blue-600 hover:underline font-medium disabled:opacity-50"
                                    disabled={isDisabled}
                                >
                                    {showLegalitas
                                        ? "Tutup Pilihan"
                                        : "Pilih Legalitas"}
                                </button>
                            </div>

                            {showLegalitas && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 animate-fadeIn">
                                    {legalitas_produk?.map((item) => (
                                        <label
                                            key={item.id_legpro}
                                            className="flex items-center p-2 bg-white border rounded-lg cursor-pointer hover:border-green-500 transition-all"
                                        >
                                            <input
                                                type="checkbox"
                                                value={String(item.id_legpro)}
                                                checked={form.legalitas_produk.includes(
                                                    String(item.id_legpro),
                                                )}
                                                onChange={handleCheckboxChange}
                                                className="rounded text-green-600 focus:ring-green-500 mr-2"
                                                disabled={isDisabled}
                                            />
                                            <span className="text-xs text-gray-600">
                                                {item.singkatan}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            <div className="mt-4 flex flex-wrap gap-2">
                                {form.legalitas_produk.length > 0 ? (
                                    legalitas_produk
                                        .filter((item) =>
                                            form.legalitas_produk.includes(
                                                String(item.id_legpro),
                                            ),
                                        )
                                        .map((item) => (
                                            <span
                                                key={item.id_legpro}
                                                className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium"
                                            >
                                                ✓ {item.singkatan}
                                            </span>
                                        ))
                                ) : (
                                    <p className="text-xs text-gray-400 italic">
                                        Belum ada legalitas yang dipilih.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Alasan Penolakan Alert */}
                    {produk.alasan_penolakan &&
                        produk.status.toLowerCase() === "ditolak" && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
                                <p className="text-sm font-bold">
                                    Produk Perlu Perbaikan:
                                </p>
                                <p className="text-sm">
                                    {produk.alasan_penolakan}
                                </p>
                            </div>
                        )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-6 border-t">
                        {!isDisabled && (
                            <button
                                type="submit"
                                className="bg-green-600 text-white font-bold px-8 py-2.5 rounded-lg hover:bg-green-700 shadow-md transition-all active:scale-95"
                            >
                                Simpan Perubahan
                            </button>
                        )}

                        {userType === "pegawai" &&
                            produk.status === "diajukan" && (
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.put(
                                                `/pegawai/produk/${produk.id_promosi}/status`,
                                                { status: "diterima" },
                                            )
                                        }
                                        className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-green-700 shadow-md"
                                    >
                                        Verifikasi
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(true)}
                                        className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-700 shadow-md"
                                    >
                                        Tolak
                                    </button>
                                </div>
                            )}
                    </div>
                </form>
            </div>

            {/* Modal Alasan Penolakan */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-2">
                                Konfirmasi Penolakan
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">
                                Berikan alasan mengapa produk ini ditolak agar
                                pemilik UMKM dapat memperbaikinya.
                            </p>
                            <textarea
                                rows={4}
                                className="w-full border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                placeholder="Contoh: Foto kurang jelas atau deskripsi tidak sesuai..."
                                value={alasan}
                                onChange={(e) => setAlasan(e.target.value)}
                            />
                        </div>
                        <div className="bg-gray-50 p-4 flex justify-end gap-3">
                            <button
                                className="px-4 py-2 text-gray-600 font-medium"
                                onClick={() => setShowModal(false)}
                            >
                                Batal
                            </button>
                            <button
                                className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
                                onClick={handleTolak}
                            >
                                Kirim Penolakan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default EditProduk;
