import { MapPin, Phone, Mail, Home as HomeIcon } from "lucide-react";

export default function Welcome() {
    return (
        <div>
            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 overflow-hidden">
                                    <img
                                        src="/logo.png"
                                        alt="Logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div>
                                    <h4 className="font-bold">
                                        Dinas Koperasi dan UMKM
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        Provinsi Sumatera Barat
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-4 max-w-md">
                                Mendukung pertumbuhan UMKM melalui layanan
                                terpadu dan inovasi yang berkelanjutan.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Kontak</h5>
                            <div className="space-y-2 text-gray-400">
                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    <span className="text-sm">
                                        Jl.Khatib Sulaiman No.11, Padang,
                                        Sumatera Barat
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2" />
                                    <span className="text-sm">
                                        (0751) 7055292-7055298
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span className="text-sm">
                                        info@diskopumkm-sumbar.go.id
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 Dinas Koperasi dan UMKM Provinsi Sumatera
                            Barat. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a className="text-gray-400 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </a>
                            <a className="text-gray-400 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
