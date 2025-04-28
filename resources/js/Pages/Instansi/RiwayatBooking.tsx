import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
interface Booking {
    id: number;
    jadwal: string;
    acara: string;
    layanan: string;
    lokasi: string;
    status_booking: "Diajukan" | "Diterima" | "Ditolak" | "Selesai";
}
interface RiwayatBookingProps {
    bookings: Booking[];
}

export default function RiwayatBooking({ bookings }: RiwayatBookingProps) {
    const statusColors: { [key in Booking["status_booking"]]: string } = {
        Diajukan: "bg-yellow-300 text-gray-800",
        Diterima: "bg-blue-400 text-white",
        Ditolak: "bg-red-400 text-white",
        Selesai: "bg-green-300 text-gray-800",
    };

    function formatTanggal(tanggal: string): string {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
        return new Date(tanggal).toLocaleDateString("id-ID", options);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Riwayat Booking
                </h2>
            }
        >
            <Head title="Riwayat" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-[2cm]">
                    <div className="overflow-hidden bg-white shadow-sm">
                        <div className="text-gray-900">
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto border border-gray-300 text-[12px]">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-4 py-2">No</th>
                                            <th className="border px-4 py-2">Tanggal</th>
                                            <th className="border px-4 py-2">Acara</th>
                                            <th className="border px-4 py-2">Layanan</th>
                                            <th className="border px-4 py-2">Lokasi</th>
                                            <th className="border px-4 py-2">Status</th>
                                            <th className="border px-4 py-2">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking, index) => (
                                            <tr key={booking.id}>
                                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                                <td className="border px-4 py-2 whitespace-pre-line">
                                                    {formatTanggal(booking.jadwal)}
                                                </td>
                                                <td className="border px-4 py-2">{booking.acara}</td>
                                                <td className="border px-4 py-2">{booking.layanan}</td>
                                                <td className="border px-4 py-2">{booking.lokasi}</td>
                                                <td className="border px-4 py-2 text-center">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-sm text-[12px] ${
                                                            statusColors[booking.status_booking] ||
                                                            "bg-gray-300 text-gray-800"
                                                        }`}
                                                    >
                                                        {booking.status_booking}
                                                    </span>
                                                </td>
                                                <td className="border px-4 py-2 text-center space-x-1">
                                                    <a
                                                        href={`/booking/${booking.id}/edit`}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-[12px]"
                                                    >
                                                        Detail
                                                    </a>
                                                    <a
                                                        href={`/booking/${booking.id}/edit`}
                                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-[12px]"
                                                    >
                                                        Edit
                                                    </a>
                                                    <form
                                                        method="POST"
                                                        action={`/booking/${booking.id}/destroy`}
                                                        onSubmit={(e) => {
                                                            if (
                                                                !confirm("Apakah yakin ingin menghapus booking ini?")
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                        className="inline"
                                                    >
                                                        <input type="hidden" name="_method" value="DELETE" />
                                                        <button
                                                            type="submit"
                                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-[12px]"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {bookings.length === 0 && (
                                    <div className="text-center text-gray-500 py-8">
                                        Tidak ada data booking.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
