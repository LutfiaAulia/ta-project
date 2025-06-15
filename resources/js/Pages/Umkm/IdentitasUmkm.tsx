import React, { useState } from "react";
import Layout from "@/Components/LayoutUmkm";
import { router } from "@inertiajs/react";

const EditIdentitasUMKM: React.FC = () => {
    const [form, setForm] = useState({
        jenis_usaha: "",
        nama_usaha: "",
        alamat_usaha: "",
        no_telepon: "",
        instagram: "",
        whatsapp: "",
        facebook: "",
        deskripsi: "",
        latitude: "",
        longitude: "",
        foto_usaha: null as File | null,
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setForm((prev) => ({ ...prev, foto_usaha: file }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null) data.append(key, value as string | Blob);
        });

        router.post("/umkm/update-identitas", data);
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto p-14">
                <h1 className="text-2xl font-bold mb-6 text-center">Data UMKM</h1>
                <form onSubmit={handleSubmit} className="grid gap-4 text-sm">
                    <div className="grid gap-2">
                        <label>Jenis Usaha</label>
                        <input
                            type="text"
                            name="jenis_usaha"
                            value={form.jenis_usaha}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Nama Usaha</label>
                        <input
                            type="text"
                            name="nama_usaha"
                            value={form.nama_usaha}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Alamat Usaha</label>
                        <input
                            type="text"
                            name="alamat_usaha"
                            value={form.alamat_usaha}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Nomor Telephone</label>
                        <input
                            type="text"
                            name="no_telepon"
                            value={form.no_telepon}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="instagram"
                            placeholder="Instagram"
                            value={form.instagram}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                        <input
                            type="text"
                            name="whatsapp"
                            placeholder="WhatsApp"
                            value={form.whatsapp}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                        <input
                            type="text"
                            name="facebook"
                            placeholder="Facebook"
                            value={form.facebook}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Deskripsi UMKM</label>
                        <textarea
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            className="border p-2 rounded h-24"
                            disabled={!isEditing}
                        ></textarea>
                    </div>

                    <div className="grid gap-2">
                        <label>Foto Usaha</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="border p-2 rounded"
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label>Lokasi Usaha (Klik di peta)</label>
                        <div className="border h-56" id="map">
                            {/* Integrasi Google Maps atau Leaflet di sini */}
                        </div>
                        <input
                            type="hidden"
                            name="latitude"
                            value={form.latitude}
                        />
                        <input
                            type="hidden"
                            name="longitude"
                            value={form.longitude}
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="border px-4 py-2 rounded text-green-600 border-green-500 hover:bg-green-50"
                        >
                            Edit
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            disabled={!isEditing}
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditIdentitasUMKM;
