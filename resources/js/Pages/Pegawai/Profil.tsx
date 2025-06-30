import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Layout from "@/Components/Layout";
import {
    Edit3,
    Save,
    X,
    Lock,
    User,
    Phone,
    Hash,
    Briefcase,
    ShieldCheck,
} from "lucide-react";

interface PegawaiProfileProps {
    nip: string;
    nama: string;
    noHp: string;
    jabatan: string;
    role: string;
}

const Profil = (props: PegawaiProfileProps) => {
    const [editMode, setEditMode] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nip: props.nip,
        nama: props.nama,
        noHp: props.noHp,
        jabatan: props.jabatan,
        role: props.role,
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
        post("/pegawai/pegawai/update-profile", {
            preserveScroll: true,
            onSuccess: () => {
                alert("Profil berhasil diperbarui");
                setEditMode(false);
            },
        });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postPass("/pegawai/pegawai/password", {
            preserveScroll: true,
            onSuccess: () => {
                alert("Password berhasil diganti");
                resetPass();
            },
        });
    };

    const handleCancelEdit = () => {
        setData({
            nip: props.nip,
            nama: props.nama,
            noHp: props.noHp,
            jabatan: props.jabatan,
            role: props.role,
        });
        setEditMode(false);
    };

    const renderInput = (
        field: keyof typeof data,
        label: string,
        icon: JSX.Element,
        type: string = "text",
        disabled: boolean = false
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
                    value={data[field] as string}
                    onChange={(e) => setData(field, e.target.value)}
                    disabled={!editMode || disabled}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                        !editMode || disabled
                            ? "bg-gray-50 border-gray-200 text-gray-600"
                            : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                />
                {errors[field] && (
                    <div className="text-sm text-red-500 mt-1">
                        {errors[field]}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
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
                                        Informasi Profil Pegawai
                                    </h2>
                                    <p className="text-green-100 text-sm">
                                        Data pribadi dan jabatan pegawai
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
                        <form
                            onSubmit={handleProfileSubmit}
                            className="p-6 space-y-6"
                        >
                            <div>
                                {renderInput(
                                    "nip",
                                    "NIP",
                                    <Hash className="w-5 h-5 text-gray-400" />,
                                    "text",
                                    true
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    NIP tidak bisa diubah
                                </p>
                            </div>
                            {renderInput(
                                "nama",
                                "Nama Lengkap",
                                <User className="w-5 h-5 text-gray-400" />
                            )}
                            {renderInput(
                                "noHp",
                                "Nomor Handphone",
                                <Phone className="w-5 h-5 text-gray-400" />
                            )}
                            {renderInput(
                                "jabatan",
                                "Jabatan",
                                <Briefcase className="w-5 h-5 text-gray-400" />
                            )}
                            <div>
                                {renderInput(
                                    "role",
                                    "Role",
                                    <ShieldCheck className="w-5 h-5 text-gray-400" />,
                                    "text",
                                    true
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Role tidak bisa diubah
                                </p>
                            </div>

                            {editMode && (
                                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center space-x-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Simpan</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 flex items-center space-x-2"
                                    >
                                        <X className="w-4 h-4" />
                                        <span>Batal</span>
                                    </button>
                                </div>
                            )}
                        </form>
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
                        <form
                            onSubmit={handlePasswordSubmit}
                            className="p-6 space-y-6"
                        >
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
                                type="submit"
                                disabled={processingPass}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center space-x-2"
                            >
                                <Lock className="w-4 h-4" />
                                <span>Ganti Password</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profil;
