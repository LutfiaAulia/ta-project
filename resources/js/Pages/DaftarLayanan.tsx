import Header from "@/Components/HeaderHU";
import Footer from "@/Components/FooterHU";
import { Head, Link } from "@inertiajs/react";
import {
    Home as HomeIcon,
    ChevronRight,
    Briefcase,
    Lightbulb,
    Target,
} from "lucide-react";

interface LayananItem {
    id_layanan: number;
    layanan: string;
    deskripsi_layanan: string;
}

interface LayananGroup {
    id_bidang: number;
    nama_bidang: string;
    layanan: LayananItem[];
}

interface DaftarLayananProps {
    layananGrouped: LayananGroup[];
}

const getBidangIcon = (nama: string) => {
    const lowerName = nama.toLowerCase();
    if (lowerName.includes("konsultasi") || lowerName.includes("bimbingan")) {
        return <Lightbulb className="w-6 h-6 mr-3 text-white" />;
    }
    if (lowerName.includes("pelatihan") || lowerName.includes("program")) {
        return <Briefcase className="w-6 h-6 mr-3 text-white" />;
    }
    return <Target className="w-6 h-6 mr-3 text-white" />;
};

export default function DaftarLayanan({ layananGrouped }: DaftarLayananProps) {
    return (
        <>
            <Head title="Daftar Layanan" />
            <Header />

            <main className="bg-gray-50 py-10 md:py-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Link
                            href="/"
                            className="hover:text-green-600 flex items-center"
                        >
                            <HomeIcon className="w-4 h-4 mr-1" /> Beranda
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-gray-900 font-medium">
                            Layanan
                        </span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
                        Layanan yang Kami Tawarkan
                    </h1>

                    {layananGrouped.length > 0 ? (
                        <div className="space-y-12">
                            {layananGrouped.map((bidang) => (
                                <section
                                    key={bidang.id_bidang}
                                    className="bg-white rounded-xl shadow-2xl p-6 md:p-10"
                                >
                                    {/* Bidang Layanan */}
                                    <div className="flex items-center bg-green-600 p-4 rounded-lg shadow-md mb-6">
                                        {getBidangIcon(bidang.nama_bidang)}
                                        <h2 className="text-2xl font-bold text-white">
                                            {bidang.nama_bidang}
                                        </h2>
                                    </div>

                                    {/* Daftar Layanan */}
                                    {bidang.layanan.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {bidang.layanan.map(
                                                (layananItem) => (
                                                    <div
                                                        key={
                                                            layananItem.id_layanan
                                                        }
                                                        className="border border-gray-200 rounded-lg p-5 hover:bg-green-50 transition-colors duration-200"
                                                    >
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                            {
                                                                layananItem.layanan
                                                            }
                                                        </h3>
                                                        <p className="text-gray-600 line-clamp-4">
                                                            {
                                                                layananItem.deskripsi_layanan
                                                            }
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-gray-600 italic px-4">
                                            Belum ada layanan yang terdaftar
                                            dalam bidang "{bidang.nama_bidang}".
                                        </p>
                                    )}
                                </section>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl shadow-lg">
                            <h2 className="text-3xl font-bold text-red-600 mb-4">
                                Data Layanan Tidak Ditemukan
                            </h2>
                            <p className="text-gray-600">
                                Saat ini tidak ada bidang layanan atau layanan
                                yang aktif.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
