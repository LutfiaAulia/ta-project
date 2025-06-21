import React, { useState, useEffect } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";

type Layanan = {
    id_layanan: number;
    layanan: string;
};

type Umkm = {
    nama_lengkap: string;
    jenis_kelamin: string;
    nik: string;
    alamat_lengkap: string;
    email: string;
    no_hp: string;
    nama_usaha: string;
    bentuk_usaha: string;
    sektor_usaha: string;
    legalitas_usaha: string;
    pembiayaan: string;
    nib: string;
    alamat_usaha: string;
    modal_usaha: string;
    total_aset: string;
    omset: string;
    pengeluaran: string;
    pendapat_bersih: string;
    pelatihan: string;
    permasalahan: string;
    id_layanan: string;
    id_booking: number;
    id_bopel?: number;
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
            "nik",
            "nama_usaha",
            "nib",
            "modal_usaha",
            "total_aset",
            "omset",
            "pengeluaran",
            "pendapat_bersih",
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

        router.put(`/pegawai/update/umkmlayan/${form.id_bopel}`, form, {
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
        <div>
            <label className="block mb-1 capitalize">{label}</label>
            <input
                type={type}
                name={name}
                value={form[name] || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
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

                    {renderInput("NIK", "nik")}
                    {renderInput("Email", "email")}
                    {renderInput("No HP", "no_hp")}
                    {renderInput("Alamat Lengkap", "alamat_lengkap")}
                    {renderInput("Nama Usaha", "nama_usaha")}
                    {renderInput("Bentuk Usaha", "bentuk_usaha")}
                    {renderInput("Sektor Usaha", "sektor_usaha")}
                    {renderInput("Legalitas Usaha", "legalitas_usaha")}
                    {renderInput("Pembiayaan", "pembiayaan")}
                    {renderInput("NIB", "nib")}
                    {renderInput("Alamat Usaha", "alamat_usaha")}
                    {renderInput("Modal Usaha", "modal_usaha")}
                    {renderInput("Total Aset", "total_aset")}
                    {renderInput("Omset", "omset")}
                    {renderInput("Pengeluaran", "pengeluaran")}
                    {renderInput("Pendapat Bersih", "pendapat_bersih")}
                    {renderInput("Pelatihan yang Dibutuhkan", "pelatihan")}

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

                    <div className="col-span-2">
                        <label className="block mb-1">Permasalahan</label>
                        <textarea
                            name="permasalahan"
                            value={form.permasalahan}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            rows={3}
                        />
                        {errors.permasalahan && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.permasalahan}
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
