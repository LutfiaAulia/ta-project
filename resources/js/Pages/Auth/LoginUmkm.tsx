import { FormEventHandler } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { ArrowLeft, Lock, FileText } from "lucide-react";

export default function LoginUmkm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nib: "",
        password: "",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("umkm.login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Login Akses UMKM" />
            <div
                className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
                style={{ backgroundImage: "url('/images/image_33.png')" }}
            >
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>

                <div className="bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl max-w-md w-full relative z-10 border border-white/20">
                    {/* Tombol Kembali */}
                    <div className="mb-6">
                        <Link
                            href="/list/umkm/promosi"
                            className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-[#005577] transition-colors tracking-[0.2em]"
                        >
                            <ArrowLeft size={16} strokeWidth={3} /> KEMBALI KE
                            BERANDA
                        </Link>
                    </div>

                    <div className="flex flex-col items-center mb-8">
                        <img
                            src="/logo plut.png"
                            alt="Logo"
                            className="w-auto h-16 mb-4"
                        />
                        <div className="text-center">
                            <h2 className="text-2xl font-black text-[#005577] tracking-tight">
                                LOGIN UMKM
                            </h2>
                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">
                                Kelola Promosi & Katalog
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Input NIB */}
                        <div>
                            <label className="block text-[10px] font-black text-[#005577] uppercase tracking-widest mb-2 ml-1">
                                Nomor Induk Berusaha (NIB)
                            </label>
                            <div className="relative">
                                <FileText
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    value={data.nib}
                                    onChange={(e) =>
                                        setData("nib", e.target.value)
                                    }
                                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all font-bold text-sm ${
                                        errors.nib
                                            ? "border-red-500 focus:ring-red-200"
                                            : "border-gray-100 focus:ring-[#88AA44]/20 focus:border-[#88AA44]"
                                    }`}
                                    placeholder="Masukkan NIB Anda"
                                />
                            </div>
                            {errors.nib && (
                                <p className="mt-1.5 text-xs text-red-600 font-bold ml-1 italic">
                                    {errors.nib}
                                </p>
                            )}
                        </div>

                        {/* Input Password */}
                        <div>
                            <label className="block text-[10px] font-black text-[#005577] uppercase tracking-widest mb-2 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all font-bold text-sm ${
                                        errors.password
                                            ? "border-red-500 focus:ring-red-200"
                                            : "border-gray-100 focus:ring-[#88AA44]/20 focus:border-[#88AA44]"
                                    }`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-600 font-bold ml-1 italic">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Tombol Login */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#88AA44] text-white font-black py-4 rounded-2xl hover:bg-[#779933] transition-all shadow-lg shadow-[#88AA44]/20 disabled:opacity-50 flex items-center justify-center gap-2 tracking-widest text-xs"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        MEMPROSES...
                                    </span>
                                ) : (
                                    "MASUK KE DASHBOARD"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-400 font-medium">
                            Belum terdaftar? <br />
                            <span className="text-[#005577] font-black cursor-pointer hover:underline">
                                Hubungi Admin PLUT Sumatera Barat
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
