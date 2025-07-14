import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

type Bidang = {
    id_bidang: number;
    nama_bidang: string;
};

type Layanan = {
    id_layanan: number;
    layanan: string;
    id_bidang: number | string;
    deskripsi_layanan: string;
};

type Props = PageProps<{
    layanan: Layanan;
    bidang: Bidang[];
}>;

const EditLayanan: React.FC<Props> = ({ layanan, bidang }) => {
    const [form, setForm] = useState({
        layanan: layanan.layanan || "",
        id_bidang: layanan.id_bidang || "",
        deskripsi_layanan: layanan.deskripsi_layanan || "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
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
        const newErrors: { [key: string]: string } = {};
        if (!form.layanan.trim())
            newErrors.layanan = "Nama layanan wajib diisi";
        if (!form.id_bidang)
            newErrors.id_bidang = "Bidang layanan wajib dipilih";
        if (!form.deskripsi_layanan.trim())
            newErrors.deskripsi_layanan = "Deskripsi layanan wajib diisi";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        router.put(`/pegawai/update/layanan/${layanan.id_layanan}`, form, {
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const renderError = (field: string) =>
        errors[field] ? (
            <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
        ) : null;

    return (
        <Layout>
            <div className="max-w-screen-md mx-auto p-12">
                <h1 className="text-xl font-semibold mb-6 text-center">
                    Edit Layanan
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    {/* Dropdown bidang layanan */}
                    <div>
                        <label className="block mb-1">
                            Pilih Bidang Layanan
                        </label>
                        <select
                            name="id_bidang"
                            value={form.id_bidang}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">-- Pilih Bidang --</option>
                            {bidang.map((b) => (
                                <option key={b.id_bidang} value={b.id_bidang}>
                                    {b.nama_bidang}
                                </option>
                            ))}
                        </select>
                        {renderError("id_bidang")}
                    </div>

                    {/* Input nama layanan */}
                    <div>
                        <label className="block mb-1">Nama Layanan</label>
                        <input
                            type="text"
                            name="layanan"
                            value={form.layanan}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Masukkan nama layanan"
                        />
                        {renderError("layanan")}
                    </div>

                    {/* Textarea deskripsi layanan */}
                    <div>
                        <label className="block mb-1">Deskripsi Layanan</label>
                        <textarea
                            name="deskripsi_layanan"
                            value={form.deskripsi_layanan}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            rows={5}
                            placeholder="Masukkan deskripsi layanan"
                        />
                        {renderError("deskripsi_layanan")}
                    </div>

                    <div className="text-right">
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

export default EditLayanan;
