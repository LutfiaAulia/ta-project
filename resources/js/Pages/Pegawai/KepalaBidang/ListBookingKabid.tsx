import React from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";

const formatTanggalDanJam = (datetimeString: string) => {
    const tanggal = new Date(datetimeString);
    const tanggalFormatted = tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const jamFormatted = tanggal.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <>
            <div>{tanggalFormatted}</div>
            <div className="text-gray-500 text-[10px]">{jamFormatted} WIB</div>
        </>
    );
};

const ListBookingKabid: React.FC<PageProps<{ bookings: any[] }>> = ({
    bookings,
}) => {
    return (
        <Layout>
            <div className="p-4 max-w-screen-lg mx-auto">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Semua Riwayat Booking
                </h1>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-xs">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2">No</th>
                                <th className="border px-2 py-2">Jadwal</th>
                                <th className="border px-2 py-2">Nama Pengaju</th>
                                <th className="border px-2 py-2">Acara</th>
                                <th className="border px-2 py-2">Lokasi</th>
                                <th className="border px-2 py-2">Status</th>
                                <th className="border px-2 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((b, index) => (
                                <tr key={b.id}>
                                    <td className="border px-2 py-2 text-center">{index + 1}</td>
                                    <td className="border px-2 py-2 text-center whitespace-nowrap">
                                        {formatTanggalDanJam(b.jadwal)}
                                    </td>
                                    <td className="border px-2 py-2">{b.user?.nama}</td>
                                    <td className="border px-2 py-2">{b.acara}</td>
                                    <td className="border px-2 py-2">{b.lokasi}</td>
                                    <td className="border px-2 py-2 text-center">
                                        <span
                                            className={`px-2 py-1 rounded text-white text-xs ${
                                                b.status_booking === "Diajukan"
                                                    ? "bg-yellow-300 text-gray-800"
                                                    : b.status_booking === "Diterima"
                                                    ? "bg-blue-300 text-white"
                                                    : b.status_booking === "Ditolak"
                                                    ? "bg-red-300 text-white"
                                                    : b.status_booking === "Selesai"
                                                    ? "bg-green-200 text-gray-800"
                                                    : "bg-gray-300"
                                            }`}
                                        >
                                            {b.status_booking}
                                        </span>
                                    </td>
                                    <td className="border px-2 py-2 text-center space-x-1">
                                        <Link
                                            href={`/kabid/booking/${b.id}`}
                                            className="bg-gray-200 hover:bg-gray-300 text-xs px-2 py-1 rounded"
                                        >
                                            Detail
                                        </Link>
                                        <Link
                                            href={`/kabid/booking/${b.id}/verifikasi`}
                                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
                                        >
                                            Verifikasi
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default ListBookingKabid;
