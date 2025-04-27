import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function EditBookingIns (){
    return (
        <AuthenticatedLayout
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Edit Form Pembookingan
                        </h2>
                    }
                >
                    <Head title="Edit Booking" />
        
                    <div className="py-12">
                        <div className="mx-auto max-w-7xl px-[3cm] py-[0.5cm]">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg px-[1cm]">
                                <div className="p-6 text-gray-900">
                                    Nooh Liat Lu Pernah Booking Buat Apa Aja
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
    );
}