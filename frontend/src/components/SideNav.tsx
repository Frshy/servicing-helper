import { PropsWithChildren, useState } from "react";

export default function SideNav({ children }: PropsWithChildren) {
    const [showNav, setShowNav] = useState(false);

    function toggleNavigation() {
        setShowNav(!showNav);
    }

    return (
        <>
            <button onClick={toggleNavigation} className="absolute md:hidden top-1 left-1 text-white rounded-md z-50">
                {showNav ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                )}
            </button>

            <div className={`flex absolute md:static md:flex flex-col items-center h-full w-fit px-4 bg-gray-800 shadow-lg z-10 transform transition-transform duration-300 ${showNav ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                {children}
            </div>
        </>
    )
}