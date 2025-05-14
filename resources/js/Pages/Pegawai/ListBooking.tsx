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

const ListBooking: React.FC<PageProps<{ booking: any[] }>> = ({
    booking,
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
                            {booking.map((b, index) => (
                                <tr key={b.id_booking}>
                                    <td className="border px-2 py-2 text-center">{index + 1}</td>
                                    <td className="border px-2 py-2 text-center whitespace-nowrap">
                                        {formatTanggalDanJam(b.jadwal)}
                                    </td>
                                    <td className="border px-2 py-2">{b.instansi?.user?.nama}</td>
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
                                            href={`/pegawai/booking/${b.id_booking}`}
                                            className="bg-gray-200 hover:bg-gray-300 text-xs px-2 py-1 rounded"
                                        >
                                            Detail
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

export default ListBooking;
