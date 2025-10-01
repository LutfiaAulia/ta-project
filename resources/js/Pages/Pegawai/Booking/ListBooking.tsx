import React, { useEffect, useState } from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

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

const ListBooking: React.FC<PageProps<{ booking: any[] }>> = ({ booking }) => {
    const { auth } = usePage().props as any;
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedStatus, setSelectedStatus] = useState("");

    const filtered = booking.filter((b) =>
        [b.acara, b.lokasi, b.status_booking, b.instansi?.user?.nama]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
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
                    Semua Riwayat Booking
                </h1>

                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari booking..."
                        className="border border-gray-300 p-2 rounded text-sm w-64"
                    />

                    <div className="flex items-center gap-2">
                        {/* Filter jumlah data per halaman */}
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

                        {/* Filter status untuk cetak */}
                        <select
                            id="statusCetak"
                            className="border border-gray-300 p-2 rounded text-sm"
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="">-- Pilih Status --</option>
                            <option value="Diajukan">Diajukan</option>
                            <option value="Diterima">Diterima</option>
                            <option value="Ditolak">Ditolak</option>
                            <option value="Selesai">Selesai</option>
                        </select>

                        {/* Tombol cetak */}
                        <a
                            href={`/pegawai/pdf-booking/cetak?status=${selectedStatus}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-4 py-2 rounded text-sm font-medium ${
                                selectedStatus
                                    ? "bg-green-500 hover:bg-green-600 text-white"
                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                            }`}
                            onClick={(e) => {
                                if (!selectedStatus) {
                                    e.preventDefault();
                                    alert(
                                        "Pilih status dulu sebelum mencetak!"
                                    );
                                }
                            }}
                        >
                            Cetak
                        </a>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-xs">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2">No</th>
                                <th className="border px-2 py-2">Jadwal</th>
                                <th className="border px-2 py-2">
                                    Nama Pengaju
                                </th>
                                <th className="border px-2 py-2">Acara</th>
                                <th className="border px-2 py-2">Lokasi</th>
                                <th className="border px-2 py-2">Status</th>
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
                                            {b.instansi?.user?.nama}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {b.acara}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {b.lokasi}
                                        </td>
                                        <td className="border px-2 py-2 text-center">
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${
                                                    b.status_booking ===
                                                    "Diajukan"
                                                        ? "bg-yellow-300 text-gray-800"
                                                        : b.status_booking ===
                                                          "Diterima"
                                                        ? "bg-blue-300 text-white"
                                                        : b.status_booking ===
                                                          "Ditolak"
                                                        ? "bg-red-300 text-white"
                                                        : b.status_booking ===
                                                          "Selesai"
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
                                            {auth.role === "Kepala Bidang" &&
                                                b.hasDisposisi && (
                                                    <Link
                                                        href={`/pegawai/booking/disposisi/${b.id_booking}`}
                                                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded text-xs"
                                                    >
                                                        Disposisi
                                                    </Link>
                                                )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada data yang ditemukan.
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

export default ListBooking;
