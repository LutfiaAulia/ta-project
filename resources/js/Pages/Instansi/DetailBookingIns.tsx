import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface Layanan {
    id: number;
    nama_layanan: string;
}

interface Booking {
    id_booking: number;
    jadwal: string;
    acara: string;
    peserta: number;
    layanan: Layanan[]; // sekarang array, bukan string
    lokasi: string;
    no_hp: string;
    surat: string | null;
}

interface DetailBookingInsProps {
    booking: Booking;
}

function formatTanggal(tanggal: string): string {
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    return new Date(tanggal).toLocaleDateString("id-ID", options);
}

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
                                    <p className="font-bold">
                                        {formatTanggal(booking.jadwal)}
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
