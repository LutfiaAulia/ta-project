import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

type Instansi = {
    nama_instansi: string;
    alamat: string;
    no_hp: string;
};

type User = {
    nama: string;
    email: string;
    email_verified_at?: string | null;
    instansi?: Instansi | null;
};

// Menyesuaikan tipe PageProps agar sesuai dengan tipe yang diharapkan oleh Inertia.js
type PageProps = InertiaPageProps & {
    user: User;
    mustVerifyEmail: boolean;
    status?: string;
    auth: any;
    ziggy: any;
};

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    // Mengambil data user dengan tipe yang lebih lengkap dari props
    const { user } = usePage<PageProps>().props;

    // Menyiapkan form dengan data user
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            nama: user.nama,
            email: user.email,
            nama_instansi: user.instansi?.nama_instansi ?? "",
            alamat: user.instansi?.alamat ?? "",
            no_hp: user.instansi?.no_hp ?? "",
        });

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Ubah data akun kamu.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="nama" value="Nama" />
                    <TextInput
                        id="nama"
                        className="mt-1 block w-full"
                        value={data.nama}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("nama", e.target.value)
                        }
                        required
                        isFocused
                        autoComplete="nama"
                    />
                    <InputError className="mt-2" message={errors.nama} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("email", e.target.value)
                        }
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="nama_instansi" value="Nama Instansi" />
                    <TextInput
                        id="nama_instansi"
                        className="mt-1 block w-full"
                        value={data.nama_instansi}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("nama_instansi", e.target.value)
                        }
                    />
                    <InputError
                        className="mt-2"
                        message={errors.nama_instansi}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="alamat" value="Alamat" />
                    <TextInput
                        id="alamat"
                        className="mt-1 block w-full"
                        value={data.alamat}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("alamat", e.target.value)
                        }
                    />
                    <InputError className="mt-2" message={errors.alamat} />
                </div>

                <div>
                    <InputLabel htmlFor="no_hp" value="No HP" />
                    <TextInput
                        id="no_hp"
                        className="mt-1 block w-full"
                        value={data.no_hp}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("no_hp", e.target.value)
                        }
                    />
                    <InputError className="mt-2" message={errors.no_hp} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600">Tersimpan</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
