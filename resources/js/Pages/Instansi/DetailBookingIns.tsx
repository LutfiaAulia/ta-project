import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface Layanan {
    id: number;
    nama_layanan: string;
}

interface Booking {
    id_booking: number;
    tanggal_mulai: string;
    tanggal_akhir: string;
    waktu_mulai: string | null;
    waktu_akhir: string | null;
    acara: string;
    peserta: number;
    layanan: Layanan[];
    lokasi: string;
    no_hp: string;
    surat: string | null;
}

interface DetailBookingInsProps {
    booking: Booking;
}

// Fungsi untuk menampilkan jadwal dengan format yang sama seperti di riwayat
const formatJadwalLengkap = (
    tanggalMulai: string,
    tanggalAkhir: string,
    waktuMulai: string | null | undefined,
    waktuAkhir: string | null | undefined
) => {
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
    };

    const mulai = new Date(tanggalMulai);
    const akhir = new Date(tanggalAkhir);

    const tgl =
        tanggalMulai === tanggalAkhir
            ? mulai.toLocaleDateString("id-ID", options)
            : `${mulai.getDate()}-${akhir.getDate()} ${akhir.toLocaleDateString(
                  "id-ID",
                  { month: "long", year: "numeric" }
              )}`;

    const extractJam = (waktu: string | null | undefined) => {
        if (!waktu) return "-";
        const dateObj = new Date(waktu);
        if (isNaN(dateObj.getTime())) return "-";
        dateObj.setHours(dateObj.getHours() - 7); // koreksi waktu ke WIB
        const jam = dateObj.getHours().toString().padStart(2, "0");
        const menit = dateObj.getMinutes().toString().padStart(2, "0");
        return `${jam}:${menit}`;
    };

    const jamMulai = extractJam(waktuMulai);
    const jamAkhir = extractJam(waktuAkhir);

    const jam = `${jamMulai} - ${jamAkhir} WIB`;

    return `${tgl}\n${jam}`;
};

export default function DetailBookingIns({ booking }: DetailBookingInsProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Detail Pembookingan
                </h2>
            }
        >
            <Head title="Detail Booking" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-[3cm] py-[0.5cm]">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg px-[1cm]">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-semibold mb-6 text-center">
                                Pembookingan Layanan Mobil Klinik
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block font-medium text-black-700 text-[12px]">
                                        Jadwal
                                    </label>
                                    <p className="font-bold whitespace-pre-line">
                                        {formatJadwalLengkap(
                                            booking.tanggal_mulai,
                                            booking.tanggal_akhir,
                                            booking.waktu_mulai,
                                            booking.waktu_akhir
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <label className="block font-medium text-black-700 text-[12px]">
                                        Acara
                                    </label>
                                    <p className="font-bold">{booking.acara}</p>
                                </div>

                                <div>
                                    <label className="block font-medium text-black-700 text-[12px]">
                                        Jumlah Peserta
                                    </label>
                                    <p className="font-bold">
                                        {booking.peserta}
                                    </p>
                                </div>

                                <div>
                                    <label className="block font-medium text-black-700 text-[12px]">
                                        Layanan
                                    </label>
                                    {booking.layanan.length > 0 ? (
                                        <ul className="list-disc ml-5 font-bold">
                                            {booking.layanan.map((layanan) => (
                                                <li key={layanan.id}>
                                                    {layanan.nama_layanan}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">
                                            Tidak ada layanan yang dipilih.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block font-medium text-black-700 text-[12px]">
                                        Lokasi
                                    </label>
                                    <p className="font-bold">
                                        {booking.lokasi}
                                    </p>
                                </div>

                                <div>
                                    <label className="block font-medium text-black-700 text-[12px]">
                                        Nomor Telepon
                                    </label>
                                    <p className="font-bold">{booking.no_hp}</p>
                                </div>

                                <div>
                                    <label className="block font-medium text-black-700 text-[12px]">
                                        Surat Permintaan
                                    </label>
                                    {booking.surat ? (
                                        <a
                                            href={route("surat.show", {
                                                filename: booking.surat
                                                    .split("/")
                                                    .pop(),
                                            })}
                                            className="text-blue-500 font-bold"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Lihat Surat
                                        </a>
                                    ) : (
                                        <p className="text-gray-500">
                                            Tidak ada surat yang diunggah.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
