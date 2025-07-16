import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

type Legpro = {
    id_legpro: number;
    nama_legalitas: string;
    singkatan: string;
    deskripsi: string;
};

const EditLegpro: React.FC<PageProps<{ legpro: Legpro }>> = ({ legpro }) => {
    const [form, setForm] = useState({
        nama_legalitas: legpro.nama_legalitas || "",
        singkatan: legpro.singkatan || "",
        deskripsi: legpro.deskripsi || "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        if (!form.nama_legalitas.trim())
            newErrors.nama_legalitas = "Nama bidang wajib diisi";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        router.put(`/pegawai/update/legpro/${legpro.id_legpro}`, form, {
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const renderError = (field: string) =>
        errors[field] && (
            <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
        );

    return (
        <Layout>
            <div className="max-w-screen-md mx-auto p-12">
                <h1 className="text-xl font-semibold mb-6 text-center">
                    Edit Legalitas Produk
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="block mb-1">
                            Nama Legalitas Produk
                        </label>
                        <input
                            type="text"
                            name="nama_legalitas"
                            value={form.nama_legalitas}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("nama_legalitas")}
                    </div>

                    <div>
                        <label className="block mb-1">Singkatan</label>
                        <input
                            type="text"
                            name="singkatan"
                            value={form.singkatan}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("singkatan")}
                    </div>

                    <div>
                        <label className="block mb-1">Deskripsi</label>
                        <textarea
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            rows={5}
                        />
                        {renderError("deskripsi")}
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

export default EditLegpro;
