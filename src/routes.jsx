import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import InventoryDashboard from "./pages/inventoryManagement/InventoryDashboard";
import Inventory from "./pages/inventoryManagement/Inventory";
import Student from "./pages/student/Student";
import ExamnationDPT from "./pages/ExaminationManagement/ExamnationDPT";
import StudentSupport from "./pages/StudentSupportService/StudentSupport";
import StudentSupportDashboard from "./pages/StudentSupportService/StudentSupportDashboard";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import AddInventory from "./pages/inventoryManagement/AddEditInventory";
import axios from 'axios'
import ViewInventory from "./pages/inventoryManagement/ViewInventory";
import InventoryStaff from "./pages/inventoryManagement/InventoryStaff";
import InventoryManagement from "./pages/inventoryManagement/InventoryManagement";
import AttemptQuiz from "./pages/student/AttemptQuiz";
import PublicExamNotices from "./pages/ExaminationManagement/PublicExamNotices";
import ExamFeedback from "./pages/ExaminationManagement/ExamFeedback";
import SupportService from "./pages/student/SupportService";
import PaperUpload from "./pages/student/PaperUpload";
import ViewQuestion from "./pages/StudentSupportService/ViewQuestion";
import SupportServiceReplies from "./pages/student/SupportServiceReplies";
import PaperResults from "./pages/student/PaperResults";
import PastPapers from "./pages/StudentSupportService/PastPapers";
import ViewPaper from "./pages/StudentSupportService/ViewPaper";
import MarkedPaperDetails from "./pages/StudentSupportService/MarkedPaperDetails";
import StudentDashboard from "./pages/student/StudentDashboard";
import MakeQuestion from "./pages/ExaminationManagement/MakeQuestion";
import ExaminationDashboard from "./pages/ExaminationManagement/ExaminationDashboard";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/",
                element: <Inventory />,
                children: [
                    {
                        path: "/inventory/dashboard",
                        element: <InventoryDashboard />
                    },
                    {
                        path: "/inventory/add-inventory",
                        element: <AddInventory />
                    },
                    {
                        path: "/inventory/view-inventory/:id",
                        element: <ViewInventory />
                    },
                    {
                        path: "/inventory/edit-inventory/:id",
                        element: <AddInventory />
                    },
                    {
                        path: "/inventory/inventory-staff-portal",
                        element: <InventoryStaff />
                    },
                    {
                        path: "/inventory/inventory-mangement-portal",
                        element: <InventoryManagement />
                    },
                    // profile
                    {
                        path: "/inventory/profile",
                        element: <Profile />
                    },
                    {
                        path: "/inventory/edit-profile",
                        element: <EditProfile />
                    },
                ]
            },
            {
                path: "/",
                element: <ExamnationDPT />,
                children: [
                    {
                        path: "/exam/dashboard",
                        element: <ExaminationDashboard />
                    },
                    {
                        path: "/exam/publish-exam-notices",
                        element: <PublicExamNotices />
                    },
                    {
                        path: "/exam/make-question",
                        element: <MakeQuestion />
                    },
                    {
                        path:"/exam/make-feedback",
                       element: <ExamFeedback />

                    },
                    // profile
                    {
                        path: "/exam/profile",
                        element: <Profile />
                    },
                    {
                        path: "/exam/edit-profile",
                        element: <EditProfile />
                    }
                ]
            },
            {
                path: "/",
                element: <StudentSupport />,
                children: [
                    {
                        path: "/student-support/dashboard",
                        element: <StudentSupportDashboard />
                    },
                    {
                        path: "/student-support/view-question/:id",
                        element: <ViewQuestion />
                    },
                    {
                        path: "/student-support/papers",
                        element: <PastPapers />
                    },
                    {
                        path: "/student-support/view-paper",
                        element: <ViewPaper />
                    },
                    {
                        path: "/student-support/marked-paper-details",
                        element: <MarkedPaperDetails />
                    },
                    // profile
                    {
                        path: "/student-support/profile",
                        element: <Profile />
                    },
                    {
                        path: "/student-support/edit-profile",
                        element: <EditProfile />
                    }
                ]
            },
            {
                path: "/",
                element: <Student />,
                children: [
                    {
                        path: "/student/dashboard",
                        element: <StudentDashboard />
                    },
                    {
                        path: "/student/support-service",
                        element: <SupportService />
                    },
                    {
                        path: "/student/replies",
                        element: <SupportServiceReplies />
                    },
                    {
                        path: "/student/paper-upload",
                        element: <PaperUpload />
                    },
                    {
                        path: "/student/check-results",
                        element: <PaperResults />
                    },
                    {
                        path: "/student/attempt-quiz",
                        element: <AttemptQuiz />
                    },
                    // profile
                    {
                        path: "/student/profile",
                        element: <Profile />
                    },
                    {
                        path: "/student/edit-profile",
                        element: <EditProfile />
                    }
                ]
            }
        ]
    },

]
)

export default router;