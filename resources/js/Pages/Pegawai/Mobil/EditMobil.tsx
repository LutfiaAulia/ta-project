import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";

interface Mobil {
    id_mobil: number;
    nama_mobil: string;
    plat_mobil: string;
}

interface Props {
    mobil: Mobil;
}

const EditMobil: React.FC<Props> = ({ mobil }) => {
    const [form, setForm] = useState({
        nama_mobil: mobil.nama_mobil,
        plat_mobil: mobil.plat_mobil,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        if (!form.nama_mobil.trim())
            newErrors.nama_mobil = "Nama mobil wajib diisi";
        if (!form.plat_mobil.trim())
            newErrors.plat_mobil = "Plat nomor wajib diisi";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        router.put(`/pegawai/update/mobil/${mobil.id_mobil}`, form, {
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
                    Edit Mobil
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="block mb-1">Nama Mobil</label>
                        <input
                            type="text"
                            name="nama_mobil"
                            value={form.nama_mobil}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("nama_mobil")}
                    </div>

                    <div>
                        <label className="block mb-1">Plat Nomor</label>
                        <input
                            type="text"
                            name="plat_mobil"
                            value={form.plat_mobil}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("plat_mobil")}
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditMobil;
