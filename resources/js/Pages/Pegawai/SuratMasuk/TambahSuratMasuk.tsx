import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";

type Booking = {
    id_booking: number;
    nama_instansi: string;
    tgl_diterima: string;
    surat: string;
};

const TambahSuratMasuk: React.FC<{ booking: Booking[] }> = ({ booking }) => {
    const [form, setForm] = useState({
        no_surat: "",
        perihal: "",
        keterangan: "",
        tgl_surat: "",
        id_booking: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
        null
    );

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        if (name === "id_booking") {
            const bookingSelected = booking.find(
                (b) => b.id_booking === parseInt(value)
            );
            setSelectedBooking(bookingSelected || null);
        }

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
        router.post("/pegawai/store/surat", form, {
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
                    Tambah Surat Masuk
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="block mb-1">Booking</label>
                        <select
                            name="id_booking"
                            value={form.id_booking}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">-- Pilih Booking --</option>
                            {booking.map((b) => (
                                <option key={b.id_booking} value={b.id_booking}>
                                    {b.nama_instansi} - {b.tgl_diterima}
                                </option>
                            ))}
                        </select>
                        {renderError("id_booking")}
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

                    {selectedBooking && (
                        <>
                            <div>
                                <label className="block mb-1">Asal Surat</label>
                                <input
                                    type="text"
                                    value={selectedBooking.nama_instansi}
                                    readOnly
                                    className="w-full border px-3 py-2 rounded bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">
                                    Tanggal Diterima
                                </label>
                                <input
                                    type="text"
                                    value={selectedBooking.tgl_diterima}
                                    readOnly
                                    className="w-full border px-3 py-2 rounded bg-gray-100"
                                />
                            </div>
                        </>
                    )}

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

                    {selectedBooking && selectedBooking.surat && (
                        <div className="mt-6">
                            <label className="block mb-1 font-semibold">
                                File Surat:
                            </label>
                            <a
                                href={`/storage/${selectedBooking.surat}`}
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
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default TambahSuratMasuk;
