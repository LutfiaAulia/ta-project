import React, { useState, useEffect } from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";

type PegawaiUser = {
    type: "pegawai";
    id: number;
    nama: string;
    nip: string;
    status: string;
    pegawai: {
        role: string;
    };
};

type InstansiUser = {
    type: "instansi";
    id: number;
    nama: string;
    email: string;
    status: string;
};

type UmkmUser = {
    type: "umkm";
    id: number;
    nama: string;
    nib: string;
    status: string;
};

type UserType = PegawaiUser | InstansiUser | UmkmUser;

const ListUser: React.FC<PageProps<{ users: UserType[] }>> = ({ users }) => {
    const { url } = usePage();
    const [userType, setUserType] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(url.split("?")[1]);
        const typeFromQuery = params.get("type");
        setUserType(typeFromQuery);
    }, [url]);

    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter((user) =>
        user.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function toggleStatus(user: UserType) {
        const currentStatus = user.status.toLowerCase();
        const newStatus = currentStatus === "aktif" ? "nonaktif" : "aktif";

        if (
            confirm(
                `Yakin ingin ${
                    newStatus === "aktif" ? "mengaktifkan" : "menonaktifkan"
                } user "${user.nama}"?`
            )
        ) {
            try {
                await axios.get("/sanctum/csrf-cookie");
                await axios.patch(
                    `/pegawai/status/user/${user.type}/${user.id}`,
                    {
                        status: newStatus,
                    }
                );

                alert(
                    `User "${user.nama}" berhasil di${
                        newStatus === "aktif" ? "aktifkan" : "nonaktifkan"
                    }.`
                );
                window.location.reload();
            } catch (error: any) {
                console.error(error);
                if (error.response?.status === 419) {
                    alert("Sesi login sudah habis, silakan login ulang.");
                } else {
                    alert("Gagal mengubah status user.");
                }
            }
        }
    }

    return (
        <Layout>
            <div className="p-4 max-w-screen-lg mx-auto">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Kelola User
                </h1>

                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Cari nama user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-xs w-1/3"
                    />
                    {userType !== "instansi" && userType !== null && (
                        <Link
                            href={`/pegawai/create/user?type=${userType}`}
                            className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded flex items-center justify-center"
                        >
                            + Tambah
                        </Link>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2">No</th>
                                <th className="border px-2 py-2">Nama</th>
                                {userType === "pegawai" && (
                                    <th className="border px-2 py-2">NIP</th>
                                )}
                                {userType === "umkm" && (
                                    <th className="border px-2 py-2">NIB</th>
                                )}
                                {userType === "instansi" && (
                                    <th className="border px-2 py-2">Email</th>
                                )}
                                {userType === "pegawai" && (
                                    <th className="border px-2 py-2">Role</th>
                                )}
                                <th className="border px-2 py-2">Status</th>
                                <th className="border px-2 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="border px-2 py-2 text-center w-[50px]">
                                        {index + 1}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {user.nama}
                                    </td>
                                    {user.type === "pegawai" && (
                                        <td className="border px-2 py-2">
                                            {user.nip}
                                        </td>
                                    )}
                                    {user.type === "umkm" && (
                                        <td className="border px-2 py-2">
                                            {user.nib}
                                        </td>
                                    )}
                                    {user.type === "instansi" && (
                                        <td className="border px-2 py-2">
                                            {user.email}
                                        </td>
                                    )}
                                    {user.type === "pegawai" && (
                                        <td className="border px-2 py-2 text-center">
                                            {user.pegawai.role}
                                        </td>
                                    )}
                                    <td className="border px-2 py-2 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                user.status === "aktif"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {user.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="border px-2 py-2 text-center space-x-1 w-[200px]">
                                        <Link
                                            href={`/pegawai/edit/user/${user.id}`}
                                            className="bg-yellow-300 hover:bg-yellow-400 px-2 py-1 rounded text-xs"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => toggleStatus(user)}
                                            className={`${
                                                user.status === "aktif"
                                                    ? "bg-red-500 hover:bg-red-600 text-white"
                                                    : "bg-green-500 hover:bg-green-600 text-white"
                                            } px-2 py-1 rounded text-xs min-w-[80px] text-center`}
                                        >
                                            {user.status === "aktif"
                                                ? "Nonaktifkan"
                                                : "Aktifkan"}
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada user yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default ListUser;
