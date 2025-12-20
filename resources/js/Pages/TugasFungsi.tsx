import React from "react";
import { Link } from "@inertiajs/react";
import Header from "@/Components/HeaderHU";
import Footer from "@/Components/FooterHU";
import {
    ChevronRight,
    Home as HomeIcon,
    Briefcase,
    ClipboardCheck,
    Settings,
    CheckCircle2,
    Info,
} from "lucide-react";

interface Props {
    tufu: {
        tugas: string;
        fungsi: string;
    } | null;
}

const HalamanTugasFungsi: React.FC<Props> = ({ tufu }) => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />

            {/* Main Content Area */}
            <main className="flex-grow pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center text-sm text-gray-500 mb-10">
                        <Link
                            href="/"
                            className="hover:text-green-600 flex items-center transition-colors"
                        >
                            <HomeIcon className="w-4 h-4 mr-1" /> Beranda
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-gray-900 font-medium">
                            {" "}
                            Tugas dan Fungsi{" "}
                        </span>
                    </div>

                    {/* Header Title */}
                    <div className="mb-12">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                            Tugas &{" "}
                            <span className="text-green-600">Fungsi</span>
                        </h1>
                        <p className="text-slate-500 max-w-2xl leading-relaxed">
                            Landasan operasional PLUT-KUMKM Provinsi Sumatera
                            Barat dalam menjalankan amanat pelayanan
                            pengembangan koperasi dan usaha mikro.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* TUGAS SECTION */}
                        <div className="lg:col-span-5">
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm h-full relative overflow-hidden group hover:border-green-200 transition-all">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
                                    <Briefcase className="w-32 h-32 text-green-900" />
                                </div>

                                <div className="flex items-center gap-3 mb-6 relative z-10">
                                    <div className="p-2.5 bg-green-100 rounded-xl">
                                        <ClipboardCheck className="w-6 h-6 text-green-700" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wide">
                                        Tugas Pokok
                                    </h2>
                                </div>

                                <div className="relative z-10">
                                    <div className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-green-500 pl-6 py-2 bg-green-50/30 rounded-r-xl">
                                        {tufu?.tugas ||
                                            "Informasi tugas pokok belum tersedia."}
                                    </div>
                                </div>

                                <div className="mt-8 flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 relative z-10">
                                    <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Tugas ini merujuk pada regulasi tata
                                        kerja Unit Pelaksana Teknis Daerah
                                        (UPTD) di lingkungan Pemerintah Provinsi
                                        Sumatera Barat.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FUNGSI SECTION */}
                        <div className="lg:col-span-7">
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-full">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2.5 bg-green-600 rounded-xl shadow-lg shadow-green-100">
                                        <Settings className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wide">
                                        Fungsi Operasional
                                    </h2>
                                </div>

                                {/* List Fungsi */}
                                <div className="text-slate-600 leading-loose whitespace-pre-line space-y-4">
                                    {tufu?.fungsi ? (
                                        <div className="grid gap-4">
                                            {tufu.fungsi.split("\n").map(
                                                (line, index) =>
                                                    line.trim() && (
                                                        <div
                                                            key={index}
                                                            className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                                                        >
                                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                            <span className="text-[16px] leading-relaxed">
                                                                {line}
                                                            </span>
                                                        </div>
                                                    )
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-slate-400 italic px-4">
                                            Informasi fungsi operasional belum
                                            tersedia.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Meta */}
                    <div className="mt-16 flex flex-col items-center">
                        <div className="h-px w-24 bg-slate-200 mb-6"></div>
                        <p className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">
                            PLUT-KUMKM Provinsi Sumatera Barat
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HalamanTugasFungsi;
