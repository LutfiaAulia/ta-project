import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { router } from "@inertiajs/react";

type Booking = {
    id_booking: number;
    nama_instansi: string;
    tanggal_mulai: string;
    tanggal_akhir: string;
};

type FotoDokumentasi = {
    id?: number;
    url?: string;
    file?: File;
    preview: string;
};

type Laporan = {
    id: number;
    id_booking: number;
    judul: string;
    dasar: string;
    maksud: string;
    tujuan: string;
    biaya: string;
    ringkasan_pelaksana: string;
    kesimpulan: string;
    saran: string;
    nama_penulis: string;
    foto_dokumentasi: FotoDokumentasi[];
};

type Props = {
    laporan: Laporan;
    booking: Booking | null;
};

const EditLaporan: React.FC<Props> = ({ laporan, booking }) => {
    const [existingFotos, setExistingFotos] = useState<FotoDokumentasi[]>(
        laporan.foto_dokumentasi.map((foto) => ({
            id: foto.id,
            url: foto.url,
            preview: foto.url ?? "",
        }))
    );

    const [newFotos, setNewFotos] = useState<FotoDokumentasi[]>([]);

    const [form, setForm] = useState({
        id_booking: laporan.id_booking,
        judul: laporan.judul,
        dasar: laporan.dasar,
        maksud: laporan.maksud,
        tujuan: laporan.tujuan,
        biaya: laporan.biaya,
        ringkasan_pelaksana: laporan.ringkasan_pelaksana,
        kesimpulan: laporan.kesimpulan,
        saran: laporan.saran,
        nama_penulis: laporan.nama_penulis,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [deletedFotoIds, setDeletedFotoIds] = useState<number[]>([]);

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

        setNewFotos((prev) => [...prev, ...withPreviews]);
    };

    const removeExistingFoto = (id?: number) => {
        if (!id) return;
        setExistingFotos((prev) => prev.filter((foto) => foto.id !== id));
        setDeletedFotoIds((prev) => [...prev, id]);
    };

    const removeNewFoto = (index: number) => {
        setNewFotos((prev) => {
            const removed = prev[index];
            if (removed.preview.startsWith("blob:")) {
                URL.revokeObjectURL(removed.preview);
            }
            const updated = [...prev];
            updated.splice(index, 1);
            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();

        formData.append("_method", "put");

        formData.append("id_booking", String(form.id_booking));
        formData.append("judul", form.judul);
        formData.append("dasar", form.dasar);
        formData.append("maksud", form.maksud);
        formData.append("tujuan", form.tujuan);
        formData.append("biaya", form.biaya);
        formData.append("ringkasan_pelaksana", form.ringkasan_pelaksana);
        formData.append("kesimpulan", form.kesimpulan);
        formData.append("saran", form.saran);
        formData.append("nama_penulis", form.nama_penulis);

        existingFotos.forEach((foto) => {
            if (foto.id !== undefined && foto.id !== null) {
                formData.append("existing_foto[]", String(foto.id));
            }
        });

        newFotos.forEach((foto) => {
            if (foto.file) {
                formData.append("foto_dokumentasi[]", foto.file);
            }
        });

        deletedFotoIds.forEach((id) => {
            formData.append("deleted_foto_ids[]", String(id));
        });

        router.post(`/pegawai/update/laporan/${laporan.id}`, formData, {
            forceFormData: true,
            onError: (err) => {
                setErrors(err);
            },
            onFinish: () => setLoading(false),
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
                    Edit Laporan
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 text-sm"
                    encType="multipart/form-data"
                >
                    <div>
                        <label className="block mb-1 font-semibold">
                            Booking
                        </label>
                        {booking ? (
                            <div className="border rounded px-3 py-2 bg-gray-100">
                                {booking.nama_instansi} ({booking.tanggal_mulai}{" "}
                                - {booking.tanggal_akhir})
                            </div>
                        ) : (
                            <p className="italic text-gray-500">
                                Data booking tidak tersedia
                            </p>
                        )}
                    </div>

                    {[
                        { label: "Judul", name: "judul" },
                        { label: "Dasar", name: "dasar" },
                        { label: "Maksud", name: "maksud" },
                        { label: "Tujuan", name: "tujuan" },
                        { label: "Biaya", name: "biaya" },
                        {
                            label: "Ringkasan Pelaksana",
                            name: "ringkasan_pelaksana",
                        },
                        { label: "Kesimpulan", name: "kesimpulan" },
                        { label: "Saran", name: "saran" },
                        { label: "Nama Penulis", name: "nama_penulis" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block mb-1">{field.label}</label>
                            <textarea
                                name={field.name}
                                value={(form as any)[field.name]}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                                rows={3}
                            />
                            {renderError(field.name)}
                        </div>
                    ))}

                    <div>
                        <label className="block mb-1">Foto Dokumentasi</label>
                        <input
                            type="file"
                            multiple
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                        {renderError("foto_dokumentasi")}

                        {(existingFotos.length > 0 || newFotos.length > 0) && (
                            <div className="mt-3 grid grid-cols-3 gap-2">
                                {existingFotos.map((item) => (
                                    <div key={item.id} className="relative">
                                        <img
                                            src={item.preview}
                                            alt="Foto lama"
                                            className="w-full h-32 object-cover rounded border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeExistingFoto(item.id)
                                            }
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-1 text-xs"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}

                                {newFotos.map((item, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={item.preview}
                                            alt={`Foto baru ${index + 1}`}
                                            className="w-full h-32 object-cover rounded border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeNewFoto(index)}
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
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                        >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditLaporan;
