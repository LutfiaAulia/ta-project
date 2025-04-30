import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

interface Booking {
    id_booking: any;
    jadwal: string;
    acara: string;
    layanan: string;
    lokasi: string;
    status_booking: "Diajukan" | "Diterima" | "Ditolak" | "Selesai";
}

interface RiwayatBookingProps {
    booking: Booking[];
}

export default function RiwayatBooking({ booking }: RiwayatBookingProps) {
    const statusColors: { [key in Booking["status_booking"]]: string } = {
        Diajukan: "bg-yellow-200 text-gray-800",
        Diterima: "bg-blue-300 text-white",
        Ditolak: "bg-red-300 text-white",
        Selesai: "bg-green-200 text-gray-800",
    };

    const [search, setSearch] = useState<string>("");
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    function formatTanggal(tanggal: string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(tanggal).toLocaleDateString("id-ID", options);
    }

    const filteredBookings = booking.filter(
        (booking) =>
            booking.acara.toLowerCase().includes(search.toLowerCase()) ||
            booking.lokasi.toLowerCase().includes(search.toLowerCase()) ||
            booking.layanan.toLowerCase().includes(search.toLowerCase()) ||
            booking.status_booking.toLowerCase().includes(search.toLowerCase())
    );

    const totalItems = filteredBookings.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBookings = filteredBookings.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

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
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between mb-4">
                            <div>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) =>
                                        setItemsPerPage(Number(e.target.value))
                                    }
                                    className="border border-gray-300 p-2 rounded-lg text-sm w-20"
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari Booking"
                                    className="border border-gray-300 p-2 rounded-lg text-[12px] w-64"
                                />
                            </div>
                        </div>

                        <div className="overflow-hidden shadow-sm">
                            <div className="text-gray-900">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full table-auto border border-gray-300 text-[12px]">
                                        <thead className="bg-gray-300">
                                            <tr>
                                                <th className="border px-4 py-2">
                                                    No
                                                </th>
                                                <th className="border px-4 py-2">
                                                    Jadwal
                                                </th>
                                                <th className="border px-4 py-2">
                                                    Acara
                                                </th>
                                                <th className="border px-4 py-2">
                                                    Layanan
                                                </th>
                                                <th className="border px-4 py-2">
                                                    Lokasi
                                                </th>
                                                <th className="border px-4 py-2">
                                                    Status
                                                </th>
                                                <th className="border px-4 py-2">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentBookings.map(
                                                (booking, index) => (
                                                    <tr
                                                        key={booking.id_booking}
                                                    >
                                                        <td className="border px-4 py-2 text-center">
                                                            {startIndex +
                                                                index +
                                                                1}
                                                        </td>
                                                        <td className="border px-4 py-2 whitespace-pre-line">
                                                            {formatTanggal(
                                                                booking.jadwal
                                                            )}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {booking.acara}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {booking.layanan}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {booking.lokasi}
                                                        </td>
                                                        <td className="border px-4 py-2 text-center">
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-[11px] ${
                                                                    statusColors[
                                                                        booking
                                                                            .status_booking
                                                                    ] ||
                                                                    "bg-gray-300 text-gray-800"
                                                                }`}
                                                            >
                                                                {
                                                                    booking.status_booking
                                                                }
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
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                    {filteredBookings.length === 0 && (
                                        <div className="text-center text-gray-500 py-8">
                                            Tidak ada data booking.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-end items-center mt-4 space-x-4">
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                    className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg text-[12px] w-24"
                                >
                                    Previous
                                </button>
                                <span className="text-gray-700 text-[12px]">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg text-[12px] w-24"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
