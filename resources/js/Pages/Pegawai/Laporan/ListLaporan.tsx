import React, { useEffect, useState } from "react";
import Layout from "@/Components/Layout";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

type LaporanEntry = {
    id_laporan: number;
    tanggal_mulai: string;
    tanggal_akhir: string;
    waktu_mulai: string;
    waktu_akhir: string;
    judul: string;
    lokasi: string;
    nama_penulis: string;
};

type ListLaporanProps = PageProps<{
    laporan: LaporanEntry[];
}>;

const extractJam = (waktu: string | null | undefined) => {
    if (!waktu) return "-";
    const dateObj = new Date(waktu);
    if (isNaN(dateObj.getTime())) return "-";
    dateObj.setHours(dateObj.getHours() - 7); // Koreksi zona waktu
    return `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
};

const formatTanggalDanJam = (
    tanggalMulai: string,
    tanggalAkhir: string,
    waktuMulai: string,
    waktuAkhir: string
) => {
    const mulai = new Date(tanggalMulai);
    const akhir = new Date(tanggalAkhir);

    const tgl =
        tanggalMulai === tanggalAkhir
            ? mulai.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
              })
            : `${mulai.getDate()} - ${akhir.getDate()} ${akhir.toLocaleDateString(
                  "id-ID",
                  { month: "long", year: "numeric" }
              )}`;

    const jam = `${extractJam(waktuMulai)} - ${extractJam(waktuAkhir)} WIB`;

    return (
        <>
            <div>{tgl}</div>
            <div className="text-gray-500 text-[10px]">{jam}</div>
        </>
    );
};

const ListLaporan: React.FC<ListLaporanProps> = ({ laporan }) => {
    const [search, setSearch] = useState("");
    const [filteredLaporan, setFilteredLaporan] = useState(laporan);

    const { auth } = usePage().props as any;
    const role = auth?.user?.pegawai?.role || "";

    const isPegawaiLapangan = role === "Pegawai Lapangan";

    useEffect(() => {
        const keyword = search.toLowerCase();
        const filtered = laporan.filter(
            (lapor) =>
                lapor.judul.toLowerCase().includes(keyword) ||
                lapor.lokasi.toLowerCase().includes(keyword) ||
                lapor.nama_penulis.toLowerCase().includes(keyword) ||
                new Date(lapor.tanggal_mulai)
                    .toLocaleDateString("id-ID")
                    .includes(keyword)
        );
        setFilteredLaporan(filtered);
    }, [search, laporan]);

    return (
        <Layout>
            <div className="p-4 max-w-screen-lg mx-auto">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Daftar Laporan
                </h1>

                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Cari laporan..."
                        className="border px-3 py-2 rounded text-sm w-1/3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {isPegawaiLapangan && (
                        <Link
                            href="/pegawai/create/laporan"
                            className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded"
                        >
                            + Tambah
                        </Link>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-xs">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2">No</th>
                                <th className="border px-2 py-2">Jadwal</th>
                                <th className="border px-2 py-2 w-[370px] truncate">
                                    Judul
                                </th>
                                <th className="border px-2 py-2">Lokasi</th>
                                <th className="border px-2 py-2">
                                    Nama Penulis
                                </th>
                                <th className="border px-2 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLaporan.length > 0 ? (
                                filteredLaporan.map((lapor, index) => (
                                    <tr key={lapor.id_laporan}>
                                        <td className="border px-2 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border px-2 py-2 text-center whitespace-nowrap">
                                            {formatTanggalDanJam(
                                                lapor.tanggal_mulai,
                                                lapor.tanggal_akhir,
                                                lapor.waktu_mulai,
                                                lapor.waktu_akhir
                                            )}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {lapor.judul}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {lapor.lokasi}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {lapor.nama_penulis}
                                        </td>
                                        <td className="border px-2 py-2 text-center space-x-1">
                                            {isPegawaiLapangan && (
                                                <>
                                                    <Link
                                                        href={`/pegawai/edit/laporan/${lapor.id_laporan}`}
                                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        method="delete"
                                                        as="button"
                                                        href={`/pegawai/destroy/laporan/${lapor.id_laporan}`}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                                        onClick={(e) => {
                                                            if (
                                                                !confirm(
                                                                    "Yakin ingin menghapus laporan ini?"
                                                                )
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        Hapus
                                                    </Link>
                                                </>
                                            )}
                                            <Link
                                                href={`/pegawai/tampilan/laporan/${lapor.id_laporan}`}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
                                                target="_blank"
                                            >
                                                PDF
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
                                        Tidak ada laporan tersedia.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default ListLaporan;
