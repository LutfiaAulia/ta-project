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
        produk.foto_produk ? `/storage/${produk.foto_produk}` : null
    );

    const isDisabled = produk.status.toLowerCase() === "diajukan";

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        if (form.foto_produk) {
            data.append("foto_produk", form.foto_produk);
        }
        if (id_umkm) {
            data.append("id_umkm", id_umkm.toString());
        }
        form.legalitas_produk.forEach((val) => {
            data.append("legalitas_produk[]", val);
        });
        if (userType === "umkm") {
            data.append("status", "diajukan");
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
                                disabled={isDisabled}
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
                                disabled={isDisabled}
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
                                disabled={isDisabled}
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
                                disabled={isDisabled}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start">
                        <label className="block mb-2 font-semibold">
                            Foto Produk
                        </label>
                        <label
                            htmlFor="foto_produk"
                            className={`border-dashed border-2 border-green-400 w-48 h-48 flex items-center justify-center text-center rounded-md cursor-pointer bg-green-100 hover:bg-green-200 overflow-hidden ${
                                isDisabled ? "pointer-events-none" : ""
                            }`}
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
                                disabled={isDisabled}
                            />
                        </label>
                    </div>

                    {/* Legalitas Produk */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Legalitas Produk
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="border rounded-lg p-4 bg-gray-50">
                            <button
                                type="button"
                                className={`flex items-center text-blue-600 hover:text-blue-800 font-medium mb-3 transition-colors ${
                                    isDisabled
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }`}
                                onClick={() =>
                                    !isDisabled &&
                                    setShowLegalitas(!showLegalitas)
                                }
                                disabled={isDisabled}
                            >
                                <span className="mr-2">
                                    {showLegalitas ? "📋" : "📄"}
                                </span>
                                {showLegalitas
                                    ? "Sembunyikan Daftar"
                                    : "Tampilkan Daftar Legalitas"}
                            </button>

                            {showLegalitas && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 max-h-64 overflow-y-auto">
                                    {legalitas_produk?.map((item) => (
                                        <label
                                            key={item.id_legpro}
                                            className="flex items-center p-3 border rounded-lg hover:bg-white cursor-pointer transition-colors"
                                        >
                                            <input
                                                type="checkbox"
                                                value={String(item.id_legpro)}
                                                checked={form.legalitas_produk.includes(
                                                    String(item.id_legpro)
                                                )}
                                                onChange={handleCheckboxChange}
                                                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                disabled={isDisabled}
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
                                    <p className="text-sm text-blue-700 mt-1">
                                        {form.legalitas_produk.length > 0
                                            ? legalitas_produk
                                                  .filter((item) =>
                                                      form.legalitas_produk.includes(
                                                          String(item.id_legpro)
                                                      )
                                                  )
                                                  .map((item) => item.singkatan)
                                                  .join(", ")
                                            : "Belum ada legalitas dipilih"}
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
                            disabled={isDisabled}
                        />
                        {(produk.status.toLowerCase() === "ditolak" ||
                            (produk.status.toLowerCase() === "diajukan" &&
                                props.produk.alasan_penolakan)) &&
                            props.produk.alasan_penolakan && (
                                <p className="mt-2 text-red-600 font-medium">
                                    <strong>Alasan Penolakan:</strong>{" "}
                                    {props.produk.alasan_penolakan}
                                </p>
                            )}
                    </div>

                    {/* Sembunyikan tombol simpan jika status "diajukan" */}
                    {!isDisabled && (
                        <div className="col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className="bg-green-500 text-white font-semibold px-6 py-2 rounded hover:bg-green-600"
                            >
                                Simpan
                            </button>
                        </div>
                    )}

                    {userType === "pegawai" && produk.status === "diajukan" && (
                        <div className="col-span-2 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    router.put(
                                        `/pegawai/produk/${produk.id_promosi}/status`,
                                        {
                                            status: "diterima",
                                        }
                                    )
                                }
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Verifikasi
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Tolak
                            </button>
                        </div>
                    )}
                </form>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">
                            Alasan Penolakan
                        </h2>
                        <textarea
                            rows={4}
                            className="w-full border rounded px-3 py-2 mb-4"
                            value={alasan}
                            onChange={(e) => setAlasan(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={handleTolak}
                            >
                                Kirim
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default EditProduk;
