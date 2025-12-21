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
    UploadCloud,
    Loader2,
} from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        visi: profilOrganisasi?.visi || "",
        misi: profilOrganisasi?.misi || "",
        tugas: profilOrganisasi?.tugas || "",
        fungsi: profilOrganisasi?.fungsi || "",
        maklumat_pelayanan: profilOrganisasi?.maklumat_pelayanan || "",
        gambar_struktur: null as File | null,
    });

    const quillModules = {
        toolbar: [
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            ["clean"],
        ],
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("profil-organisasi.update"), {
            onSuccess: () => {
                setIsEditing(false);
                setPreviewUrl(null);
            },
            forceFormData: true,
        });
    };

    const handleCancel = () => {
        reset();
        setPreviewUrl(null);
        setIsEditing(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("gambar_struktur", file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const renderQuillContent = (html: string | undefined) => {
        if (!html || html === "<p><br></p>")
            return <p className="text-gray-400 italic">Belum diisi</p>;
        return (
            <div
                className="prose prose-indigo max-w-none text-gray-700 
                prose-li:my-0 prose-ol:list-decimal prose-ul:list-disc"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    };

    return (
        <Layout>
            <Head title="Profil Organisasi" />
            <div className="pt-24 pb-12 min-h-screen bg-gray-50/50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                                    Profil Organisasi
                                </h1>
                                <p className="text-gray-500 mt-1">
                                    Kelola visi, misi, dan struktur lembaga.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all active:scale-95 shadow-md shadow-indigo-100"
                                    >
                                        <Edit3 className="w-4 h-4 mr-2" /> Edit
                                        Profil
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleCancel}
                                            disabled={processing}
                                            className="inline-flex items-center text-gray-600 bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-xl font-medium transition-all"
                                        >
                                            <X className="w-4 h-4 mr-2" /> Batal
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={processing}
                                            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md shadow-emerald-100 active:scale-95 disabled:opacity-50"
                                        >
                                            {processing ? (
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            ) : (
                                                <Save className="w-4 h-4 mr-2" />
                                            )}
                                            Simpan Perubahan
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex space-x-1 p-1 bg-gray-200/50 rounded-2xl mb-6 w-fit">
                        {[
                            {
                                id: "visi-misi",
                                label: "Visi & Misi",
                                icon: Target,
                            },
                            {
                                id: "tugas-fungsi",
                                label: "Tugas & Fungsi",
                                icon: FileText,
                            },
                            {
                                id: "maklumat-struktur",
                                label: "Struktur & Maklumat",
                                icon: ImageIcon,
                            },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 gap-2 ${
                                    activeTab === tab.id
                                        ? "bg-white text-indigo-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* TAB 1: VISI & MISI */}
                                {activeTab === "visi-misi" && (
                                    <div className="space-y-8">
                                        <SectionWrapper
                                            title="Visi Organisasi"
                                            error={errors.visi}
                                        >
                                            {isEditing ? (
                                                <textarea
                                                    className="w-full border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 p-4"
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
                                                <div className="text-xl font-medium text-gray-800 italic leading-relaxed border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-50/30 rounded-r-xl">
                                                    "
                                                    {profilOrganisasi?.visi ||
                                                        "Belum diisi"}
                                                    "
                                                </div>
                                            )}
                                        </SectionWrapper>

                                        <SectionWrapper
                                            title="Misi Organisasi"
                                            error={errors.misi}
                                        >
                                            {isEditing ? (
                                                <ReactQuill
                                                    theme="snow"
                                                    value={data.misi}
                                                    onChange={(val) =>
                                                        setData("misi", val)
                                                    }
                                                    modules={quillModules}
                                                    className="bg-white rounded-xl overflow-hidden border border-gray-200"
                                                />
                                            ) : (
                                                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                                    {renderQuillContent(
                                                        profilOrganisasi?.misi
                                                    )}
                                                </div>
                                            )}
                                        </SectionWrapper>
                                    </div>
                                )}

                                {/* TAB 2: TUGAS & FUNGSI */}
                                {activeTab === "tugas-fungsi" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <SectionWrapper
                                            title="Tugas Pokok"
                                            error={errors.tugas}
                                        >
                                            {isEditing ? (
                                                <ReactQuill
                                                    theme="snow"
                                                    value={data.tugas}
                                                    onChange={(val) =>
                                                        setData("tugas", val)
                                                    }
                                                    modules={quillModules}
                                                />
                                            ) : (
                                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                                    {renderQuillContent(
                                                        profilOrganisasi?.tugas
                                                    )}
                                                </div>
                                            )}
                                        </SectionWrapper>
                                        <SectionWrapper
                                            title="Fungsi"
                                            error={errors.fungsi}
                                        >
                                            {isEditing ? (
                                                <ReactQuill
                                                    theme="snow"
                                                    value={data.fungsi}
                                                    onChange={(val) =>
                                                        setData("fungsi", val)
                                                    }
                                                    modules={quillModules}
                                                />
                                            ) : (
                                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                                    {renderQuillContent(
                                                        profilOrganisasi?.fungsi
                                                    )}
                                                </div>
                                            )}
                                        </SectionWrapper>
                                    </div>
                                )}

                                {/* TAB 3: STRUKTUR & MAKLUMAT */}
                                {activeTab === "maklumat-struktur" && (
                                    <div className="space-y-10">
                                        <SectionWrapper
                                            title="Maklumat Pelayanan"
                                            error={errors.maklumat_pelayanan}
                                        >
                                            {isEditing ? (
                                                <ReactQuill
                                                    theme="snow"
                                                    value={
                                                        data.maklumat_pelayanan
                                                    }
                                                    onChange={(val) =>
                                                        setData(
                                                            "maklumat_pelayanan",
                                                            val
                                                        )
                                                    }
                                                    modules={quillModules}
                                                />
                                            ) : (
                                                <div className="p-8 text-white shadow-lg">
                                                    <h4 className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-3">
                                                        Service Pledge
                                                    </h4>
                                                    <div className="prose prose-invert max-w-none">
                                                        {renderQuillContent(
                                                            profilOrganisasi?.maklumat_pelayanan
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </SectionWrapper>

                                        {/* Bagian Gambar Struktur */}
                                        <SectionWrapper
                                            title="Bagan Struktur Organisasi"
                                            error={errors.gambar_struktur}
                                        >
                                            {isEditing && (
                                                <div className="mb-6">
                                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                                            <p className="text-sm text-gray-500">
                                                                Klik untuk
                                                                unggah gambar
                                                                baru
                                                            </p>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={
                                                                handleFileChange
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            )}
                                            <div className="relative group overflow-hidden rounded-2xl border-2 border-gray-100 bg-gray-50 shadow-inner">
                                                {previewUrl ||
                                                profilOrganisasi?.gambar_struktur ? (
                                                    <img
                                                        src={
                                                            previewUrl ||
                                                            `/storage/${profilOrganisasi?.gambar_struktur}`
                                                        }
                                                        alt="Struktur"
                                                        className="w-full h-auto max-h-[600px] object-contain mx-auto"
                                                    />
                                                ) : (
                                                    <div className="py-20 text-gray-400 flex flex-col items-center">
                                                        <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                                                        <p className="font-medium">
                                                            Gambar belum
                                                            tersedia
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
            </div>
        </Layout>
    );
};

// --- HELPER COMPONENT ---
const SectionWrapper = ({ title, children, error }: any) => (
    <div className="w-full">
        <label className="block text-[11px] font-black text-indigo-900 uppercase tracking-[0.2em] mb-3 ml-1">
            {title}
        </label>
        {children}
        {error && (
            <div className="mt-2 flex items-center text-red-600 gap-1.5 ml-1">
                <div className="w-1 h-1 bg-red-600 rounded-full" />
                <p className="text-xs font-semibold">{error}</p>
            </div>
        )}
    </div>
);

export default ProfilOrganisasiPage;
