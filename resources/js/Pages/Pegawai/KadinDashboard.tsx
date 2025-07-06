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
    FileText,
    CheckCircle,
    Clock,
    AlertCircle,
    Mail,
    User,
    Calendar,
    BookOpen,
} from "lucide-react";

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

export default function KepalaDinasDashboard({
    stats,
    recentLaporan,
    recentSurat,
    year,
    bookingStatus,
    umkmPerKabupaten,
    umkmPerBooking,
    bookingPerTahun,
    layananPopuler,
    bookingTrend,
}: PageProps) {
    const getStatusIcon = (status: string) => {
        return status === "Sudah" ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
            <Clock className="w-4 h-4 text-yellow-600" />
        );
    };

    const getStatusBadgeClass = (status: string) => {
        return status === "Sudah"
            ? "bg-green-100 text-green-800 border-green-200"
            : "bg-yellow-100 text-yellow-800 border-yellow-200";
    };

    const handleYearChange = (selectedYear: string) => {
        router.get("/pegawai/dashboardKadin", { year: selectedYear });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
                <div className="pt-20 p-6 space-y-8">
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
                    {/* Statistik */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <BookOpen className="w-6 h-6 text-purple-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.laporan_selesai}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Laporan Selesai
                            </h3>
                            <p className="text-sm text-gray-500">
                                Total laporan yang telah diselesaikan
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <Mail className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.total_surat_masuk}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Total Surat Masuk
                            </h3>
                            <p className="text-sm text-gray-500">
                                Semua surat yang diterima
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    <CheckCircle className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.surat_sudah_disposisi}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Surat Sudah Disposisi
                            </h3>
                            <p className="text-sm text-gray-500">
                                Surat telah didisposisikan
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-red-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-red-100 rounded-full">
                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.surat_belum_disposisi}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Surat Belum Disposisi
                            </h3>
                            <p className="text-sm text-gray-500">
                                Menunggu disposisi
                            </p>
                        </div>
                    </div>

                    {/* Alert surat belum disposisi */}
                    {stats.surat_belum_disposisi > 0 && (
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 p-6 rounded-2xl shadow-md">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-red-100 rounded-full">
                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-red-800 font-bold text-lg">
                                        Perhatian!
                                    </h3>
                                    <p className="text-red-700">
                                        Ada{" "}
                                        <span className="font-bold">
                                            {stats.surat_belum_disposisi}
                                        </span>{" "}
                                        surat yang belum didisposisi dan perlu
                                        segera ditindaklanjuti.
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
                </div>

                {/* Laporan Booking Terbaru*/}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <BookOpen className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Laporan Booking Terbaru
                            </h2>
                            <p className="text-gray-600">
                                Daftar laporan booking yang baru diselesaikan
                            </p>
                        </div>
                    </div>

                    {recentLaporan.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <BookOpen className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Belum ada laporan booking
                            </h3>
                            <p className="text-gray-500">
                                Laporan booking terbaru akan muncul di sini
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentLaporan.slice(0, 3).map((laporan) => (
                                <div
                                    key={laporan.id}
                                    className="group bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-200 hover:shadow-md"
                                >
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <BookOpen className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">
                                                {laporan.judul}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="space-y-2 ml-11">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                <span className="font-medium">
                                                    Tanggal:
                                                </span>{" "}
                                                {laporan.tanggal}
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <User className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                <span className="font-medium">
                                                    Penulis:
                                                </span>{" "}
                                                {laporan.nama_penulis}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Surat Masuk Terbaru */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Surat Masuk Terbaru
                            </h2>
                            <p className="text-gray-600">
                                Daftar surat masuk yang baru diterima
                            </p>
                        </div>
                    </div>

                    {recentSurat.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Mail className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Belum ada surat masuk
                            </h3>
                            <p className="text-gray-500">
                                Surat masuk terbaru akan muncul di sini
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentSurat.slice(0, 3).map((surat) => (
                                <div
                                    key={surat.id}
                                    className="group bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-200 hover:shadow-md"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <FileText className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900">
                                                        {surat.nomor}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="space-y-2 ml-11">
                                                <div className="flex items-start space-x-2">
                                                    <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-600">
                                                            Perihal:
                                                        </span>
                                                        <p className="text-sm text-gray-800">
                                                            {surat.perihal}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <User className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm text-gray-600">
                                                        <span className="font-medium">
                                                            Dari:
                                                        </span>{" "}
                                                        {surat.dari}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 ml-11 md:ml-0">
                                            {getStatusIcon(
                                                surat.status_disposisi
                                            )}
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                                                    surat.status_disposisi
                                                )}`}
                                            >
                                                {surat.status_disposisi ===
                                                "Sudah"
                                                    ? "Sudah Didisposisi"
                                                    : "Belum Didisposisi"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
