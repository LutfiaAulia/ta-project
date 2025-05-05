import { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";

export default function LoginPegawai() {
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
            <Head title="Login Pegawai" />
            <div
                className="min-h-screen bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('/images/bg_login.png')" }}
            >
                <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex items-center gap-3 mb-6">
                        <img src="/logo.png" alt="Logo" className="w-16 h-16" />
                        <p className="text-[12px] font-medium leading-tight text-gray-800">
                            Dinas Koperasi UKM Provinsi <br /> Sumatera Barat
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Login Pegawai
                    </h2>

                    {errors.nip && (
                        <div className="mb-4 text-sm text-red-600 text-center">
                            {errors.nip}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* NIP */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                NIP
                            </label>
                            <input
                                type="text"
                                name="nip"
                                value={data.nip}
                                onChange={(e) => setData("nip", e.target.value)}
                                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="Masukkan NIP"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="Masukkan Password"
                            />
                        </div>

                        {/* Tombol */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition duration-200"
                            >
                                {processing ? "Memproses..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
