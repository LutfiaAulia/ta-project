import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";

type Umkm = {
    nama_lengkap: string;
    jenis_kelamin: string;
    umur: string;
    nik: string;
    pendidikan: string;
    no_hp: string;
    nama_usaha: string;
    legalitas_usaha: string;
    alamat_usaha: string;
    kabupaten_kota: string;
    kecamatan: string;
    kenagarian_kelurahan: string;
    tenaga_kerja: number;
    aset: number;
    omset: number;
    pendapatan_bersih: number;
    pelatihan: string;
    tindak_lanjut: string;
    layanan: string;
};

type PageProps = {
    umkm: Umkm[];
};

const PdfUmkmPerBooking: React.FC = () => {
    const { umkm = [] } = (usePage().props as unknown as PageProps) || {
        umkm: [],
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.print();
        }
    }, []);

    const exportToExcel = () => {
        const tableHeader = `
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>JK</th>
                <th>Umur</th>
                <th>NIK</th>
                <th>Pendidikan</th>
                <th>No HP</th>
                <th>Nama Usaha</th>
                <th>Legalitas Usaha</th>
                <th>Alamat</th>
                <th>Kab/Kota</th>
                <th>Kecamatan</th>
                <th>Kenagarian</th>
                <th>Tenaga Kerja</th>
                <th>Aset</th>
                <th>Omset</th>
                <th>Pendapatan</th>
                <th>Pelatihan</th>
                <th>Tindak Lanjut</th>
                <th>Layanan</th>
            </tr>
        `;

        const tableRows = umkm
            .map(
                (item, index) => `
            <tr>
                <td style="border:1px solid black; text-align:center;">${
                    index + 1
                }</td>
                <td style="border:1px solid black;">${item.nama_lengkap}</td>
                <td style="border:1px solid black; text-align:center;">${
                    item.jenis_kelamin
                }</td>
                <td style="border:1px solid black; text-align:center;">${
                    item.umur
                }</td>
                <td style="border:1px solid black;">'${item.nik}</td>
                <td style="border:1px solid black;">${item.pendidikan}</td>
                <td style="border:1px solid black;">'${item.no_hp}</td>
                <td style="border:1px solid black;">${item.nama_usaha}</td>
                <td style="border:1px solid black;">${item.legalitas_usaha}</td>
                <td style="border:1px solid black;">${item.alamat_usaha}</td>
                <td style="border:1px solid black;">${item.kabupaten_kota}</td>
                <td style="border:1px solid black;">${item.kecamatan}</td>
                <td style="border:1px solid black;">${
                    item.kenagarian_kelurahan
                }</td>
                <td style="border:1px solid black; text-align:center;">${
                    item.tenaga_kerja
                }</td>
                <td style="border:1px solid black; text-align:right;">${
                    item.aset
                }</td>
                <td style="border:1px solid black; text-align:right;">${
                    item.omset
                }</td>
                <td style="border:1px solid black; text-align:right;">${
                    item.pendapatan_bersih
                }</td>
                <td style="border:1px solid black;">${item.pelatihan}</td>
                <td style="border:1px solid black;">${item.tindak_lanjut}</td>
                <td style="border:1px solid black;">${item.layanan}</td>
            </tr>
        `
            )
            .join("");

        const tableHTML = `
            <table border="1" style="border-collapse: collapse;">
                ${tableHeader}
                ${tableRows}
            </table>
        `;

        const excelFile = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office"
                  xmlns:x="urn:schemas-microsoft-com:office:excel"
                  xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <!--[if gte mso 9]>
                <xml>
                    <x:ExcelWorkbook>
                        <x:ExcelWorksheets>
                            <x:ExcelWorksheet>
                                <x:Name>Data UMKM</x:Name>
                                <x:WorksheetOptions>
                                    <x:Print>
                                        <x:ValidPrinterInfo/>
                                    </x:Print>
                                </x:WorksheetOptions>
                            </x:ExcelWorksheet>
                        </x:ExcelWorksheets>
                    </x:ExcelWorkbook>
                </xml>
                <![endif]-->
            </head>
            <body>
                ${tableHTML}
            </body>
            </html>
        `;

        const blob = new Blob([excelFile], {
            type: "application/vnd.ms-excel",
        });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "data_umkm.xls";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-8 text-xs">
            <style>{`
                @media print {
                    button {
                        display: none !important;
                    }
                    @page {
                        size: landscape;
                    }
                    table {
                        width: 100% !important;
                    }
                }
            `}</style>
            <h1 className="text-lg font-bold text-center mb-4">
                Data Lengkap Pelayanan UMKM
            </h1>

            <button
                onClick={exportToExcel}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Export to Excel
            </button>

            <table className="w-full border-collapse border border-black text-xs">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-black p-1">No</th>
                        <th className="border border-black p-1">Nama</th>
                        <th className="border border-black p-1">JK</th>
                        <th className="border border-black p-1">Umur</th>
                        <th className="border border-black p-1">NIK</th>
                        <th className="border border-black p-1">Pendidikan</th>
                        <th className="border border-black p-1">No HP</th>
                        <th className="border border-black p-1">Nama Usaha</th>
                        <th className="border border-black p-1">
                            Legalitas Usaha
                        </th>
                        <th className="border border-black p-1">Alamat</th>
                        <th className="border border-black p-1">Kab/Kota</th>
                        <th className="border border-black p-1">Kecamatan</th>
                        <th className="border border-black p-1">Kenagarian</th>
                        <th className="border border-black p-1">
                            Tenaga Kerja
                        </th>
                        <th className="border border-black p-1">Aset</th>
                        <th className="border border-black p-1">Omset</th>
                        <th className="border border-black p-1">Pendapatan</th>
                        <th className="border border-black p-1">Pelatihan</th>
                        <th className="border border-black p-1">
                            Tindak Lanjut
                        </th>
                        <th className="border border-black p-1">Layanan</th>
                    </tr>
                </thead>
                <tbody>
                    {umkm.length > 0 ? (
                        umkm.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-black p-1 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-black p-1">
                                    {item.nama_lengkap}
                                </td>
                                <td className="border border-black p-1 text-center">
                                    {item.jenis_kelamin}
                                </td>
                                <td className="border border-black p-1 text-center">
                                    {item.umur}
                                </td>
                                <td className="border border-black p-1">
                                    {item.nik}
                                </td>
                                <td className="border border-black p-1">
                                    {item.pendidikan}
                                </td>
                                <td className="border border-black p-1">
                                    {item.no_hp}
                                </td>
                                <td className="border border-black p-1">
                                    {item.nama_usaha}
                                </td>
                                <td className="border border-black p-1">
                                    {item.legalitas_usaha}
                                </td>
                                <td className="border border-black p-1">
                                    {item.alamat_usaha}
                                </td>
                                <td className="border border-black p-1">
                                    {item.kabupaten_kota}
                                </td>
                                <td className="border border-black p-1">
                                    {item.kecamatan}
                                </td>
                                <td className="border border-black p-1">
                                    {item.kenagarian_kelurahan}
                                </td>
                                <td className="border border-black p-1 text-center">
                                    {item.tenaga_kerja}
                                </td>
                                <td className="border border-black p-1 text-right">
                                    {item.aset}
                                </td>
                                <td className="border border-black p-1 text-right">
                                    {item.omset}
                                </td>
                                <td className="border border-black p-1 text-right">
                                    {item.pendapatan_bersih}
                                </td>
                                <td className="border border-black p-1">
                                    {item.pelatihan}
                                </td>
                                <td className="border border-black p-1">
                                    {item.tindak_lanjut}
                                </td>
                                <td className="border border-black p-1">
                                    {item.layanan}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={20}
                                className="border border-black p-2 text-center text-gray-500"
                            >
                                Tidak ada data UMKM.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PdfUmkmPerBooking;
