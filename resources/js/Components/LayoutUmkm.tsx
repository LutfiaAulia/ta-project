import React from "react";
import Sidebar from "./SidebarUmkm";
import Topbar from "./TopbarUmkm";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Sidebar />
            <div className="ml-60">
                <Topbar />
                <main className="p-8">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
