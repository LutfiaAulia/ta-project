import React, { useState, useEffect } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";

type Layanan = {
    id_layanan: number;
    layanan: string;
};

type LegalitasProduk = {
    id_legpro: number;
    singkatan: string;
};

type TambahUmkmProps = {
    layanan: Layanan[];
    id_booking: number;
    legpro: LegalitasProduk[];
};

const TambahUmkmPeg: React.FC<TambahUmkmProps> = ({
    id_booking,
    layanan,
    legpro,
}) => {
    const [form, setForm] = useState({
        nama_lengkap: "",
        jenis_kelamin: "",
        umur: "",
        nik: "",
        pendidikan: "",
        no_hp: "",
        nama_usaha: "",
        legalitas_usaha: "",
        legalitas_produk: [] as number[],
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
    const [showCheckboxes, setShowCheckboxes] = useState(false);

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

    const validate = () => {
        const requiredFields = [
            "nama_lengkap",
            "jenis_kelamin",
            "umur",
            "nik",
            "pendidikan",
            "nama_usaha",
            "legalitas_usaha",
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

        if (form.legalitas_produk.length === 0) {
            newErrors["legalitas_produk"] =
                "Minimal 1 legalitas produk harus dipilih";
        }

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
        type: string = "text",
        placeholder?: string
    ) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                <span className="text-red-500 ml-1">*</span>
            </label>
            <input
                type={type}
                name={name}
                value={form[name as keyof typeof form] as string}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                }`}
                inputMode={numberFields.has(name) ? "numeric" : undefined}
                pattern={numberFields.has(name) ? "[0-9]*" : undefined}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors[name]}
                </p>
            )}
        </div>
    );

    const renderSelect = (
        label: string,
        name: string,
        options: { value: string; label: string }[]
    ) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                <span className="text-red-500 ml-1">*</span>
            </label>
            <select
                name={name}
                value={form[name as keyof typeof form] as string}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                }`}
            >
                <option value="">-- Pilih {label} --</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors[name]}
                </p>
            )}
        </div>
    );

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Data Pribadi */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                Data Pribadi
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderInput(
                                    "Nama Lengkap",
                                    "nama_lengkap",
                                    "text",
                                    "Masukkan nama lengkap"
                                )}
                                {renderSelect(
                                    "Jenis Kelamin",
                                    "jenis_kelamin",
                                    [
                                        {
                                            value: "Laki-laki",
                                            label: "Laki-laki",
                                        },
                                        {
                                            value: "Perempuan",
                                            label: "Perempuan",
                                        },
                                    ]
                                )}
                                {renderInput(
                                    "Umur",
                                    "umur",
                                    "number",
                                    "Masukkan umur"
                                )}
                                {renderInput(
                                    "NIK",
                                    "nik",
                                    "text",
                                    "Masukkan NIK (16 digit)"
                                )}
                                {renderInput(
                                    "Pendidikan Terakhir",
                                    "pendidikan",
                                    "text",
                                    "Contoh: SMA, D3, S1"
                                )}
                                {renderInput(
                                    "No HP",
                                    "no_hp",
                                    "tel",
                                    "Masukkan nomor HP"
                                )}
                            </div>
                        </div>

                        {/* Section 2: Data Usaha */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                Data Usaha
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderInput(
                                    "Nama Usaha",
                                    "nama_usaha",
                                    "text",
                                    "Masukkan nama usaha"
                                )}
                                {renderSelect(
                                    "Legalitas Usaha",
                                    "legalitas_usaha",
                                    [
                                        { value: "Ada NIB", label: "Ada NIB" },
                                        {
                                            value: "Tidak ada NIB",
                                            label: "Tidak ada NIB",
                                        },
                                    ]
                                )}

                                {/* Legalitas Produk */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Legalitas Produk
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>
                                    <div className="border rounded-lg p-4 bg-gray-50">
                                        <button
                                            type="button"
                                            className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-3 transition-colors"
                                            onClick={() =>
                                                setShowCheckboxes(
                                                    !showCheckboxes
                                                )
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
                                                    Dipilih:{" "}
                                                    {
                                                        form.legalitas_produk
                                                            .length
                                                    }{" "}
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
                            </div>
                        </div>

                        {/* Section 3: Lokasi Usaha */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                Lokasi Usaha
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Alamat Usaha
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>
                                    <textarea
                                        name="alamat_usaha"
                                        value={form.alamat_usaha}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Masukkan alamat lengkap usaha"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                            errors.alamat_usaha
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.alamat_usaha && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center">
                                            <span className="mr-1">⚠</span>
                                            {errors.alamat_usaha}
                                        </p>
                                    )}
                                </div>
                                {renderInput(
                                    "Kabupaten/Kota",
                                    "kabupaten_kota",
                                    "text",
                                    "Masukkan kabupaten/kota"
                                )}
                                {renderInput(
                                    "Kecamatan",
                                    "kecamatan",
                                    "text",
                                    "Masukkan kecamatan"
                                )}
                                {renderInput(
                                    "Kenagarian/Kelurahan",
                                    "kenagarian_kelurahan",
                                    "text",
                                    "Masukkan kenagarian/kelurahan"
                                )}
                            </div>
                        </div>

                        {/* Section 4: Data Finansial */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                Data Finansial & Operasional
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderInput(
                                    "Jumlah Tenaga Kerja",
                                    "tenaga_kerja",
                                    "number",
                                    "Masukkan jumlah tenaga kerja"
                                )}
                                {renderInput(
                                    "Aset (Rp)",
                                    "aset",
                                    "number",
                                    "Masukkan nilai aset"
                                )}
                                {renderInput(
                                    "Omset (Rp)",
                                    "omset",
                                    "number",
                                    "Masukkan omset bulanan"
                                )}
                                {renderInput(
                                    "Pendapatan Bersih (Rp)",
                                    "pendapatan_bersih",
                                    "number",
                                    "Masukkan pendapatan bersih"
                                )}
                            </div>
                        </div>

                        {/* Section 5: Layanan & Tindak Lanjut */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                Layanan & Tindak Lanjut
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pelatihan yang Diikuti
                                    </label>
                                    <textarea
                                        name="pelatihan"
                                        value={form.pelatihan}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Masukkan pelatihan yang pernah diikuti"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tindak Lanjut
                                    </label>
                                    <textarea
                                        name="tindak_lanjut"
                                        value={form.tindak_lanjut}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Masukkan rencana tindak lanjut"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pilih Layanan
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        name="id_layanan"
                                        value={form.id_layanan}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                            errors.id_layanan
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <option value="">
                                            -- Pilih Layanan --
                                        </option>
                                        {layanan.map((l) => (
                                            <option
                                                key={l.id_layanan}
                                                value={l.id_layanan}
                                            >
                                                {l.layanan}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_layanan && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center">
                                            <span className="mr-1">⚠</span>
                                            {errors.id_layanan}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default TambahUmkmPeg;
