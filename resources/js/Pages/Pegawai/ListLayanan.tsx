import React from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";

type Layanan = {
    id_layanan: number;
    layanan: string;
    status: string;
};

const ListLayanan: React.FC<PageProps<{ layanan: Layanan[] }>> = ({
    layanan,
}) => {
    return (
        <Layout>
            <div className="p-4 max-w-screen-md mx-auto">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Daftar Layanan
                </h1>

                <div className="flex justify-end mb-4">
                    <Link
                        href={"/pegawai/create/layanan"}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded flex items-center justify-center"
                    >
                        + Tambah
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2 w-[50px] text-center">
                                    No
                                </th>
                                <th className="border px-2 py-2">
                                    Nama Layanan
                                </th>
                                <th className="border px-2 py-2">Status</th>
                                <th className="border px-2 py-2 text-center w-[180px]">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {layanan.map((item, index) => (
                                <tr key={item.id_layanan}>
                                    <td className="border px-2 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {item.layanan}
                                    </td>
                                    <td className="border px-2 py-2 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                item.status === "aktif"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {item.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                item.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="border px-2 py-2 text-center space-x-2">
                                        <Link
                                            href={`/pegawai/edit/layanan/${item.id_layanan}`}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            method="put"
                                            href={`/pegawai/updateStatus/layanan/${item.id_layanan}`}
                                            data={{
                                                status:
                                                    item.status === "aktif"
                                                        ? "nonaktif"
                                                        : "aktif",
                                            }}
                                            as="button"
                                            className={`${
                                                item.status === "aktif"
                                                    ? "bg-red-500 hover:bg-red-600 text-white"
                                                    : "bg-green-500 hover:bg-green-600 text-white"
                                            } px-2 py-1 rounded text-xs min-w-[80px] text-center`}
                                            onClick={(e) => {
                                                if (
                                                    !confirm(
                                                        `Yakin ingin mengubah status layanan "${
                                                            item.layanan
                                                        }" menjadi ${
                                                            item.status ===
                                                            "aktif"
                                                                ? "nonaktif"
                                                                : "aktif"
                                                        }?`
                                                    )
                                                ) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            {item.status === "aktif"
                                                ? "Nonaktifkan"
                                                : "Aktifkan"}
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {layanan.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada layanan tersedia.
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

export default ListLayanan;
