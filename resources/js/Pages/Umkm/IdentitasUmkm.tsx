import React, { useEffect, useState } from "react";
import Layout from "@/Components/LayoutUmkm";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

type SosialMedia = {
    platform: string;
    url: string;
};

type Kategori = {
    id_kategori: number;
    nama_kategori: string;
};

type IdentitasData = {
    jenis_usaha?: string;
    nama_usaha?: string;
    kabupaten_kota?: string;
    kecamatan?: string;
    kanagarian_kelurahan?: string;
    alamat_detail?: string;
    deskripsi?: string;
    latitude?: string;
    longitude?: string;
    foto_usaha?: string | null;
    sosial_media?: SosialMedia[];
    kategori_umkm?: Kategori[];
};

type UmkmData = {
    no_hp?: string;
    identitas?: IdentitasData;
};

const IdentitasUmkm: React.FC = () => {
    const { props } = usePage<PageProps>();
    const umkm = props.umkm as UmkmData | undefined;
    const kategoriList =
        (props.kategori_umkm as {
            id_kategori: number;
            nama_kategori: string;
        }[]) || [];

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
        kabupaten_kota: umkmIdentitas?.kabupaten_kota || "",
        kecamatan: umkmIdentitas?.kecamatan || "",
        kanagarian_kelurahan: umkmIdentitas?.kanagarian_kelurahan || "",
        alamat_detail: umkmIdentitas?.alamat_detail || "",
        no_hp: umkm?.no_hp || "",
        instagram: getSosmed("instagram"),
        whatsapp: getSosmed("whatsapp"),
        facebook: getSosmed("facebook"),
        deskripsi: umkmIdentitas?.deskripsi || "",
        latitude: umkmIdentitas?.latitude || "",
        longitude: umkmIdentitas?.longitude || "",
        foto_usaha: null as File | null,
        kategori_umkm:
            umkmIdentitas?.kategori_umkm?.map((k) => k.id_kategori) || [],
    });

    useEffect(() => {
        setForm({
            jenis_usaha: umkmIdentitas?.jenis_usaha || "",
            nama_usaha: umkmIdentitas?.nama_usaha || "",
            kabupaten_kota: umkmIdentitas?.kabupaten_kota || "",
            kecamatan: umkmIdentitas?.kecamatan || "",
            kanagarian_kelurahan: umkmIdentitas?.kanagarian_kelurahan || "",
            alamat_detail: umkmIdentitas?.alamat_detail || "",
            no_hp: umkm?.no_hp || "",
            instagram: getSosmed("instagram"),
            whatsapp: getSosmed("whatsapp"),
            facebook: getSosmed("facebook"),
            deskripsi: umkmIdentitas?.deskripsi || "",
            latitude: umkmIdentitas?.latitude || "",
            longitude: umkmIdentitas?.longitude || "",
            foto_usaha: null,
            kategori_umkm:
                umkmIdentitas?.kategori_umkm?.map((k) => k.id_kategori) || [],
        });
    }, [umkmIdentitas, umkm]);

    const [isEditing, setIsEditing] = useState(false);
    const [showKategori, setShowKategori] = useState(false);

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

    const handleKategoriChange = (id: number, checked: boolean) => {
        setForm((prev) => ({
            ...prev,
            kategori_umkm: checked
                ? [...prev.kategori_umkm, id]
                : prev.kategori_umkm.filter((val) => val !== id),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (key === "kategori_umkm") {
                (value as number[]).forEach((id) =>
                    data.append("kategori_umkm[]", id.toString())
                );
            } else if (value !== null) {
                data.append(key, value as string | Blob);
            }
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
                        <label className="flex items-center justify-between">
                            Kategori UMKM
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowKategori(!showKategori)
                                    }
                                    className="text-blue-600 text-sm underline"
                                >
                                    {showKategori ? "Sembunyikan" : "Tampilkan"}
                                </button>
                            )}
                        </label>

                        {!isEditing ? (
                            <div className="text-sm text-gray-800">
                                {form.kategori_umkm.length > 0 ? (
                                    kategoriList
                                        .filter((k) =>
                                            form.kategori_umkm.includes(
                                                k.id_kategori
                                            )
                                        )
                                        .map((k) => (
                                            <span
                                                key={k.id_kategori}
                                                className="inline-block bg-blue-100 text-blue-700 px-2 py-1 mr-2 mb-1 rounded"
                                            >
                                                {k.nama_kategori}
                                            </span>
                                        ))
                                ) : (
                                    <span className="text-gray-500 italic">
                                        Belum memilih kategori
                                    </span>
                                )}
                            </div>
                        ) : (
                            showKategori && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {kategoriList.map((kategori) => (
                                        <label
                                            key={kategori.id_kategori}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="checkbox"
                                                value={kategori.id_kategori}
                                                checked={form.kategori_umkm.includes(
                                                    kategori.id_kategori
                                                )}
                                                onChange={(e) =>
                                                    handleKategoriChange(
                                                        kategori.id_kategori,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            {kategori.nama_kategori}
                                        </label>
                                    ))}
                                </div>
                            )
                        )}
                    </div>

                    <div className="grid gap-2">
                        <label>Kabupaten/Kota</label>
                        <input
                            type="text"
                            name="kabupaten_kota"
                            value={form.kabupaten_kota}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                            placeholder="contoh: Kabupaten Agam/ Kota Padang"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Kecamatan</label>
                        <input
                            type="text"
                            name="kecamatan"
                            value={form.kecamatan}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                            placeholder="contoh: Kecamatan Ampek Angkek"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Kanagarian/Kelurahan</label>
                        <input
                            type="text"
                            name="kanagarian_kelurahan"
                            value={form.kanagarian_kelurahan}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                            placeholder="contoh: Nagari Lambah/ Kelurahan Padang Barat"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Detail Alamat Usaha</label>
                        <input
                            type="text"
                            name="alamat_detail"
                            value={form.alamat_detail}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                            placeholder="contoh: Taratak, Jorong Kotohilalang"
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Instagram */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">
                                Instagram
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="instagram"
                                    placeholder="https://instagram.com/namamu"
                                    value={form.instagram}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                />
                            ) : (
                                <a
                                    href={form.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`truncate p-2 rounded bg-gray-100 hover:bg-blue-100 transition-all text-blue-600 ${
                                        form.instagram
                                            ? ""
                                            : "text-gray-400 pointer-events-none"
                                    }`}
                                >
                                    {form.instagram || "Tidak ada Instagram"}
                                </a>
                            )}
                        </div>

                        {/* WhatsApp */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">
                                WhatsApp
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="whatsapp"
                                    placeholder="https://wa.me/628xxxxxxxxxx"
                                    value={form.whatsapp}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                />
                            ) : (
                                <a
                                    href={form.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`truncate p-2 rounded bg-gray-100 hover:bg-blue-100 transition-all text-blue-600 ${
                                        form.whatsapp
                                            ? ""
                                            : "text-gray-400 pointer-events-none"
                                    }`}
                                >
                                    {form.whatsapp || "Tidak ada WhatsApp"}
                                </a>
                            )}
                        </div>

                        {/* Facebook */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-sm mb-1">
                                Facebook
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="facebook"
                                    placeholder="https://facebook.com/namamu"
                                    value={form.facebook}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                />
                            ) : (
                                <a
                                    href={form.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`truncate p-2 rounded bg-gray-100 hover:bg-blue-100 transition-all text-blue-600 ${
                                        form.facebook
                                            ? ""
                                            : "text-gray-400 pointer-events-none"
                                    }`}
                                >
                                    {form.facebook || "Tidak ada Facebook"}
                                </a>
                            )}
                        </div>
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
                                            kabupaten_kota:
                                                umkmIdentitas?.kabupaten_kota ||
                                                "",
                                            kecamatan:
                                                umkmIdentitas?.kecamatan || "",
                                            kanagarian_kelurahan:
                                                umkmIdentitas?.kanagarian_kelurahan ||
                                                "",
                                            alamat_detail:
                                                umkmIdentitas?.alamat_detail ||
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
                                            kategori_umkm:
                                                umkmIdentitas?.kategori_umkm?.map(
                                                    (k) => k.id_kategori
                                                ) || [],
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
