import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";

type Disposisi = {
    id_disposisi: number;
    id_surat: number;
    isi: string;
    tanggal: string;
    tujuan: string;
    catatan: string;
};

type Surat = {
    no_surat: string;
    asal_surat: string;
    perihal: string;
};

const EditDisposisi: React.FC<{
    disposisi: Disposisi;
    surat: Surat;
}> = ({ disposisi, surat }) => {
    const [form, setForm] = useState({
        isi: disposisi.isi ?? "",
        tanggal: disposisi.tanggal ?? "",
        tujuan: disposisi.tujuan ?? "",
        catatan: disposisi.catatan ?? "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/pegawai/update/disposisi/${disposisi.id_disposisi}`, form, {
            onError: (err) => setErrors(err),
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
                    Edit Disposisi
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    {/* Info Surat */}
                    <div>
                        <label className="block mb-1">No. Surat</label>
                        <input
                            type="text"
                            value={surat.no_surat}
                            readOnly
                            className="w-full border px-3 py-2 rounded bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Asal Surat</label>
                        <input
                            type="text"
                            value={surat.asal_surat}
                            readOnly
                            className="w-full border px-3 py-2 rounded bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Perihal</label>
                        <input
                            type="text"
                            value={surat.perihal}
                            readOnly
                            className="w-full border px-3 py-2 rounded bg-gray-100"
                        />
                    </div>

                    {/* Form Disposisi */}
                    <div>
                        <label className="block mb-1">Isi Disposisi</label>
                        <textarea
                            name="isi"
                            value={form.isi}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("isi")}
                    </div>

                    <div>
                        <label className="block mb-1">Tanggal Disposisi</label>
                        <input
                            type="date"
                            name="tanggal"
                            value={form.tanggal}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("tanggal")}
                    </div>

                    <div>
                        <label className="block mb-1">Tujuan</label>
                        <input
                            type="text"
                            name="tujuan"
                            value={form.tujuan}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("tujuan")}
                    </div>

                    <div>
                        <label className="block mb-1">Catatan</label>
                        <textarea
                            name="catatan"
                            value={form.catatan}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("catatan")}
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditDisposisi;
