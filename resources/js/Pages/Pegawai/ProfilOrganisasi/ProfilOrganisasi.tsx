import React, { useState } from "react";
import Layout from "@/Components/Layout";
import { Head, useForm } from "@inertiajs/react";
import {
    Edit3,
    Save,
    X,
    FileText,
    Target,
    Image as ImageIcon,
} from "lucide-react";

// --- INTERFACE ---
interface ProfilOrganisasi {
    id_proforg: number;
    visi: string;
    misi: string;
    tugas: string;
    fungsi: string;
    maklumat_pelayanan: string;
    gambar_struktur: string | null;
}

interface Props {
    profilOrganisasi: ProfilOrganisasi | null;
}

const ProfilOrganisasiPage: React.FC<Props> = ({ profilOrganisasi }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("visi-misi");

    const { data, setData, post, processing, errors, reset } = useForm({
        visi: profilOrganisasi?.visi || "",
        misi: profilOrganisasi?.misi || "",
        tugas: profilOrganisasi?.tugas || "",
        fungsi: profilOrganisasi?.fungsi || "",
        maklumat_pelayanan: profilOrganisasi?.maklumat_pelayanan || "",
        gambar_struktur: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("profil-organisasi.update"), {
            onSuccess: () => setIsEditing(false),
            forceFormData: true,
        });
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    const renderText = (text: string) => {
        return text.split("\n").map((str, index) => (
            <p key={index} className="mb-2">
                {str}
            </p>
        ));
    };

    return (
        <Layout>
            <Head title="Profil Organisasi" />
            <div className="pt-20 pb-10 min-h-screen bg-gray-50/50">
                <div className="p-6 max-w-6xl mx-auto">
                    {/* Header & Action Buttons */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Profil Organisasi
                            </h1>
                            <p className="text-sm text-gray-500">
                                Kelola informasi fundamental organisasi Anda di
                                sini.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm"
                                >
                                    <Edit3 className="w-4 h-4 mr-2" /> Edit
                                    Profil
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
                                    >
                                        <X className="w-4 h-4 mr-2" /> Batal
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={processing}
                                        className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition shadow-sm disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4 mr-2" /> Simpan
                                        Perubahan
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
                        {[
                            {
                                id: "visi-misi",
                                label: "Visi & Misi",
                                icon: <Target className="w-4 h-4" />,
                            },
                            {
                                id: "tugas-fungsi",
                                label: "Tugas & Fungsi",
                                icon: <FileText className="w-4 h-4" />,
                            },
                            {
                                id: "maklumat-struktur",
                                label: "Maklumat & Struktur",
                                icon: <ImageIcon className="w-4 h-4" />,
                            },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap gap-2 ${
                                    activeTab === tab.id
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="bg-white rounded-xl shadow-sm border p-6 min-h-[400px]">
                        <form onSubmit={handleSubmit}>
                            {/* VISI & MISI */}
                            {activeTab === "visi-misi" && (
                                <div className="space-y-6">
                                    <SectionWrapper
                                        title="Visi"
                                        isEditing={isEditing}
                                        error={errors.visi}
                                    >
                                        {isEditing ? (
                                            <textarea
                                                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                rows={3}
                                                value={data.visi}
                                                onChange={(e) =>
                                                    setData(
                                                        "visi",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <div className="text-gray-700 italic text-lg leading-relaxed">
                                                "
                                                {profilOrganisasi?.visi ||
                                                    "Belum diisi"}
                                                "
                                            </div>
                                        )}
                                    </SectionWrapper>

                                    <SectionWrapper
                                        title="Misi"
                                        isEditing={isEditing}
                                        error={errors.misi}
                                    >
                                        {isEditing ? (
                                            <textarea
                                                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                rows={6}
                                                value={data.misi}
                                                onChange={(e) =>
                                                    setData(
                                                        "misi",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <div className="text-gray-700 prose max-w-none">
                                                {renderText(
                                                    profilOrganisasi?.misi ||
                                                        "Belum diisi"
                                                )}
                                            </div>
                                        )}
                                    </SectionWrapper>
                                </div>
                            )}

                            {/* TUGAS & FUNGSI */}
                            {activeTab === "tugas-fungsi" && (
                                <div className="space-y-6">
                                    <SectionWrapper
                                        title="Tugas"
                                        isEditing={isEditing}
                                        error={errors.tugas}
                                    >
                                        {isEditing ? (
                                            <textarea
                                                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                rows={5}
                                                value={data.tugas}
                                                onChange={(e) =>
                                                    setData(
                                                        "tugas",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <div className="text-gray-700">
                                                {renderText(
                                                    profilOrganisasi?.tugas ||
                                                        "Belum diisi"
                                                )}
                                            </div>
                                        )}
                                    </SectionWrapper>

                                    <SectionWrapper
                                        title="Fungsi"
                                        isEditing={isEditing}
                                        error={errors.fungsi}
                                    >
                                        {isEditing ? (
                                            <textarea
                                                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                rows={5}
                                                value={data.fungsi}
                                                onChange={(e) =>
                                                    setData(
                                                        "fungsi",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <div className="text-gray-700">
                                                {renderText(
                                                    profilOrganisasi?.fungsi ||
                                                        "Belum diisi"
                                                )}
                                            </div>
                                        )}
                                    </SectionWrapper>
                                </div>
                            )}

                            {/* MAKLUMAT & STRUKTUR */}
                            {activeTab === "maklumat-struktur" && (
                                <div className="space-y-8">
                                    <SectionWrapper
                                        title="Maklumat Pelayanan"
                                        isEditing={isEditing}
                                        error={errors.maklumat_pelayanan}
                                    >
                                        {isEditing ? (
                                            <textarea
                                                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                rows={4}
                                                value={data.maklumat_pelayanan}
                                                onChange={(e) =>
                                                    setData(
                                                        "maklumat_pelayanan",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-800 italic">
                                                {profilOrganisasi?.maklumat_pelayanan ||
                                                    "Belum diisi"}
                                            </div>
                                        )}
                                    </SectionWrapper>

                                    <SectionWrapper
                                        title="Struktur Organisasi"
                                        isEditing={isEditing}
                                        error={errors.gambar_struktur}
                                    >
                                        {isEditing && (
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
                                                onChange={(e) =>
                                                    setData(
                                                        "gambar_struktur",
                                                        e.target.files
                                                            ? e.target.files[0]
                                                            : null
                                                    )
                                                }
                                            />
                                        )}

                                        <div className="border rounded-lg p-2 bg-gray-50 flex justify-center">
                                            {profilOrganisasi?.gambar_struktur ? (
                                                <img
                                                    src={`/storage/${profilOrganisasi.gambar_struktur}`}
                                                    alt="Struktur"
                                                    className="max-w-full h-auto rounded shadow-sm"
                                                />
                                            ) : (
                                                <div className="py-10 text-gray-400 flex flex-col items-center">
                                                    <ImageIcon className="w-12 h-12 mb-2" />
                                                    <p>
                                                        Gambar struktur belum
                                                        diunggah
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </SectionWrapper>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const SectionWrapper = ({ title, children, isEditing, error }: any) => (
    <div className="mb-4">
        <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">
            {title}
        </label>
        {children}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default ProfilOrganisasiPage;
