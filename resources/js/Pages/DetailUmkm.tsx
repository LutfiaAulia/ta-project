import React from "react";
import { Link, usePage } from "@inertiajs/react";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import {
    MapPin,
    Instagram,
    MessageCircle,
    Facebook,
    ArrowLeft,
} from "lucide-react";

type Legalitas = {
    id_legpro: number;
    singkatan: string;
};

type Product = {
    id: number;
    nama_produk: string;
    harga_produk: string;
    foto_produk: string;
    deskripsi_produk: string;
    legalitas_produk?: Legalitas[];
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

interface DetailProps extends InertiaPageProps {
    umkm: UMKM;
}

const DetailUmkm: React.FC = () => {
    const { umkm } = usePage<DetailProps>().props;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6">
                <div className="max-w-6xl mx-auto">
                    <Link
                        href="/list/umkm/promosi"
                        className="flex items-center text-white hover:text-gray-200 mb-4"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Kembali ke Daftar UMKM
                    </Link>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-200">
                            <img
                                src={`/storage/${umkm.foto_usaha}`}
                                alt={umkm.nama_usaha}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-2">
                                {umkm.nama_usaha}
                            </h1>
                            <p className="text-lg opacity-90 mb-3">
                                {umkm.deskripsi}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <MapPin size={16} className="mr-1" />
                                    <span>{umkm.lokasi}</span>
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
                                        {umkm.alamat_detail}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">
                                        Telepon
                                    </label>
                                    <p className="font-medium">{umkm.no_hp}</p>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-600 font-semibold mb-1">
                                        Lokasi
                                    </label>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${umkm.latitude},${umkm.longitude}`}
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
                                    href={umkm.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center relative z-20"
                                >
                                    <MessageCircle size={20} className="mr-2" />
                                    Chat WhatsApp
                                </a>

                                <a
                                    href={umkm.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors flex items-center justify-center"
                                >
                                    <Instagram size={20} className="mr-2" />
                                    Follow Instagram
                                </a>

                                <a
                                    href={umkm.facebook}
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
                            {umkm.products.map((product) => (
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
                                        <div className="flex flex-col gap-2">
                                            <span className="text-2xl font-bold text-blue-600">
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }
                                                ).format(
                                                    Number(product.harga_produk)
                                                )}
                                            </span>

                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {product.legalitas_produk?.map(
                                                    (legalitas) => (
                                                        <span
                                                            key={
                                                                legalitas.id_legpro
                                                            }
                                                            className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full"
                                                        >
                                                            {
                                                                legalitas.singkatan
                                                            }
                                                        </span>
                                                    )
                                                )}
                                            </div>
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
};

export default DetailUmkm;
