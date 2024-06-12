import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { useState } from "react";

const sidebarLinks = [
    {
        title: "Dashboard",
        links: [
            { name: "Dashboard", path: "/exam/dashboard" }
        ]
    },
    {
        links: [
            { name: "Publish Exam Notice", path: "/exam/publish-exam-notices" },
            { name: "Questions", path: "/exam/make-question" },
            {name:"Publish Exam Feedback",path:"/exam/make-feedback"}
        ]
    },
    {
        title: "Account",
        links: [
            { name: "Profile", path: "/exam/profile" },
            { name: "Edit Profile", path: "/exam/edit-profile" }
        ]
    },
];

const ExamnationDPT = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex flex-col">
            <Header welcomeText="Welcome, Examination Management" isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex">
                <Sidebar sidebarLinks={sidebarLinks} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <div className={`flex-1 overflow-x-hidden`}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ExamnationDPT