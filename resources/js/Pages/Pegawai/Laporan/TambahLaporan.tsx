import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";

type Booking = {
    id_booking: number;
    nama_instansi: string;
    tanggal_mulai: string;
    tanggal_akhir: string;
};

type Props = {
    booking: Booking[];
};

const TambahLaporan: React.FC<Props> = ({ booking }) => {
    const [form, setForm] = useState({
        id_booking: "",
        judul: "",
        dasar: "",
        maksud: "",
        tujuan: "",
        biaya: "",
        ringkasan_pelaksana: "",
        kesimpulan: "",
        saran: "",
        nama_penulis: "",
        foto_dokumentasi: [] as File[],
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Khusus untuk input file multiple
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);
        setForm((prev) => ({ ...prev, foto_dokumentasi: filesArray }));
        setErrors((prev) => ({ ...prev, foto_dokumentasi: "" }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id_booking", form.id_booking);
        formData.append("judul", form.judul);
        formData.append("dasar", form.dasar);
        formData.append("maksud", form.maksud);
        formData.append("tujuan", form.tujuan);
        formData.append("biaya", form.biaya);
        formData.append("ringkasan_pelaksana", form.ringkasan_pelaksana);
        formData.append("kesimpulan", form.kesimpulan);
        formData.append("saran", form.saran);
        formData.append("nama_penulis", form.nama_penulis);

        form.foto_dokumentasi.forEach((file) => {
            formData.append("foto_dokumentasi[]", file);
        });

        router.post("/pegawai/store/laporan", formData, {
            onError: (err) => {
                console.log("Error response:", err);
                setErrors(err);
            },
            preserveScroll: true,
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
                    Tambah Laporan
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 text-sm"
                    encType="multipart/form-data"
                >
                    {/* Pilihan Booking */}
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
                                    {b.nama_instansi} ( {b.tanggal_mulai} -{" "}
                                    {b.tanggal_akhir} )
                                </option>
                            ))}
                        </select>
                        {renderError("id_booking")}
                    </div>

                    {/* Input text dan textarea lain */}
                    <div>
                        <label className="block mb-1">Judul</label>
                        <input
                            type="text"
                            name="judul"
                            value={form.judul}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("judul")}
                    </div>

                    <div>
                        <label className="block mb-1">Dasar</label>
                        <textarea
                            name="dasar"
                            value={form.dasar}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            rows={3}
                        />
                        {renderError("dasar")}
                    </div>

                    <div>
                        <label className="block mb-1">Maksud</label>
                        <textarea
                            name="maksud"
                            value={form.maksud}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            rows={3}
                        />
                        {renderError("maksud")}
                    </div>

                    <div>
                        <label className="block mb-1">Tujuan</label>
                        <textarea
                            name="tujuan"
                            value={form.tujuan}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            rows={3}
                        />
                        {renderError("tujuan")}
                    </div>

                    <div>
                        <label className="block mb-1">Biaya</label>
                        <textarea
                            name="biaya"
                            value={form.biaya}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("biaya")}
                    </div>

                    <div>
                        <label className="block mb-1">
                            Ringkasan Pelaksana
                        </label>
                        <textarea
                            name="ringkasan_pelaksana"
                            value={form.ringkasan_pelaksana}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            rows={4}
                        />
                        {renderError("ringkasan_pelaksana")}
                    </div>

                    <div>
                        <label className="block mb-1">Kesimpulan</label>
                        <textarea
                            name="kesimpulan"
                            value={form.kesimpulan}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            rows={3}
                        />
                        {renderError("kesimpulan")}
                    </div>

                    <div>
                        <label className="block mb-1">Saran</label>
                        <textarea
                            name="saran"
                            value={form.saran}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            rows={3}
                        />
                        {renderError("saran")}
                    </div>

                    <div>
                        <label className="block mb-1">Nama Penulis</label>
                        <input
                            type="text"
                            name="nama_penulis"
                            value={form.nama_penulis}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("nama_penulis")}
                    </div>

                    {/* Upload Foto Dokumentasi */}
                    <div>
                        <label className="block mb-1">Foto Dokumentasi</label>
                        <input
                            type="file"
                            multiple
                            accept=".jpg,.jpeg,.png"
                            name="foto_dokumentasi[]"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                        {renderError("foto_dokumentasi")}
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default TambahLaporan;
