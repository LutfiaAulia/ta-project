import Layout from "@/Components/Layout";

interface Laporan {
    id: number;
    booking_id: number;
    nama_penulis: string;
    tanggal: string;
    judul: string;
}

interface Surat {
    id: number;
    nomor: string;
    perihal: string;
    dari: string;
    status_disposisi: "Sudah" | "Belum";
}

interface Stats {
    total_surat_masuk: number;
    surat_sudah_disposisi: number;
    surat_belum_disposisi: number;
    laporan_selesai: number;
}

interface PageProps {
    stats: Stats;
    recentLaporan: Laporan[];
    recentSurat: Surat[];
}

export default function KepalaDinasDashboard({
    stats,
    recentLaporan,
    recentSurat,
}: PageProps) {
    return (
        <Layout>
            <div className="p-6 space-y-8">
                <h1 className="text-2xl font-bold mb-4">
                    Dashboard Kepala Dinas
                </h1>

                {/* Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="bg-purple-100 p-4 rounded shadow text-center">
                        <p className="text-lg font-semibold">Laporan Selesai</p>
                        <p className="text-3xl font-bold">
                            {stats.laporan_selesai}
                        </p>
                    </div>
                    <div className="bg-green-100 p-4 rounded shadow text-center">
                        <p className="text-lg font-semibold">
                            Total Surat Masuk
                        </p>
                        <p className="text-3xl font-bold">
                            {stats.total_surat_masuk}
                        </p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded shadow text-center">
                        <p className="text-lg font-semibold">
                            Surat Sudah Disposisi
                        </p>
                        <p className="text-3xl font-bold">
                            {stats.surat_sudah_disposisi}
                        </p>
                    </div>
                    <div className="bg-red-100 p-4 rounded shadow text-center">
                        <p className="text-lg font-semibold">
                            Surat Belum Disposisi
                        </p>
                        <p className="text-3xl font-bold">
                            {stats.surat_belum_disposisi}
                        </p>
                    </div>
                </div>

                {/* Laporan Terbaru */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">
                        Laporan Booking Terbaru
                    </h2>
                    {recentLaporan.length === 0 ? (
                        <p className="text-gray-600">
                            Tidak ada laporan booking.
                        </p>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded shadow">
                            <table className="min-w-full text-left text-sm">
                                <thead className="border-b bg-gray-100">
                                    <tr>
                                        <th className="p-3">Tanggal</th>
                                        <th className="p-3">Penulis</th>
                                        <th className="p-3">Judul</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentLaporan.map((laporan) => (
                                        <tr>
                                            <td className="p-3">
                                                {laporan.tanggal}
                                            </td>
                                            <td className="p-3">
                                                {laporan.nama_penulis}
                                            </td>
                                            <td className="p-3">
                                                {laporan.judul}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                {/* Surat Masuk Terbaru */}
                <section>
                    <h2 className="text-xl font-semibold mt-8 mb-4">
                        Surat Masuk Terbaru
                    </h2>
                    {recentSurat.length === 0 ? (
                        <p className="text-gray-600">Tidak ada surat masuk.</p>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded shadow">
                            <table className="min-w-full text-left text-sm">
                                <thead className="border-b bg-gray-100">
                                    <tr>
                                        <th className="p-3">Nomor Surat</th>
                                        <th className="p-3">Perihal</th>
                                        <th className="p-3">Dari</th>
                                        <th className="p-3">
                                            Status Disposisi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentSurat.map((surat) => (
                                        <tr
                                            key={surat.id}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="p-3">
                                                {surat.nomor}
                                            </td>
                                            <td className="p-3">
                                                {surat.perihal}
                                            </td>
                                            <td className="p-3">
                                                {surat.dari}
                                            </td>
                                            <td
                                                className={
                                                    surat.status_disposisi ===
                                                    "Sudah"
                                                        ? "text-green-600 p-3"
                                                        : "text-yellow-600 p-3"
                                                }
                                            >
                                                {surat.status_disposisi}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </Layout>
    );
}
