import Header from "@/Components/HeaderHU";
import Footer from "@/Components/FooterHU";
import { Link, Head } from "@inertiajs/react";
import {
    Calendar,
    User,
    ClipboardList,
    Home as HomeIcon,
    ChevronRight,
} from "lucide-react";
interface Berita {
    id_berita: number;
    judul: string;
    tanggal_publikasi: string;
    ringkasan: string;
    gambar: string;
    isi_berita: string;
    penulis?: string;
}

interface BeritaLain {
    id_berita: number;
    judul: string;
    tanggal_publikasi: string;
    slug: string;
}

interface DetailBeritaProps {
    berita: Berita;
    beritaLain: BeritaLain[];
}
// ------------------------------------

export default function DetailBerita({
    berita,
    beritaLain,
}: DetailBeritaProps) {
    function formatTanggalPublikasi(tanggal: string): string {
        const datePart = tanggal.split(" ")[0];
        const date = new Date(datePart);

        if (isNaN(date.getTime())) {
            return "Tanggal tidak valid";
        }

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
            <Head title={berita.judul} />
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
                        <Link href="/berita" className="hover:text-green-600">
                            Arsip Berita
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-gray-900 font-medium line-clamp-1 max-w-xs">
                            {berita.judul}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Konten Utama Berita */}
                        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-xl shadow-lg">
                            {/* Judul Berita */}
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                                {berita.judul}
                            </h1>

                            {/* Metadata Penulis & Tanggal */}
                            <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-6 pb-4 border-b border-gray-100">
                                <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-green-600" />
                                    {formatTanggalPublikasi(
                                        berita.tanggal_publikasi
                                    )}
                                </span>
                                {berita.penulis && (
                                    <span className="flex items-center">
                                        <User className="w-4 h-4 mr-2 text-green-600" />
                                        Oleh: {berita.penulis}
                                    </span>
                                )}
                            </div>

                            {/* Gambar Utama */}
                            <img
                                src={getImagePath(berita.gambar)}
                                alt={berita.judul}
                                className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8 shadow-md"
                            />

                            {/* Ringkasan */}
                            {berita.ringkasan && (
                                <p className="text-xl font-semibold text-gray-700 mb-6 border-l-4 border-green-500 pl-4 italic">
                                    {berita.ringkasan}
                                </p>
                            )}

                            {/* Isi Berita */}
                            <div
                                className="prose max-w-none text-gray-800 leading-relaxed lg:prose-lg
               [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4 [&>ol]:space-y-2
               [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ul]:space-y-2
               [&>p]:mb-4
               [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3
               [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-4 [&>h3]:mb-2
               [&>img]:rounded-xl [&>img]:shadow-md [&>img]:my-6"
                                dangerouslySetInnerHTML={{
                                    __html: berita.isi_berita,
                                }}
                            ></div>
                        </div>

                        {/* Berita Lainnya */}
                        <aside className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                                <h3 className="text-xl font-bold text-green-700 pb-4 mb-4 border-b border-gray-200 flex items-center">
                                    <ClipboardList className="w-5 h-5 mr-2" />
                                    Berita Lainnya
                                </h3>
                                <ul className="space-y-4">
                                    {beritaLain.map((item) => (
                                        <li key={item.id_berita}>
                                            <Link
                                                href={`/berita/${item.slug}`}
                                                className="block hover:bg-green-50 p-2 -m-2 rounded transition-colors group"
                                            >
                                                <p className="font-semibold text-gray-800 group-hover:text-green-700 line-clamp-2">
                                                    {item.judul}
                                                </p>
                                                <span className="text-xs text-gray-500 flex items-center mt-0.5">
                                                    <Calendar className="w-3 h-3 inline mr-1" />
                                                    {formatTanggalPublikasi(
                                                        item.tanggal_publikasi
                                                    )}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                    {beritaLain.length === 0 && (
                                        <li className="text-gray-600 italic text-sm">
                                            Tidak ada berita lainnya yang
                                            tersedia.
                                        </li>
                                    )}
                                </ul>

                                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                                    <Link
                                        href="/berita"
                                        className="text-sm text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
                                    >
                                        Lihat Semua Arsip Berita
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
