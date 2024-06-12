/* eslint-disable react/prop-types */
import { IoIosMenu } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../app/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { simpleNotification } from "../utiles";

const Header = ({ welcomeText, isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        if (!user) {
            return navigate("/login")
        }
    }, [user, navigate]);

    const handleLogout = () => {
        dispatch(logout())
        simpleNotification("success", "Logged out successfully!")
    }

    return (
        <nav className={`bg-gray-800 px-5 py-2 flex justify-between items-center border-b`}>
            <div className='flex items-center gap-2'>
                <IoIosMenu size={40} color='white' className='block md:hidden cursor-pointer' onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <h1 className='text-white font-bold'>{welcomeText}</h1>
            </div>

            <div>
                <span className='text-white'>
                    {user?.firstName}{" "}{user?.lastName}
                </span>
                <button className='px-2 py-1 bg-white rounded-lg ml-5 font-bold capitalize' onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Header;
