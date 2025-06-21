import React from "react";
import { usePage } from "@inertiajs/react";

interface PreviewData {
    judul: string;
    dasar: string;
    maksud: string;
    tujuan: string;
    personil: Array<{ nama: string;}>;
    tanggal_mulai: string;
    tanggal_akhir: string;
    biaya: string;
    ringkasan_pelaksanaan: string;
    layanan: string;
    pelakuUsaha: Array<{
        nama_lengkap: string;
        no_hp: string;
        jenisKelamin: string;
        kenagarian_kelurahan: string;
        email?: string;
    }>;
    kesimpulan: string[];
    saran: string[];
    nama_penulis: string;
    durasi: number;
    tanggalLaporan: string;
}

const LaporanTemplate: React.FC = () => {
    const { laporan = null } = usePage().props as {
        laporan?: PreviewData | null;
    };

    if (!laporan) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Data laporan tidak tersedia.
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto bg-white min-h-screen print:shadow-none print:max-w-none print:mx-0">
                <div className="p-8 print:p-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mb-4">
                            <h1 className="text-lg font-bold mb-2">
                                PEMERINTAH PROVINSI SUMATERA BARAT
                            </h1>
                            <h2 className="text-lg font-bold mb-4">
                                DINAS KOPERASI UKM
                            </h2>
                            <p className="text-sm">
                                Jalan Khatib Sulaiman No. 11. (0751) 7055292 –
                                7055298 Fax. (0751) 7052701 Padang
                            </p>
                        </div>
                        <div className="border-t-2 border-black w-full my-4"></div>
                        <h3 className="text-base font-bold">
                            LAPORAN PERJALANAN DINAS DALAM RANGKA FASILITASI
                            MILLENNIAL ENTREPRENEUR
                        </h3>
                    </div>

                    {/* Tujuan Surat */}
                    <div className="mb-6">
                        <div className="flex mb-2">
                            <span className="w-20 font-medium">Kepada</span>
                            <span className="mr-2">:</span>
                            <span>
                                Yth. Bapak Kepala Dinas Koperasi UKM Provinsi
                                Sumatera Barat
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-20 font-medium">Melalui</span>
                            <span className="mr-2">:</span>
                            <span>KPA Bidang PUK</span>
                        </div>
                    </div>

                    {/* Detail Laporan */}
                    <div className="space-y-4">
                        {/* Dasar */}
                            <div className="flex">
                                <span className="w-8 font-medium">I.</span>
                                <div>
                                    <span className="font-medium">Dasar</span>
                                    <span className="ml-8">
                                        : {laporan.dasar}
                                    </span>
                                </div>
                            </div>

                        {/* Maksud */}
                        <div>
                            <div className="flex">
                                <span className="w-8 font-medium">II.</span>
                                <div>
                                    <span className="font-medium">Maksud</span>
                                    <span className="ml-4">
                                        : {laporan.maksud}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-16">
                                Millennial Entrepreneur.
                            </div>
                        </div>

                        {/* Tujuan */}
                        <div>
                            <div className="flex">
                                <span className="w-8 font-medium">III.</span>
                                <div>
                                    <span className="font-medium">Tujuan</span>
                                    <span className="ml-6">
                                        : {laporan.tujuan}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Personil */}
                        <div>
                            <div className="flex">
                                <span className="w-8 font-medium">IV.</span>
                                <span className="font-medium">Personil</span>
                                <span className="ml-6">:</span>
                            </div>
                            <div className="ml-16">
                                {laporan.personil.map((person, index) => (
                                    <div key={index} className="flex">
                                        <span className="w-8">
                                            {index + 1}.
                                        </span>
                                        <span>
                                            {person.nama}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Jadwal */}
                        <div>
                            <div className="flex">
                                <span className="w-8 font-medium">V.</span>
                                <div>
                                    <span className="font-medium">Jadwal</span>
                                    <span className="ml-8">
                                        : {formatDate(laporan.tanggal_mulai)} -{" "}
                                        {formatDate(laporan.tanggal_akhir)} (
                                        {laporan.durasi} hari)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Biaya */}
                            <div className="flex">
                                <span className="w-8 font-medium">VI.</span>
                                <div>
                                    <span className="font-medium">Biaya</span>
                                    <span className="ml-10">
                                        : {laporan.biaya}
                                    </span>
                                </div>
                            </div>

                        {/* Pelaksanaan */}
                        <div>
                            <div className="flex">
                                <span className="w-8 font-medium">VII.</span>
                                <span className="font-medium">PELAKSANAAN</span>
                            </div>
                            <div className="ml-16 text-justify">
                                <p className="mb-4">
                                    {laporan.ringkasan_pelaksanaan}
                                </p>
                                <p className="font-medium mb-4">
                                    Berikut data pelaku usaha yang sudah
                                    difasilitasi {laporan.layanan}:
                                </p>
                            </div>
                        </div>

                        {/* Tabel Pelaku Usaha */}
                        <div className="ml-16">
                            <table className="w-full border-collapse border border-black text-sm">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-black px-2 py-1 text-center w-12">
                                            No
                                        </th>
                                        <th className="border border-black px-2 py-1 text-center">
                                            Nama
                                        </th>
                                        <th className="border border-black px-2 py-1 text-center">
                                            No. HP / Email
                                        </th>
                                        <th className="border border-black px-2 py-1 text-center">
                                            Jenis Kelamin
                                        </th>
                                        <th className="border border-black px-2 py-1 text-center">
                                            Alamat
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {laporan.pelakuUsaha.map(
                                        (pelaku, index) => (
                                            <tr key={index}>
                                                <td className="border border-black px-2 py-1 text-center">
                                                    {index + 1}
                                                </td>
                                                <td className="border border-black px-2 py-1">
                                                    {pelaku.nama_lengkap}
                                                </td>
                                                <td className="border border-black px-2 py-1 text-center">
                                                    {pelaku.email ||
                                                        pelaku.no_hp}
                                                </td>
                                                <td className="border border-black px-2 py-1 text-center">
                                                    {pelaku.jenisKelamin}
                                                </td>
                                                <td className="border border-black px-2 py-1 text-center">
                                                    {pelaku.kenagarian_kelurahan}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Kesimpulan dan Saran */}
                        <div className="mt-8">
                            <div className="flex">
                                <span className="w-8 font-medium">VIII.</span>
                                <span className="font-medium">
                                    KESIMPULAN DAN SARAN
                                </span>
                            </div>

                            {/* Kesimpulan */}
                            <div className="ml-16 mt-4">
                                <div className="font-medium mb-2">
                                    a. Kesimpulan
                                </div>
                                <div className="ml-4">
                                    {laporan.kesimpulan.map((item, index) => (
                                        <div key={index} className="mb-3 flex">
                                            <span className="w-8">
                                                {index + 1}.
                                            </span>
                                            <p className="text-justify flex-1">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Saran */}
                            <div className="ml-16 mt-6">
                                <div className="font-medium mb-2">b. Saran</div>
                                <div className="ml-4">
                                    {laporan.saran.map((item, index) => (
                                        <div key={index} className="mb-3 flex">
                                            <span className="w-8">
                                                {index + 1}.
                                            </span>
                                            <p className="text-justify flex-1">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Penutup */}
                        <div className="mt-8 text-justify">
                            <p>
                                Demikianlah laporan perjalanan dinas ini kami
                                sampaikan kepada Bapak sebagai bahan masukan,
                                arahan, dan petunjuk selanjutnya. Terima kasih.
                            </p>
                        </div>

                        {/* Tanda tangan */}
                        <div className="mt-12 flex justify-end">
                            <div className="text-center">
                                <p>
                                    Padang, {formatDate(laporan.tanggalLaporan)}
                                </p>
                                <p className="mt-2">
                                    a/n Yang melakukan perjalanan dinas
                                </p>
                                <div className="mt-16 mb-2">
                                    <div className="w-32 border-b border-black"></div>
                                </div>
                                <p className="font-medium">
                                    {laporan.nama_penulis}
                                </p>
                            </div>
                        </div>

                        {/* Dokumentasi */}
                        <div className="mt-12 print:break-before-page">
                            <h3 className="font-bold text-center mb-6">
                                Dokumentasi
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <div
                                        key={num}
                                        className="border border-gray-300 h-48 flex items-center justify-center bg-gray-50"
                                    >
                                        <span className="text-gray-500">
                                            Foto Dokumentasi {num}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaporanTemplate;
