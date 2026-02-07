import React from "react";
import Layout from "@/Components/Layout";
import { Head, Link } from "@inertiajs/react";

interface Berita {
    id_berita: number;
    judul: string;
    slug: string;
    gambar: string | null;
    tanggal_publikasi: string;
    ringkasan: string;
    konten: string;
}

interface Props {
    berita: Berita;
}

const LihatBerita = ({ berita }: Props) => {
    return (
        <Layout>
            <Head title={berita.judul} />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Tombol Kembali & Breadcrumb */}
                    <div className="mb-8 flex items-center justify-between">
                        <Link
                            href={route("berita.list")}
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition shadow-sm bg-white px-4 py-2 rounded-full border border-gray-200"
                        >
                            &larr; Kembali ke Daftar
                        </Link>
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                            Detail Berita
                        </span>
                    </div>

                    <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        {/* Gambar Utama */}
                        <div className="relative h-64 md:h-[400px] w-full bg-gray-200">
                            {berita.gambar ? (
                                <img
                                    src={`/storage/${berita.gambar}`}
                                    alt={berita.judul}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    No Image Available
                                </div>
                            )}
                            {/* Overlay Tanggal */}
                            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-6">
                                <p className="text-white/90 text-sm font-light">
                                    Diterbitkan pada: {new Date(berita.tanggal_publikasi).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Konten Berita */}
                        <div className="p-8 md:p-12">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                                {berita.judul}
                            </h1>

                            {/* Ringkasan/Intro */}
                            <div className="border-l-4 border-green-500 pl-4 py-2 mb-8 bg-green-50/50">
                                <p className="text-lg text-gray-700 italic leading-relaxed">
                                    "{berita.ringkasan}"
                                </p>
                            </div>

                            {/* Isi Konten */}
                            <div 
                                className="prose prose-lg max-w-none text-gray-800 
                                prose-headings:text-gray-900 prose-headings:font-bold
                                prose-p:leading-relaxed prose-img:rounded-xl 
                                prose-a:text-blue-600 prose-li:marker:text-green-500"
                                dangerouslySetInnerHTML={{ __html: berita.konten }}
                            />
                        </div>
                    </article>
                </div>
            </div>
        </Layout>
    );
};

export default LihatBerita;