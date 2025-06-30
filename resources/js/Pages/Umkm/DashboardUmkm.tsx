import React from "react";
import LayoutUmkm from "@/Components/LayoutUmkm";
import { Link, usePage } from "@inertiajs/react";
import { Plus, Store, User, MapPin, FileText } from "lucide-react";

interface product {
    id: number;
    nama_produk: string;
    harga_produk: number;
    foto_produk: string;
}

interface umkm {
    nama_usaha: string;
    pemilik: string;
    nib: string;
    alamat: string;
    status: string;
}

interface PageProps {
    umkm: umkm;
    products: product[];
}

export default function DashboardUmkm({ umkm, products }: PageProps) {
    return (
        <LayoutUmkm>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="pt-12 p-6 space-y-8">
                    {/* Header with gradient background */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-2xl shadow-lg text-white">
                        <div className="flex items-center space-x-3 mb-2">
                            <Store className="w-8 h-8" />
                            <h1 className="text-3xl font-bold">
                                Dashboard UMKM
                            </h1>
                        </div>
                        <p className="text-blue-100 text-lg">
                            Selamat datang kembali,{" "}
                            <span className="font-semibold">
                                {umkm.pemilik}
                            </span>
                            !
                        </p>
                        <div className="mt-4 text-sm text-blue-100">
                            Kelola bisnis Anda dengan mudah dari sini
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Total Produk
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {products.length}
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <Store className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Status
                                    </p>
                                    <p className="text-lg font-semibold text-green-600">
                                        {umkm.status.charAt(0).toUpperCase() +
                                            umkm.status.slice(1)}
                                    </p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-full">
                                    <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        NIB
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {umkm.nib}
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <FileText className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informasi UMKM dengan design card yang lebih menarik */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Store className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Informasi UMKM
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                    <Store className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            Nama UMKM
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {umkm.nama_usaha}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                    <User className="w-5 h-5 text-green-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            Pemilik
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {umkm.pemilik}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                    <FileText className="w-5 h-5 text-purple-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            NIB
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {umkm.nib}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                    <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            Alamat
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {umkm.alamat}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Produk Section dengan design yang lebih modern */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Store className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Produk Anda
                                    </h2>
                                    <p className="text-gray-600">
                                        Kelola semua produk bisnis Anda
                                    </p>
                                </div>
                            </div>
                        </div>

                        {products.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Store className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Belum ada produk
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Mulai tambahkan produk pertama Anda untuk
                                    memulai bisnis online
                                </p>
                                <Link
                                    href="/umkm/create/produk"
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Tambah Produk Pertama
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                                    >
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={`/storage/${product.foto_produk}`}
                                                alt={product.nama_produk}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                                                {product.nama_produk}
                                            </h3>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    Rp{" "}
                                                    {product.harga_produk.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LayoutUmkm>
    );
}
