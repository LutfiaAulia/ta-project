import React, { useState, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import Chatbot from "@/Components/Chatbot";
import {
    Search,
    MapPin,
    Instagram,
    MessageCircle,
    ArrowLeft,
    Facebook,
    Globe,
    ShoppingBag,
    Phone,
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

    React.useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            const onWheel = (e: WheelEvent) => {
                if (el.scrollWidth > el.clientWidth) {
                    e.preventDefault();
                    el.scrollLeft += e.deltaY;
                }
            };
            el.addEventListener("wheel", onWheel, { passive: false });
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, [selectedUMKM]);

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
            const scrollAmount = e.deltaY || e.deltaX;
            const canScroll =
                scrollRef.current.scrollWidth > scrollRef.current.clientWidth;

            if (canScroll) {
                if (e.cancelable) e.preventDefault();
                e.stopPropagation();

                scrollRef.current.scrollLeft += scrollAmount;
            }
        }
    };

    // --- Sub-Component: UMKM Card ---
    const UMKMCard: React.FC<{ umkm: UMKM }> = ({ umkm }) => (
        <div
            onClick={() => setSelectedUMKM(umkm)}
            className="bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
        >
            <div className="relative h-60 overflow-hidden">
                <img
                    src={`/storage/${umkm.foto_usaha}`}
                    alt={umkm.nama_usaha}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-[#88AA44] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        {umkm.kategori}
                    </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#005577]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-white text-sm line-clamp-2 font-medium">
                        {umkm.deskripsi}
                    </p>
                </div>
            </div>

            <div className="p-6">
                <h3 className="font-bold text-xl text-[#005577] mb-2 group-hover:text-[#88AA44] transition-colors leading-tight">
                    {umkm.nama_usaha}
                </h3>

                <div className="flex items-center text-gray-500 mb-5">
                    <MapPin size={14} className="mr-1 text-[#999933]" />
                    <span className="text-xs font-semibold tracking-wide uppercase italic">
                        {umkm.lokasi}
                    </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 border-2 border-white">
                            <Instagram size={14} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 border-2 border-white">
                            <MessageCircle size={14} />
                        </div>
                    </div>
                    <span className="text-[#005577] font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                        Detail Katalog{" "}
                        <ShoppingBag size={16} className="ml-2" />
                    </span>
                </div>
            </div>
        </div>
    );

    // --- View: Detail UMKM ---
    if (selectedUMKM) {
        return (
            <div className="min-h-screen bg-[#F8FAFC]">
                <div className="relative h-[45vh] min-h-[350px] bg-[#005577] overflow-hidden">
                    <div className="absolute inset-0 opacity-40">
                        <img
                            src={`/storage/${selectedUMKM.foto_usaha}`}
                            className="w-full h-full object-cover blur-sm scale-110"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#005577]/60 to-[#005577]"></div>

                    <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-between py-10">
                        <button
                            onClick={() => setSelectedUMKM(null)}
                            className="flex items-center text-white/90 hover:text-white transition-colors w-fit group"
                        >
                            <div className="bg-white/10 p-2 rounded-full mr-3 group-hover:bg-white/20 transition-all">
                                <ArrowLeft size={20} />
                            </div>
                            <span className="font-bold tracking-wide">
                                KEMBALI KE DAFTAR
                            </span>
                        </button>

                        <div className="flex flex-col md:flex-row items-end gap-8 mb-4">
                            <div className="w-36 h-36 md:w-52 md:h-52 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl shrink-0">
                                <img
                                    src={`/storage/${selectedUMKM.foto_usaha}`}
                                    alt={selectedUMKM.nama_usaha}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 pb-4">
                                <span className="bg-[#88AA44] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-lg">
                                    {selectedUMKM.kategori}
                                </span>
                                <h1 className="text-4xl md:text-6xl font-black text-white mt-4 mb-2 drop-shadow-lg leading-tight">
                                    {selectedUMKM.nama_usaha}
                                </h1>
                                <p className="text-white/90 flex items-center font-bold text-lg">
                                    <MapPin
                                        size={20}
                                        className="mr-2 text-[#999933]"
                                    />
                                    {selectedUMKM.lokasi}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto p-6 -mt-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Sidebar Info */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100">
                                <h3 className="font-black text-[#005577] text-xl mb-6 flex items-center">
                                    <span className="w-2.5 h-8 bg-[#88AA44] rounded-full mr-4"></span>
                                    INFO KONTAK
                                </h3>

                                <div className="space-y-5">
                                    <div className="flex items-start p-4 bg-gray-50 rounded-2xl">
                                        <div className="bg-[#999933]/10 p-2.5 rounded-xl mr-4 text-[#999933]">
                                            <MapPin size={22} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1">
                                                Alamat Lengkap
                                            </p>
                                            <p className="text-sm font-bold text-gray-700 leading-snug">
                                                {selectedUMKM.alamat_detail}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start p-4 bg-gray-50 rounded-2xl">
                                        <div className="bg-[#005577]/10 p-2.5 rounded-xl mr-4 text-[#005577]">
                                            <Phone size={22} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1">
                                                Telepon/WA
                                            </p>
                                            <p className="text-sm font-bold text-gray-700">
                                                {selectedUMKM.no_hp}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 space-y-3">
                                    <a
                                        href={selectedUMKM.whatsapp}
                                        target="_blank"
                                        className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-2xl font-black hover:scale-[1.03] transition-transform shadow-xl shadow-green-100 tracking-wide"
                                    >
                                        <MessageCircle size={20} /> CHAT
                                        WHATSAPP
                                    </a>
                                    <div className="grid grid-cols-2 gap-3">
                                        <a
                                            href={selectedUMKM.instagram}
                                            target="_blank"
                                            className="flex items-center justify-center gap-2 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white py-3.5 rounded-2xl font-bold text-xs tracking-wider"
                                        >
                                            <Instagram size={18} /> INSTAGRAM
                                        </a>
                                        <a
                                            href={selectedUMKM.facebook}
                                            target="_blank"
                                            className="flex items-center justify-center gap-2 bg-[#1877F2] text-white py-3.5 rounded-2xl font-bold text-xs tracking-wider"
                                        >
                                            <Facebook size={18} /> FACEBOOK
                                        </a>
                                    </div>
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedUMKM.latitude},${selectedUMKM.longitude}`}
                                        target="_blank"
                                        className="flex items-center justify-center gap-3 w-full bg-white border-2 border-[#005577] text-[#005577] py-3.5 rounded-2xl font-black text-xs hover:bg-[#005577] hover:text-white transition-all tracking-widest mt-2"
                                    >
                                        <Globe size={18} /> LIHAT LOKASI MAPS
                                    </a>
                                </div>
                            </div>

                            <div className="bg-[#88AA44] rounded-[2.5rem] p-8 text-white shadow-lg shadow-[#88AA44]/20">
                                <h4 className="font-black text-lg mb-3 tracking-wide">
                                    TENTANG USAHA
                                </h4>
                                <p className="text-white/90 text-sm leading-relaxed italic">
                                    "{selectedUMKM.deskripsi}"
                                </p>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-8 pt-16">
                                <h3 className="font-black text-3xl text-[#005577] tracking-tight">
                                    Katalog Produk
                                </h3>
                                <div className="h-1 flex-1 mx-6 bg-gray-100 rounded-full hidden md:block"></div>
                                <span className="bg-[#005577]/10 text-[#005577] px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                    {selectedUMKM.products.length} Items
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {selectedUMKM.products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-[2rem] shadow-md border border-gray-50 overflow-hidden group hover:shadow-2xl transition-all duration-500"
                                    >
                                        <div className="h-56 overflow-hidden relative">
                                            <img
                                                src={`/storage/${product.foto_produk}`}
                                                alt={product.nama_produk}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute bottom-0 right-0 bg-white px-5 py-2.5 rounded-tl-[1.5rem] font-black text-lg text-[#005577] shadow-sm">
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        maximumFractionDigits: 0,
                                                    },
                                                ).format(
                                                    Number(
                                                        product.harga_produk,
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-7">
                                            <h4 className="font-black text-xl text-[#005577] mb-3 group-hover:text-[#88AA44] transition-colors">
                                                {product.nama_produk}
                                            </h4>
                                            <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                                                {product.deskripsi_produk}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {product.legalitas_produk?.map(
                                                    (leg) => (
                                                        <span
                                                            key={leg.id_legpro}
                                                            className="bg-[#88AA44]/10 text-[#88AA44] text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider"
                                                        >
                                                            {leg.singkatan}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Chatbot />
            </div>
        );
    }

    // --- View: Main List ---
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-[#005577] relative overflow-hidden">
                {/* Decorative Shapes based on Logo Stars */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#88AA44]/15 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#999933]/10 rounded-full -ml-32 -mb-32 blur-[100px]"></div>

                <div className="max-w-6xl mx-auto px-6 py-16 relative z-10 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
                        <Link href={route("home")} className="group">
                            <div className="flex items-center">
                                <div className="bg-white p-3 rounded-[1.5rem] shadow-2xl group-hover:rotate-3 transition-all duration-300">
                                    <img
                                        src="/logo plut.png"
                                        alt="Logo"
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>
                                <div className="ml-6 text-left">
                                    <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
                                        E-KATALOG UMKM
                                    </h1>
                                    <p className="text-[#88AA44] font-black text-sm tracking-[0.3em] uppercase mt-2">
                                        Sumatera Barat
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <Link
                            href="/umkm/form/login"
                            className="bg-[#88AA44] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#779933] transition-all shadow-xl shadow-[#88AA44]/30 active:scale-95 tracking-widest text-sm"
                        >
                            LOGIN USAHA
                        </Link>
                    </div>

                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                            <Search className="text-[#005577]" size={28} />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari produk unggulan, nama toko, atau lokasi..."
                            className="w-full pl-20 pr-8 py-7 rounded-[2.5rem] text-gray-800 text-xl border-none focus:ring-8 focus:ring-[#88AA44]/30 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all placeholder:text-gray-300 font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            {/* Category Filter - Sticky & Isolated Scroll */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-md">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div
                        ref={scrollRef}
                        onWheel={handleWheel}
                        style={{ overscrollBehaviorX: "contain" }}
                        className="overflow-x-auto hide-scrollbar flex gap-4 items-center py-2 cursor-grab active:cursor-grabbing"
                    >
                        <button
                            onClick={() => setSelectedCategory("Semua")}
                            className={`px-8 py-3 rounded-2xl font-black text-[10px] tracking-[0.2em] transition-all whitespace-nowrap uppercase border-2 ${
                                selectedCategory === "Semua"
                                    ? "bg-[#005577] border-[#005577] text-white shadow-lg"
                                    : "bg-white border-gray-100 text-gray-400 hover:border-[#88AA44]"
                            }`}
                        >
                            SEMUA SEKTOR
                        </button>
                        {kategori_umkm.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-8 py-3 rounded-2xl font-black text-[10px] tracking-[0.2em] transition-all whitespace-nowrap uppercase border-2 ${
                                    selectedCategory === category
                                        ? "bg-[#005577] border-[#005577] text-white shadow-lg"
                                        : "bg-white border-gray-100 text-gray-400 hover:border-[#88AA44]"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <main className="max-w-6xl mx-auto px-6 py-20">
                {filteredUMKM.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filteredUMKM.map((umkm) => (
                            <UMKMCard key={umkm.id} umkm={umkm} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-gray-50 rounded-[4rem] border-4 border-dashed border-gray-100">
                        <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-inner mb-8">
                            <Search size={40} className="text-gray-200" />
                        </div>
                        <h3 className="text-3xl font-black text-[#005577] mb-3 tracking-tight">
                            Tidak Ada Hasil
                        </h3>
                        <p className="text-gray-400 font-bold max-w-sm mx-auto leading-relaxed uppercase text-xs tracking-widest">
                            Coba ubah kata kunci pencarian atau ganti kategori
                            sektor usaha.
                        </p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-[#005577] py-16 text-center text-white/50 border-t-8 border-[#88AA44]">
                <div className="max-w-6xl mx-auto px-6">
                    <img
                        src="/logo plut.png"
                        alt="Logo"
                        className="w-12 h-12 mx-auto mb-6 brightness-0 invert opacity-40"
                    />
                    <p className="text-xs font-black tracking-[0.4em] uppercase mb-4">
                        PLUT KUMKM PROVINSI SUMATERA BARAT
                    </p>
                    <div className="flex justify-center gap-6 mb-8">
                        <Instagram
                            size={18}
                            className="hover:text-white cursor-pointer transition-colors"
                        />
                        <Facebook
                            size={18}
                            className="hover:text-white cursor-pointer transition-colors"
                        />
                        <Globe
                            size={18}
                            className="hover:text-white cursor-pointer transition-colors"
                        />
                    </div>
                    <p className="text-[10px] font-medium max-w-md mx-auto leading-loose">
                        Sistem informasi katalog produk UMKM binaan PLUT-KUMKM.{" "}
                        <br />
                        Mendampingi UMKM, Memajukan Ekonomi Bangsa.
                    </p>
                </div>
            </footer>

            <Chatbot />
        </div>
    );
};

export default ListUmkm;
