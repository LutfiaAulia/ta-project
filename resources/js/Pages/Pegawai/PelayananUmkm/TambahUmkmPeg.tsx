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
        nama_lengkap: "",
        jenis_kelamin: "",
        umur: "",
        nik: "",
        pendidikan: "",
        no_hp: "",
        nama_usaha: "",
        legalitas_usaha: "",
        legalitas_produk: "",
        alamat_usaha: "",
        kabupaten_kota: "",
        kecamatan: "",
        kenagarian_kelurahan: "",
        tenaga_kerja: "",
        aset: "",
        omset: "",
        pendapatan_bersih: "",
        pelatihan: "",
        tindak_lanjut: "",
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

    const numberFields = new Set([
        "tenaga_kerja",
        "aset",
        "omset",
        "pendapatan_bersih",
    ]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        if (numberFields.has(name)) {
            if (value === "" || /^\d*$/.test(value)) {
                setForm((prev) => ({
                    ...prev,
                    [name]: value,
                }));
                setErrors((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
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
                inputMode={numberFields.has(name) ? "numeric" : undefined}
                pattern={numberFields.has(name) ? "[0-9]*" : undefined}
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
                    {renderInput("Umur", "umur", "text")}
                    {renderInput("NIK", "nik", "text")}
                    {renderInput("Pendidikan", "pendidikan")}
                    {renderInput("No HP", "no_hp", "text")}
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
                    {renderInput("Tenaga Kerja", "tenaga_kerja", "text")}
                    {renderInput("Aset", "aset", "text")}
                    {renderInput("Omset", "omset", "text")}
                    {renderInput(
                        "Pendapatan Bersih",
                        "pendapatan_bersih",
                        "text"
                    )}
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
