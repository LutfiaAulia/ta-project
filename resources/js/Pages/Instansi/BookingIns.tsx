import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FormEventHandler, useState } from "react";
import { PageProps } from "@/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import CustomDateInput from "@/Components/CustomDateInput";

interface BookingInsProps extends PageProps {
    layananList: Array<{ id: number; nama: string }>;
    selectedLayanan?: number[];
    bookedDates: string[];
}

export default function BookingIns({
    layananList,
    selectedLayanan,
    bookedDates,
}: BookingInsProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tanggal_mulai: "",
        tanggal_akhir: "",
        waktu_mulai: "",
        waktu_akhir: "",
        acara: "",
        peserta: "",
        layanan: selectedLayanan?.map(String) ?? [],
        lokasi: "",
        no_hp: "",
        surat: null as File | null,
    });

    const [successMessage, setSuccessMessage] = useState("");

    // Tanggal besok (hari ini + 1 hari)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Convert bookedDates string ke array Date untuk excludeDates di datepicker
    const excludeDatesParsed = bookedDates.map((d) => parseISO(d));

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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Tanggal Mulai */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tanggal Mulai
                                        </label>
                                        <DatePicker
                                            selected={
                                                data.tanggal_mulai
                                                    ? new Date(
                                                          data.tanggal_mulai
                                                      )
                                                    : null
                                            }
                                            onChange={(date: Date | null) => {
                                                if (date) {
                                                    const isoDate = date
                                                        .toISOString()
                                                        .split("T")[0];
                                                    setData(
                                                        "tanggal_mulai",
                                                        isoDate
                                                    );

                                                    // Jika tanggal_akhir kosong atau kurang dari tanggal_mulai, set sama dengan tanggal_mulai
                                                    if (
                                                        !data.tanggal_akhir ||
                                                        data.tanggal_akhir <
                                                            isoDate
                                                    ) {
                                                        setData(
                                                            "tanggal_akhir",
                                                            isoDate
                                                        );
                                                    }
                                                }
                                            }}
                                            minDate={tomorrow}
                                            excludeDates={excludeDatesParsed}
                                            dateFormat="dd-MM-yyyy"
                                            placeholderText="Pilih Tanggal Mulai"
                                            customInput={<CustomDateInput />}
                                            required
                                        />
                                        {errors.tanggal_mulai && (
                                            <p className="mt-2 text-xs text-red-500">
                                                {errors.tanggal_mulai}
                                            </p>
                                        )}
                                    </div>

                                    {/* Tanggal Akhir */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tanggal Akhir
                                        </label>
                                        <DatePicker
                                            selected={
                                                data.tanggal_akhir
                                                    ? new Date(
                                                          data.tanggal_akhir
                                                      )
                                                    : null
                                            }
                                            onChange={(date: Date | null) => {
                                                if (date) {
                                                    const isoDate = date
                                                        .toISOString()
                                                        .split("T")[0];
                                                    setData(
                                                        "tanggal_akhir",
                                                        isoDate
                                                    );
                                                }
                                            }}
                                            minDate={
                                                data.tanggal_mulai
                                                    ? new Date(
                                                          data.tanggal_mulai
                                                      )
                                                    : tomorrow
                                            }
                                            excludeDates={excludeDatesParsed}
                                            dateFormat="dd-MM-yyyy"
                                            placeholderText="Pilih Tanggal Akhir"
                                            customInput={<CustomDateInput />}
                                            required
                                        />
                                        {errors.tanggal_akhir && (
                                            <p className="mt-2 text-xs text-red-500">
                                                {errors.tanggal_akhir}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Waktu Mulai */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Waktu Mulai
                                        </label>
                                        <input
                                            type="time"
                                            name="waktu_mulai"
                                            value={data.waktu_mulai}
                                            onChange={(e) =>
                                                setData(
                                                    "waktu_mulai",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                            required
                                        />
                                        {errors.waktu_mulai && (
                                            <p className="mt-2 text-xs text-red-500">
                                                {errors.waktu_mulai}
                                            </p>
                                        )}
                                    </div>

                                    {/* Waktu Akhir */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Waktu Akhir
                                        </label>
                                        <input
                                            type="time"
                                            name="waktu_akhir"
                                            value={data.waktu_akhir}
                                            onChange={(e) =>
                                                setData(
                                                    "waktu_akhir",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                            required
                                        />
                                        {errors.waktu_akhir && (
                                            <p className="mt-2 text-xs text-red-500">
                                                {errors.waktu_akhir}
                                            </p>
                                        )}
                                    </div>
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
                                        min={1}
                                    />
                                    {errors.peserta && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.peserta}
                                        </p>
                                    )}
                                </div>

                                {/* Layanan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pilih Layanan
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {layananList.map((layanan) => (
                                            <label
                                                key={layanan.id}
                                                className="inline-flex items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={layanan.id}
                                                    checked={data.layanan.includes(
                                                        String(layanan.id)
                                                    )}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value;
                                                        if (e.target.checked) {
                                                            setData("layanan", [
                                                                ...data.layanan,
                                                                value,
                                                            ]);
                                                        } else {
                                                            setData(
                                                                "layanan",
                                                                data.layanan.filter(
                                                                    (id) =>
                                                                        id !==
                                                                        value
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    className="mr-2 rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
                                                />
                                                {layanan.nama}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.layanan && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.layanan}
                                        </p>
                                    )}

                                    {/* Menampilkan layanan yang terpilih */}
                                    {data.layanan.length > 0 && (
                                        <p className="mt-3 text-sm text-gray-600">
                                            Layanan terpilih:{" "}
                                            {layananList
                                                .filter((l) =>
                                                    data.layanan.includes(
                                                        String(l.id)
                                                    )
                                                )
                                                .map((l) => l.nama)
                                                .join(", ")}
                                        </p>
                                    )}
                                </div>

                                {/* Lokasi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Lokasi Acara
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

                                {/* No HP */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nomor HP
                                    </label>
                                    <input
                                        type="tel"
                                        name="no_hp"
                                        value={data.no_hp}
                                        onChange={(e) =>
                                            setData("no_hp", e.target.value)
                                        }
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
