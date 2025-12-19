import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Header from "@/Components/HeaderHU";
import Footer from "@/Components/FooterHU";
import {
    Maximize2,
    Users,
    Download,
    ZoomIn,
    ZoomOut,
    ChevronRight,
    HomeIcon,
    LayoutGrid,
} from "lucide-react";

interface Props {
    profilOrganisasi: {
        gambar_struktur: string | null;
        maklumat_pelayanan: string;
    } | null;
}

const HalamanStruktur: React.FC<Props> = ({ profilOrganisasi }) => {
    const [isZoomed, setIsZoomed] = useState(false);

    const imagePath = profilOrganisasi?.gambar_struktur
        ? `/storage/${profilOrganisasi.gambar_struktur}`
        : null;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            {/* Main Content Area */}
            <main className="flex-grow pt-24 pb-20">
                {/* --- BREADCRUMB SECTION --- */}
                <nav className="max-w-7xl mx-auto px-6 mb-8">
                    <ol className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                        <li className="flex items-center">
                            <Link
                                href="/"
                                className="flex items-center hover:text-blue-600 transition-colors"
                            >
                                <HomeIcon className="w-4 h-4 mr-1" />
                                Beranda
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                            <span className="ml-2">Profil</span>
                        </li>
                        <li
                            className="flex items-center text-gray-900 font-medium"
                            aria-current="page"
                        >
                            <ChevronRight className="w-4 h-4 text-slate-300 mr-2" />
                            Struktur Organisasi dan Maklumat Pelayanan
                        </li>
                    </ol>
                </nav>
                <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        Struktur{" "}
                        <span className="text-blue-600">Organisasi</span>
                    </h1>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Mengenal lebih dekat hierarki dan tata kelola unit kerja
                        PLUT Sumatera Barat.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto px-6">
                    <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
                        {/* Control Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-slate-50 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-lg shadow-blue-200 shadow-lg">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-bold text-slate-700 tracking-wide uppercase text-sm">
                                    Bagan Institusi
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {imagePath && (
                                    <a
                                        href={imagePath}
                                        download
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:text-blue-600 transition-all font-medium text-sm shadow-sm"
                                    >
                                        <Download className="w-4 h-4" />{" "}
                                        Download
                                    </a>
                                )}
                                <button
                                    onClick={() => setIsZoomed(!isZoomed)}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all shadow-sm ${
                                        isZoomed
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                                    }`}
                                >
                                    {isZoomed ? (
                                        <ZoomOut className="w-4 h-4" />
                                    ) : (
                                        <ZoomIn className="w-4 h-4" />
                                    )}
                                    {isZoomed ? "Kecilkan" : "Perbesar"}
                                </button>
                            </div>
                        </div>

                        {/* Image Viewer */}
                        <div
                            className={`relative flex justify-center items-start overflow-auto transition-all duration-300 bg-slate-200/30 ${
                                isZoomed ? "max-h-none" : "max-h-[600px]"
                            }`}
                        >
                            {imagePath ? (
                                <img
                                    src={imagePath}
                                    alt="Bagan Struktur Organisasi PLUT Sumbar"
                                    className={`transition-all duration-500 cursor-zoom-in ${
                                        isZoomed
                                            ? "w-full scale-100"
                                            : "max-w-full h-auto p-8"
                                    }`}
                                    onClick={() => setIsZoomed(!isZoomed)}
                                />
                            ) : (
                                <div className="py-40 text-center">
                                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                                        <Users className="w-10 h-10 text-slate-300" />
                                    </div>
                                    <p className="text-slate-400 font-medium">
                                        Data bagan belum tersedia.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Maklumat Section */}
                        {profilOrganisasi?.maklumat_pelayanan && (
                            <div className="p-8 bg-gradient-to-br from-slate-50 to-white border-t border-slate-100">
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <div className="flex-shrink-0 text-center md:text-left">
                                        <h3 className="text-xl font-black text-slate-900 leading-none">
                                            MAKLUMAT
                                        </h3>
                                        <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">
                                            Pelayanan
                                        </span>
                                    </div>
                                    <div className="hidden md:block w-px h-12 bg-slate-200"></div>
                                    <p className="text-slate-600 leading-relaxed italic text-center md:text-left flex-grow">
                                        "{profilOrganisasi.maklumat_pelayanan}"
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Meta Info */}
                    <div className="mt-8 flex justify-center items-center gap-4 text-slate-400 text-xs font-medium uppercase tracking-widest">
                        <span>PLUT Sumatera Barat</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>
                            Update:{" "}
                            {new Date().toLocaleDateString("id-ID", {
                                year: "numeric",
                                month: "long",
                            })}
                        </span>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HalamanStruktur;
