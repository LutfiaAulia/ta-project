import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
                    {/* Bagian Kiri */}
                    <div className="p-8">
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-16 mb-2"
                            />
                            <p className="text-center font-medium text-sm">
                                PLUT-KUMKM Provinsi <br /> Sumatera
                                Barat
                            </p>
                        </div>

                        <h2 className="text-2xl font-extrabold text-center mb-6">
                            Masuk
                        </h2>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                                    placeholder="email"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                                    placeholder="password"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                                {canResetPassword && (
                                    <div className="text-right text-sm mt-2">
                                        <Link
                                            href={route("password.request")}
                                            className="text-gray-500 hover:text-gray-800"
                                        >
                                            lupa password?
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex justify-center">
                                <button
                                    className="px-10 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-full"
                                    disabled={processing}
                                >
                                    Masuk
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Bagian Kanan */}
                    <div className="bg-green-500 text-white p-10 flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-extrabold mb-4">
                            Selamat Datang
                        </h2>
                        <p className="text-center mb-6 text-sm">
                            "Daftar sekarang untuk mendapatkan akses pemesanan
                            Mobil Klinik dengan mudah dan cepat!"
                        </p>
                        <Link
                            href={route("register")}
                            className="border border-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-green-600 transition"
                        >
                            Registrasi
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
