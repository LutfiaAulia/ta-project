import Layout from "@/Components/Layout";
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
}

export default function DashboardKabid({ stats, recentBookings }: PageProps) {
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

    const limitedRecentBookings = recentBookings.slice(0, 10);

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className=" pt-20 p-6 space-y-8">
                    
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
                                    10 booking terbaru yang masuk ke sistem
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
