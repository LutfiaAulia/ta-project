import React from "react";
import LayoutUmkm from "@/Components/LayoutUmkm";
import { Head, useForm } from "@inertiajs/react";
import {
    FaSave,
    FaTrash,
    FaEdit,
    FaChartLine,
    FaHistory,
    FaUsers,
} from "react-icons/fa";
import Swal from "sweetalert2";

interface FormKeuangan {
    tahun: string;
    aset: string;
    omset: string;
    jumlah_karyawan: string;
}

interface Keuangan {
    id_keuangan: number;
    tahun: number;
    aset: number;
    omset: number;
    jumlah_karyawan: number;
}

interface Props {
    riwayat: Keuangan[];
}

export default function Index({ riwayat }: Props) {
    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm<FormKeuangan & Record<string, any>>({
        tahun: new Date().getFullYear().toString(),
        aset: "",
        omset: "",
        jumlah_karyawan: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (parseInt(data.tahun) > new Date().getFullYear()) {
            Swal.fire(
                "Error",
                "Tahun tidak boleh melebihi tahun saat ini!",
                "error",
            );
            return;
        }

        post(route("umkm.keuangan.store"), {
            onSuccess: () => {
                reset();
                Swal.fire(
                    "Berhasil!",
                    "Data keuangan & tenaga kerja disimpan.",
                    "success",
                );
            },
        });
    };

    const editData = (item: Keuangan) => {
        setData({
            tahun: item.tahun.toString(),
            aset: item.aset.toString(),
            omset: item.omset.toString(),
            jumlah_karyawan: item.jumlah_karyawan.toString(),
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const hapusData = (id: number) => {
        Swal.fire({
            title: "Hapus data?",
            text: "Data tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("umkm.keuangan.destroy", id));
            }
        });
    };

    return (
        <LayoutUmkm>
            <Head title="Keuangan & Tenaga Kerja" />

            <div className="pt-20 pb-10 px-6 bg-gray-50 min-h-screen">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-600 rounded-lg shadow-lg text-white">
                            <FaChartLine size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Monitoring UMKM
                            </h2>
                            <p className="text-sm text-gray-500">
                                Kelola data keuangan dan tenaga kerja tahunan
                            </p>
                        </div>
                    </div>

                    {/* FORM INPUT */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b font-semibold text-gray-700">
                            Form Input Data
                        </div>
                        <form
                            onSubmit={submit}
                            className="p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tahun
                                </label>
                                <input
                                    type="number"
                                    max={new Date().getFullYear()}
                                    value={data.tahun}
                                    onChange={(e) =>
                                        setData("tahun", e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                {errors.tahun && (
                                    <span className="text-red-500 text-xs">
                                        {errors.tahun}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Aset (Rp)
                                </label>
                                <input
                                    type="number"
                                    value={data.aset}
                                    onChange={(e) =>
                                        setData("aset", e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Omset (Rp)
                                </label>
                                <input
                                    type="number"
                                    value={data.omset}
                                    onChange={(e) =>
                                        setData("omset", e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tenaga Kerja (Orang)
                                </label>
                                <input
                                    type="number"
                                    value={data.jumlah_karyawan}
                                    onChange={(e) =>
                                        setData(
                                            "jumlah_karyawan",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                            >
                                <FaSave /> {processing ? "Simpan..." : "Simpan"}
                            </button>
                        </form>
                    </div>

                    {/* TABEL */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b flex items-center gap-2 font-semibold text-gray-700">
                            <FaHistory /> Riwayat Data
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                                        <th className="px-6 py-4 font-semibold">
                                            Tahun
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Total Aset
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Total Omset
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-center">
                                            <FaUsers className="inline mr-1" />{" "}
                                            Karyawan
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-center">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {riwayat && riwayat.length > 0 ? (
                                        riwayat.map((item) => (
                                            <tr
                                                key={item.id_keuangan}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="px-6 py-4 font-bold text-gray-700">
                                                    {item.tahun}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID",
                                                    ).format(item.aset)}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID",
                                                    ).format(item.omset)}
                                                </td>
                                                <td className="px-6 py-4 text-center text-gray-600">
                                                    {item.jumlah_karyawan} Orang
                                                </td>
                                                <td className="px-6 py-4 flex justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            editData(item)
                                                        }
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                    >
                                                        <FaEdit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            hapusData(
                                                                item.id_keuangan,
                                                            )
                                                        }
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    >
                                                        <FaTrash size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-10 text-center text-gray-400"
                                            >
                                                Belum ada data riwayat.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutUmkm>
    );
}
