import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";

type Layanan = {
    id_layanan: number;
    layanan: string;
};

type Umkm = {
    nama_lengkap: string;
    jenis_kelamin: string;
    umur: string;
    nik: string;
    pendidikan: string;
    no_hp?: string | null;
    nama_usaha: string;
    legalitas_usaha: string;
    legalitas_produk: string;
    alamat_usaha: string;
    kabupaten_kota: string;
    kecamatan: string;
    kenagarian_kelurahan: string;
    tenaga_kerja: string;
    aset: string;
    omset: string;
    pendapatan_bersih: string;
    pelatihan?: string | null;
    tindak_lanjut?: string | null;
    id_layanan: string;
    id_booking: number;
    id_pelayanan?: number;
};

type EditUmkmProps = {
    layanan: Layanan[];
    umkm: Umkm;
};

const EditUmkm: React.FC<EditUmkmProps> = ({ layanan, umkm }) => {
    const [form, setForm] = useState<Umkm>({ ...umkm });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validate = () => {
        const requiredFields = [
            "nama_lengkap",
            "jenis_kelamin",
            "umur",
            "nik",
            "pendidikan",
            "nama_usaha",
            "legalitas_usaha",
            "legalitas_produk",
            "alamat_usaha",
            "kabupaten_kota",
            "kecamatan",
            "kenagarian_kelurahan",
            "tenaga_kerja",
            "aset",
            "omset",
            "pendapatan_bersih",
            "id_layanan",
        ];
        const newErrors: { [key: string]: string } = {};
        requiredFields.forEach((field) => {
            if (!String(form[field as keyof typeof form]).trim()) {
                newErrors[field] = "Wajib diisi";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        if (!form.id_pelayanan) {
            alert("ID pelayanan tidak ditemukan untuk update.");
            return;
        }

        router.put(`/pegawai/update/umkmlayan/${form.id_pelayanan}`, form, {
            onError: (errors) => setErrors(errors),
            onSuccess: () => {
                console.log("Data berhasil diperbarui");
            },
        });
    };

    const renderInput = (
        label: string,
        name: keyof Umkm,
        type: string = "text"
    ) => (
        <div key={name}>
            <label className="block mb-1 capitalize">{label}</label>
            <input
                type={type}
                name={name}
                value={form[name] || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                inputMode={
                    [
                        "tenaga_kerja",
                        "aset",
                        "omset",
                        "pendapatan_bersih",
                        "umur",
                    ].includes(name as string)
                        ? "numeric"
                        : undefined
                }
                pattern={
                    [
                        "tenaga_kerja",
                        "aset",
                        "omset",
                        "pendapatan_bersih",
                        "umur",
                    ].includes(name as string)
                        ? "[0-9]*"
                        : undefined
                }
            />
            {errors[name] && (
                <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
            )}
        </div>
    );

    return (
        <Layout>
            <div className="max-w-screen-lg mx-auto p-12">
                <h1 className="text-xl font-semibold mb-6 text-center">
                    Edit Data UMKM
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-6 text-sm"
                >
                    {renderInput("Nama Lengkap", "nama_lengkap")}
                    <div>
                        <label className="block mb-1 capitalize">
                            Jenis Kelamin
                        </label>
                        <select
                            name="jenis_kelamin"
                            value={form.jenis_kelamin}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">-- Pilih Jenis Kelamin --</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                        {errors.jenis_kelamin && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.jenis_kelamin}
                            </p>
                        )}
                    </div>
                    {renderInput("Umur", "umur")}
                    {renderInput("NIK", "nik")}
                    {renderInput("Pendidikan", "pendidikan")}
                    {renderInput("No HP", "no_hp")}
                    {renderInput("Nama Usaha", "nama_usaha")}
                    {renderInput("Legalitas Usaha", "legalitas_usaha")}
                    {renderInput("Legalitas Produk", "legalitas_produk")}
                    {renderInput("Alamat Usaha", "alamat_usaha")}
                    {renderInput("Kabupaten/Kota", "kabupaten_kota")}
                    {renderInput("Kecamatan", "kecamatan")}
                    {renderInput(
                        "Kenagarian/Kelurahan",
                        "kenagarian_kelurahan"
                    )}
                    {renderInput("Tenaga Kerja", "tenaga_kerja")}
                    {renderInput("Aset", "aset")}
                    {renderInput("Omset", "omset")}
                    {renderInput("Pendapatan Bersih", "pendapatan_bersih")}
                    {renderInput("Pelatihan yang Diikuti", "pelatihan")}
                    {renderInput("Tindak Lanjut", "tindak_lanjut")}

                    {/* Dropdown Layanan */}
                    <div>
                        <label className="block mb-1">Pilih Layanan</label>
                        <select
                            name="id_layanan"
                            value={form.id_layanan}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">-- Pilih Layanan --</option>
                            {layanan.map((l) => (
                                <option key={l.id_layanan} value={l.id_layanan}>
                                    {l.layanan}
                                </option>
                            ))}
                        </select>
                        {errors.id_layanan && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.id_layanan}
                            </p>
                        )}
                    </div>

                    <div className="col-span-2 text-right">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditUmkm;
