import React, { useEffect, useState } from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";

const extractJam = (waktu: string | null | undefined) => {
    if (!waktu) return "-";
    const dateObj = new Date(waktu);
    if (isNaN(dateObj.getTime())) return "-";
    dateObj.setHours(dateObj.getHours() - 7);
    const jam = dateObj.getHours().toString().padStart(2, "0");
    const menit = dateObj.getMinutes().toString().padStart(2, "0");
    return `${jam}:${menit}`;
};

const formatTanggalDanJam = (
    tanggalMulai: string,
    tanggalAkhir: string,
    waktuMulai: string,
    waktuAkhir: string
) => {
    const mulai = new Date(tanggalMulai);
    const akhir = new Date(tanggalAkhir);

    const opsiTanggal: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    const tgl =
        tanggalMulai === tanggalAkhir
            ? mulai.toLocaleDateString("id-ID", opsiTanggal)
            : `${mulai.getDate()} - ${akhir.getDate()} ${akhir.toLocaleDateString(
                  "id-ID",
                  { month: "long", year: "numeric" }
              )}`;

    return (
        <>
            <div>{tgl}</div>
            <div className="text-gray-500 text-[10px]">
                {extractJam(waktuMulai)} - {extractJam(waktuAkhir)} WIB
            </div>
        </>
    );
};

const ListBookingTerlaksana: React.FC<PageProps<{ booking: any[] }>> = ({
    booking,
}) => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const filtered = booking.filter((b) =>
        b.acara?.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBookings = filtered.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [search, itemsPerPage]);

    return (
        <Layout>
            <div className="p-4 max-w-screen-lg mx-auto">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Booking Terlaksana (Diterima)
                </h1>

                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari acara..."
                        className="border border-gray-300 p-2 rounded text-sm w-64"
                    />
                    <select
                        value={itemsPerPage}
                        onChange={(e) =>
                            setItemsPerPage(Number(e.target.value))
                        }
                        className="border border-gray-300 p-2 rounded text-sm w-20"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-xs">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2">No</th>
                                <th className="border px-2 py-2">Jadwal</th>
                                <th className="border px-2 py-2">Acara</th>
                                <th className="border px-2 py-2">Peserta</th>
                                <th className="border px-2 py-2">
                                    UMKM Terdaftar
                                </th>
                                <th className="border px-2 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBookings.length > 0 ? (
                                currentBookings.map((b, index) => (
                                    <tr key={b.id_booking}>
                                        <td className="border px-2 py-2 text-center">
                                            {startIndex + index + 1}
                                        </td>
                                        <td className="border px-2 py-2 text-center whitespace-nowrap">
                                            {formatTanggalDanJam(
                                                b.tanggal_mulai,
                                                b.tanggal_akhir,
                                                b.waktu_mulai,
                                                b.waktu_akhir
                                            )}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {b.acara}
                                        </td>
                                        <td className="border px-2 py-2 text-center">
                                            {b.jumlah_umkm}
                                        </td>
                                        <td className="border px-2 py-2 text-center">
                                            {b.jumlah_umkm_terdaftar ?? 0}
                                        </td>
                                        <td className="border px-2 py-2 text-center">
                                            <Link
                                                href={`/pegawai/list/umkmlayan/${b.id_booking}`}
                                                className="bg-blue-100 hover:bg-blue-200 text-xs px-2 py-1 rounded"
                                            >
                                                Lihat
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada data booking yang diterima.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-end items-center mt-4 gap-2 text-sm">
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(totalPages, prev + 1)
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ListBookingTerlaksana;
