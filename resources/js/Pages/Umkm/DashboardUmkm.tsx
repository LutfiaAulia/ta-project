import React from "react";
import Layout from "../../Components/LayoutUmkm";

const DashboardUmkm: React.FC = () => {
    return (
        <Layout>
            <div
                className="bg-white shadow-md rounded p-8 text-center max-w-3xl mx-auto"
                style={{ marginTop: "5rem" }}
            >
                <h1 className="text-2xl font-bold mb-4">
                    Halo, Adam! Selamat Datang di Promosi UMKM
                </h1>
                <p>
                    Mobil Klinik siap membantu perkembangan usaha Anda. Pesan
                    layanan konsultasi, pelatihan, atau pendampingan bisnis
                    langsung dari aplikasi ini dengan mudah dan cepat.
                </p>
            </div>
        </Layout>
    );
};

export default DashboardUmkm;
