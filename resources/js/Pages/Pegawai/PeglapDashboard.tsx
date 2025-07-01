import Layout from "@/Components/Layout";
import {
    Calendar,
    MapPin,
    Users,
    FileText,
    CheckCircle,
    Clock,
    User,
    Briefcase,
} from "lucide-react";

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
    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case "selesai":
            case "completed":
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case "pending":
            case "menunggu":
                return <Clock className="w-4 h-4 text-yellow-600" />;
            default:
                return <Calendar className="w-4 h-4 text-blue-600" />;
        }
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status.toLowerCase()) {
            case "selesai":
            case "completed":
                return "bg-green-100 text-green-800 border-green-200";
            case "pending":
            case "menunggu":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            default:
                return "bg-blue-100 text-blue-800 border-blue-200";
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                <div className="pt-20 p-6 space-y-8">
                    {/* Statistik */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <Briefcase className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.total_booking}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Total Booking
                            </h3>
                            <p className="text-sm text-gray-500">
                                Seluruh booking yang ditangani
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <Users className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.total_umkm_dilayani}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                UMKM Dilayani
                            </h3>
                            <p className="text-sm text-gray-500">
                                UMKM yang telah mendapat layanan
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <FileText className="w-6 h-6 text-purple-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.total_laporan}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Laporan Dibuat
                            </h3>
                            <p className="text-sm text-gray-500">
                                Total laporan yang telah dibuat
                            </p>
                        </div>
                    </div>

                    {/* Daftar Booking */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Booking Anda
                                </h2>
                                <p className="text-gray-600">
                                    Daftar booking yang perlu Anda tangani
                                </p>
                            </div>
                        </div>

                        {bookings.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Calendar className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Belum ada booking
                                </h3>
                                <p className="text-gray-500">
                                    Booking baru akan muncul di sini
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bookings
                                    .filter(
                                        (b) =>
                                            b.status_booking.toLowerCase() !==
                                            "selesai"
                                    )
                                    .map((b) => (
                                        <div
                                            key={b.id_booking}
                                            className="group bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-200 hover:shadow-md"
                                        >
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <div className="p-2 bg-blue-100 rounded-lg">
                                                            <Briefcase className="w-5 h-5 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-lg text-gray-900">
                                                                {b.acara}
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
                                                                {
                                                                    b.tanggal_mulai
                                                                }
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center space-x-2">
                                                            <MapPin className="w-4 h-4 text-gray-500" />
                                                            <span className="text-sm text-gray-600">
                                                                <span className="font-medium">
                                                                    Lokasi:
                                                                </span>{" "}
                                                                {b.lokasi}
                                                            </span>
                                                        </div>

                                                        {/* Progress indicators */}
                                                        <div className="flex items-center space-x-4 mt-3">
                                                            <div className="flex items-center space-x-1">
                                                                {b.sudah_input_umkm ? (
                                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                                ) : (
                                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                                )}
                                                                <span
                                                                    className={`text-xs ${
                                                                        b.sudah_input_umkm
                                                                            ? "text-green-600"
                                                                            : "text-gray-500"
                                                                    }`}
                                                                >
                                                                    Input UMKM
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center space-x-1">
                                                                {b.sudah_buat_laporan ? (
                                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                                ) : (
                                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                                )}
                                                                <span
                                                                    className={`text-xs ${
                                                                        b.sudah_buat_laporan
                                                                            ? "text-green-600"
                                                                            : "text-gray-500"
                                                                    }`}
                                                                >
                                                                    Buat Laporan
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2 ml-11 md:ml-0">
                                                    {getStatusIcon(
                                                        b.status_booking
                                                    )}
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                                                            b.status_booking
                                                        )}`}
                                                    >
                                                        {b.status_booking}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
