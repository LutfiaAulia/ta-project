import React from "react";
import Layout from "@/Components/Layout";
import { Head, Link } from "@inertiajs/react";

interface Program {
    id_program: number;
    judul: string;
    deskripsi: string;
    excerpt: string;
    image: string | null;
    status: "active" | "upcoming" | "inactive";
    is_open: boolean;
    id_pegawai: number;
}

interface Props {
    program: Program;
}

const LihatProgram = ({ program }: Props) => {
    // Helper
    const getStatusColor = (status: string) => {
        switch (status) {
            case "active": return "bg-green-100 text-green-700 border-green-200";
            case "upcoming": return "bg-blue-100 text-blue-700 border-blue-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <Layout>
            <Head title={`Program: ${program.judul}`} />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Navigasi */}
                    <div className="pt-10 mb-8 flex items-center justify-between">
                        <Link
                            href={route("admin.list.program")}
                            className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
                        >
                            <span className="mr-2">←</span> Kembali ke Daftar Program
                        </Link>
                        
                        <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(program.status)}`}>
                                {program.status.toUpperCase()}
                            </span>
                            {program.is_open ? (
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-sm">
                                    PENDAFTARAN DIBUKA
                                </span>
                            ) : (
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-200">
                                    PENDAFTARAN TUTUP
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            
                            {/* Poster */}
                            <div className="bg-gray-100 h-[400px] lg:h-full relative">
                                {program.image ? (
                                    <img
                                        src={`/storage/${program.image}`}
                                        alt={program.judul}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                                        <div className="text-5xl mb-4">🖼️</div>
                                        <p>Poster program belum tersedia</p>
                                    </div>
                                )}
                            </div>

                            {/* Detail Informasi */}
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">
                                    {program.judul}
                                </h1>
                                
                                <p className="text-lg text-indigo-600 font-medium mb-6">
                                    {program.excerpt}
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                                            Tentang Program
                                        </h3>
                                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {program.deskripsi}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase">Target</p>
                                            <p className="font-semibold text-gray-800">UMKM Terdaftar</p>
                                        </div>
                                    </div>

                                    {/* Action Box */}
                                    <div className="mt-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                                💡
                                            </div>
                                            <div>
                                                <p className="text-sm text-indigo-900 font-bold">Catatan Operasional</p>
                                                <p className="text-xs text-indigo-700 mt-1">
                                                    Gunakan informasi ini untuk sosialisasi ke UMKM di lapangan. Pastikan status pendaftaran valid sebelum mengarahkan peserta.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LihatProgram;