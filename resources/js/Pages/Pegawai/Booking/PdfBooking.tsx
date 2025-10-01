import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";

type Booking = {
    id_booking: number;
    nama_instansi: string;
    acara: string;
    tanggal_mulai: string;
    tanggal_akhir: string;
    waktu_mulai: string;
    waktu_akhir: string;
    lokasi: string;
    status_booking: string;
    pegawai_lapangan: string[];
    mobil?: string;
    sopir?: string;
};

type PageProps = {
    bookings: Booking[];
    status?: string;
};

const PdfBooking: React.FC = () => {
    const { bookings = [], status } = (usePage()
        .props as unknown as PageProps) || { bookings: [] };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.print();
        }
    }, []);

    const exportToExcel = () => {
        const tableHeader = `
            <tr>
                <th>No</th>
                <th>ID Booking</th>
                <th>Instansi</th>
                <th>Acara</th>
                <th>Tanggal Mulai</th>
                <th>Tanggal Akhir</th>
                <th>Waktu Mulai</th>
                <th>Waktu Akhir</th>
                <th>Lokasi</th>
                <th>Status</th>
                <th>Pegawai Lapangan</th>
                <th>Mobil</th>
                <th>Sopir</th>
            </tr>
        `;

        const tableRows = bookings
            .map(
                (item, index) => `
            <tr>
                <td style="border:1px solid black; text-align:center;">${
                    index + 1
                }</td>
                <td style="border:1px solid black;">${item.id_booking}</td>
                <td style="border:1px solid black;">${
                    item.nama_instansi || "-"
                }</td>
                <td style="border:1px solid black;">${item.acara || "-"}</td>
                <td style="border:1px solid black; text-align:center;">${
                    item.tanggal_mulai
                }</td>
                <td style="border:1px solid black; text-align:center;">${
                    item.tanggal_akhir
                }</td>
                <td style="border:1px solid black; text-align:center;">${
                    item.waktu_mulai
                }</td>
                <td style="border:1px solid black; text-align:center;">${
                    item.waktu_akhir
                }</td>
                <td style="border:1px solid black;">${item.lokasi}</td>
                <td style="border:1px solid black; text-align:center;">${
                    item.status_booking
                }</td>
                <td style="border:1px solid black;">${
                    item.pegawai_lapangan?.join(", ") || "-"
                }</td>
                <td style="border:1px solid black; text-align:center;">${
                    item.mobil
                }</td>
                <td style="border:1px solid black; text-align:center;">${
                    item.sopir
                }</td>
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
                                <x:Name>Data Booking</x:Name>
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
        a.download = "data_booking.xls";
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
                Data Booking {status ? `(${status})` : ""}
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
                        <th className="border border-black p-1">ID Booking</th>
                        <th className="border border-black p-1">Instansi</th>
                        <th className="border border-black p-1">Acara</th>
                        <th className="border border-black p-1">
                            Tanggal Mulai
                        </th>
                        <th className="border border-black p-1">
                            Tanggal Akhir
                        </th>
                        <th className="border border-black p-1">Waktu Mulai</th>
                        <th className="border border-black p-1">Waktu Akhir</th>
                        <th className="border border-black p-1">Lokasi</th>
                        <th className="border border-black p-1">Status</th>
                        <th className="border border-black p-1">
                            Pegawai Lapangan
                        </th>
                        <th className="border border-black p-1">Mobil</th>
                        <th className="border border-black p-1">Sopir</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((item, index) => (
                            <tr key={item.id_booking}>
                                <td className="border border-black p-1 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-black p-1">
                                    {item.id_booking}
                                </td>
                                <td className="border border-black p-1">
                                    {item.nama_instansi}
                                </td>
                                <td className="border border-black p-1">
                                    {item.acara}
                                </td>
                                <td className="border border-black p-1 text-center">
                                    {item.tanggal_mulai}
                                </td>
                                <td className="border border-black p-1 text-center">
                                    {item.tanggal_akhir}
                                </td>
                                <td className="border border-black p-1 text-center">
                                    {item.waktu_mulai}
                                </td>
                                <td className="border border-black p-1 text-center">
                                    {item.waktu_akhir}
                                </td>
                                <td className="border border-black p-1">
                                    {item.lokasi}
                                </td>
                                <td className="border border-black p-1 text-center">
                                    {item.status_booking}
                                </td>
                                <td className="border border-black p-1">
                                    {item.pegawai_lapangan?.join(", ")}
                                </td>
                                <td className="border border-black p-1 text-center">
                                    {item.mobil || "-"}
                                </td>
                                <td className="border border-black p-1 text-center">
                                    {item.sopir || "-"}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={11}
                                className="border border-black p-2 text-center text-gray-500"
                            >
                                Tidak ada data booking.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PdfBooking;
