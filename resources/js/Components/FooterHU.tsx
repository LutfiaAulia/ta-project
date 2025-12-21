import {
    MapPin,
    Phone,
    Mail,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    ArrowUpRight,
} from "lucide-react";
import { Link } from "@inertiajs/react";

export default function FooterHU() {
    return (
        <footer className="bg-slate-950 text-slate-300 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-white p-2 rounded-2xl shadow-xl shadow-white/5">
                                <img
                                    src="/logo plut.png"
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <h4 className="text-white font-black text-lg leading-tight uppercase tracking-tight">
                                    PLUT-KUMKM
                                </h4>
                                <p className="text-green-500 font-bold text-xs tracking-[0.2em] uppercase">
                                    Provinsi Sumatera Barat
                                </p>
                            </div>
                        </div>
                        <p className="text-slate-400 mb-8 max-w-md leading-relaxed">
                            Menghadirkan layanan prima bagi pelaku UMKM untuk
                            mengakselerasi pertumbuhan usaha yang unggul,
                            inovatif, dan berdaya saing.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Youtube].map(
                                (Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-3">
                        <h5 className="text-white font-black uppercase tracking-widest text-xs mb-8">
                            Tautan Cepat
                        </h5>
                        <ul className="space-y-4">
                            {[
                                { name: "Layanan Publik", href: "/layanan" },
                                {
                                    name: "Jadwal Mobil Klinik",
                                    href: "/jadwal",
                                },
                                {
                                    name: "Promosi Produk UMKM",
                                    href: "/list/umkm/promosi",
                                },
                                { name: "Berita & Media", href: "/berita" },
                                {
                                    name: "Profil Instansi",
                                    href: "/profile/visi-dan-misi",
                                },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-2 hover:text-green-400 font-semibold transition-colors group"
                                    >
                                        <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-green-500 transition-colors" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4">
                        <h5 className="text-white font-black uppercase tracking-widest text-xs mb-8">
                            Hubungi Kami
                        </h5>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-green-500" />
                                </div>
                                <p className="text-sm leading-relaxed">
                                    Jl. Khatib Sulaiman No.11, Padang, <br />
                                    Sumatera Barat, Indonesia
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="text-sm font-semibold">
                                    <p>(0751) 7055292</p>
                                    <p className="text-slate-500 font-normal">
                                        Seksi Pelayanan & Pengaduan
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="text-sm font-semibold">
                                    <p>info@diskopumkm-sumbar.go.id</p>
                                    <p className="text-slate-500 font-normal">
                                        Respon Cepat 24/7
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest text-center md:text-left leading-relaxed">
                        © 2025 PLUT-KUMKM{" "}
                        <br className="md:hidden" />
                        <span className="text-slate-400">
                            Provinsi Sumatera Barat.
                        </span>
                    </p>
                    <div className="flex gap-8">
                        <a
                            href="#"
                            className="text-xs font-black uppercase tracking-tighter hover:text-green-500 transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-xs font-black uppercase tracking-tighter hover:text-green-500 transition-colors"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
