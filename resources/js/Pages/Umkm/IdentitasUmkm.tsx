import React, { useEffect, useState } from "react";
import Layout from "@/Components/LayoutUmkm";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

type SosialMedia = {
    platform: string;
    url: string;
};

type IdentitasData = {
    jenis_usaha?: string;
    nama_usaha?: string;
    alamat_usaha?: string;
    deskripsi?: string;
    latitude?: string;
    longitude?: string;
    foto_usaha?: string | null;
    sosial_media?: SosialMedia[];
};

type UmkmData = {
    no_hp?: string;
    identitas?: IdentitasData;
};

const IdentitasUmkm: React.FC = () => {
    const { props } = usePage<PageProps>();
    const umkm = props.umkm as UmkmData | undefined;

    // Fungsi untuk mendapatkan url sosial media berdasar platform, dari identitas.sosial_media
    function getSosmed(platform: string) {
        return (
            umkm?.identitas?.sosial_media?.find(
                (s) => s.platform.toLowerCase() === platform.toLowerCase()
            )?.url || ""
        );
    }

    const umkmIdentitas = umkm?.identitas;

    const [form, setForm] = useState({
        jenis_usaha: umkmIdentitas?.jenis_usaha || "",
        nama_usaha: umkmIdentitas?.nama_usaha || "",
        alamat_usaha: umkmIdentitas?.alamat_usaha || "",
        no_hp: umkm?.no_hp || "",
        instagram: getSosmed("instagram"),
        whatsapp: getSosmed("whatsapp"),
        facebook: getSosmed("facebook"),
        deskripsi: umkmIdentitas?.deskripsi || "",
        latitude: umkmIdentitas?.latitude || "",
        longitude: umkmIdentitas?.longitude || "",
        foto_usaha: null as File | null,
    });

    useEffect(() => {
        setForm({
            jenis_usaha: umkmIdentitas?.jenis_usaha || "",
            nama_usaha: umkmIdentitas?.nama_usaha || "",
            alamat_usaha: umkmIdentitas?.alamat_usaha || "",
            no_hp: umkm?.no_hp || "",
            instagram: getSosmed("instagram"),
            whatsapp: getSosmed("whatsapp"),
            facebook: getSosmed("facebook"),
            deskripsi: umkmIdentitas?.deskripsi || "",
            latitude: umkmIdentitas?.latitude || "",
            longitude: umkmIdentitas?.longitude || "",
            foto_usaha: null,
        });
    }, [umkmIdentitas, umkm]);

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setForm((prev) => ({ ...prev, foto_usaha: file }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null) data.append(key, value as string | Blob);
        });

        router.post("/umkm/update-data/umkm", data, {
            onSuccess: () => {
                setIsEditing(false);
            },
        });
    };

    const googleMapsUrl =
        form.latitude && form.longitude
            ? `https://www.google.com/maps?q=${form.latitude},${form.longitude}`
            : null;

    return (
        <Layout>
            <div className="max-w-3xl mx-auto p-14">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Data UMKM
                </h1>
                <form onSubmit={handleSubmit} className="grid gap-4 text-sm">
                    <div className="grid gap-2">
                        <label>Jenis Usaha</label>
                        <input
                            type="text"
                            name="jenis_usaha"
                            value={form.jenis_usaha}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                            placeholder="Isi jenis usaha"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Nama Usaha</label>
                        <input
                            type="text"
                            name="nama_usaha"
                            value={form.nama_usaha}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                            placeholder="Isi nama usaha"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Alamat Usaha</label>
                        <input
                            type="text"
                            name="alamat_usaha"
                            value={form.alamat_usaha}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                            placeholder="Isi alamat usaha"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Nomor Telepon</label>
                        <input
                            type="text"
                            name="no_hp"
                            value={form.no_hp}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                            placeholder="Isi nomor telepon"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="instagram"
                            placeholder="https://instagram.com/namamu"
                            value={form.instagram}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                        <input
                            type="text"
                            name="whatsapp"
                            placeholder="https://wa.me/..."
                            value={form.whatsapp}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                        <input
                            type="text"
                            name="facebook"
                            placeholder="https://facebook.com/namamu"
                            value={form.facebook}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Deskripsi UMKM</label>
                        <textarea
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            className="border p-2 rounded h-24"
                            disabled={!isEditing}
                            placeholder="Deskripsi usaha"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Foto Usaha</label>
                        {isEditing && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="border p-2 rounded"
                            />
                        )}
                        {!isEditing ? (
                            umkmIdentitas?.foto_usaha ? (
                                <img
                                    src={`/storage/${umkmIdentitas.foto_usaha}`}
                                    alt="Foto Usaha"
                                    className="w-32 mt-2 rounded shadow"
                                />
                            ) : (
                                <p className="italic text-sm text-gray-500 mt-2">
                                    Belum ada foto usaha.
                                </p>
                            )
                        ) : form.foto_usaha ? (
                            <img
                                src={URL.createObjectURL(form.foto_usaha)}
                                alt="Preview Foto Usaha"
                                className="w-32 mt-2 rounded shadow"
                            />
                        ) : umkmIdentitas?.foto_usaha ? (
                            <img
                                src={`/storage/${umkmIdentitas.foto_usaha}`}
                                alt="Foto Usaha"
                                className="w-32 mt-2 rounded shadow"
                            />
                        ) : (
                            <p className="italic text-sm text-gray-500 mt-2">
                                Belum ada foto usaha.
                            </p>
                        )}
                    </div>

                    {/* Input Latitude */}
                    <div className="grid gap-2">
                        <label>Latitude</label>
                        <input
                            type="text"
                            name="latitude"
                            value={form.latitude}
                            onChange={handleChange}
                            placeholder="Masukkan latitude"
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Input Longitude */}
                    <div className="grid gap-2">
                        <label>Longitude</label>
                        <input
                            type="text"
                            name="longitude"
                            value={form.longitude}
                            onChange={handleChange}
                            placeholder="Masukkan longitude"
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Info dan link Google Maps */}
                    <div className="grid gap-2">
                        <label>Cara mendapatkan koordinat:</label>
                        <p className="text-gray-600 text-xs italic mb-1">
                            Buka&nbsp;
                            <a
                                href="https://www.google.com/maps"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                Google Maps
                            </a>
                            , cari lokasi, klik kanan pada titik lokasi → pilih
                            "What's here?", lalu salin latitude dan longitude
                            yang muncul di bawah.
                        </p>
                        {googleMapsUrl ? (
                            <a
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                Lihat Lokasi UMKM di Google Maps
                            </a>
                        ) : (
                            <p className="text-gray-500 italic">
                                Lokasi belum tersedia
                            </p>
                        )}
                    </div>

                    {/* Tombol edit / batal / simpan */}
                    <div className="flex justify-between">
                        {!isEditing ? (
                            <div className="flex justify-end w-full">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="border px-4 py-2 rounded text-green-600 border-green-500 hover:bg-green-50"
                                >
                                    Edit
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setForm({
                                            jenis_usaha:
                                                umkmIdentitas?.jenis_usaha ||
                                                "",
                                            nama_usaha:
                                                umkmIdentitas?.nama_usaha || "",
                                            alamat_usaha:
                                                umkmIdentitas?.alamat_usaha ||
                                                "",
                                            no_hp: umkm?.no_hp || "",
                                            instagram: getSosmed("instagram"),
                                            whatsapp: getSosmed("whatsapp"),
                                            facebook: getSosmed("facebook"),
                                            deskripsi:
                                                umkmIdentitas?.deskripsi || "",
                                            latitude:
                                                umkmIdentitas?.latitude || "",
                                            longitude:
                                                umkmIdentitas?.longitude || "",
                                            foto_usaha: null,
                                        });
                                    }}
                                    className="border px-4 py-2 rounded text-red-600 border-red-500 hover:bg-red-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Simpan
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default IdentitasUmkm;
