import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";

interface DetailBookingProps extends PageProps {
    booking: {
        id_booking: number;
        tanggal_mulai: string;
        tanggal_akhir: string;
        waktu_mulai: string;
        waktu_akhir: string;
        acara: string;
        peserta: number;
        layanan: { id: number; nama_layanan: string }[];
        kabupaten_kota: string;
        kecamatan: string;
        kenagarian_kelurahan: string;
        lokasi: string;
        no_hp: string;
        surat: string | null;
        status_booking: string;
        alasan_ditolak?: string;
        pegawailap?: { id: number; nama: string; status: string }[];
        sopir?: { id: number; nama: string };
        mobil?: { id: number; nama: string };
    };
    pegawaiLapangan: { id: number; nama: string; status: string }[];
    mobil: { id: number; nama: string }[];
    sopir: { id: number; nama: string }[];
}

const extractJam = (waktu: string | null | undefined) => {
    if (!waktu) return "-";
    const dateObj = new Date(waktu);
    if (isNaN(dateObj.getTime())) return "-";

    // Koreksi timezone
    dateObj.setHours(dateObj.getHours() - 7);
    const jam = dateObj.getHours().toString().padStart(2, "0");
    const menit = dateObj.getMinutes().toString().padStart(2, "0");
    return `${jam}:${menit}`;
};

const formatTanggalDanJam = (
    tanggalMulai: string,
    tanggalAkhir: string,
    waktuMulai: string,
    waktuAkhir: string
) => {
    const mulai = new Date(tanggalMulai);
    const akhir = new Date(tanggalAkhir);

    const opsiTanggal: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    const tgl =
        tanggalMulai === tanggalAkhir
            ? mulai.toLocaleDateString("id-ID", opsiTanggal)
            : `${mulai.getDate()} - ${akhir.getDate()} ${akhir.toLocaleDateString(
                  "id-ID",
                  { month: "long", year: "numeric" }
              )}`;

    return (
        <>
            <div>{tgl}</div>
            <div className="text-gray-500 text-xs">{`${extractJam(
                waktuMulai
            )} - ${extractJam(waktuAkhir)} WIB`}</div>
        </>
    );
};

