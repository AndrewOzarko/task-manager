import {Link, router} from "@inertiajs/react";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
    return (
        <div
            className={`mt-6 fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 p-4 transition-transform duration-300 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:w-[250px] lg:h-full`}
        >
            <button
                aria-label="Close sidebar"
                className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
                onClick={toggleSidebar}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 fill-black"
                    viewBox="0 0 320.591 320.591"
                >
                    <path
                        d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    ></path>
                </svg>
            </button>
            <nav>
                <div className="mt-12">
                    <h6 className="text-blue-600 text-sm font-bold px-4">Dashboard</h6>
                    <ul className="mt-3 space-y-2">
                        <li>
                            <Link
                                href="/"
                                className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
                            >
                                List
                            </Link>
                            <Link
                                href="/kanban"
                                className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
                            >
                                Kanban
                            </Link>
                            <Link
                                href="/tasks/create"
                                className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
                            >
                                Add
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="mt-6">
                    <h6 className="text-blue-600 text-sm font-bold px-4">User</h6>
                    <ul className="mt-3 space-y-2">
                        <li>
                            <button
                                onClick={async () => {
                                    await router.get('/api/logout')
                                    await router.visit('/login')
                                }}
                                className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
