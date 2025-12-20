import { FormEventHandler, useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import {
    User,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    ShieldCheck,
    Fingerprint,
} from "lucide-react";

export default function LoginPegawai() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        nip: "",
        password: "",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("pegawai.login"));
    };

    return (
        <>
            <Head title="Login Pegawai | UMKM Sumbar" />
            <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC] relative overflow-hidden">
                {/* Ornamen Background - Lebih Soft, Tidak Full Hitam */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]"></div>
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                </div>

                <div className="w-full max-w-md relative z-10">
                    {/* Tombol Kembali */}
                    <Link
                        href="/"
                        className="inline-flex items-center text-slate-400 hover:text-emerald-600 mb-8 transition-colors text-xs font-black tracking-[0.2em] uppercase"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Kembali ke
                        Beranda
                    </Link>

                    <div className="bg-white p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
                        {/* Garis Aksen Hijau di atas kartu */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>

                        {/* Branding */}
                        <div className="flex flex-col items-center mb-10">
                            <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center p-4 shadow-inner mb-6 relative group">
                                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="w-full h-full object-contain relative z-10"
                                />
                            </div>
                            <div className="text-center">
                                <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                                    Login Pegawai
                                </h1>
                                <div className="flex items-center justify-center gap-2 mt-3">
                                    <span className="h-[1px] w-5 bg-emerald-200"></span>
                                    <p className="text-[10px] text-emerald-600 font-black tracking-[0.2em] uppercase">
                                        Internal System
                                    </p>
                                    <span className="h-[1px] w-5 bg-emerald-200"></span>
                                </div>
                            </div>
                        </div>

                        {/* Error Alert */}
                        {errors.nip && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl flex items-center gap-3">
                                <div className="text-red-500">
                                    <ShieldCheck size={18} />
                                </div>
                                <p className="text-[11px] font-bold text-red-700">
                                    {errors.nip}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* NIP Input */}
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                    NIP Pegawai
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                                        <Fingerprint size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.nip}
                                        onChange={(e) =>
                                            setData("nip", e.target.value)
                                        }
                                        className="w-full bg-slate-50 border-none px-12 py-4 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner"
                                        placeholder="Masukkan NIP"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="w-full bg-slate-50 border-none px-12 py-4 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-emerald-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Tombol Submit */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-emerald-600 transition-all active:scale-[0.98] shadow-xl shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {processing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Memverifikasi...</span>
                                        </div>
                                    ) : (
                                        "Akses Masuk"
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                            <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
                                Dinas Koperasi & UKM Prov. Sumatera Barat
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
