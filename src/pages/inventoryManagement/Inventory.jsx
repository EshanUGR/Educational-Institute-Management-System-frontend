import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const sidebarLinks = [
    {
        title: "Dashboard",
        links: [
            { name: "Dashboard", path: "/inventory/dashboard" },
        ]
    },
    {
        links: [
            { name: "Add Inventory", path: "/inventory/add-inventory" },
            { name: "Inventory Management Portal", path: "/inventory/inventory-mangement-portal" },
            { name: "Inventory Staff Portal", path: "/inventory/inventory-staff-portal" }
        ]
    },
    {
        title: "Account",
        links: [
            { name: "Profile", path: "/inventory/profile" },
            { name: "Edit Profile", path: "/inventory/edit-profile" }
        ]
    }
];

const Inventory = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex flex-col">
            <Header welcomeText="Welcome, Inventory Management" isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex">
                <Sidebar sidebarLinks={sidebarLinks} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <div className={`flex-1 overflow-hidden`}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Inventory;
