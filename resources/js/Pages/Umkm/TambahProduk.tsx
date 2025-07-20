import React, { useState } from "react";
import Layout from "@/Components/LayoutUmkm";
import { router } from "@inertiajs/react";

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
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        data.append("nama_produk", form.nama_produk);
        data.append("kategori_produk", form.kategori_produk);
        data.append("sub_kategori", form.sub_kategori);
        data.append("harga_produk", form.harga_produk);
        data.append("deskripsi_produk", form.deskripsi_produk);
        if (form.foto_produk) {
            data.append("foto_produk", form.foto_produk);
        }

        form.legalitas_produk.forEach((id) =>
            data.append("legalitas_produk[]", String(id))
        );

        router.post("/umkm/store/produk", data);
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6 p-10">
                    Tambah Produk UMKM
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">
                                Nama Produk
                            </label>
                            <input
                                type="text"
                                name="nama_produk"
                                value={form.nama_produk}
                                onChange={handleChange}
                                className="w-full border rounded px-4 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">
                                Kategori
                            </label>
                            <input
                                type="text"
                                name="kategori_produk"
                                value={form.kategori_produk}
                                onChange={handleChange}
                                className="w-full border rounded px-4 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">
                                Sub Kategori
                            </label>
                            <input
                                type="text"
                                name="sub_kategori"
                                value={form.sub_kategori}
                                onChange={handleChange}
                                className="w-full border rounded px-4 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">
                                Harga
                            </label>
                            <input
                                type="number"
                                name="harga_produk"
                                value={form.harga_produk}
                                onChange={handleChange}
                                className="w-full border rounded px-4 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start">
                        <label className="block mb-2 font-semibold">
                            Foto Produk
                        </label>
                        <label
                            htmlFor="foto_produk"
                            className="border-dashed border-2 border-green-400 w-48 h-48 flex items-center justify-center text-center rounded-md cursor-pointer bg-green-100 hover:bg-green-200 overflow-hidden"
                        >
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <span className="text-sm px-2">
                                    Drag image here
                                    <br />
                                    or
                                    <br />
                                    <span className="text-green-600 underline">
                                        Browse image
                                    </span>
                                </span>
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
                        {form.foto_produk && (
                            <p className="mt-2 text-sm text-gray-600">
                                {form.foto_produk.name}
                            </p>
                        )}
                    </div>

                    {/* Legalitas Produk */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-semibold">
                            Legalitas Produk
                        </label>
                        <div className="border rounded-lg p-4 bg-gray-50">
                            <button
                                type="button"
                                className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-3 transition-colors"
                                onClick={() =>
                                    setShowCheckboxes(!showCheckboxes)
                                }
                            >
                                <span className="mr-2">
                                    {showCheckboxes ? "📋" : "📄"}
                                </span>
                                {showCheckboxes
                                    ? "Sembunyikan Daftar"
                                    : "Tampilkan Daftar Legalitas"}
                            </button>

                            {showCheckboxes && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                                    {legpro.map((item) => (
                                        <label
                                            key={item.id_legpro}
                                            className="flex items-center p-3 border rounded-lg hover:bg-white cursor-pointer transition-colors"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={form.legalitas_produk.includes(
                                                    item.id_legpro
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        item.id_legpro
                                                    )
                                                }
                                                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <span className="text-sm text-gray-700">
                                                {item.singkatan}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {form.legalitas_produk.length > 0 && (
                                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-800 font-medium">
                                        Dipilih: {form.legalitas_produk.length}{" "}
                                        legalitas produk
                                    </p>
                                </div>
                            )}
                        </div>
                        {errors.legalitas_produk && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <span className="mr-1">⚠</span>
                                {errors.legalitas_produk}
                            </p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1 font-semibold">
                            Deskripsi Produk
                        </label>
                        <textarea
                            name="deskripsi_produk"
                            value={form.deskripsi_produk}
                            onChange={handleChange}
                            rows={5}
                            className="w-full border rounded px-4 py-2"
                            required
                        />
                    </div>

                    <div className="col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-500 text-white font-semibold px-6 py-2 rounded hover:bg-green-600"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default TambahProduk;
