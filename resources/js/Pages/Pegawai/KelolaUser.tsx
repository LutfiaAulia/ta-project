import React, { useState, useEffect } from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

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

const KelolaUser: React.FC<PageProps<{ users: UserType[] }>> = ({ users }) => {
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
        const newStatus = user.status === "aktif" ? "nonaktif" : "aktif";

        if (
            confirm(
                `Yakin ingin ${
                    newStatus === "aktif" ? "mengaktifkan" : "menonaktifkan"
                } user "${user.nama}"?`
            )
        ) {
            try {
                const response = await fetch(
                    `/pegawai/status/user/${user.type}/${user.id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-TOKEN":
                                document
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.getAttribute("content") || "",
                        },
                        body: JSON.stringify({ status: newStatus }),
                    }
                );

                if (response.ok) {
                    alert(
                        `User "${user.nama}" berhasil di${
                            newStatus === "aktif" ? "aktifkan" : "nonaktifkan"
                        }.`
                    );
                    window.location.reload();
                } else {
                    alert("Gagal mengubah status user.");
                }
            } catch (error) {
                alert("Terjadi kesalahan saat mengubah status user.");
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
                    <table className="w-full border border-gray-300 text-xs">
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
                                        {user.status}
                                    </td>

                                    <td className="border px-2 py-2 text-center space-x-1 w-[200px]">
                                        <Link
                                            href={`/admin/user/${user.type}/${user.id}/edit`}
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

export default KelolaUser;
