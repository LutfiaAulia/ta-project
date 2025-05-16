import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const Topbar: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const user = usePage().props.auth?.user;

    const handleLogout = () => {
        Inertia.post(route("pegawai.logout"));
    };

    return (
        <div
            className="flex justify-end items-center px-6 py-4 bg-white border-b shadow-sm fixed z-40"
            style={{
                paddingLeft: "16rem",
                width: "calc(100% - 15rem)",
                top: "1.25rem",
            }}
        >
            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 font-medium text-sm text-gray-700 hover:text-green-700 transition"
                >
                    {user?.nama ?? "Loading..."}
                    <FaChevronDown
                        className={`transition-transform duration-200 ${
                            dropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                        <ul className="py-1 text-sm text-gray-700">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Profil
                            </li>
                            <li
                                onClick={handleLogout}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topbar;
