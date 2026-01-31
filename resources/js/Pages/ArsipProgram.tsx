import React from "react";
import { Head, Link } from "@inertiajs/react";
import Header from "@/Components/HeaderHU";
import Footer from "@/Components/FooterHU";
import Pagination from "@/Components/Pagination";
import { User, ChevronRight, Home as HomeIcon, ArrowRight } from "lucide-react";

interface Program {
    id_program: number;
    judul: string;
    slug: string;
    excerpt: string;
    image: string;
    is_open: boolean;
    penulis: string;
    status: "active" | "upcoming"; // Tambahkan status di sini
}

interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface ArsipProgramProps {
    programs: PaginatedData<Program>;
}

export default function ArsipProgram({ programs }: ArsipProgramProps) {
    const getImagePath = (path: string) => {
        return path?.startsWith("/storage/") ? path : `/storage/${path}`;
    };

    return (
        <>
            <Head title="Arsip Program PLUT" />
            <Header />

            <main className="bg-gray-50 py-10 md:py-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Link
                            href="/"
                            className="hover:text-green-600 flex items-center transition-colors"
                        >
                            <HomeIcon className="w-4 h-4 mr-1" /> Beranda
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                        <span className="text-gray-900 font-medium">
                            Arsip Program
                        </span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">
                        Program Unggulan
                    </h1>

                    {/* Daftar Program */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programs.data.length > 0 ? (
                            programs.data.map((item) => (
                                <div
                                    key={item.id_program}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col"
                                >
                                    {/* Gambar Program */}
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src={getImagePath(item.image)}
                                            alt={item.judul}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* BADGE STATUS DINAMIS */}
                                        <div className="absolute top-4 left-4 z-10">
                                            {item.status === "active" ? (
                                                <div className="bg-green-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 border border-white/20">
                                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                                    AKTIF
                                                </div>
                                            ) : (
                                                <div className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 border border-white/20">
                                                    <span className="w-1.5 h-1.5 bg-blue-200 rounded-full"></span>
                                                    SEGERA HADIR
                                                </div>
                                            )}
                                        </div>

                                        {item.is_open && (
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-green-600 text-[9px] font-black px-2 py-1 rounded shadow-md border border-green-100">
                                                PENDAFTARAN DIBUKA
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Metadata */}
                                        <div className="text-xs text-gray-500 mb-3 flex items-center">
                                            <User className="w-3.5 h-3.5 mr-1.5 text-green-600" />
                                            {item.penulis || "Admin"}
                                        </div>

                                        {/* Judul */}
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-green-700 transition-colors line-clamp-2">
                                            {item.judul}
                                        </h2>

                                        {/* Ringkasan/Excerpt */}
                                        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                                            {item.excerpt}
                                        </p>

                                        {/* Tombol Detail */}
                                        <div className="mt-auto">
                                            <Link
                                                href={route(
                                                    "program.show",
                                                    item.slug,
                                                )}
                                                className="inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 group/btn"
                                            >
                                                Pelajari Selengkapnya
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="md:col-span-3 text-center py-20 bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200">
                                <p className="text-xl text-gray-400 font-medium">
                                    Belum ada program yang tersedia saat ini.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {programs.data.length > 0 && (
                        <div className="mt-12">
                            <Pagination links={programs.links} />
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
