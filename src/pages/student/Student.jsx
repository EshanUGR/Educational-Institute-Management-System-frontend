/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";

const sidebarLinks = [
  {
    title: "Dashboard",
    links: [{ name: "Dashboard", path: "/student/dashboard" }],
  },
  {
    links: [{ name: "Attempt to quick quiz", path: "/student/attempt-quiz" }],
  },
  {
    title: "Account",
    links: [
      { name: "Profile", path: "/student/profile" },
      { name: "Edit Profile", path: "/student/edit-profile" },
    ],
  },
];

const Student = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="h-screen flex flex-col">
      <Header
        welcomeText={`Welcome, ${user?.firstName} ${user?.lastName}`}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex">
        <Sidebar
          sidebarLinks={sidebarLinks}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className={`flex-1`}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Student;
