import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { router } from "@inertiajs/react";

interface DetailBookingProps extends PageProps {
    booking: {
        id_booking: number;
        jadwal: string;
        acara: string;
        peserta: number;
        layanan: { id: number; nama_layanan: string }[];
        lokasi: string;
        no_hp: string;
        surat: string | null;
        status_booking: string;
        alasan_ditolak?: string;
        pegawailap?: { id: number; nama: string }[];
    };
    pegawaiLapangan: { id: number; nama: string }[];
}

const formatTanggalDanJam = (datetime: string) => {
    const date = new Date(datetime);
    const tanggal = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const jam = date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <>
            <div>{tanggal}</div>
            <div className="text-gray-500 text-xs">{jam} WIB</div>
        </>
    );
};

const DetailBooking: React.FC<DetailBookingProps> = ({
    booking,
    pegawaiLapangan,
}) => {
    const [showModalVerif, setShowModalVerif] = useState(false);
    const [selectedPegawai, setSelectedPegawai] = useState<number[]>([]);

    const handleVerifikasi = () => {
        setShowModalVerif(true);
    };

    const submitVerifikasi = () => {
        if (selectedPegawai.length > 0) {
            router.post(
                `/pegawai/booking/${booking.id_booking}/verifikasi`,
                { pegawailap: selectedPegawai },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setShowModalVerif(false);
                        setSelectedPegawai([]);
                    },
                }
            );
        }
    };

    const [showModalTolak, setShowModalTolak] = useState(false);
    const [alasan, setAlasan] = useState("");

    const handleTolak = () => {
        setShowModalTolak(true);
    };

    const submitTolak = () => {
        if (alasan.trim()) {
            router.post(
                `/pegawai/booking/${booking.id_booking}/tolak`,
                { alasan_ditolak: alasan },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setShowModalTolak(false);
                        setAlasan("");
                    },
                }
            );
        }
    };

    return (
        <Layout>
            <div className="py-12">
                <div className="mx-auto max-w-4xl bg-white rounded shadow px-8 py-6 text-sm">
                    <h1 className="text-2xl font-semibold text-center mb-8">
                        Detail Booking Layanan Mobil Klinik
                    </h1>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-medium text-gray-600">
                                Jadwal
                            </label>
                            <div className="font-bold">
                                {formatTanggalDanJam(booking.jadwal)}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600">
                                Acara
                            </label>
                            <p className="font-bold">{booking.acara}</p>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600">
                                Jumlah Peserta
                            </label>
                            <p className="font-bold">{booking.peserta}</p>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600">
                                Layanan
                            </label>
                            <ul className="list-disc ml-5 font-bold">
                                {booking.layanan.map((layanan, index) => (
                                    <li key={layanan.id}>
                                        {layanan.nama_layanan}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600">
                                Lokasi
                            </label>
                            <p className="font-bold">{booking.lokasi}</p>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600">
                                Nomor HP
                            </label>
                            <p className="font-bold">{booking.no_hp}</p>
                        </div>

                        {booking.status_booking === "Diterima" && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-600">
                                        Pegawai Lapangan
                                    </label>
                                    <ul className="font-bold">
                                        {pegawaiLapangan.map(
                                            (pegawai, index) => (
                                                <li key={pegawai.id}>
                                                    {index + 1}. {pegawai.nama}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                        {booking.status_booking === "Ditolak" &&
                            booking.alasan_ditolak && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-600">
                                        Alasan Ditolak
                                    </label>
                                    <p className="font-bold">
                                        {booking.alasan_ditolak}
                                    </p>
                                </div>
                            )}

                        <div>
                            <label className="block text-xs font-medium text-gray-600">
                                Surat Permintaan
                            </label>
                            {booking.surat ? (
                                <a
                                    href={route("surat.show", {
                                        filename: booking.surat
                                            .split("/")
                                            .pop(),
                                    })}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 font-bold underline"
                                >
                                    Lihat Surat
                                </a>
                            ) : (
                                <span className="text-gray-500">
                                    Tidak ada surat
                                </span>
                            )}
                        </div>
                    </div>

                    {booking.status_booking === "Diajukan" && (
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                onClick={handleVerifikasi}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm"
                            >
                                Verifikasi
                            </button>
                            <button
                                onClick={handleTolak}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-sm"
                            >
                                Tolak
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showModalVerif && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">
                            Pilih Pegawai Lapangan
                        </h2>

                        <div className="max-h-48 overflow-y-auto border p-2 rounded mb-4">
                            {pegawaiLapangan.map((pegawai) => (
                                <label
                                    key={pegawai.id}
                                    className="flex items-center gap-2 mb-1"
                                >
                                    <input
                                        type="checkbox"
                                        value={pegawai.id}
                                        checked={selectedPegawai.includes(
                                            pegawai.id
                                        )}
                                        onChange={(e) => {
                                            const id = Number(e.target.value);
                                            setSelectedPegawai((prev) =>
                                                e.target.checked
                                                    ? [...prev, id]
                                                    : prev.filter(
                                                          (val) => val !== id
                                                      )
                                            );
                                        }}
                                    />
                                    <span>{pegawai.nama}</span>
                                </label>
                            ))}
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModalVerif(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                            >
                                Batal
                            </button>
                            <button
                                onClick={submitVerifikasi}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                disabled={selectedPegawai.length === 0}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showModalTolak && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">
                            Masukkan Alasan Penolakan
                        </h2>
                        <textarea
                            value={alasan}
                            onChange={(e) => setAlasan(e.target.value)}
                            className="w-full border p-2 rounded mb-4"
                            rows={4}
                            placeholder="Tulis alasan penolakan..."
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModalTolak(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                            >
                                Batal
                            </button>
                            <button
                                onClick={submitTolak}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                            >
                                Kirim
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default DetailBooking;
