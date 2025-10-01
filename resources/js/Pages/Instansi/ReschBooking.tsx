import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FormEventHandler, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import CustomDateInput from "@/Components/CustomDateInput";

interface RescheduleProps {
    booking: {
        id_booking: number | string;
        tanggal_mulai: string;
        tanggal_akhir: string;
        waktu_mulai: string;
        waktu_akhir: string;
    };
    bookedDates: Array<{ tanggal: string; status: string }>;
}

export default function ReschBooking({
    booking,
    bookedDates,
}: RescheduleProps) {
    const { data, setData, put, processing, errors } = useForm({
        tanggal_mulai: booking.tanggal_mulai,
        tanggal_akhir: booking.tanggal_akhir,
        waktu_mulai: booking.waktu_mulai,
        waktu_akhir: booking.waktu_akhir,
    });

    const [successMessage, setSuccessMessage] = useState("");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const diajukanDates = bookedDates
        .filter((d) => d.status === "diajukan")
        .map((d) => parseISO(d.tanggal));

    const disetujuiDates = bookedDates
        .filter((d) => d.status === "diterima")
        .map((d) => parseISO(d.tanggal));

    const isTimeBefore = (start: string, end: string) => {
        if (!start || !end) return false;
        const today = new Date().toISOString().split("T")[0];
        const startDate = new Date(`${today}T${start}`);
        const endDate = new Date(`${today}T${end}`);
        return endDate < startDate;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isTimeBefore(data.waktu_mulai, data.waktu_akhir)) {
            alert("Waktu akhir tidak boleh lebih awal dari waktu mulai.");
            return;
        }

        put(route("booking.reschedule", booking.id_booking), {
            onSuccess: () => {
                setSuccessMessage("Jadwal berhasil diubah!");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Reschedule Booking
                </h2>
            }
        >
            <Head title="Reschedule Booking" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl px-[2cm]">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-8">
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            Ubah Jadwal Booking
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
                                                ? new Date(data.tanggal_mulai)
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
                                                if (
                                                    !data.tanggal_akhir ||
                                                    data.tanggal_akhir < isoDate
                                                ) {
                                                    setData(
                                                        "tanggal_akhir",
                                                        isoDate
                                                    );
                                                }
                                            }
                                        }}
                                        minDate={tomorrow}
                                        excludeDates={disetujuiDates}
                                        dayClassName={(date) => {
                                            const isDiajukan =
                                                diajukanDates.some(
                                                    (d) =>
                                                        d.toDateString() ===
                                                        date.toDateString()
                                                );
                                            return isDiajukan
                                                ? "bg-orange-300 text-white rounded-full"
                                                : "";
                                        }}
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
                                                ? new Date(data.tanggal_akhir)
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
                                                ? new Date(data.tanggal_mulai)
                                                : tomorrow
                                        }
                                        excludeDates={disetujuiDates}
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
                                        value={data.waktu_mulai}
                                        onChange={(e) =>
                                            setData(
                                                "waktu_mulai",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-200"
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
                                        value={data.waktu_akhir}
                                        onChange={(e) =>
                                            setData(
                                                "waktu_akhir",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-200"
                                        required
                                    />
                                    {errors.waktu_akhir && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.waktu_akhir}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Tombol Submit */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
