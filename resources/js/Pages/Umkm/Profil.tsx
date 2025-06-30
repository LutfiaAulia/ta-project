import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Layout from "@/Components/LayoutUmkm";
import {
    Edit3,
    Save,
    X,
    Lock,
    User,
    Phone,
    MapPin,
    Calendar,
    Hash,
} from "lucide-react";

interface UMKMProfileProps {
    nib: string;
    nama: string;
    nik: string;
    noHp: string;
    tanggalLahir: string;
    alamat: string;
}

const Profil = (props: UMKMProfileProps) => {
    const [editMode, setEditMode] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: props.nama,
        nik: props.nik,
        noHp: props.noHp,
        tanggalLahir: props.tanggalLahir,
        alamat: props.alamat,
    });

    const {
        data: passData,
        setData: setPassData,
        post: postPass,
        processing: processingPass,
        errors: passErrors,
        reset: resetPass,
    } = useForm({
        currentPassword: "",
        newPassword: "",
        newPassword_confirmation: "",
    });

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/umkm/umkm/update-profile", {
            preserveScroll: true,
            onSuccess: () => {
                alert("Profil berhasil diperbarui");
                setEditMode(false);
            },
        });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postPass("/umkm/umkm/password", {
            preserveScroll: true,
            onSuccess: () => {
                alert("Password berhasil diganti");
                resetPass();
            },
        });
    };

    const handleCancelEdit = () => {
        setData({
            nama: props.nama,
            nik: props.nik,
            noHp: props.noHp,
            tanggalLahir: props.tanggalLahir,
            alamat: props.alamat,
        });
        setEditMode(false);
    };

    const renderInput = (
        field: keyof typeof data,
        label: string,
        icon: JSX.Element,
        type: string = "text"
    ) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    {icon}
                </div>
                <input
                    type={type}
                    name={field}
                    value={data[field as keyof typeof data] as string}
                    onChange={(e) => setData(field, e.target.value)}
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                        !editMode
                            ? "bg-gray-50 border-gray-200 text-gray-600"
                            : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                />
                {errors[field as keyof typeof data] && (
                    <div className="text-sm text-red-500 mt-1">
                        {errors[field as keyof typeof data]}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
                <div className="pt-12 max-w-4xl mx-auto space-y-8">
                    {/* FORM PROFIL */}
                    <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-white">
                                        Informasi Profil
                                    </h2>
                                    <p className="text-green-100 text-sm">
                                        Data pribadi dan identitas UMKM
                                    </p>
                                </div>
                            </div>
                            {!editMode && (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    <span>Edit</span>
                                </button>
                            )}
                        </div>
                        <div className="p-6 space-y-6">
                            {/* NIB */}
                            <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-gray-400">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nomor Induk Berusaha (NIB)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <Hash className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={props.nib}
                                        disabled
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-600 font-mono text-sm"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    NIB tidak dapat diubah
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderInput(
                                    "nama",
                                    "Nama Lengkap",
                                    <User className="w-5 h-5 text-gray-400" />
                                )}
                                {renderInput(
                                    "nik",
                                    "Nomor Induk Kependudukan",
                                    <Hash className="w-5 h-5 text-gray-400" />
                                )}
                                {renderInput(
                                    "noHp",
                                    "Nomor Handphone",
                                    <Phone className="w-5 h-5 text-gray-400" />
                                )}
                                {renderInput(
                                    "tanggalLahir",
                                    "Tanggal Lahir",
                                    <Calendar className="w-5 h-5 text-gray-400" />,
                                    "date"
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Alamat Lengkap
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        name="alamat"
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
                                        }
                                        disabled={!editMode}
                                        rows={3}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg resize-none ${
                                            !editMode
                                                ? "bg-gray-50 border-gray-200 text-gray-600"
                                                : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        }`}
                                    />
                                    {errors.alamat && (
                                        <div className="text-sm text-red-500 mt-1">
                                            {errors.alamat}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {editMode && (
                                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={handleProfileSubmit}
                                        disabled={processing}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Simpan</span>
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 flex items-center space-x-2"
                                    >
                                        <X className="w-4 h-4" />
                                        <span>Batal</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* GANTI PASSWORD */}
                    <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex items-center space-x-3">
                            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                <Lock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    Keamanan Akun
                                </h2>
                                <p className="text-green-100 text-sm">
                                    Ganti password untuk menjaga keamanan akun
                                </p>
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password Saat Ini
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passData.currentPassword}
                                        onChange={(e) =>
                                            setPassData(
                                                "currentPassword",
                                                e.target.value
                                            )
                                        }
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                        required
                                    />
                                    {passErrors.currentPassword && (
                                        <div className="text-sm text-red-500 mt-1">
                                            {passErrors.currentPassword}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password Baru
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <Lock className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passData.newPassword}
                                            onChange={(e) =>
                                                setPassData(
                                                    "newPassword",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                            required
                                        />
                                        {passErrors.newPassword && (
                                            <div className="text-sm text-red-500 mt-1">
                                                {passErrors.newPassword}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Konfirmasi Password Baru
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <Lock className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="newPassword_confirmation"
                                            value={
                                                passData.newPassword_confirmation
                                            }
                                            onChange={(e) =>
                                                setPassData(
                                                    "newPassword_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handlePasswordSubmit}
                                disabled={processingPass}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center space-x-2"
                            >
                                <Lock className="w-4 h-4" />
                                <span>Ganti Password</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profil;
