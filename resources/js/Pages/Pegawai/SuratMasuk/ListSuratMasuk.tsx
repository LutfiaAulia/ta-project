import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { Link, router } from "@inertiajs/react";

type SuratMasuk = {
    id_surat: number;
    no_surat: string;
    tgl_surat: string;
    perihal: string;
    booking: {
        instansi: {
            nama_instansi: string;
        } | null;
    } | null;
};

const ListSuratMasuk: React.FC<PageProps<{ suratMasuk: SuratMasuk[] }>> = ({
    suratMasuk,
}) => {
    const [search, setSearch] = useState("");

    const handleDelete = (id: number) => {
        if (confirm("Yakin ingin menghapus surat ini?")) {
            router.delete(`/pegawai/delete/surat-masuk/${id}`);
        }
    };

    const filteredSurat = suratMasuk.filter(
        (item) =>
            item.no_surat.toLowerCase().includes(search.toLowerCase()) ||
            item.booking?.instansi?.nama_instansi
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            item.perihal.toLowerCase().includes(search.toLowerCase())
    );

    const formatTanggal = (tanggal: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        return new Date(tanggal).toLocaleDateString("id-ID", options);
    };

    return (
        <Layout>
            <div className="p-4 w-full max-w-7xl mx-auto">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Daftar Surat Masuk
                </h1>

                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Cari surat..."
                        className="border px-3 py-2 rounded text-sm w-1/3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link
                        href="/pegawai/create/surat"
                        className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded"
                    >
                        + Tambah Surat
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-2 text-center w-[50px]">
                                    No
                                </th>
                                <th className="border px-2 py-2">
                                    Nomor Surat
                                </th>
                                <th className="border px-2 py-2">
                                    Tanggal Surat
                                </th>
                                <th className="border px-2 py-2">Pengirim</th>
                                <th className="border px-2 py-2">Perihal</th>
                                <th className="border px-2 py-2 text-center w-[180px]">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSurat.map((item, index) => (
                                <tr key={item.id_surat}>
                                    <td className="border px-2 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {item.no_surat}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {formatTanggal(item.tgl_surat)}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {item.booking?.instansi
                                            ?.nama_instansi || "-"}
                                    </td>
                                    <td className="border px-2 py-2">
                                        {item.perihal}
                                    </td>
                                    <td className="border px-2 py-2 text-center space-x-1">
                                        <Link
                                            href={`/pegawai/edit/surat/${item.id_surat}`}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id_surat)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Hapus
                                        </button>
                                        <Link
                                            href={`/pegawai/disposisi/surat/${item.id_surat}`}
                                            className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Disposisi
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {filteredSurat.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada surat masuk.
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

export default ListSuratMasuk;
