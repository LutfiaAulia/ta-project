import React, { useState } from "react";
import { Link } from "@inertiajs/react";

import {
    Search,
    MapPin,
    Phone,
    Instagram,
    MessageCircle,
    ArrowLeft,
    Share2,
} from "lucide-react";

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
}

interface UMKM {
    id: number;
    name: string;
    category: string;
    location: string;
    address: string;
    description: string;
    image: string;
    phone: string;
    instagram: string;
    whatsapp: string;
    products: Product[];
}

const ListUmkm: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUMKM, setSelectedUMKM] = useState<UMKM | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    const umkmData: UMKM[] = [
        {
            id: 1,
            name: "Kerupuk Kulit Sapi",
            category: "Makanan & Minuman",
            location: "Kabupaten Pasaman, Nagari Panti Selatan",
            address: "Jl. Raya Panti Selatan No. 123, Kabupaten Pasaman",
            description:
                "Produsen kerupuk kulit sapi berkualitas tinggi dengan cita rasa tradisional yang autentik. Dibuat dari bahan pilihan dan proses tradisional yang telah turun temurun.",
            image: "/api/placeholder/400/300",
            phone: "+62 812-3456-7890",
            instagram: "@kerupukkulitsapi_pasaman",
            whatsapp: "6281234567890",
            products: [
                {
                    id: 1,
                    name: "Kerupuk Kulit Sapi Original",
                    price: "Rp 15.000",
                    image: "/api/placeholder/200/150",
                    description:
                        "Kerupuk kulit sapi dengan rasa original yang gurih dan renyah",
                },
                {
                    id: 2,
                    name: "Kerupuk Kulit Sapi Pedas",
                    price: "Rp 17.000",
                    image: "/api/placeholder/200/150",
                    description:
                        "Kerupuk kulit sapi dengan bumbu pedas yang menggugah selera",
                },
                {
                    id: 3,
                    name: "Kerupuk Kulit Sapi Balado",
                    price: "Rp 18.000",
                    image: "/api/placeholder/200/150",
                    description:
                        "Kerupuk kulit sapi dengan cita rasa balado khas Minang",
                },
            ],
        },
        {
            id: 2,
            name: "Rendang Daging Sapi",
            category: "Makanan & Minuman",
            location: "Kota Padang, Kelurahan Padang Barat",
            address: "Jl. Sudirman No. 45, Padang Barat, Padang",
            description:
                "Rendang daging sapi autentik dengan bumbu tradisional Minangkabau. Dimasak dengan santan kelapa dan rempah-rempah pilihan.",
            image: "/api/placeholder/400/300",
            phone: "+62 811-2345-6789",
            instagram: "@rendang_authentic_padang",
            whatsapp: "6281123456789",
            products: [
                {
                    id: 4,
                    name: "Rendang Daging Sapi 250gr",
                    price: "Rp 45.000",
                    image: "/api/placeholder/200/150",
                    description: "Rendang daging sapi premium kemasan 250 gram",
                },
                {
                    id: 5,
                    name: "Rendang Daging Sapi 500gr",
                    price: "Rp 85.000",
                    image: "/api/placeholder/200/150",
                    description: "Rendang daging sapi premium kemasan 500 gram",
                },
            ],
        },
        {
            id: 3,
            name: "Kerajinan Songket",
            category: "Kerajinan",
            location: "Kabupaten Tanah Datar, Nagari Pandai Sikek",
            address: "Jl. Songket Raya No. 12, Pandai Sikek, Tanah Datar",
            description:
                "Pengrajin songket tradisional Minangkabau dengan motif dan kualitas terbaik. Dibuat dengan teknik tenun tradisional yang telah berusia ratusan tahun.",
            image: "/api/placeholder/400/300",
            phone: "+62 813-4567-8901",
            instagram: "@songket_pandaisikek",
            whatsapp: "6281345678901",
            products: [
                {
                    id: 6,
                    name: "Songket Motif Pucuk Rebung",
                    price: "Rp 850.000",
                    image: "/api/placeholder/200/150",
                    description:
                        "Songket dengan motif pucuk rebung khas Minangkabau",
                },
                {
                    id: 7,
                    name: "Songket Motif Balapak",
                    price: "Rp 950.000",
                    image: "/api/placeholder/200/150",
                    description: "Songket dengan motif balapak yang elegan",
                },
            ],
        },
    ];

    const categories = [
        "Semua",
        "Makanan & Minuman",
        "Kerajinan",
        "Fashion",
        "Jasa",
    ];

    const filteredUMKM = umkmData.filter((umkm) => {
        const matchesSearch =
            umkm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            umkm.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "Semua" || umkm.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const UMKMCard: React.FC<{ umkm: UMKM }> = ({ umkm }) => (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1">
            <div className="relative">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                        <div className="text-2xl font-bold mb-2">
                            {umkm.name}
                        </div>
                        <div className="text-sm opacity-90">
                            {umkm.category}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                        {umkm.name}
                    </h3>
                </div>

                <div className="flex items-start text-gray-600 mb-3">
                    <MapPin size={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">{umkm.location}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                        <button className="p-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors">
                            <Instagram size={16} />
                        </button>
                        <button className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors">
                            <MessageCircle size={16} />
                        </button>
                        <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                            <Phone size={16} />
                        </button>
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
                {/* Header Detail */}
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
                            <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-xl font-bold">
                                        {selectedUMKM.name}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold mb-2">
                                    {selectedUMKM.name}
                                </h1>
                                <p className="text-lg opacity-90 mb-3">
                                    {selectedUMKM.description}
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                        <MapPin size={16} className="mr-1" />
                                        <span>{selectedUMKM.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Konten Detail */}
                <div className="max-w-6xl mx-auto p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Informasi UMKM */}
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
                                            {selectedUMKM.address}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600">
                                            Telepon
                                        </label>
                                        <p className="font-medium">
                                            {selectedUMKM.phone}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600">
                                            Instagram
                                        </label>
                                        <p className="font-medium text-pink-600">
                                            {selectedUMKM.instagram}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <button className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center">
                                        <MessageCircle
                                            size={20}
                                            className="mr-2"
                                        />
                                        Chat WhatsApp
                                    </button>
                                    <button className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors flex items-center justify-center">
                                        <Instagram size={20} className="mr-2" />
                                        Follow Instagram
                                    </button>
                                    <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center">
                                        <Share2 size={20} className="mr-2" />
                                        Bagikan
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Katalog Produk */}
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
                                        <div className="h-48 bg-gradient-to-br from-orange-300 to-red-400 flex items-center justify-center">
                                            <div className="text-white text-center">
                                                <div className="text-lg font-semibold">
                                                    {product.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="font-bold text-lg mb-2">
                                                {product.name}
                                            </h4>
                                            <p className="text-gray-600 text-sm mb-3">
                                                {product.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-bold text-blue-600">
                                                    {product.price}
                                                </span>
                                                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                                                    Pesan Sekarang
                                                </button>
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
            {/* Header */}
            <header className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center">
                            <div className="bg-white/20 p-3 rounded-xl mr-4">
                                <div className="w-8 h-8 bg-white/40 rounded"></div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    UMKM Sumatera Barat
                                </h1>
                                <p className="opacity-90">
                                    Dinas Koperasi UKM Provinsi Sumatera Barat
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

                    {/* Search Bar */}
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

            {/* Categories Filter */}
            <div className="max-w-6xl mx-auto px-6 py-6">
                <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
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

            {/* UMKM Grid */}
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

            {/* Chat Button */}
            <div className="fixed bottom-6 right-6">
                <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110">
                    <MessageCircle size={24} />
                </button>
            </div>
        </div>
    );
};

export default ListUmkm;
