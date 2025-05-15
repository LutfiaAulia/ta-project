import React from "react";

interface Booking {
    id_booking: any;
    tanggal_mulai: string;
    tanggal_akhir: string;
    waktu_mulai: string;
    waktu_akhir: string;
    acara: string;
    layanan: string;
    lokasi: string;
    status_booking: "Diajukan" | "Diterima" | "Ditolak" | "Selesai";
}

const formatJadwalLengkap = (
    tanggalMulai: string,
    tanggalAkhir: string,
    waktuMulai: string | null | undefined,
    waktuAkhir: string | null | undefined
) => {
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
    };

    const mulai = new Date(tanggalMulai);
    const akhir = new Date(tanggalAkhir);

    const tgl =
        tanggalMulai === tanggalAkhir
            ? mulai.toLocaleDateString("id-ID", options)
            : `${mulai.getDate()}-${akhir.getDate()} ${akhir.toLocaleDateString(
                  "id-ID",
                  { month: "long", year: "numeric" }
              )}`;

    const extractJam = (waktu: string | null | undefined) => {
        if (!waktu) return "-";
        const dateObj = new Date(waktu);
        if (isNaN(dateObj.getTime())) return "-";
        dateObj.setHours(dateObj.getHours() - 7);
        const jam = dateObj.getHours().toString().padStart(2, "0");
        const menit = dateObj.getMinutes().toString().padStart(2, "0");
        return `${jam}:${menit}`;
    };

    const jamMulai = extractJam(waktuMulai);
    const jamAkhir = extractJam(waktuAkhir);

    const jam = `${jamMulai} - ${jamAkhir} WIB`;

    return `${tgl}\n${jam}`;
};

interface BookingTableProps {
    bookings: Booking[];
    startIndex: number;
    statusColors: { [key in Booking["status_booking"]]: string };
}

const BookingTable: React.FC<BookingTableProps> = ({
    bookings,
    startIndex,
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
                            <td className="border px-4 py-2 whitespace-pre-line text-center">
                                {formatJadwalLengkap(
                                    booking.tanggal_mulai,
                                    booking.tanggal_akhir,
                                    booking.waktu_mulai,
                                    booking.waktu_akhir
                                )}
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
