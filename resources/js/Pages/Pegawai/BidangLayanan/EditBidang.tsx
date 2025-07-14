import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

type Bidang = {
    id_bidang: number;
    nama_bidang: string;
};

const EditBidang: React.FC<PageProps<{ bidang: Bidang }>> = ({
    bidang,
}) => {
    const [form, setForm] = useState({
        nama_bidang: bidang.nama_bidang || "",
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
        if (!form.nama_bidang.trim())
            newErrors.nama_bidang = "Nama bidang wajib diisi";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        router.put(`/pegawai/update/bidang/${bidang.id_bidang}`, form, {
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
                    Edit Bidang Layanan
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="block mb-1">Nama Bidang</label>
                        <input
                            type="text"
                            name="nama_bidang"
                            value={form.nama_bidang}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("nama_bidang")}
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

export default EditBidang;
