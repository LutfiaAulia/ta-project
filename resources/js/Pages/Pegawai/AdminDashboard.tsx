import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import Layout from "@/Components/Layout";

interface Booking {
    id_booking: number;
    tanggal_mulai: string;
    jam_mulai: string;
    jam_selesai: string;
    layanan?: { layanan: string };
    umkm?: { nama_umkm: string };
    instansi?: { nama: string };
    lokasi?: { lokasi: string };
    kecamatan?: string;
    kabupaten?: string;
}

interface Props {
    totalPegawai: number;
    totalMobil: number;
    totalSopir: number;
    totalProduk: number;
    totalBooking: number;
    totalLaporan: number;
    umkmTerlayani: Booking[];
    rekapPelayanan: { nama: string; total: number }[];
    rekapWilayah: { nama: string; total: number }[];
}

const AdminDashboard = ({
    totalPegawai,
    totalMobil,
    totalSopir,
    totalProduk,
    totalBooking,
    totalLaporan,
    umkmTerlayani,
    rekapPelayanan,
    rekapWilayah,
}: Props) => {
    const [filterWilayah, setFilterWilayah] = useState("kecamatan");

    return (
        <Layout>
            <Head title="Dashboard Admin" />

            <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard title="Pegawai" count={totalPegawai} />
                <StatCard title="Mobil" count={totalMobil} />
                <StatCard title="Sopir" count={totalSopir} />
                <StatCard title="Produk UMKM" count={totalProduk} />
                <StatCard title="Booking Selesai" count={totalBooking} />
                <StatCard title="Laporan Masuk" count={totalLaporan} />
            </div>

            <section className="mt-8">
                <h2 className="text-lg font-semibold mb-2">
                    Daftar UMKM yang Pernah Dilayani (Booking Selesai)
                </h2>
                <div className="overflow-auto">
                    <table className="min-w-full bg-white text-sm text-left">
                        <thead className="bg-green-100">
                            <tr>
                                <th className="px-4 py-2">Tanggal</th>
                                <th className="px-4 py-2">UMKM</th>
                                <th className="px-4 py-2">Layanan</th>
                                <th className="px-4 py-2">Instansi</th>
                                <th className="px-4 py-2">Kecamatan</th>
                                <th className="px-4 py-2">Kabupaten</th>
                            </tr>
                        </thead>
                        <tbody>
                            {umkmTerlayani.length > 0 ? (
                                umkmTerlayani.map((booking) => (
                                    <tr
                                        key={booking.id_booking}
                                        className="border-b"
                                    >
                                        <td className="px-4 py-2">
                                            {booking.tanggal_mulai}
                                        </td>
                                        <td className="px-4 py-2">
                                            {booking.umkm?.nama_umkm}
                                        </td>
                                        <td className="px-4 py-2">
                                            {booking.layanan?.layanan}
                                        </td>
                                        <td className="px-4 py-2">
                                            {booking.instansi?.nama}
                                        </td>
                                        <td className="px-4 py-2">
                                            {booking.kecamatan}
                                        </td>
                                        <td className="px-4 py-2">
                                            {booking.kabupaten}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-2 text-center"
                                    >
                                        Belum ada UMKM yang dilayani.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-lg font-semibold mb-2">
                    Jumlah Pelayanan UMKM per Tahun
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {rekapPelayanan.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded p-4 shadow"
                        >
                            <p className="font-semibold">{item.nama}</p>
                            <p>{item.total} kali pelayanan</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-8">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">
                        Jumlah UMKM per Wilayah
                    </h2>
                    <select
                        value={filterWilayah}
                        onChange={(e) => setFilterWilayah(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                    >
                        <option value="kecamatan">Per Kecamatan</option>
                        <option value="kabupaten">Per Kabupaten</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {rekapWilayah
                        .filter((item) => item.nama !== null)
                        .map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded p-4 shadow"
                            >
                                <p className="font-semibold">{item.nama}</p>
                                <p>{item.total} UMKM</p>
                            </div>
                        ))}
                </div>
            </section>
        </Layout>
    );
};

const StatCard = ({ title, count }: { title: string; count: number }) => (
    <div className="bg-white rounded shadow p-4">
        <h3 className="text-sm font-semibold mb-1 text-gray-600">{title}</h3>
        <p className="text-xl font-bold text-green-600">{count}</p>
    </div>
);

export default AdminDashboard;
