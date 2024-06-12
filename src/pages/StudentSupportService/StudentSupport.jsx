import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const sidebarLinks = [
    {
        links: [
            { name: "Student Questions", path: "/student-support/dashboard" },
            { name: "Papers", path: "/student-support/papers" },
            { name: "Marked Paper Details", path: "/student-support/marked-paper-details" }
        ]
    },
    {
        title: "Account",
        links: [
            { name: "Profile", path: "/student-support/profile" },
            { name: "Edit Profile", path: "/student-support/edit-profile" }
        ]
    },

];

const StudentSupport = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex flex-col">
            <Header welcomeText="Welcome, Student Support Service" isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex">
                <Sidebar sidebarLinks={sidebarLinks} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <div className={`flex-1`}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StudentSupport;
