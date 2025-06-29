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

const FormSection = ({
    title,
    icon,
    children,
    className = "",
}: {
    title: string;
    icon: string;
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}
    >
        <div className="flex items-center mb-6">
            <div className="bg-blue-50 rounded-lg p-3 mr-4">
                <span className="text-2xl">{icon}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        {children}
    </div>
);

const InputField = ({
    label,
    name,
    value,
    onChange,
    disabled,
    placeholder,
    type = "text",
    className = "",
    required = false,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    placeholder: string;
    type?: string;
    className?: string;
    required?: boolean;
}) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                disabled ? "bg-gray-50 text-gray-600" : "bg-white"
            } ${className}`}
            disabled={disabled}
            placeholder={placeholder}
        />
    </div>
);

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    disabled,
    placeholder,
    rows = 4,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled: boolean;
    placeholder: string;
    rows?: number;
}) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
            {label}
        </label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                disabled ? "bg-gray-50 text-gray-600" : "bg-white"
            }`}
            disabled={disabled}
            placeholder={placeholder}
        />
    </div>
);

const SocialMediaCard = ({
    platform,
    icon,
    color,
    value,
    onChange,
    isEditing,
    placeholder,
}: {
    platform: string;
    icon: string;
    color: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isEditing: boolean;
    placeholder: string;
}) => (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-4 text-white`}>
        <div className="flex items-center mb-3">
            <span className="text-2xl mr-3">{icon}</span>
            <h3 className="font-bold text-lg">{platform}</h3>
        </div>
        {isEditing ? (
            <input
                type="text"
                name={platform.toLowerCase()}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white/50"
            />
        ) : (
            <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all truncate ${
                    value ? "text-white" : "text-white/60 pointer-events-none"
                }`}
            >
                {value || `Tidak ada ${platform}`}
            </a>
        )}
    </div>
);

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

    const resetForm = () => {
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
    };

    const googleMapsUrl =
        form.latitude && form.longitude
            ? `https://www.google.com/maps?q=${form.latitude},${form.longitude}`
            : null;

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="pt-15 text-center mb-8">
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Informasi Dasar */}
                        <FormSection title="Informasi Dasar" icon="📋">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Jenis Usaha"
                                    name="jenis_usaha"
                                    value={form.jenis_usaha}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Contoh: Kuliner, Fashion, Kerajinan"
                                    required
                                />
                                <InputField
                                    label="Nama Usaha"
                                    name="nama_usaha"
                                    value={form.nama_usaha}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Masukkan nama usaha Anda"
                                    required
                                />
                            </div>

                            <div className="mt-6">
                                <TextAreaField
                                    label="Deskripsi UMKM"
                                    name="deskripsi"
                                    value={form.deskripsi}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Ceritakan tentang usaha Anda, produk/layanan yang ditawarkan, keunggulan, dll."
                                    rows={5}
                                />
                            </div>

                            <div className="mt-6">
                                <InputField
                                    label="Nomor Telepon"
                                    name="no_hp"
                                    value={form.no_hp}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Contoh: 08123456789"
                                    type="tel"
                                />
                            </div>
                        </FormSection>

                        {/* Kategori UMKM */}
                        <FormSection title="Kategori Usaha" icon="🏷️">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-600">
                                        Pilih kategori yang sesuai dengan usaha
                                        Anda
                                    </p>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowKategori(!showKategori)
                                            }
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                        >
                                            {showKategori
                                                ? "Sembunyikan"
                                                : "Pilih Kategori"}
                                        </button>
                                    )}
                                </div>

                                {!isEditing ? (
                                    <div className="flex flex-wrap gap-2">
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
                                                        className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                                    >
                                                        <span className="mr-2">
                                                            ✓
                                                        </span>
                                                        {k.nama_kategori}
                                                    </span>
                                                ))
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                <span className="text-4xl block mb-2">
                                                    🏷️
                                                </span>
                                                <p className="italic">
                                                    Belum memilih kategori usaha
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    showKategori && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
                                            {kategoriList.map((kategori) => (
                                                <label
                                                    key={kategori.id_kategori}
                                                    className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        value={
                                                            kategori.id_kategori
                                                        }
                                                        checked={form.kategori_umkm.includes(
                                                            kategori.id_kategori
                                                        )}
                                                        onChange={(e) =>
                                                            handleKategoriChange(
                                                                kategori.id_kategori,
                                                                e.target.checked
                                                            )
                                                        }
                                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm font-medium">
                                                        {kategori.nama_kategori}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )
                                )}
                            </div>
                        </FormSection>

                        {/* Alamat & Lokasi */}
                        <FormSection title="Alamat & Lokasi" icon="📍">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Kabupaten/Kota"
                                    name="kabupaten_kota"
                                    value={form.kabupaten_kota}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Contoh: Kabupaten Agam / Kota Padang"
                                />
                                <InputField
                                    label="Kecamatan"
                                    name="kecamatan"
                                    value={form.kecamatan}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Contoh: Kecamatan Ampek Angkek"
                                />
                                <InputField
                                    label="Kanagarian/Kelurahan"
                                    name="kanagarian_kelurahan"
                                    value={form.kanagarian_kelurahan}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Contoh: Nagari Lambah / Kelurahan Padang Barat"
                                />
                                <InputField
                                    label="Detail Alamat"
                                    name="alamat_detail"
                                    value={form.alamat_detail}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Contoh: Taratak, Jorong Kotohilalang"
                                />
                            </div>

                            {/* Koordinat Maps */}
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                                    <span className="mr-2">🗺️</span>
                                    Koordinat Lokasi
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Latitude"
                                        name="latitude"
                                        value={form.latitude}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="-0.9471"
                                    />
                                    <InputField
                                        label="Longitude"
                                        name="longitude"
                                        value={form.longitude}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="100.4172"
                                    />
                                </div>
                                <div className="text-sm text-blue-700 mb-3">
                                    <p className="mb-2">
                                        <strong>
                                            Cara mendapatkan koordinat:
                                        </strong>
                                    </p>
                                    <ol className="list-decimal list-inside space-y-1 text-xs">
                                        <li>
                                            Buka{" "}
                                            <a
                                                href="https://www.google.com/maps"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline font-medium"
                                            >
                                                Google Maps
                                            </a>
                                        </li>
                                        <li>
                                            Cari dan temukan lokasi usaha Anda
                                        </li>
                                        <li>
                                            Klik kanan pada titik lokasi → pilih
                                            "What's here?"
                                        </li>
                                        <li>
                                            Salin angka latitude dan longitude
                                            yang muncul
                                        </li>
                                    </ol>
                                </div>
                                {googleMapsUrl ? (
                                    <a
                                        href={googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                    >
                                        <span className="mr-2">🗺️</span>
                                        Lihat Lokasi di Google Maps
                                    </a>
                                ) : (
                                    <p className="text-gray-500 italic text-sm">
                                        Koordinat belum diisi
                                    </p>
                                )}
                            </div>
                        </FormSection>

                        {/* Media Sosial */}
                        <FormSection title="Media Sosial" icon="📱">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <SocialMediaCard
                                    platform="Instagram"
                                    icon="📸"
                                    color="from-pink-500 to-purple-600"
                                    value={form.instagram}
                                    onChange={handleChange}
                                    isEditing={isEditing}
                                    placeholder="https://instagram.com/namausaha"
                                />
                                <SocialMediaCard
                                    platform="WhatsApp"
                                    icon="💬"
                                    color="from-green-500 to-green-600"
                                    value={form.whatsapp}
                                    onChange={handleChange}
                                    isEditing={isEditing}
                                    placeholder="https://wa.me/628xxxxxxxxxx"
                                />
                                <SocialMediaCard
                                    platform="Facebook"
                                    icon="👥"
                                    color="from-blue-600 to-blue-700"
                                    value={form.facebook}
                                    onChange={handleChange}
                                    isEditing={isEditing}
                                    placeholder="https://facebook.com/namausaha"
                                />
                            </div>
                        </FormSection>

                        {/* Foto Usaha */}
                        <FormSection title="Foto Usaha" icon="📷">
                            <div className="space-y-4">
                                {isEditing && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Upload Foto Baru
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Format: JPG, PNG, GIF. Maksimal 5MB
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-center">
                                    {form.foto_usaha ? (
                                        <div className="relative">
                                            <img
                                                src={URL.createObjectURL(
                                                    form.foto_usaha
                                                )}
                                                alt="Preview Foto Usaha"
                                                className="w-64 h-64 object-cover rounded-xl shadow-lg border-4 border-white"
                                            />
                                            <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                                                <span className="text-sm">
                                                    📷
                                                </span>
                                            </div>
                                        </div>
                                    ) : umkmIdentitas?.foto_usaha ? (
                                        <div className="relative">
                                            <img
                                                src={`/storage/${umkmIdentitas.foto_usaha}`}
                                                alt="Foto Usaha"
                                                className="w-64 h-64 object-cover rounded-xl shadow-lg border-4 border-white"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                                            <div className="text-center text-gray-500">
                                                <span className="text-4xl block mb-2">
                                                    📷
                                                </span>
                                                <p className="text-sm">
                                                    Belum ada foto usaha
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </FormSection>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                {!isEditing ? (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false);
                                                resetForm();
                                            }}
                                            className="inline-flex items-center px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-500/20 transition-all duration-200"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-500/20 transition-all duration-200"
                                        >
                                            Simpan
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default IdentitasUmkm;
