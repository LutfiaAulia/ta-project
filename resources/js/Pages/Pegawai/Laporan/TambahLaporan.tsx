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
        foto_dokumentasi: [] as { file: File; preview: string }[],
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);

        const withPreviews = filesArray.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setForm((prev) => ({
            ...prev,
            foto_dokumentasi: withPreviews,
        }));

        setErrors((prev) => ({ ...prev, foto_dokumentasi: "" }));
    };

    const removeImage = (index: number) => {
        const updated = [...form.foto_dokumentasi];
        URL.revokeObjectURL(updated[index].preview);
        updated.splice(index, 1);
        setForm((prev) => ({ ...prev, foto_dokumentasi: updated }));
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

        form.foto_dokumentasi.forEach(({ file }) => {
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

    const today = new Date().toISOString().split("T")[0];

    const parseToIsoDate = (dmy: string) => {
        const [day, month, year] = dmy.split("-");
        return `${year}-${month}-${day}`;
    };

    const filteredBooking = booking.filter((b) => {
        const formattedTanggalMulai = parseToIsoDate(b.tanggal_mulai);
        return formattedTanggalMulai <= today;
    });

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
                    <div>
                        <label className="block mb-1">Booking</label>
                        <select
                            name="id_booking"
                            value={form.id_booking}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">-- Pilih Booking --</option>
                            {filteredBooking.map((b) => (
                                <option key={b.id_booking} value={b.id_booking}>
                                    {b.nama_instansi} ({b.tanggal_mulai} -{" "}
                                    {b.tanggal_akhir})
                                </option>
                            ))}
                        </select>

                        {renderError("id_booking")}
                    </div>
                    {[
                        { label: "Judul", name: "judul", type: "input" },
                        { label: "Dasar", name: "dasar", type: "textarea" },
                        { label: "Maksud", name: "maksud", type: "textarea" },
                        { label: "Tujuan", name: "tujuan", type: "textarea" },
                        { label: "Biaya", name: "biaya", type: "textarea" },
                        {
                            label: "Ringkasan Pelaksana",
                            name: "ringkasan_pelaksana",
                            type: "textarea",
                        },
                        {
                            label: "Kesimpulan",
                            name: "kesimpulan",
                            type: "textarea",
                        },
                        { label: "Saran", name: "saran", type: "textarea" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block mb-1">{field.label}</label>
                            {field.type === "input" ? (
                                <input
                                    type="text"
                                    name={field.name}
                                    value={(form as any)[field.name]}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            ) : (
                                <textarea
                                    name={field.name}
                                    value={(form as any)[field.name]}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                    rows={3}
                                />
                            )}
                            {renderError(field.name)}
                        </div>
                    ))}

                    {/* Upload dan Preview Gambar */}
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

                        {form.foto_dokumentasi.length > 0 && (
                            <div className="mt-3 grid grid-cols-3 gap-2">
                                {form.foto_dokumentasi.map((item, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={item.preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-32 object-cover rounded border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-1 text-xs"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
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
