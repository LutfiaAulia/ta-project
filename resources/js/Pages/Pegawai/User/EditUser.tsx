import React, { useState, useEffect } from "react";
import Layout from "@/Components/Layout";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

interface UserData {
    id: number;
    user_type: string;
    nama: string;
    nip?: string;
    nib?: string;
    nik?: string;
    no_hp?: string;
    jabatan?: string;
    role?: string;
    email?: string;
    nama_instansi?: string;
}

interface MyPageProps extends PageProps {
  user: UserData;
}

const EditUser: React.FC = () => {
    const { user } = usePage<MyPageProps>().props;

    const userType = user.user_type;

    const [form, setForm] = useState({
        user_type: user.user_type || "",
        nama: user.nama || "",
        nip: user.nip || "",
        nib: user.nib || "",
        nik: user.nik || "",
        no_hp: user.no_hp || "",
        jabatan: user.jabatan || "",
        role: user.role || "",
        email: user.email || "",
        nama_instansi: user.nama_instansi || "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi";

        if (userType === "pegawai") {
            if (!form.nip.trim()) newErrors.nip = "NIP wajib diisi";
            if (!form.no_hp.trim()) newErrors.no_hp = "No HP wajib diisi";
            if (!form.jabatan.trim()) newErrors.jabatan = "Jabatan wajib diisi";
            if (!form.role.trim()) newErrors.role = "Role wajib dipilih";
        }

        if (userType === "umkm") {
            if (!form.nib.trim()) newErrors.nib = "NIB wajib diisi";
            if (!form.nik.trim()) newErrors.nik = "NIK wajib diisi";
            if (!form.no_hp.trim()) newErrors.no_hp = "No HP wajib diisi";
        }

        if (userType === "instansi") {
            if (!form.email.trim()) newErrors.email = "Email wajib diisi";
            if (!form.no_hp.trim()) newErrors.no_hp = "No HP wajib diisi";
            if (!form.nama_instansi.trim())
                newErrors.nama_instansi = "Nama Instansi wajib diisi";
        }

        if (form.password && form.password.length < 8)
            newErrors.password = "Minimal 8 karakter";

        if (form.password && form.password_confirmation !== form.password)
            newErrors.password_confirmation = "Konfirmasi password tidak sama";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        router.put(`/pegawai/update/user/${user.id}`, form, {
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const renderError = (field: string) =>
        errors[field] && (
            <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
        );

    return (
        <Layout>
            <div className="max-w-screen-md mx-auto p-12">
                <h1 className="text-xl font-semibold mb-6 text-center">
                    Edit User {userType.toUpperCase()}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="block mb-1">Nama</label>
                        <input
                            type="text"
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("nama")}
                    </div>

                    {userType === "pegawai" && (
                        <>
                            <div>
                                <label className="block mb-1">NIP</label>
                                <input
                                    type="text"
                                    name="nip"
                                    value={form.nip}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {renderError("nip")}
                            </div>
                            <div>
                                <label className="block mb-1">No. HP</label>
                                <input
                                    type="text"
                                    name="no_hp"
                                    value={form.no_hp}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {renderError("no_hp")}
                            </div>
                            <div>
                                <label className="block mb-1">Jabatan</label>
                                <input
                                    type="text"
                                    name="jabatan"
                                    value={form.jabatan}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {renderError("jabatan")}
                            </div>
                            <div>
                                <label className="block mb-1">Role</label>
                                <select
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                >
                                    <option value="">Pilih Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Pegawai Lapangan">Pegawai Lapangan</option>
                                    <option value="Kepala PLUT">Kepala PLUT</option>
                                </select>
                                {renderError("role")}
                            </div>
                        </>
                    )}

                    {userType === "umkm" && (
                        <>
                            <div>
                                <label className="block mb-1">NIB</label>
                                <input
                                    type="text"
                                    name="nib"
                                    value={form.nib}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {renderError("nib")}
                            </div>
                            <div>
                                <label className="block mb-1">NIK</label>
                                <input
                                    type="text"
                                    name="nik"
                                    value={form.nik}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {renderError("nik")}
                            </div>
                            <div>
                                <label className="block mb-1">No. HP</label>
                                <input
                                    type="text"
                                    name="no_hp"
                                    value={form.no_hp}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {renderError("no_hp")}
                            </div>
                        </>
                    )}

                    {userType === "instansi" && (
                        <>
                            <div>
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {renderError("email")}
                            </div>
                            <div>
                                <label className="block mb-1">No. HP</label>
                                <input
                                    type="text"
                                    name="no_hp"
                                    value={form.no_hp}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {renderError("no_hp")}
                            </div>
                            <div>
                                <label className="block mb-1">
                                    Nama Instansi
                                </label>
                                <input
                                    type="text"
                                    name="nama_instansi"
                                    value={form.nama_instansi}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {renderError("nama_instansi")}
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block mb-1">
                            Password (opsional)
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("password")}
                    </div>
                    <div>
                        <label className="block mb-1">
                            Konfirmasi Password
                        </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {renderError("password_confirmation")}
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditUser;
