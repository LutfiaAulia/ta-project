import React, { useState, useEffect } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";

type Layanan = {
    id_layanan: number;
    layanan: string;
};

type TambahUmkmProps = {
    layanan: Layanan[];
    id_booking: number;
};

const TambahUmkmPeg: React.FC<TambahUmkmProps> = ({ id_booking, layanan }) => {
    const [form, setForm] = useState({
        // PelayananUmkm
        nama_lengkap: "",
        nik: "",
        alamat_lengkap: "",
        email: "",
        no_hp: "",
        nama_usaha: "",
        bentuk_usaha: "",
        sektor_usaha: "",
        legalitas_usaha: "",
        pembiayaan: "",
        nib: "",
        alamat_usaha: "",
        modal_usaha: "",

        // BookingPelayananUmkm
        total_aset: "",
        omset: "",
        pengeluaran: "",
        pendapat_bersih: "",
        pelatihan: "",
        permasalahan: "",
        id_layanan: "",

        id_booking,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            id_booking,
        }));
    }, [id_booking]);

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

        router.post("/pegawai/store/umkmlayan", form, {
            onError: (errors) => setErrors(errors),
            onSuccess: () => {
                console.log("Data berhasil dikirim");
            },
        });
    };

    const renderInput = (
        label: string,
        name: string,
        type: string = "text"
    ) => (
        <div>
            <label className="block mb-1 capitalize">{label}</label>
            <input
                type={type}
                name={name}
                value={form[name as keyof typeof form]}
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
                    Tambah UMKM Terlayani
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-6 text-sm"
                >
                    {renderInput("Nama Lengkap", "nama_lengkap")}
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
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-4 py-2 rounded"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default TambahUmkmPeg;
