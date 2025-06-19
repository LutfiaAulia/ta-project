import React, { useState } from "react";
import LayoutUmkm from "@/Components/LayoutUmkm";
import LayoutPegawai from "@/Components/Layout";
import { router, usePage } from "@inertiajs/react";

interface Produk {
    id_promosi: number;
    nama_produk: string;
    kategori_produk: string;
    sub_kategori: string;
    harga_produk: string;
    deskripsi_produk: string;
    foto_produk?: string;
}

interface Props {
    userType: "umkm" | "pegawai";
}

const EditProduk: React.FC<Props> = ({ userType }) => {
    const { props } = usePage();
    const produk = props.produk as Produk;
    const id_umkm = props.id_umkm as number | undefined;

    const [form, setForm] = useState({
        nama_produk: produk.nama_produk,
        kategori_produk: produk.kategori_produk,
        sub_kategori: produk.sub_kategori,
        harga_produk: produk.harga_produk,
        deskripsi_produk: produk.deskripsi_produk,
        foto_produk: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        produk.foto_produk ? `/storage/${produk.foto_produk}` : null
    );

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
        if (id_umkm) {
            data.append("id_umkm", id_umkm.toString());
        }
        data.append("_method", "PUT");

        const route =
            userType === "umkm"
                ? `/umkm/update/produk/${produk.id_promosi}`
                : `/pegawai/update/produk/${produk.id_promosi}`;

        router.post(route, data, {
            forceFormData: true,
        });
    };

    const Layout = userType === "umkm" ? LayoutUmkm : LayoutPegawai;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-3 p-10">Edit Produk</h1>
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
                                    Klik untuk unggah
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

export default EditProduk;
