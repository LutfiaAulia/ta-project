import Layout from "@/Components/Layout";
import {
    FileText,
    CheckCircle,
    Clock,
    AlertCircle,
    Mail,
    User,
    Calendar,
} from "lucide-react";

interface Surat {
    id: number;
    nomor: string;
    perihal: string;
    dari: string;
    status_disposisi: "Sudah" | "Belum";
}

interface Stats {
    total: number;
    disposisi_sudah: number;
    disposisi_belum: number;
    belum_dibuat_surat: number;
}

interface PageProps {
    stats: Stats;
    recentSurat: Surat[];
}

export default function AdmDashboard({ stats, recentSurat }: PageProps) {
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

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="pt-20 p-6 space-y-8">

                    {/* Statistik Surat */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.total}
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

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.disposisi_sudah}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Sudah Didisposisi
                            </h3>
                            <p className="text-sm text-gray-500">
                                Surat telah didisposisikan
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    <Clock className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.disposisi_belum}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Belum Didisposisi
                            </h3>
                            <p className="text-sm text-gray-500">
                                Menunggu disposisi
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-red-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-red-100 rounded-full">
                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.belum_dibuat_surat}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                Surat Masuk Booking
                            </h3>
                            <p className="text-sm text-gray-500">
                                Perlu ditambahkan kesurat masuk
                            </p>
                        </div>
                    </div>

                    {/* Alert untuk disposisi yang belum */}
                    {stats.disposisi_belum > 0 && (
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-6 rounded-2xl shadow-md">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-yellow-100 rounded-full">
                                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h3 className="text-yellow-800 font-bold text-lg">
                                        Perhatian!
                                    </h3>
                                    <p className="text-yellow-700">
                                        Ada{" "}
                                        <span className="font-bold">
                                            {stats.disposisi_belum}
                                        </span>{" "}
                                        surat yang belum didisposisi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Alert untuk booking yang belum dibuatkan surat */}
                    {stats.belum_dibuat_surat > 0 && (
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 p-6 rounded-2xl shadow-md">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-red-100 rounded-full">
                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-red-800 font-bold text-lg">
                                        Urgent!
                                    </h3>
                                    <p className="text-red-700">
                                        Ada{" "}
                                        <span className="font-bold">
                                            {stats.belum_dibuat_surat}
                                        </span>{" "}
                                        booking yang belum dibuatkan surat
                                        masuk.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

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
                                {recentSurat.map((surat, index) => (
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
                                                        <p className="text-sm text-gray-500">
                                                            ID: #{surat.id}
                                                        </p>
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
            </div>
        </Layout>
    );
}
