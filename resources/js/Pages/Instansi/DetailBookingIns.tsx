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
    kabupaten_kota: string;
    kecamatan: string;
    kenagarian_kelurahan: string;
    lokasi: string;
    no_hp: string;
    surat: string | null;
    status_booking: string;
    alasan_ditolak: string;
}

interface DetailBookingInsProps {
    booking: Booking;
}

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
        dateObj.setHours(dateObj.getHours() - 7);
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
                <div className="mx-auto max-w-4xl px-6 sm:px-8">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">
                            Pembookingan Layanan Mobil Klinik
                        </h2>

                        <dl className="grid grid-cols-1 gap-y-6 text-gray-700">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Jadwal
                                </dt>
                                <dd className="whitespace-pre-line font-semibold text-gray-900">
                                    {formatJadwalLengkap(
                                        booking.tanggal_mulai,
                                        booking.tanggal_akhir,
                                        booking.waktu_mulai,
                                        booking.waktu_akhir
                                    )}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Acara
                                </dt>
                                <dd className="font-semibold text-gray-900">
                                    {booking.acara}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Jumlah Peserta
                                </dt>
                                <dd className="font-semibold text-gray-900">
                                    {booking.peserta}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Kabupaten/Kota
                                </dt>
                                <dd className="font-semibold text-gray-900">
                                    {booking.kabupaten_kota}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Kecamatan
                                </dt>
                                <dd className="font-semibold text-gray-900">
                                    {booking.kecamatan}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Kenagarian/Kelurahan
                                </dt>
                                <dd className="font-semibold text-gray-900">
                                    {booking.kenagarian_kelurahan}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Lokasi
                                </dt>
                                <dd className="font-semibold text-gray-900">
                                    {booking.lokasi}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Nomor Telepon
                                </dt>
                                <dd className="font-semibold text-gray-900">
                                    {booking.no_hp}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Layanan
                                </dt>
                                {booking.layanan.length > 0 ? (
                                    <ul className="list-disc list-inside font-semibold text-gray-900">
                                        {booking.layanan.map((layanan) => (
                                            <li key={layanan.id}>
                                                {layanan.nama_layanan}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic">
                                        Tidak ada layanan yang dipilih.
                                    </p>
                                )}
                            </div>

                            {booking.status_booking === "Ditolak" && (
                                <div>
                                    <dt className="text-sm font-medium text-red-500 mb-1">
                                        Alasan Ditolak
                                    </dt>
                                    <dd className="font-semibold text-red-700">
                                        {booking.alasan_ditolak}
                                    </dd>
                                </div>
                            )}

                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Surat Permintaan
                                </dt>
                                {booking.surat ? (
                                    <a
                                        href={route("surat.show", {
                                            filename: booking.surat
                                                .split("/")
                                                .pop(),
                                        })}
                                        className="text-blue-600 font-semibold hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Lihat Surat
                                    </a>
                                ) : (
                                    <p className="text-gray-500 italic">
                                        Tidak ada surat yang diunggah.
                                    </p>
                                )}
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
