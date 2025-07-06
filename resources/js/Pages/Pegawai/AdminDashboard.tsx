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
    ClipboardList,
    Building2,
    Layers3,
    PackageSearch,
    Users,
    Car,
    TrendingUp,
} from "lucide-react";
interface PageProps {
    year: number;
    statistik: {
        totalBooking: number;
        totalBookingDiajukan: number;
        totalBookingDiterima: number;
        totalBookingDitolak: number;
        totalBookingSelesai: number;
        totalUMKM: number;
        totalProduk: number;
        totalMobil: number;
        totalSopir: number;
        totalLayanan: number;
    };
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
export default function DashboardAdmin({
    year,
    statistik,
    bookingStatus,
    umkmPerKabupaten,
    umkmPerBooking,
    bookingPerTahun,
    layananPopuler,
    bookingTrend,
}: PageProps) {
    const handleYearChange = (selectedYear: string) => {
        router.get("/pegawai/dashboardAdmin", { year: selectedYear });
    };

    return (
        <Layout>
            <div className="pt-20 min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Dashboard Admin
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Kelola sistem layanan UMKM Sumatera Barat
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

                <div className="p-6 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <StatCard
                            title="Total Booking"
                            value={statistik.totalBooking}
                            changeType="positive"
                            icon={<ClipboardList className="text-indigo-500" />}
                        />
                        <StatCard
                            title="UMKM Terlayani"
                            value={statistik.totalUMKM}
                            changeType="positive"
                            icon={<Building2 className="text-green-500" />}
                        />
                        <StatCard
                            title="Produk Terdaftar"
                            value={statistik.totalProduk}
                            changeType="positive"
                            icon={<PackageSearch className="text-purple-500" />}
                        />
                    </div>

                    {/* Secondary Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <StatCard
                            title="Layanan Aktif"
                            value={statistik.totalLayanan}
                            icon={<Layers3 className="text-blue-500" />}
                        />
                        <StatCard
                            title="Sopir Tersedia"
                            value={statistik.totalSopir}
                            icon={<Users className="text-green-500" />}
                        />
                        <StatCard
                            title="Armada Aktif"
                            value={statistik.totalMobil}
                            icon={<Car className="text-red-500" />}
                        />
                    </div>

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
            </div>
        </Layout>
    );
}
const StatCard = ({
    title,
    value,
    change,
    changeType,
    icon,
    variant = "default",
}: {
    title: string;
    value: number | string;
    change?: string;
    changeType?: "positive" | "negative";
    icon: React.ReactNode;
    variant?: "default" | "warning";
}) => (
    <div
        className={`rounded-2xl shadow p-6 ${
            variant === "warning"
                ? "bg-orange-50 border border-orange-200"
                : "bg-white"
        }`}
    >
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div
                    className={`p-3 rounded-2xl ${
                        variant === "warning" ? "bg-orange-100" : "bg-gray-100"
                    }`}
                >
                    {icon}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {value}
                    </p>
                    {change && (
                        <p
                            className={`text-sm mt-1 flex items-center gap-1 ${
                                changeType === "positive"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            <TrendingUp size={14} />
                            {change}
                        </p>
                    )}
                </div>
            </div>
        </div>
    </div>
);

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
