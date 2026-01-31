import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    User,
    CheckCircle2,
    Home as HomeIcon,
    ChevronRight,
} from "lucide-react";
import Header from "@/Components/HeaderHU";
import Footer from "@/Components/FooterHU";

interface Props {
    program: {
        judul: string;
        deskripsi: string;
        image: string;
        is_open: boolean;
        penulis: string;
        status: "active" | "upcoming";
    };
    programLain: any[];
}

export default function DetailProgram({ program, programLain }: Props) {
    const getImagePath = (path: string) => {
        return path?.startsWith("/storage/") ? path : `/storage/${path}`;
    };

    return (
        <div className="bg-white min-h-screen">
            <Head title={program.judul} />
            <Header />

            {/* Hero Image Section */}
            <div className="relative h-[400px] md:h-[500px] w-full bg-slate-900 overflow-hidden">
                <img
                    src={getImagePath(program.image)}
                    className="w-full h-full object-cover opacity-60"
                    alt={program.judul}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

                <div className="absolute inset-0 flex items-end pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        {/* Breadcrumb */}
                        <div className="flex items-center text-sm text-white/60 mb-6 font-medium">
                            <Link
                                href="/"
                                className="hover:text-white flex items-center transition-colors"
                            >
                                <HomeIcon className="w-4 h-4 mr-1" /> Beranda
                            </Link>
                            <ChevronRight className="w-4 h-4 mx-2" />
                            <Link
                                href="/program"
                                className="hover:text-white transition-colors"
                            >
                                Program
                            </Link>
                        </div>

                        <h1 className="text-3xl md:text-6xl font-black text-white max-w-4xl leading-tight">
                            {program.judul}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Side: Konten */}
                    <div className="lg:col-span-2">
                        <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold border border-green-100">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                        Diterbitkan Oleh
                                    </p>
                                    <p className="text-sm font-bold text-slate-700">
                                        {program.penulis || "Admin PLUT"}
                                    </p>
                                </div>
                            </div>

                            {/* Status Badges */}
                            <div className="flex gap-3">
                                {program.status === "active" ? (
                                    <div className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black shadow-lg shadow-green-100">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        PROGRAM AKTIF
                                    </div>
                                ) : (
                                    <div className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black shadow-lg shadow-blue-100">
                                        <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                                        SEGERA HADIR
                                    </div>
                                )}

                                {program.is_open && (
                                    <div className="bg-amber-50 text-amber-700 border border-amber-100 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold">
                                        <CheckCircle2 className="w-4 h-4" />{" "}
                                        PENDAFTARAN DIBUKA
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Konten Utama */}
                        <article className="prose prose-slate prose-lg max-w-none">
                            <div
                                className="text-slate-600 leading-relaxed whitespace-pre-line text-lg"
                                dangerouslySetInnerHTML={{
                                    __html: program.deskripsi,
                                }}
                            />
                        </article>

                        <div className="mt-12">
                            <Link
                                href="/program"
                                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-bold transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" /> KEMBALI KE
                                DAFTAR PROGRAM
                            </Link>
                        </div>
                    </div>

                    {/* Right Side: Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-10">
                            {/* Program Lainnya */}
                            <div>
                                <h4 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-2">
                                    PROGRAM{" "}
                                    <span className="text-green-600">
                                        LAINNYA
                                    </span>
                                </h4>
                                <div className="space-y-6">
                                    {programLain.map((item: any) => (
                                        <Link
                                            key={item.slug}
                                            href={`/program/${item.slug}`}
                                            className="group flex gap-4 items-start"
                                        >
                                            <div className="w-24 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-100 shadow-sm">
                                                <img
                                                    src={getImagePath(
                                                        item.image,
                                                    )}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    alt={item.judul}
                                                />
                                            </div>
                                            <div className="pt-1">
                                                <h5 className="text-sm font-bold text-slate-800 group-hover:text-green-600 transition-colors line-clamp-2 leading-snug">
                                                    {item.judul}
                                                </h5>
                                                <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-tighter">
                                                    PELAJARI PROGRAM
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Call to Action Box */}
                            <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                                <div className="relative z-10">
                                    <h4 className="text-2xl font-bold mb-3">
                                        Butuh Bantuan?
                                    </h4>
                                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                        Konsultasikan usaha Anda dengan tenaga
                                        ahli kami secara gratis dan tingkatkan
                                        skala bisnis Anda.
                                    </p>
                                    <a
                                        href="https://wa.me/62xxxxxxxxxx"
                                        target="_blank"
                                        className="block w-full py-4 bg-green-600 rounded-2xl font-black text-sm text-center hover:bg-green-500 transition-all shadow-lg shadow-green-900/20"
                                    >
                                        HUBUNGI KAMI
                                    </a>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-600/20 rounded-full blur-3xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
