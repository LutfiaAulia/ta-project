import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        email: "",
        password: "",
        password_confirmation: "",
        nama_instansi: "",
        alamat: "",
        no_hp: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 pt-[1cm] pb-[1cm]">
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
                    {/* Kiri */}
                    <div className="bg-green-500 text-white flex flex-col justify-center items-center p-10 shadow-lg">
                        <h1 className="text-4xl font-bold mb-4 text-center">
                            Selamat Datang
                        </h1>
                        <p className="text-center mb-8">
                            Sudah punya akun? Ayo segera masuk untuk menikmati
                            akses mudah dan cepat dalam pemesanan mobil klinik
                        </p>
                        <Link
                            href={route("login")}
                            className="border-2 border-white rounded-full px-8 py-2 text-white hover:bg-white hover:text-green-500 transition"
                        >
                            Masuk
                        </Link>
                    </div>

                    {/* Kanan */}
                    <div className="bg-white flex flex-col justify-center items-center p-10 shadow-lg">
                        <img
                            src="/logo plut.png"
                            alt="Logo"
                            className="h-16 mb-4"
                        />
                        <h2 className="text-3xl font-bold mb-6">Registrasi</h2>

                        <form
                            onSubmit={submit}
                            className="w-full max-w-md space-y-4"
                        >
                            <div>
                                <TextInput
                                    id="nama"
                                    name="nama"
                                    placeholder="nama"
                                    value={data.nama}
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.nama}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={data.email}
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={data.password}
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="konfirmasi password"
                                    value={data.password_confirmation}
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <TextInput
                                    id="nama_instansi"
                                    name="nama_instansi"
                                    placeholder="nama instansi/organisasi"
                                    value={data.nama_instansi}
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                                    onChange={(e) =>
                                        setData("nama_instansi", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.nama_instansi}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <TextInput
                                    id="alamat"
                                    name="alamat"
                                    placeholder="alamat kantor"
                                    value={data.alamat}
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.alamat}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <TextInput
                                    id="no_hp"
                                    name="no_hp"
                                    placeholder="nomor telephone"
                                    maxLength={13}
                                    value={data.no_hp}
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) {
                                            setData("no_hp", e.target.value)
                                        }
                                    }
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.no_hp}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-10 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-full"
                                >
                                    Registrasi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
