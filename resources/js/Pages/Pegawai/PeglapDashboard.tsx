import Layout from "@/Components/Layout";

interface BookingItem {
    id_booking: number;
    tanggal_mulai: string;
    acara: string;
    lokasi: string;
    status_booking: string;
    sudah_input_umkm: boolean;
    sudah_buat_laporan: boolean;
}

interface Stats {
    total_booking: number;
    total_umkm_dilayani: number;
    total_laporan: number;
}

interface PageProps {
    stats: Stats;
    bookings: BookingItem[];
}

export default function PeglapDashboard({ stats, bookings }: PageProps) {
    return (
        <Layout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard Pegawai Lapangan</h1>

                {/* Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-100 p-4 rounded shadow text-center">
                        <p>Total Booking</p>
                        <p className="text-2xl font-bold">{stats.total_booking}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded shadow text-center">
                        <p>UMKM Dilayani</p>
                        <p className="text-2xl font-bold">{stats.total_umkm_dilayani}</p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded shadow text-center">
                        <p>Laporan Dibuat</p>
                        <p className="text-2xl font-bold">{stats.total_laporan}</p>
                    </div>
                </div>

                {/* Daftar Booking */}
                <div>
                    <h2 className="text-xl font-semibold mt-8 mb-4">Booking Anda</h2>
                    <div className="space-y-4">
                        {bookings.map((b) => (
                            <div
                                key={b.id_booking}
                                className="bg-white shadow rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                            >
                                <div>
                                    <p className="font-bold">{b.acara}</p>
                                    <p className="text-sm text-gray-600">
                                        Tanggal: {b.tanggal_mulai}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Lokasi: {b.lokasi}
                                    </p>
                                    <p className="text-sm">
                                        Status: <strong>{b.status_booking}</strong>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
