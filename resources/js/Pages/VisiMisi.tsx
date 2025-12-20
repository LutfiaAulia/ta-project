import React from "react";
import { Link } from "@inertiajs/react";
import Header from "@/Components/HeaderHU";
import Footer from "@/Components/FooterHU";
import {
    ChevronRight,
    Home as HomeIcon,
    Target,
    Rocket,
    ShieldCheck,
    Star,
} from "lucide-react";

interface Props {
    vimi: {
        visi: string;
        misi: string;
    } | null;
}

const HalamanVisiMisi: React.FC<Props> = ({ vimi }) => {
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
                            Visi dan Misi{" "}
                        </span>
                    </div>

                    {/* Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Sidebar/Decoration */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-green-600 rounded-3xl p-8 text-white shadow-xl shadow-green-200">
                                <h2 className="text-3xl font-black mb-4 leading-tight">
                                    Arah Juang & <br />
                                    Cita-Cita Kami.
                                </h2>
                                <p className="text-green-100 leading-relaxed opacity-90">
                                    Menjadi fondasi utama dalam setiap langkah
                                    pelayanan PLUT Sumatera Barat untuk
                                    masyarakat dan UMKM.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                                <div className="p-3 bg-amber-50 rounded-xl">
                                    <ShieldCheck className="w-6 h-6 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm">
                                        Terpercaya
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                        Pelayanan yang transparan dan akuntabel.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Main Text Content */}
                        <div className="lg:col-span-8 space-y-10">
                            {/* VISI SECTION */}
                            <section className="relative group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-white rounded-2xl shadow-md group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                                        <Target className="w-8 h-8 text-green-600 group-hover:text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                        VISI
                                    </h3>
                                </div>
                                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
                                    <Star className="absolute -top-4 -right-4 w-24 h-24 text-slate-50 opacity-50" />
                                    <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium italic relative z-10">
                                        {vimi?.visi
                                            ? `"${vimi.visi}"`
                                            : "Visi belum tersedia."}
                                    </p>
                                </div>
                            </section>

                            {/* MISI SECTION */}
                            <section className="relative group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-white rounded-2xl shadow-md group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                                        <Rocket className="w-8 h-8 text-green-600 group-hover:text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                        MISI
                                    </h3>
                                </div>
                                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
                                    <div className="text-lg text-slate-600 leading-loose space-y-4 whitespace-pre-line">
                                        {vimi?.misi ||
                                            "Misi belum tersedia."}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-20 pt-8 border-t border-slate-200 flex justify-center items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                        PLUT-KUMKM PROVINSI SUMATERA BARAT
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HalamanVisiMisi;
