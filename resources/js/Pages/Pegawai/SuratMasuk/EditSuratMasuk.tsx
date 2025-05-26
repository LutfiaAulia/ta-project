import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";

type SuratMasuk = {
    id: number;
    no_surat: string;
    perihal: string;
    keterangan: string;
    tgl_surat: string;
    id_booking: number;
};

type Booking = {
    id_booking: number;
    nama_instansi: string;
    tgl_diterima: string;
    surat: string;
};

const EditSuratMasuk: React.FC<{
    suratMasuk: SuratMasuk;
    booking: Booking;
}> = ({ suratMasuk, booking }) => {
    const [form, setForm] = useState({
        no_surat: suratMasuk.no_surat || "",
        perihal: suratMasuk.perihal || "",
        keterangan: suratMasuk.keterangan || "",
        tgl_surat: suratMasuk.tgl_surat || "",
        id_booking: suratMasuk.id_booking || "",
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
        router.put(`/pegawai/update/surat/${suratMasuk.id}`, form, {
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
                    Edit Surat Masuk
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="block mb-1">Instansi</label>
                        <input
                            type="text"
                            value={booking.nama_instansi}
                            readOnly
                            className="w-full border px-3 py-2 rounded bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Tanggal Diterima</label>
                        <input
                            type="text"
                            value={booking.tgl_diterima}
                            readOnly
                            className="w-full border px-3 py-2 rounded bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Nomor Surat</label>
                        <input
                            type="text"
                            name="no_surat"
                            value={form.no_surat}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("no_surat")}
                    </div>

                    <div>
                        <label className="block mb-1">Tanggal Surat</label>
                        <input
                            type="date"
                            name="tgl_surat"
                            value={form.tgl_surat}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("tgl_surat")}
                    </div>

                    <div>
                        <label className="block mb-1">Perihal</label>
                        <textarea
                            name="perihal"
                            value={form.perihal}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("perihal")}
                    </div>

                    <div>
                        <label className="block mb-1">Keterangan</label>
                        <textarea
                            name="keterangan"
                            value={form.keterangan}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("keterangan")}
                    </div>

                    {booking.surat && (
                        <div className="mt-6">
                            <label className="block mb-1 font-semibold">
                                File Surat:
                            </label>
                            <a
                                href={`/storage/${booking.surat}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 underline text-sm"
                            >
                                Lihat Surat
                            </a>
                        </div>
                    )}

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

export default EditSuratMasuk;
