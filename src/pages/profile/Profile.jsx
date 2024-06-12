/* eslint-disable no-undef */
import { useDispatch, useSelector } from "react-redux"
import { deleteAccount } from "../../app/features/user/userApis"

const Profile = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    const handleDeleteAccount = () => {
        dispatch(deleteAccount(user._id))
    }

    return (
        <div className="w-full flex flex-col justify-center items-center h-full">
            <h1>Profile</h1>
            <div className="w-[50%] border-2 border-black rounded-lg p-4 mt-8 relative">
                {user?.gender === "Female" ?
                    <img src="https://cdn-icons-png.flaticon.com/512/6997/6997615.png" alt="profile-image" className="w-[110px] absolute left-0 right-0 -top-[63px] ml-auto mr-auto" />
                    :
                    <img src="https://cdn-icons-png.flaticon.com/512/1999/1999625.png" alt="profile-image" className="w-[110px] absolute left-0 right-0 -top-[63px] ml-auto mr-auto" />
                }

                <div className="pb-5 flex flex-col gap-4">
                    <p className="flex justify-between pt-10">First Name : <span>{user?.firstName}</span></p>
                    <p className="flex justify-between">Last Name : <span>{user?.lastName}</span></p>
                    <p className="flex justify-between">Email : <span>{user?.email}</span></p>
                    <p className="flex justify-between">NIC : <span>{user?.nic}</span></p>
                    <p className="flex justify-between">Gender : <span>{user?.gender}</span></p>
                    <p className="flex justify-between">User Role : <span>{user?.role}</span></p>
                </div>

                <button
                    className="absolute left-0 right-0 -bottom-5 ml-auto mr-auto bg-red-500 w-fit py-2 px-4 text-white font-bold rounded-lg hover:bg-red-600 duration-300"
                    onClick={handleDeleteAccount}
                >Delete Account</button>
            </div>
        </div>
    )
}

export default Profile