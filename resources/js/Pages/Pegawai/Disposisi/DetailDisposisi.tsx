import React from "react";
import Layout from "@/Components/Layout";

type Disposisi = {
    isi: string;
    tanggal: string;
    tujuan: string;
    catatan: string;
    user: {
        nama: string;
        jabatan: string;
    };
    surat: {
        no_surat: string;
        asal_surat: string;
        perihal: string;
    };
};

function formatTanggal(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
}

const DetailDisposisi: React.FC<{ disposisi: Disposisi }> = ({ disposisi }) => {
    return (
        <Layout>
            <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-16">
                <h1 className="text-2xl font-semibold mb-8 text-center text-gray-800">
                    Detail Disposisi
                </h1>

                {/* Surat Section */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold text-blue-700 mb-4 border-b border-blue-300 pb-2">
                        Informasi Surat
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                No. Surat
                            </p>
                            <p className="mt-1 text-base font-semibold">
                                {disposisi.surat.no_surat}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Asal Surat
                            </p>
                            <p className="mt-1 text-base font-semibold">
                                {disposisi.surat.asal_surat}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Perihal
                            </p>
                            <p className="mt-1 text-base font-semibold">
                                {disposisi.surat.perihal}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Disposisi Section */}
                <section>
                    <h2 className="text-lg font-semibold text-blue-700 mb-4 border-b border-blue-300 pb-2">
                        Detail Disposisi
                    </h2>
                    <div className="space-y-6 text-gray-700">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Isi Disposisi
                            </p>
                            <p className="mt-1 whitespace-pre-line rounded-md bg-gray-50 p-4 border border-gray-200">
                                {disposisi.isi}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Tanggal Disposisi
                            </p>
                            <p className="mt-1 font-semibold">
                                {formatTanggal(disposisi.tanggal)}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Tujuan
                            </p>
                            <p className="mt-1 font-semibold">
                                {disposisi.tujuan}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Catatan
                            </p>
                            <p className="mt-1 whitespace-pre-line rounded-md bg-gray-50 p-4 border border-gray-200">
                                {disposisi.catatan}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Dibuat oleh
                            </p>
                            <p className="mt-1 font-semibold">
                                {disposisi.user.nama}
                            </p>
                            <p className="text-gray-500 text-sm font-normal italic">
                                {disposisi.user.jabatan}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default DetailDisposisi;
