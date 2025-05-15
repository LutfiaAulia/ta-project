import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import BookingTable from "../../Components/BookingTable";

interface Booking {
    id_booking: number | string;
    tanggal_mulai: string;
    tanggal_akhir: string;
    waktu_mulai: string;
    waktu_akhir: string;
    acara: string;
    layanan: string;
    lokasi: string;
    status_booking: "Diajukan" | "Diterima" | "Ditolak" | "Selesai";
}

interface RiwayatBookingProps {
    booking: Booking[];
}

export default function RiwayatBooking({ booking }: RiwayatBookingProps) {
    const [search, setSearch] = useState<string>("");
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const statusColors: { [key in Booking["status_booking"]]: string } = {
        Diajukan: "bg-yellow-200 text-gray-800",
        Diterima: "bg-blue-300 text-white",
        Ditolak: "bg-red-300 text-white",
        Selesai: "bg-green-200 text-gray-800",
    };

    const filteredBookings = booking.filter((item) =>
        [item.acara, item.lokasi, item.status_booking].some((field) =>
            field.toLowerCase().includes(search.toLowerCase())
        )
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [search, itemsPerPage]);

    const totalItems = filteredBookings.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBookings = filteredBookings.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
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

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari Booking"
                                className="border border-gray-300 p-2 rounded-lg text-[12px] w-64"
                            />
                        </div>

                        <div className="overflow-hidden shadow-sm text-gray-900">
                            {currentBookings.length > 0 ? (
                                <BookingTable
                                    bookings={currentBookings}
                                    startIndex={startIndex}
                                    statusColors={statusColors}
                                />
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    Tidak ada data booking.
                                </div>
                            )}
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
