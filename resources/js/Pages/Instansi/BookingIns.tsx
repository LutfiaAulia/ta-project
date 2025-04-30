import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FormEventHandler, useState } from "react";

export default function BookingIns() {
    const { data, setData, post, processing, errors, reset } = useForm({
        jadwal: "",
        acara: "",
        peserta: "",
        layanan: "",
        lokasi: "",
        no_hp: "",
        surat: null as File | null,
    });

    const [successMessage, setSuccessMessage] = useState("");

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("booking.store"), {
            onSuccess: () => {
                setSuccessMessage("Berhasil Melakukan Booking!");
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Booking Mobil Klinik
                </h2>
            }
        >
            <Head title="Booking" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-[3cm] py-[0.5cm]">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg px-[1cm]">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-semibold mb-6 text-center">
                                Form Pembookingan Layanan Mobil Klinik
                            </h2>

                            {successMessage && (
                                <div className="mb-4 p-4 text-green-700 bg-green-100 rounded-md border border-green-300">
                                    {successMessage}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                {/* Jadwal */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Jadwal
                                    </label>
                                    <input
                                        type="date"
                                        name="jadwal"
                                        value={data.jadwal}
                                        onChange={(e) =>
                                            setData("jadwal", e.target.value)
                                        }
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.jadwal && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.jadwal}
                                        </p>
                                    )}
                                </div>

                                {/* Acara */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Acara
                                    </label>
                                    <input
                                        type="text"
                                        name="acara"
                                        value={data.acara}
                                        onChange={(e) =>
                                            setData("acara", e.target.value)
                                        }
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.acara && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.acara}
                                        </p>
                                    )}
                                </div>

                                {/* Jumlah Peserta */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Jumlah Peserta
                                    </label>
                                    <input
                                        type="number"
                                        name="peserta"
                                        value={data.peserta}
                                        onChange={(e) =>
                                            setData("peserta", e.target.value)
                                        }
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.peserta && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.peserta}
                                        </p>
                                    )}
                                </div>

                                {/* Layanan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Layanan
                                    </label>
                                    <input
                                        type="text"
                                        name="layanan"
                                        value={data.layanan}
                                        onChange={(e) =>
                                            setData("layanan", e.target.value)
                                        }
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.layanan && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.layanan}
                                        </p>
                                    )}
                                </div>

                                {/* Lokasi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Lokasi
                                    </label>
                                    <input
                                        type="text"
                                        name="lokasi"
                                        value={data.lokasi}
                                        onChange={(e) =>
                                            setData("lokasi", e.target.value)
                                        }
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.lokasi && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.lokasi}
                                        </p>
                                    )}
                                </div>

                                {/* Nomor Telepon */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nomor Telepon
                                    </label>
                                    <input
                                        type="text"
                                        name="no_hp"
                                        maxLength={13}
                                        value={data.no_hp}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                setData("no_hp", value);
                                            }
                                        }}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.no_hp && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.no_hp}
                                        </p>
                                    )}
                                </div>

                                {/* Surat Permintaan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Surat Permintaan
                                    </label>
                                    <input
                                        type="file"
                                        name="surat"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] ?? null;
                                            if (file) {
                                                setData("surat", file);
                                            }
                                        }}
                                        accept="application/pdf"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Ukuran Maksimum 200kb, format PDF
                                    </p>
                                    {errors.surat && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.surat}
                                        </p>
                                    )}
                                </div>

                                {/* Tombol Submit */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-10 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-full"
                                    >
                                        Kirim
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
