import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }: any) {
    return (
        <>
            <Head title="Beranda" />
            <div className="min-h-screen bg-[#F2FBF2] text-gray-800">
                {/* Header */}
                <header className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow">
                    <div className="flex items-center space-x-3">
                        <img src="/logo.png" alt="Logo" className="h-12" />
                        <div>
                            <h1 className="text-lg font-bold leading-tight">
                                Dinas Koperasi dan UMKM
                            </h1>
                            <p className="text-sm">Provinsi Sumatera Barat</p>
                        </div>
                    </div>
                    <nav className="space-x-6 text-sm font-medium">
                        <Link href="#" className="hover:underline">
                            Beranda
                        </Link>
                        <Link href="#" className="hover:underline">
                            Tentang Program
                        </Link>
                        <Link href={route("login")} className="hover:underline">
                            Booking Mobil Klinik
                        </Link>
                        <Link href="#" className="hover:underline">
                            Bantuan & Kontak
                        </Link>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="bg-white px-[3cm] py-16 grid lg:grid-cols-2 gap-12 items-center bg-[url('/images/pattern-light.png')] bg-cover">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            Mendekatkan Pelayanan,
                            <br />
                            Mendukung UMKM Rakyat
                        </h2>
                        <p className="text-gray-600 mb-6 max-w-lg">
                            Pelayanan langsung ke masyarakat melalui mobil
                            klinik dan promosi produk-produk lokal unggulan.
                        </p>
                        <div className="space-x-4">
                            <Link
                                href={route("login")}
                                className="bg-green-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-800 transition"
                            >
                                Booking Mobil Klinik
                            </Link>
                            <Link
                                href={route("umkm.login.form")}
                                className="bg-green-200 text-green-900 px-6 py-3 rounded-md font-semibold hover:bg-green-300 transition"
                            >
                                Lihat Produk UMKM
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <img
                            src="/images/umkmhu.png"
                            alt="Mobil Klinik"
                            className="max-h-80 rounded-lg shadow-lg"
                        />
                    </div>
                </section>

                {/* Layanan Mobil Klinik */}
                <section className="bg-green-50 px-[3cm] py-16 grid md:grid-cols-2 items-center gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            Layanan Mobil Klinik untuk Masyarakat
                        </h3>
                        <p className="text-sm mb-6 text-gray-700 max-w-md">
                            Mobil klinik UMKM memberikan layanan konsultasi
                            usaha, legalitas seperti NIB, perizinan halal,
                            hingga akses permodalan langsung ke daerah.
                        </p>
                        <div className="bg-white rounded-lg p-5 shadow-md">
                            <p className="text-sm mb-2 font-semibold">
                                Jadwal Layanan Terdekat
                            </p>
                            <div className="overflow-x-auto">
                                <iframe
                                    src="https://calendar.google.com/calendar/embed?src=your-calendar-id%40group.calendar.google.com&ctz=Asia%2FJakarta"
                                    style={{ border: 0 }}
                                    className="w-full h-80"
                                    frameBorder="0"
                                    scrolling="no"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="/images/mobilklinik.jpg"
                            alt="Dokter"
                            className="rounded-full w-80 h-80 object-cover border-4 border-white shadow-md"
                        />
                    </div>
                </section>

                {/* Produk UMKM */}
                <section className="bg-white px-6 py-16">
                    <h3 className="text-2xl font-semibold mb-10 text-center">
                        Dukung Produk Lokal UMKM
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                        {[
                            {
                                img: "/keripik-balado.png",
                                name: "Keripik Balado",
                                price: "Rp 15.000",
                            },
                            {
                                img: "/batik.png",
                                name: "Batik Tulis",
                                price: "Rp 200.000",
                            },
                            {
                                img: "/kopi.png",
                                name: "Kopi Bubuk",
                                price: "Rp 30.000",
                            },
                            {
                                img: "/tas-tenun.png",
                                name: "Tas Tenun",
                                price: "Rp 150.000",
                            },
                        ].map((product, idx) => (
                            <div key={idx} className="text-center">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="h-32 mx-auto mb-2 object-contain"
                                />
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-gray-600">
                                    {product.price}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link
                            href="#"
                            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
                        >
                            Lihat Semua Produk
                        </Link>
                    </div>
                </section>

                {/* Testimoni */}
                <section className="bg-green-50 px-6 py-16">
                    <h3 className="text-2xl font-semibold mb-10 text-center">
                        Apa Kata Pelaku UMKM?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Budi, Pengrajin Anyaman",
                                quote: "Dengan layanan mobil klinik UMKM, saya bisa mengurus NIB lebih cepat.",
                            },
                            {
                                name: "Sari, Pemilik Kopi Minang",
                                quote: "Produk saya bisa dipromosikan lebih luas. Terima kasih Dinas UMKM!",
                            },
                            {
                                name: "Andi, Pengusaha Batik",
                                quote: "Program pelatihan sangat membantu menaikkan kualitas produk saya.",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-5 rounded-lg shadow text-sm"
                            >
                                <p className="mb-3">"{item.quote}"</p>
                                <p className="font-medium text-green-700">
                                    – {item.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-green-700 text-white px-6 py-6 text-sm mt-10">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p>
                            © 2025 Dinas Koperasi dan UMKM Provinsi Sumatera
                            Barat
                        </p>
                        <div className="space-x-4 mt-2 md:mt-0">
                            <Link href="#" className="hover:underline">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="hover:underline">
                                Kontak
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
