import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";
import { PageProps } from "@/types";

type Sopir = {
    id_sopir: number;
    nama: string;
    no_hp: string;
    alamat: string;
};

const EditSopir: React.FC<PageProps<{ sopir: Sopir }>> = ({ sopir }) => {
    const [form, setForm] = useState({
        nama: sopir.nama || "",
        no_hp: sopir.no_hp || "",
        alamat: sopir.alamat || "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
        if (!form.nama.trim()) newErrors.nama = "Nama sopir wajib diisi";
        if (!form.no_hp.trim()) newErrors.no_hp = "Nomor HP wajib diisi";
        if (!form.alamat.trim()) newErrors.alamat = "Alamat wajib diisi";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        router.put(`/pegawai/update/sopir/${sopir.id_sopir}`, form, {
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
                    Edit Sopir
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="block mb-1">Nama Sopir</label>
                        <input
                            type="text"
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("nama")}
                    </div>

                    <div>
                        <label className="block mb-1">No. HP</label>
                        <input
                            type="text"
                            name="no_hp"
                            value={form.no_hp}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("no_hp")}
                    </div>

                    <div>
                        <label className="block mb-1">Alamat</label>
                        <input
                            type="text"
                            name="alamat"
                            value={form.alamat}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("alamat")}
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

export default EditSopir;
