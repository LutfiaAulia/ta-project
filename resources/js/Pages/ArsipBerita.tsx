import Header from "@/Components/HeaderHU";
import Footer from "@/Components/FooterHU";
import { Link, Head } from "@inertiajs/react";
import { Calendar, User, ChevronRight, Home as HomeIcon } from "lucide-react";
import Pagination from "@/Components/Pagination";

interface BeritaItem {
    id_berita: number;
    judul: string;
    ringkasan: string;
    gambar: string;
    tanggal_publikasi: string;
    slug: string;
    penulis?: string;
}

interface PaginatedData<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

interface ArsipBeritaProps {
    berita: PaginatedData<BeritaItem>;
}
// ------------------------------------

export default function ArsipBerita({ berita }: ArsipBeritaProps) {
    function formatTanggalPublikasi(tanggal: string): string {
        const datePart = tanggal.split(" ")[0];
        const date = new Date(datePart);
        if (isNaN(date.getTime())) return "Tanggal tidak valid";

        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
        } as const;

        return date.toLocaleDateString("id-ID", options);
    }

    const getImagePath = (path: string) => {
        return path?.startsWith("/storage/") ? path : `/storage/${path}`;
    };

    return (
        <>
            <Head title="Arsip Berita" />
            <Header />

            <main className="bg-gray-50 py-10 md:py-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Link
                            href="/"
                            className="hover:text-green-600 flex items-center"
                        >
                            <HomeIcon className="w-4 h-4 mr-1" /> Beranda
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-gray-900 font-medium">
                            Arsip Berita
                        </span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">
                        📰 Arsip Berita Terbaru
                    </h1>

                    {/* Konten Daftar Berita */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {berita.data.length > 0 ? (
                            berita.data.map((item) => (
                                <Link
                                    key={item.id_berita}
                                    href={route("berita.show", item.slug)}
                                    className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                >
                                    {/* Kartu Berita */}
                                    <img
                                        src={getImagePath(item.gambar)}
                                        alt={item.judul}
                                        className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-90"
                                    />
                                    <div className="p-5">
                                        {/* Metadata */}
                                        <div className="text-xs text-gray-500 mb-3 flex flex-wrap gap-x-3">
                                            <span className="flex items-center">
                                                <Calendar className="w-3 h-3 mr-1 text-green-600" />
                                                {formatTanggalPublikasi(
                                                    item.tanggal_publikasi
                                                )}
                                            </span>
                                            <span className="flex items-center">
                                                <User className="w-3 h-3 mr-1 text-green-600" />
                                                {item.penulis || "Admin"}
                                            </span>
                                        </div>

                                        {/* Judul */}
                                        <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-green-700 transition-colors">
                                            {item.judul}
                                        </h2>

                                        {/* Ringkasan */}
                                        <p className="text-base text-gray-600 line-clamp-3">
                                            {item.ringkasan}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            // Kondisi jika data kosong
                            <div className="md:col-span-3 text-center py-10 bg-white rounded-xl shadow-lg">
                                <p className="text-xl text-gray-600">
                                    Belum ada berita yang dipublikasikan saat
                                    ini.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {berita.data.length > 0 && (
                        <div className="mt-12">
                            <Pagination links={berita.links} />
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
