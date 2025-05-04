import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function DashboardIns() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-[3cm] py-[0.5cm]">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg px-[1cm]">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">
                                Selamat datang di Aplikasi Pembookingan Mobil
                                Klinik
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 text-justify">
                                Aplikasi ini disediakan oleh Dinas Koperasi dan
                                UKM Provinsi Sumatera Barat dengan tujuan untuk
                                memudahkan instansi ataupun organisasi usaha dalam
                                melakukan pembookingan mobil klinik.
                                Aplikasi ini dirancang untuk memberikan kemudahan
                                bagi UMKM dalam memperoleh bantuan untuk meningkatkan
                                usaha mereka. Melalui aplikasi ini, Anda dapat dengan mudah melakukan
                                pembookingan sesuai dengan jadwal yang tersedia,
                                yang tentunya akan disesuaikan dengan kebutuhan. Kami berharap aplikasi
                                ini dapat mendukung dalam melayani UMKM
                                di Provinsi Sumatera Barat dan mempercepat akses
                                ke layanan yang dapat meningkatkan kualitas
                                usaha.
                            </p>

                            <p className="text-sm text-gray-600">
                                Jika Anda memiliki pertanyaan atau membutuhkan
                                bantuan lebih lanjut, silakan hubungi kami di:
                                <br />
                                <strong>Email:</strong>{" "}
                                <a
                                    href="mailto:kontak@dinasukm.sumbarselatan.go.id"
                                    className="text-blue-500"
                                >
                                    kontak@dinasukm.sumbarselatan.go.id
                                </a>
                                <br />
                                <strong>Telepon:</strong> (0751) 1234567
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
