import toast from "react-hot-toast";
import { removeAccessToken, user } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardNav() {
    const navigate = useNavigate();

    const logout = () => {
        removeAccessToken();
        toast.success('Successfully logged out, redirecting...');
        navigate('/sign-in');
    }

    return (
        <div className="flex flex-col items-center w-[230px]">
            <Link to="/dashboard" className="text-white px-4 py-3 text-md cursor-pointer bg-blue-600 hover:bg-blue-600 duration-300 rounded-md text-left my-1 w-full flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>

                <div className="ml-2 text-nowrap">
                    DASHBOARD
                </div>
            </Link>


            <div className="text-white px-4 py-3 text-md cursor-not-allowed duration-300 rounded-md text-left my-1 w-full flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>

                <div className="ml-2 text-nowrap">
                    CHAT
                </div>
            </div>

            {user.value?.admin && (
                <div className="text-white px-4 py-3 text-md cursor-pointer hover:bg-blue-600 duration-300 rounded-md text-left my-1 w-full flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                    </svg>

                    <div className="ml-2 text-nowrap">
                        ADMIN PANEL
                    </div>
                </div>
            )}

            <div className="flex absolute bottom-6 text-white hover:text-blue-600 duration-300 cursor-pointer" onClick={logout}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>

                <div className="mx-[2px]"></div>

                LOGOUT
            </div>
        </div>
    )
}