const DetailBooking: React.FC<DetailBookingProps> = ({
    booking,
    pegawaiLapangan,
    mobil,
    sopir,
}) => {
    const [showModalVerif, setShowModalVerif] = useState(false);
    const [selectedPegawai, setSelectedPegawai] = useState<number[]>([]);
    const [selectedMobil, setSelectedMobil] = useState<number | null>(null);
    const [selectedSopir, setSelectedSopir] = useState<number | null>(null);

    const handleVerifikasi = () => setShowModalVerif(true);
    const handleTolak = () => setShowModalTolak(true);

    const submitVerifikasi = () => {
        if (selectedPegawai.length > 0 && selectedMobil && selectedSopir) {
            router.post(
                `/pegawai/booking/${booking.id_booking}/verifikasi`,
                {
                    pegawailap: selectedPegawai,
                    id_mobil: selectedMobil,
                    id_sopir: selectedSopir,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setShowModalVerif(false);
                        setSelectedPegawai([]);
                        setSelectedMobil(null);
                        setSelectedSopir(null);
                    },
                }
            );
        }
    };

    const [showModalTolak, setShowModalTolak] = useState(false);
    const [alasan, setAlasan] = useState("");

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

    const { auth } = usePage().props as any;

    const role =
        typeof auth === "object"
            ? auth.role || auth.user?.pegawai?.role || ""
            : "";

    const isKepalaBidang = role === "Kepala Bidang";

    return (
        <Layout>
            <div className="py-12 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md px-10 py-8 text-sm space-y-8">
                    <h1 className="text-2xl font-semibold text-center">
                        Detail Booking Layanan Mobil Klinik
                    </h1>

                    <div className="grid grid-cols-1 gap-y-6">
                        <DetailItem label="Jadwal">
                            {formatTanggalDanJam(
                                booking.tanggal_mulai,
                                booking.tanggal_akhir,
                                booking.waktu_mulai,
                                booking.waktu_akhir
                            )}
                        </DetailItem>
                        <DetailItem label="Acara">{booking.acara}</DetailItem>
                        <DetailItem label="Jumlah Peserta">
                            {booking.peserta}
                        </DetailItem>

                        <DetailItem label="Layanan">
                            <ul className="list-disc list-inside font-semibold space-y-1">
                                {booking.layanan.map((layanan) => (
                                    <li key={layanan.id}>
                                        {layanan.nama_layanan}
                                    </li>
                                ))}
                            </ul>
                        </DetailItem>

                        <DetailItem label="Kabupaten/Kota">
                            {booking.kabupaten_kota}
                        </DetailItem>
                        <DetailItem label="Kecamatan">
                            {booking.kecamatan}
                        </DetailItem>
                        <DetailItem label="Kenagarian/Kelurahan">
                            {booking.kenagarian_kelurahan}
                        </DetailItem>
                        <DetailItem label="Lokasi">{booking.lokasi}</DetailItem>

                        <DetailItem label="Nomor HP">
                            {booking.no_hp}
                        </DetailItem>

                        {booking.status_booking === "Diterima" &&
                            booking.pegawailap &&
                            booking.pegawailap.length > 0 && (
                                <DetailItem label="Pegawai Lapangan">
                                    <ul className="list-disc list-inside font-semibold space-y-1">
                                        {booking.pegawailap.map((pegawai) => (
                                            <li key={pegawai.id}>
                                                {pegawai.nama}
                                            </li>
                                        ))}
                                    </ul>
                                </DetailItem>
                            )}

                        {booking.status_booking === "Diterima" &&
                            booking.sopir && (
                                <DetailItem label="Sopir">
                                    {booking.sopir.nama}
                                </DetailItem>
                            )}

                        {booking.status_booking === "Diterima" &&
                            booking.mobil && (
                                <DetailItem label="Mobil">
                                    {booking.mobil.nama}
                                </DetailItem>
                            )}

                        {booking.status_booking === "Ditolak" &&
                            booking.alasan_ditolak && (
                                <DetailItem label="Alasan Ditolak">
                                    {booking.alasan_ditolak}
                                </DetailItem>
                            )}

                        <DetailItem label="Surat Permintaan">
                            {booking.surat ? (
                                <a
                                    href={route("surat.show", {
                                        filename: booking.surat
                                            .split("/")
                                            .pop(),
                                    })}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 font-semibold underline"
                                >
                                    Lihat Surat
                                </a>
                            ) : (
                                <span className="text-gray-500">
                                    Tidak ada surat
                                </span>
                            )}
                        </DetailItem>
                    </div>

                    {booking.status_booking === "Diajukan" &&
                        isKepalaBidang && (
                            <div className="flex justify-center gap-6 mt-6">
                                <button
                                    onClick={handleVerifikasi}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-semibold transition"
                                >
                                    Verifikasi
                                </button>
                                <button
                                    onClick={handleTolak}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-semibold transition"
                                >
                                    Tolak
                                </button>
                            </div>
                        )}
                </div>
            </div>

            {showModalVerif && (
                <Modal
                    title="Pilih Pegawai Lapangan"
                    onClose={() => setShowModalVerif(false)}
                >
                    <div className="max-h-52 overflow-y-auto mb-5 border rounded p-3">
                        {pegawaiLapangan
                            .filter((p) => p.status === "aktif")
                            .map((pegawai) => (
                                <label
                                    key={pegawai.id}
                                    className="flex items-center gap-3 mb-2 cursor-pointer"
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
                                                          (v) => v !== id
                                                      )
                                            );
                                        }}
                                        className="cursor-pointer"
                                    />
                                    <span>{pegawai.nama}</span>
                                </label>
                            ))}
                    </div>

                    <SelectInput
                        label="Pilih Mobil"
                        value={selectedMobil ?? ""}
                        onChange={(e) =>
                            setSelectedMobil(Number(e.target.value))
                        }
                        options={mobil}
                        placeholder="-- Pilih Mobil --"
                    />

                    <SelectInput
                        label="Pilih Sopir"
                        value={selectedSopir ?? ""}
                        onChange={(e) =>
                            setSelectedSopir(Number(e.target.value))
                        }
                        options={sopir}
                        placeholder="-- Pilih Sopir --"
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setShowModalVerif(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md"
                        >
                            Batal
                        </button>
                        <button
                            onClick={submitVerifikasi}
                            disabled={
                                selectedPegawai.length === 0 ||
                                !selectedMobil ||
                                !selectedSopir
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md disabled:opacity-50"
                        >
                            Simpan
                        </button>
                    </div>
                </Modal>
            )}

            {showModalTolak && (
                <Modal
                    title="Masukkan Alasan Penolakan"
                    onClose={() => setShowModalTolak(false)}
                >
                    <textarea
                        value={alasan}
                        onChange={(e) => setAlasan(e.target.value)}
                        rows={4}
                        className="w-full border rounded p-3 mb-5 resize-none"
                        placeholder="Tulis alasan penolakan..."
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setShowModalTolak(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md"
                        >
                            Batal
                        </button>
                        <button
                            onClick={submitTolak}
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
                        >
                            Kirim
                        </button>
                    </div>
                </Modal>
            )}
        </Layout>
    );
};

const DetailItem: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
}) => (
    <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
            {label}
        </label>
        <div className="font-semibold">{children}</div>
    </div>
);

const SelectInput: React.FC<{
    label: string;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    options: { id: number; nama: string }[];
    placeholder?: string;
}> = ({ label, value, onChange, options, placeholder }) => (
    <div className="mb-5">
        <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
        </label>
        <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={value}
            onChange={onChange}
        >
            <option value="">{placeholder ?? "-- Pilih --"}</option>
            {options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                    {opt.nama}
                </option>
            ))}
        </select>
    </div>
);

const Modal: React.FC<{
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}> = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 font-bold text-xl leading-none"
                >
                    ×
                </button>
            </div>
            {children}
        </div>
    </div>
);

export default DetailBooking;
