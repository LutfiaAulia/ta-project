import React from "react";
import { usePage } from "@inertiajs/react";

interface LaporanData {
    judul: string;
    dasar: string;
    maksud: string;
    tujuan: string;
    personil: Array<{ nama: string }>;
    tanggal_mulai: string;
    tanggal_akhir: string;
    biaya: string;
    ringkasan_pelaksanaan: string;
    layanan: string;
    pelakuUsaha: Array<{
        nama_lengkap: string;
        no_hp: string;
        jenis_kelamin: string;
        kenagarian_kelurahan: string;
        email?: string;
    }>;
    kesimpulan: string[];
    saran: string[];
    nama_penulis: string;
    durasi: number;
    tanggalLaporan: string;
    dokumentasi: Array<{
        id_dokumentasi: number;
        nama_file: string;
        path_file: string;
    }>;
}

const LaporanTemplate: React.FC = () => {
    const { laporan = null } = usePage().props as {
        laporan?: LaporanData | null;
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

    const formatJadwal = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const isSameDay =
            startDate.getDate() === endDate.getDate() &&
            startDate.getMonth() === endDate.getMonth() &&
            startDate.getFullYear() === endDate.getFullYear();

        if (isSameDay) {
            return `${formatDate(start)}`;
        }

        const isSameMonth =
            startDate.getMonth() === endDate.getMonth() &&
            startDate.getFullYear() === endDate.getFullYear();

        if (isSameMonth) {
            return `${startDate.getDate()} – ${formatDate(end)}`;
        }

        return `${formatDate(start)} – ${formatDate(end)}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 font-times text-[12pt]">
            <div className="max-w-4xl mx-auto bg-white min-h-screen print:shadow-none print:max-w-none print:mx-0">
                <div className="p-8 print:p-0">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            {/* Logo */}
                            <div className="mr-4">
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="w-20 h-20 object-contain"
                                />
                            </div>

                            {/* Teks Header */}
                            <div>
                                <h1 className="text-[14pt] font-bold">
                                    PEMERINTAH PROVINSI SUMATERA BARAT
                                </h1>
                                <h2 className="text-[24pt] font-bold mb-1">
                                    DINAS KOPERASI UKM
                                </h2>
                                <p className="text-[10pt]">
                                    Jalan Khatib Sulaiman No. 11. (0751) 7055292
                                    – 7055298 Fax. (0751) 7052701 Padang
                                </p>
                            </div>
                        </div>

                        <div className="border-t-2 border-black w-full my-4"></div>
                        <h3 className=" text-[14pt] font-bold">
                            {laporan.judul}
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
                        <div className="flex mb-2">
                            <div className="w-36 flex">
                                <span className="mr-2 font-medium">I.</span>
                                <span className="font-medium">Dasar</span>
                            </div>
                            <div className="flex-1 flex">
                                <span className="mr-2">:</span>
                                <p className="flex-1 text-justify">
                                    {laporan.dasar}
                                </p>
                            </div>
                        </div>

                        {/* Maksud */}
                        <div className="flex mb-2">
                            <div className="w-36 flex">
                                <span className="mr-2 font-medium">II.</span>
                                <span className="font-medium">Maksud</span>
                            </div>
                            <div className="flex-1 flex">
                                <span className="mr-2">:</span>
                                <p className="flex-1 text-justify">
                                    {laporan.maksud}
                                </p>
                            </div>
                        </div>

                        {/* Tujuan */}
                        <div className="flex mb-2">
                            <div className="w-36 flex">
                                <span className="mr-2 font-medium">III.</span>
                                <span className="font-medium">Tujuan</span>
                            </div>
                            <div className="flex-1 flex">
                                <span className="mr-2">:</span>
                                <p className="flex-1 text-justify">
                                    {laporan.tujuan}
                                </p>
                            </div>
                        </div>

                        {/* Personil */}
                        <div className="flex mb-2">
                            <div className="w-36 flex">
                                <span className="mr-2 font-medium">IV.</span>
                                <span className="font-medium">Personil</span>
                            </div>
                            <div className="flex-1 flex">
                                <span className="mr-2">:</span>
                                <div>
                                    {laporan.personil.map((person, index) => (
                                        <div key={index} className="flex">
                                            <span className="w-8">
                                                {index + 1}.
                                            </span>
                                            <span>{person.nama}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Jadwal */}
                        <div className="flex mb-2">
                            <div className="w-36 flex">
                                <span className="mr-2 font-medium">V.</span>
                                <span className="font-medium">Jadwal</span>
                            </div>
                            <div className="flex-1 flex">
                                <span className="mr-2">:</span>
                                <p className="flex-1 text-justify">
                                    {formatJadwal(
                                        laporan.tanggal_mulai,
                                        laporan.tanggal_akhir
                                    )}{" "}
                                    ({laporan.durasi} hari)
                                </p>
                            </div>
                        </div>

                        {/* Biaya */}
                        <div className="flex mb-2">
                            <div className="w-36 flex">
                                <span className="mr-2 font-medium">VI.</span>
                                <span className="font-medium">Biaya</span>
                            </div>
                            <div className="flex-1 flex">
                                <span className="mr-2">:</span>
                                <p className="flex-1 text-justify">
                                    {laporan.biaya}
                                </p>
                            </div>
                        </div>

                        {/* Pelaksanaan */}
                        <div>
                            <div className="flex mb-2">
                                <span className="mr-2 font-medium">VII.</span>
                                <span className="font-medium">PELAKSANAAN</span>
                            </div>
                            <div className="flex-1 text-justify">
                                <p className="mb-4 ml-10 indent-8">
                                    {laporan.ringkasan_pelaksanaan}
                                </p>
                                <p className="font-medium mb-4 ml-10 indent-8">
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
                                                    {pelaku.jenis_kelamin}
                                                </td>
                                                <td className="border border-black px-2 py-1 text-center">
                                                    {
                                                        pelaku.kenagarian_kelurahan
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Kesimpulan dan Saran */}
                        <div className="mt-8">
                            <div className="flex mb-2">
                                <span className="mr-2 font-medium">VIII.</span>
                                <span className="font-medium">
                                    KESIMPULAN DAN SARAN
                                </span>
                            </div>

                            {/* Kesimpulan */}
                            <div className="ml-10 mt-2">
                                <div className="font-medium mb-2">
                                    a. Kesimpulan
                                </div>
                                <div className="ml-4">
                                    {laporan.kesimpulan.map((item, index) => (
                                        <div key={index} className="mb-3 flex">
                                            <p className="text-justify flex-1">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Saran */}
                            <div className="ml-10 mt-4">
                                <div className="font-medium mb-2">b. Saran</div>
                                <div className="ml-4">
                                    {laporan.saran.map((item, index) => (
                                        <div key={index} className="mb-3 flex">
                                            <p className="text-justify flex-1">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Penutup */}
                        <div className="mt-8 text-justify indent-8">
                            <p>
                                Demikianlah laporan perjalanan dinas ini kami
                                sampaikan sebagai bahan masukan, arahan, dan
                                petunjuk selanjutnya kami ucapkan terima kasih.
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
                                    <div className="w-40"></div>
                                </div>
                                <p className="font-medium">
                                    {laporan.nama_penulis}
                                </p>
                            </div>
                        </div>

                        {/* Dokumentasi */}
                        <div className="mt-12 print:break-before-page">
                            <h3 className="font-bold text-center mb-6 text-[14pt]">
                                Dokumentasi
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {laporan.dokumentasi.length > 0
                                    ? laporan.dokumentasi.map((doc, index) => (
                                          <div
                                              key={doc.id_dokumentasi}
                                              className="border border-gray-300 h-48 flex items-center justify-center bg-gray-50 overflow-hidden"
                                          >
                                              <img
                                                  src={`/storage/${doc.path_file}`}
                                                  alt={`Dokumentasi ${
                                                      index + 1
                                                  }`}
                                                  className="h-full w-full object-cover"
                                              />
                                          </div>
                                      ))
                                    : [1, 2, 3, 4, 5, 6].map((num) => (
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
