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

    return { tanggal: tgl, waktu: jam };
};

const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "disetujui":
            case "approved":
                return "bg-green-100 text-green-800 border-green-200";
            case "ditolak":
            case "rejected":
                return "bg-red-100 text-red-800 border-red-200";
            case "pending":
            case "menunggu":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                status
            )}`}
        >
            {status}
        </span>
    );
};

const InfoCard = ({
    icon,
    title,
    children,
    className = "",
}: {
    icon: string;
    title: string;
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`bg-gray-50 rounded-lg p-4 border border-gray-200 ${className}`}
    >
        <div className="flex items-center mb-2">
            <span className="text-xl mr-2">{icon}</span>
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {title}
            </h3>
        </div>
        <div className="text-gray-900">{children}</div>
    </div>
);

export default function DetailBookingIns({ booking }: DetailBookingInsProps) {
    const { tanggal, waktu } = formatJadwalLengkap(
        booking.tanggal_mulai,
        booking.tanggal_akhir,
        booking.waktu_mulai,
        booking.waktu_akhir
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail Pembookingan
                    </h2>
                    <StatusBadge status={booking.status_booking} />
                </div>
            }
        >
            <Head title="Detail Booking" />
            <div className="py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {/* Header Card */}
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
                        <div className="bg-white to-blue-700 px-8 py-6">
                            <div className="flex items-center">
                                <div>
                                    <h1 className="text-2xl font-bold text-green">
                                        Pembookingan Layanan Mobil Klinik
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Event Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Schedule & Event Info */}
                            <div className="bg-white shadow-md rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                    <span className="text-xl mr-2">📅</span>
                                    Jadwal & Acara
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InfoCard icon="📅" title="Tanggal">
                                        <p className="font-semibold text-lg">
                                            {tanggal}
                                        </p>
                                    </InfoCard>

                                    <InfoCard icon="⏰" title="Waktu">
                                        <p className="font-semibold text-lg">
                                            {waktu}
                                        </p>
                                    </InfoCard>
                                </div>

                                <div className="mt-6">
                                    <InfoCard icon="🎯" title="Nama Acara">
                                        <p className="font-semibold text-lg">
                                            {booking.acara}
                                        </p>
                                    </InfoCard>
                                </div>

                                <div className="mt-6">
                                    <InfoCard icon="👥" title="Jumlah Peserta">
                                        <p className="font-semibold text-lg">
                                            {booking.peserta} orang
                                        </p>
                                    </InfoCard>
                                </div>
                            </div>

                            {/* Location Details */}
                            <div className="bg-white shadow-md rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                    <span className="text-xl mr-2">📍</span>
                                    Lokasi Acara
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InfoCard icon="🏛️" title="Kabupaten/Kota">
                                        <p className="font-medium">
                                            {booking.kabupaten_kota}
                                        </p>
                                    </InfoCard>

                                    <InfoCard icon="🏘️" title="Kecamatan">
                                        <p className="font-medium">
                                            {booking.kecamatan}
                                        </p>
                                    </InfoCard>

                                    <InfoCard
                                        icon="🏠"
                                        title="Kenagarian/Kelurahan"
                                    >
                                        <p className="font-medium">
                                            {booking.kenagarian_kelurahan}
                                        </p>
                                    </InfoCard>

                                    <InfoCard icon="📞" title="Nomor Telepon">
                                        <p className="font-medium">
                                            {booking.no_hp}
                                        </p>
                                    </InfoCard>
                                </div>

                                <div className="mt-4">
                                    <InfoCard icon="📌" title="Alamat Lengkap">
                                        <p className="font-medium">
                                            {booking.lokasi}
                                        </p>
                                    </InfoCard>
                                </div>
                            </div>

                            {/* Rejection Reason (if applicable) */}
                            {booking.status_booking === "Ditolak" && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                    <h2 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                                        <span className="text-xl mr-2">❌</span>
                                        Alasan Penolakan
                                    </h2>
                                    <div className="bg-white rounded-lg p-4 border border-red-200">
                                        <p className="text-red-700 font-medium">
                                            {booking.alasan_ditolak}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Services & Documents */}
                        <div className="space-y-6">
                            {/* Services */}
                            <div className="bg-white shadow-md rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <span className="text-xl mr-2">🏥</span>
                                    Layanan
                                </h2>

                                {booking.layanan.length > 0 ? (
                                    <div className="space-y-3">
                                        {booking.layanan.map((layanan) => (
                                            <div
                                                key={layanan.id}
                                                className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                                            >
                                                <div className="flex items-center">
                                                    <span className="text-blue-600 mr-2">
                                                        ✓
                                                    </span>
                                                    <p className="font-medium text-blue-900">
                                                        {layanan.nama_layanan}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <span className="text-3xl block mb-2">
                                            📝
                                        </span>
                                        <p className="italic">
                                            Tidak ada layanan yang dipilih
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Documents */}
                            <div className="bg-white shadow-md rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <span className="text-xl mr-2">📄</span>
                                    Dokumen
                                </h2>

                                <div className="space-y-3">
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-medium text-gray-700 mb-2">
                                            Surat Permintaan
                                        </h3>
                                        {booking.surat ? (
                                            <a
                                                href={route("surat.show", {
                                                    filename: booking.surat
                                                        .split("/")
                                                        .pop(),
                                                })}
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="mr-2">📎</span>
                                                Lihat Surat
                                            </a>
                                        ) : (
                                            <div className="text-center py-4 text-gray-500">
                                                <span className="text-2xl block mb-1">
                                                    📄
                                                </span>
                                                <p className="text-sm italic">
                                                    Tidak ada surat yang
                                                    diunggah
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
