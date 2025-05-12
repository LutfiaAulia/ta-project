import React from "react";

interface Booking {
    id_booking: any;
    jadwal: string;
    acara: string;
    layanan: string;
    lokasi: string;
    status_booking: "Diajukan" | "Diterima" | "Ditolak" | "Selesai";
}

interface BookingTableProps {
    bookings: Booking[];
    startIndex: number;
    formatTanggal: (tanggal: string) => string;
    statusColors: { [key in Booking["status_booking"]]: string };
}

const BookingTable: React.FC<BookingTableProps> = ({
    bookings,
    startIndex,
    formatTanggal,
    statusColors,
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 text-[12px]">
                <thead className="bg-gray-300">
                    <tr>
                        <th className="border px-4 py-2">No</th>
                        <th className="border px-4 py-2">Jadwal</th>
                        <th className="border px-4 py-2">Acara</th>
                        <th className="border px-4 py-2">Lokasi</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={booking.id_booking}>
                            <td className="border px-4 py-2 text-center">
                                {startIndex + index + 1}
                            </td>
                            <td className="border px-4 py-2 whitespace-pre-line">
                                {formatTanggal(booking.jadwal)}
                            </td>
                            <td className="border px-4 py-2">
                                {booking.acara}
                            </td>
                            <td className="border px-4 py-2">
                                {booking.lokasi}
                            </td>
                            <td className="border px-4 py-2 text-center">
                                <span
                                    className={`px-2 py-1 rounded-full text-[11px] ${
                                        statusColors[booking.status_booking] ||
                                        "bg-gray-300 text-gray-800"
                                    }`}
                                >
                                    {booking.status_booking}
                                </span>
                            </td>
                            <td className="border px-4 py-2 text-center">
                                <a
                                    href={`/booking/${booking.id_booking}/show`}
                                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-[11px]"
                                >
                                    Detail
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingTable;
