import { useState } from 'react';
import { Link } from '@inertiajs/react';
import Sidebar from "./Sidebar.jsx";

export default function Layout({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="relative font-[sans-serif] pt-[70px] h-screen">
            <header className="flex shadow-md py-1 px-4 sm:px-7 bg-white min-h-[70px] tracking-wide z-[110] fixed top-0 w-full">
                <div className="flex flex-wrap items-center justify-between gap-4 w-full relative">
                    <a href="/">
                        <h1 className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            TM
                        </h1>
                    </a>

                    <button
                        className="lg:hidden !ml-7 outline-none"
                        onClick={toggleSidebar}
                    >
                        <svg
                            className="w-7 h-7"
                            fill="#000"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
            </header>

            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main className="lg:ml-[250px] p-6 pt-16">
                {children}
            </main>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
}
