import React, { useState, useEffect } from "react";
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
    const [hapusFotoIds, setHapusFotoIds] = useState<number[]>([]);

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
        setHapusFotoIds((prev) => [...prev, id]);
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
        formData.append("_method", "PUT");

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

        hapusFotoIds.forEach((id) => {
            formData.append("hapus_foto[]", String(id));
        });

        newFotos.forEach((foto) => {
            if (foto.file) {
                formData.append("foto_dokumentasi[]", foto.file);
            }
        });

        router.post(`/pegawai/update/laporan/${laporan.id}`, formData, {
            forceFormData: true,
            onError: (err) => {
                setErrors(err);
                setLoading(false);
            },
            onSuccess: () => {
                setLoading(false);
                newFotos.forEach((foto) => {
                    if (foto.preview.startsWith("blob:")) {
                        URL.revokeObjectURL(foto.preview);
                    }
                });
            },
            preserveScroll: true,
        });
    };

    const renderError = (field: string) =>
        errors[field] ? (
            <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
        ) : null;

    useEffect(() => {
        return () => {
            newFotos.forEach((foto) => {
                if (foto.preview.startsWith("blob:")) {
                    URL.revokeObjectURL(foto.preview);
                }
            });
        };
    }, [newFotos]);

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
                            <label className="block mb-1 font-medium">
                                {field.label}
                            </label>
                            <textarea
                                name={field.name}
                                value={(form as any)[field.name]}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                required
                            />
                            {renderError(field.name)}
                        </div>
                    ))}

                    <div>
                        <label className="block mb-1 font-medium">
                            Foto Dokumentasi
                        </label>

                        {existingFotos.length > 0 && (
                            <div className="mb-3">
                                <p className="text-sm text-gray-600 mb-2">
                                    Foto yang sudah ada ({existingFotos.length}{" "}
                                    foto):
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    {existingFotos.map((item) => (
                                        <div
                                            key={item.id}
                                            className="relative group"
                                        >
                                            <img
                                                src={item.preview}
                                                alt="Foto existing"
                                                className="w-full h-32 object-cover rounded border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeExistingFoto(item.id)
                                                }
                                                className="absolute top-1 right-1 z-20 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition-opacity"
                                                title="Hapus foto ini"
                                            >
                                                ✕
                                            </button>

                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b z-10 pointer-events-none">
                                                Foto Lama
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <input
                            type="file"
                            multiple
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Pilih foto baru untuk ditambahkan (opsional).
                            Format: JPG, JPEG, PNG. Maks 2MB per file.
                        </p>
                        {renderError("foto_dokumentasi")}

                        {newFotos.length > 0 && (
                            <div className="mt-3">
                                <p className="text-sm text-gray-600 mb-2">
                                    Foto baru yang akan ditambahkan (
                                    {newFotos.length} foto):
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    {newFotos.map((item, index) => (
                                        <div
                                            key={index}
                                            className="relative group"
                                        >
                                            <img
                                                src={item.preview}
                                                alt={`Foto baru ${index + 1}`}
                                                className="w-full h-32 object-cover rounded border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeNewFoto(index)
                                                }
                                                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition-opacity"
                                                title="Hapus foto ini"
                                            >
                                                ✕
                                            </button>
                                            <div className="absolute bottom-0 left-0 right-0 bg-green-600 bg-opacity-70 text-white text-xs p-1 rounded-b">
                                                Foto Baru
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="button"
                            onClick={() => router.get("/pegawai/list/laporan")}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded text-sm transition-colors flex items-center gap-2"
                        >
                            {loading && (
                                <svg
                                    className="animate-spin h-4 w-4"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeOpacity="0.3"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            )}
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditLaporan;
