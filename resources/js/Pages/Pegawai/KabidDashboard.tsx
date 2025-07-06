import { usePage, router } from "@inertiajs/react";
import Layout from "@/Components/Layout";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {
    Calendar,
    Building,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
} from "lucide-react";

interface Booking {
    id: number;
    instansi: string;
    tanggal: string;
    status: "Diajukan" | "Diterima" | "Ditolak" | "Selesai";
}

interface Stats {
    diajukan: number;
    diterima: number;
    ditolak: number;
    selesai: number;
}

interface PageProps {
    stats: Stats;
    recentBookings: Booking[];
    year: number;
    bookingStatus: Array<{
        name: string;
        value: number;
        color: string;
    }>;
    umkmPerKabupaten: Array<{
        kabupaten_kota: string;
        jumlah: number;
    }>;
    umkmPerBooking: Array<{
        tanggal: string;
        jumlah: number;
        booking: number;
    }>;
    bookingPerTahun: Array<{
        tahun: number;
        jumlah: number;
    }>;
    layananPopuler: Array<{
        layanan: string;
        jumlah: number;
    }>;
    bookingTrend: Array<{
        bulan: string;
        booking: number;
        umkm: number;
    }>;
}

export default function DashboardKabid({
    stats,
    recentBookings,
    year,
    bookingStatus,
    umkmPerKabupaten,
    umkmPerBooking,
    bookingPerTahun,
    layananPopuler,
    bookingTrend,
}: PageProps) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Diajukan":
                return <Clock className="w-4 h-4 text-yellow-600" />;
            case "Diterima":
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case "Ditolak":
                return <XCircle className="w-4 h-4 text-red-600" />;
            case "Selesai":
                return <CheckCircle className="w-4 h-4 text-blue-600" />;
            default:
                return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case "Diajukan":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Diterima":
                return "bg-green-100 text-green-800 border-green-200";
            case "Ditolak":
                return "bg-red-100 text-red-800 border-red-200";
            case "Selesai":
                return "bg-blue-100 text-blue-800 border-blue-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const handleYearChange = (selectedYear: string) => {
        router.get("/pegawai/dashboardKabid", { year: selectedYear });
    };

    const limitedRecentBookings = recentBookings.slice(0, 5);

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className=" pt-20 p-6 space-y-8">
                    {/* Header */}
                    <div className="bg-white shadow-sm border-b">
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Dashboard
                                    </h1>
                                    <p className="text-gray-600 mt-1">
                                        Kelola sistem layanan UMKM Sumatera
                                        Barat
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <select
                                        value={year}
                                        onChange={(e) =>
                                            handleYearChange(e.target.value)
                                        }
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-20"
                                    >
                                        <option value={2023}>2023</option>
                                        <option value={2024}>2024</option>
                                        <option value={2025}>2025</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Statistik Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    <Clock className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.diajukan}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Booking Diajukan
                            </h3>
                            <p className="text-sm text-gray-500">
                                Menunggu verifikasi
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.diterima}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Booking Diterima
                            </h3>
                            <p className="text-sm text-gray-500">
                                Sudah disetujui
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-red-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-red-100 rounded-full">
                                    <XCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.ditolak}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Booking Ditolak
                            </h3>
                            <p className="text-sm text-gray-500">
                                Tidak disetujui
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <CheckCircle className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.selesai}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Booking Selesai
                            </h3>
                            <p className="text-sm text-gray-500">
                                Telah diselesaikan
                            </p>
                        </div>
                    </div>

                    {/* Notifikasi */}
                    {stats.diajukan > 0 && (
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-6 rounded-2xl shadow-md">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-yellow-100 rounded-full">
                                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h3 className="text-yellow-800 font-bold text-lg">
                                        Perhatian!
                                    </h3>
                                    <p className="text-yellow-700">
                                        Ada{" "}
                                        <span className="font-bold">
                                            {stats.diajukan}
                                        </span>{" "}
                                        booking yang perlu diverifikasi segera.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Charts Row 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartSection
                            title="Status Booking"
                            subtitle={`Distribusi status booking ${year}`}
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={bookingStatus}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {bookingStatus.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartSection>

                        <ChartSection
                            title="Trend Booking & UMKM"
                            subtitle={`Perkembangan bulanan tahun ${year}`}
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={bookingTrend}>
                                    <XAxis dataKey="bulan" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="booking"
                                        stroke="#4f46e5"
                                        strokeWidth={3}
                                        name="Booking"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="umkm"
                                        stroke="#16a34a"
                                        strokeWidth={3}
                                        name="UMKM Terlayani"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartSection>
                    </div>

                    {/* Charts Row 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <ChartSection
                                title={`UMKM Terlayani per Kabupaten`}
                                subtitle={`Data tahun ${year}`}
                            >
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart
                                        data={umkmPerKabupaten}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <XAxis
                                            dataKey="kabupaten_kota"
                                            angle={0}
                                            textAnchor="middle"
                                            height={50}
                                        />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Bar
                                            dataKey="jumlah"
                                            fill="#4f46e5"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartSection>
                        </div>

                        <ChartSection
                            title="Layanan Populer"
                            subtitle={`Berdasarkan jumlah booking ${year}`}
                        >
                            <div className="space-y-3">
                                {layananPopuler.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700 truncate">
                                                    {item.layanan}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {item.jumlah}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${
                                                            (item.jumlah /
                                                                layananPopuler[0]
                                                                    .jumlah) *
                                                            100
                                                        }%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ChartSection>
                    </div>

                    {/* Charts Row 3 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartSection
                            title="Booking per Tahun"
                            subtitle="Pertumbuhan tahunan"
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={bookingPerTahun}>
                                    <XAxis dataKey="tahun" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="jumlah"
                                        fill="#dc2626"
                                        radius={[4, 4, 0, 0]}
                                        name="Jumlah Booking"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartSection>

                        <ChartSection
                            title="UMKM per Periode Booking"
                            subtitle={`Jumlah UMKM dilayani setiap booking ${year}`}
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={umkmPerBooking}>
                                    <XAxis dataKey="tanggal" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="jumlah"
                                        stroke="#16a34a"
                                        strokeWidth={3}
                                        name="UMKM Terlayani"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartSection>
                    </div>

                    {/* Daftar Booking Terbaru */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-slate-100 rounded-lg">
                                <Calendar className="w-6 h-6 text-slate-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Booking Terbaru
                                </h2>
                                <p className="text-gray-600">
                                    Booking terbaru yang masuk
                                </p>
                            </div>
                        </div>

                        {limitedRecentBookings.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Calendar className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Belum ada booking
                                </h3>
                                <p className="text-gray-500">
                                    Booking terbaru akan muncul di sini
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {limitedRecentBookings.map((booking, index) => (
                                    <div
                                        key={booking.id}
                                        className="group bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-200 hover:shadow-md"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <Building className="w-5 h-5 text-gray-500" />
                                                    <h3 className="font-bold text-lg text-gray-900">
                                                        {booking.instansi}
                                                    </h3>
                                                </div>

                                                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        Tanggal Diajukan:{" "}
                                                        {booking.tanggal}
                                                    </span>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    {getStatusIcon(
                                                        booking.status
                                                    )}
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                                                            booking.status
                                                        )}`}
                                                    >
                                                        {booking.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {recentBookings.length > 10 && (
                                    <div className="text-center pt-4 border-t border-gray-200">
                                        <p className="text-sm text-gray-500">
                                            Menampilkan 10 dari{" "}
                                            {recentBookings.length} booking
                                            terbaru
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

const ChartSection = ({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) => (
    <div className="bg-white rounded-2xl shadow p-6">
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
        </div>
        {children}
    </div>
);
