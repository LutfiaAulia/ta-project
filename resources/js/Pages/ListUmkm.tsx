import React, { useState, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import {
    Search,
    MapPin,
    Instagram,
    MessageCircle,
    ArrowLeft,
    Facebook,
} from "lucide-react";

type Product = {
    id: number;
    nama_produk: string;
    harga_produk: string;
    foto_produk: string;
    deskripsi_produk: string;
};
type UMKM = {
    id: number;
    nama_usaha: string;
    kategori: string;
    lokasi: string;
    alamat_detail: string;
    deskripsi: string;
    foto_usaha: string;
    no_hp: string;
    latitude: string;
    longitude: string;
    instagram: string;
    whatsapp: string;
    facebook: string;
    products: Product[];
};

interface CustomPageProps extends InertiaPageProps {
    daftar_umkm: UMKM[];
    kategori_umkm: string[];
}

const ListUmkm: React.FC = () => {
    const page = usePage<CustomPageProps>();
    const { daftar_umkm = [], kategori_umkm = [] } = page.props;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUMKM, setSelectedUMKM] = useState<UMKM | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const scrollRef = useRef<HTMLDivElement>(null);

    const filteredUMKM = daftar_umkm.filter((umkm) => {
        const matchesSearch =
            umkm.nama_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
            umkm.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "Semua" ||
            umkm.kategori.includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    const handleWheel = (e: React.WheelEvent) => {
        if (scrollRef.current) {
            e.preventDefault();
            scrollRef.current.scrollLeft += e.deltaY;
        }
    };

    const UMKMCard: React.FC<{ umkm: UMKM }> = ({ umkm }) => (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1">
            <div className="relative h-48">
                <img
                    src={`/storage/${umkm.foto_usaha}`}
                    alt={umkm.nama_usaha}
                    className="h-48 w-full object-cover rounded-t-2xl"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent rounded-t-2xl flex items-end p-4">
                    <div className="text-white">
                        <div className="text-xl font-bold">
                            {umkm.nama_usaha}
                        </div>
                        <div className="text-sm opacity-90">
                            {umkm.kategori}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                        {umkm.nama_usaha}
                    </h3>
                </div>

                <div className="flex items-start text-gray-600 mb-3">
                    <MapPin size={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">{umkm.lokasi}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                        <a
                            href={umkm.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors inline-flex items-center justify-center"
                        >
                            <Instagram size={16} />
                        </a>

                        <a
                            href={umkm.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors inline-flex items-center justify-center"
                        >
                            <MessageCircle size={16} />
                        </a>

                        <a
                            href={umkm.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors inline-flex items-center justify-center"
                        >
                            <Facebook size={16} />
                        </a>
                    </div>
                    <button
                        onClick={() => setSelectedUMKM(umkm)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                    >
                        Lihat Detail
                    </button>
                </div>
            </div>
        </div>
    );

    if (selectedUMKM) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6">
                    <div className="max-w-6xl mx-auto">
                        <button
                            onClick={() => setSelectedUMKM(null)}
                            className="flex items-center text-white hover:text-gray-200 mb-4"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Kembali ke Daftar UMKM
                        </button>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-200">
                                <img
                                    src={`/storage/${selectedUMKM.foto_usaha}`}
                                    alt={selectedUMKM.nama_usaha}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <h1 className="text-3xl font-bold mb-2">
                                    {selectedUMKM.nama_usaha}
                                </h1>
                                <p className="text-lg opacity-90 mb-3">
                                    {selectedUMKM.deskripsi}
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                        <MapPin size={16} className="mr-1" />
                                        <span>{selectedUMKM.lokasi}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                                <h3 className="font-bold text-xl mb-4 text-gray-800">
                                    Informasi Kontak
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-600">
                                            Alamat
                                        </label>
                                        <p className="font-medium">
                                            {selectedUMKM.alamat_detail}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600">
                                            Telepon
                                        </label>
                                        <p className="font-medium">
                                            {selectedUMKM.no_hp}
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600 font-semibold mb-1">
                                            Lokasi
                                        </label>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${selectedUMKM.latitude},${selectedUMKM.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            Lihat di Google Maps
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <a
                                        href={selectedUMKM.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center relative z-20"
                                    >
                                        <MessageCircle
                                            size={20}
                                            className="mr-2"
                                        />
                                        Chat WhatsApp
                                    </a>

                                    <a
                                        href={selectedUMKM.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors flex items-center justify-center"
                                    >
                                        <Instagram size={20} className="mr-2" />
                                        Follow Instagram
                                    </a>

                                    <a
                                        href={selectedUMKM.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
                                    >
                                        <Facebook size={20} className="mr-2" />
                                        Follow Facebook
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <h3 className="font-bold text-2xl mb-6 text-gray-800">
                                Katalog Produk
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {selectedUMKM.products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                    >
                                        <div className="h-48 overflow-hidden rounded-t-2xl bg-gray-100">
                                            <img
                                                src={`/storage/${product.foto_produk}`}
                                                alt={product.nama_produk}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="p-6">
                                            <h4 className="font-bold text-lg mb-2">
                                                {product.nama_produk}
                                            </h4>
                                            <p className="text-gray-600 text-sm mb-3">
                                                {product.deskripsi_produk}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-bold text-blue-600">
                                                    {new Intl.NumberFormat(
                                                        "id-ID",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        }
                                                    ).format(
                                                        Number(
                                                            product.harga_produk
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="w-12 h-12 object-contain mr-4"
                            />
                            <div>
                                <h1 className="text-2xl font-bold">
                                    UMKM Sumatera Barat
                                </h1>
                                <p className="opacity-90">
                                    Dinas Koperasi dan UMKM Provinsi Sumatera
                                    Barat
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/umkm/login"
                            className="bg-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                    <div className="relative max-w-2xl mx-auto">
                        <Search
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Cari UMKM atau lokasi..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-white/30"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-6">
                <div
                    ref={scrollRef}
                    onWheel={handleWheel}
                    className="overflow-x-hidden hover:overflow-x-auto hide-scrollbar"
                >
                    <div className="inline-flex gap-3 whitespace-nowrap">
                        {kategori_umkm.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                                    selectedCategory === category
                                        ? "bg-blue-500 text-white shadow-lg"
                                        : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredUMKM.map((umkm) => (
                        <UMKMCard key={umkm.id} umkm={umkm} />
                    ))}
                </div>
                {filteredUMKM.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            UMKM tidak ditemukan
                        </h3>
                        <p className="text-gray-500">
                            Coba ubah kata kunci pencarian atau filter kategori
                        </p>
                    </div>
                )}
            </div>

            <div className="fixed bottom-6 right-6">
                <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110">
                    <MessageCircle size={24} />
                </button>
            </div>
        </div>
    );
};

export default ListUmkm;
