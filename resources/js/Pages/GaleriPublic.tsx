import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Header from "@/Components/HeaderHU";
import Footer from "@/Components/FooterHU";
import { HomeIcon, ChevronRight } from "lucide-react";

interface GaleriItem {
    id_galeri: number;
    judul: string;
    tanggal: string;
    gambar: string;
    keterangan?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    galeri: {
        data: GaleriItem[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
    };
}

const GaleriPublik = ({ galeri }: Props) => {
    const [selectedImage, setSelectedImage] = useState<GaleriItem | null>(null);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Head title="Galeri Kegiatan" />

            <Header />

            <main className="flex-grow">
                {/* Breadcrumb Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link
                            href="/"
                            className="hover:text-green-600 flex items-center transition-colors"
                        >
                            <HomeIcon className="w-4 h-4 mr-1" /> Beranda
                        </Link>

                        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                        
                        <span className="text-gray-900 font-medium">
                            Galeri Kegiatan
                        </span>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-b from-gray-50 to-white py-16 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                            Galeri Kegiatan
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            Dokumentasi momen berharga dan pelayanan kami untuk
                            masyarakat.
                        </p>
                    </div>
                </div>

                {/* Grid Galeri */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Perbaikan: Mengakses galeri.data */}
                    {galeri.data && galeri.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {galeri.data.map((item) => (
                                    <div
                                        key={item.id_galeri}
                                        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                                        onClick={() => setSelectedImage(item)}
                                    >
                                        {/* Frame Foto */}
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={`/storage/${item.gambar}`}
                                                alt={item.judul}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300" />
                                        </div>

                                        {/* Konten Teks */}
                                        <div className="p-6 flex-grow flex flex-col">
                                            <div className="text-sm text-blue-600 font-semibold mb-3 flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                {new Date(
                                                    item.tanggal
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                                                {item.judul}
                                            </h3>
                                            {item.keterangan && (
                                                <p className="text-gray-500 text-sm line-clamp-3 font-normal leading-relaxed">
                                                    {item.keterangan}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Navigasi */}
                            <div className="mt-16 flex justify-center items-center gap-2">
                                {galeri.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            link.active
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-400 hover:text-blue-600"
                                        } ${
                                            !link.url
                                                ? "opacity-30 cursor-not-allowed hidden"
                                                : ""
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <svg
                                className="mx-auto h-16 w-16 text-gray-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <p className="mt-4 text-gray-500 text-xl font-medium">
                                Belum ada dokumentasi foto saat ini.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-all duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div
                        className="max-w-6xl w-full animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()} // Supaya klik gambar tidak nutup modal
                    >
                        <img
                            src={`/storage/${selectedImage.gambar}`}
                            alt={selectedImage.judul}
                            className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-2xl mx-auto"
                        />
                        <div className="mt-6 text-center max-w-3xl mx-auto">
                            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-widest">
                                {new Date(
                                    selectedImage.tanggal
                                ).toLocaleDateString("id-ID", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {selectedImage.judul}
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                {selectedImage.keterangan}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default GaleriPublik;
