import { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";

export default function LoginUmkm() {
    const { data, setData, post, processing, errors } = useForm({
        nib: "",
        password: "",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("umkm.login"));
    };

    return (
        <>
            <Head title="Login UMKM" />
            <div
                className="min-h-screen bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('/images/image_33.png')" }}
            >
                <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="w-auto h-14"
                        />
                        <p className="text-[12px] font-medium leading-tight text-gray-800 text-left">
                            Dinas Koperasi UKM Provinsi <br /> Sumatera Barat
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Login UMKM
                    </h2>

                    {errors.nib && (
                        <div className="mb-4 text-sm text-red-600 text-center">
                            {errors.nib}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* NIB */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                NIB
                            </label>
                            <input
                                type="text"
                                name="nib"
                                value={data.nib}
                                onChange={(e) => setData("nib", e.target.value)}
                                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="NIB"
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
                                placeholder="Password"
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
