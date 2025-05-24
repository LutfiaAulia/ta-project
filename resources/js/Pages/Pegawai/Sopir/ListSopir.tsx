import React from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";

type StatusType = "aktif" | "nonaktif" | "cuti";

type Sopir = {
    id_sopir: number;
    nama: string;
    no_hp: string;
    alamat: string;
    status: StatusType;
};

const statusLabel: Record<StatusType, string> = {
    aktif: "Aktif",
    nonaktif: "Nonaktif",
    cuti: "Cuti",
};

const ListSopir: React.FC<PageProps<{ sopir: Sopir[] }>> = ({ sopir }) => {
    return (
        <Layout>
            <div className="p-4 w-full max-w-7xl mx-auto">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Daftar Sopir
                </h1>

                <div className="flex justify-end mb-4">
                    <Link
                        href="/pegawai/create/sopir"
                        className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded"
                    >
                        + Tambah
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2 text-center w-[50px]">
                                    No
                                </th>
                                <th className="border px-2 py-2">Nama Sopir</th>
                                <th className="border px-2 py-2">No. HP</th>
                                <th className="border px-2 py-2">Alamat</th>
                                <th className="border px-2 py-2 text-center">
                                    Status
                                </th>
                                <th className="border px-2 py-2 text-center w-[220px]">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sopir.map((item, index) => (
                                <tr key={item.id_sopir}>
                                    <td className="border px-2 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {item.nama}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {item.no_hp}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {item.alamat}
                                    </td>
                                    <td className="border px-2 py-2 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                item.status === "aktif"
                                                    ? "bg-green-100 text-green-700"
                                                    : item.status === "nonaktif"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {statusLabel[item.status]}
                                        </span>
                                    </td>
                                    <td className="border px-2 py-2 text-center space-x-2">
                                        <Link
                                            href={`/pegawai/edit/sopir/${item.id_sopir}`}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Edit
                                        </Link>
                                        {(
                                            [
                                                "aktif",
                                                "nonaktif",
                                                "cuti",
                                            ] as StatusType[]
                                        )
                                            .filter(
                                                (status) =>
                                                    status !== item.status
                                            )
                                            .map((statusBaru) => (
                                                <Link
                                                    key={statusBaru}
                                                    method="put"
                                                    href={`/pegawai/updateStatus/sopir/${item.id_sopir}`}
                                                    data={{
                                                        status: statusBaru,
                                                    }}
                                                    as="button"
                                                    className={`px-2 py-1 text-xs rounded ${
                                                        statusBaru === "aktif"
                                                            ? "bg-green-500 hover:bg-green-600"
                                                            : statusBaru ===
                                                              "nonaktif"
                                                            ? "bg-red-500 hover:bg-red-600"
                                                            : "bg-yellow-500 hover:bg-yellow-600"
                                                    } text-white`}
                                                    onClick={(e) => {
                                                        if (
                                                            !confirm(
                                                                `Yakin ingin mengubah status sopir "${item.nama}" menjadi ${statusLabel[statusBaru]}?`
                                                            )
                                                        ) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    {statusLabel[statusBaru]}
                                                </Link>
                                            ))}
                                    </td>
                                </tr>
                            ))}

                            {sopir.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada sopir tersedia.
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

export default ListSopir;
