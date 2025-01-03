import { Head, Link } from '@inertiajs/react'

export default function Login() {
    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <Head title="Forgot password" />
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <a href="/">
                        <h1 className='inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white'>Task Manager</h1>
                    </a>

                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Password reset</h2>
                        <form className="mt-8 space-y-4">
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <div className="relative flex items-center">
                                    <input name="email" type="text" required
                                           className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                           placeholder="Enter Email"/>
                                </div>
                            </div>
                            <div className="!mt-8">
                                <button type="button"
                                        className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Reset
                                </button>
                            </div>
                            <p className="text-gray-800 text-sm !mt-8 text-center">
                                Already have an account?
                                <Link
                                href="/login"
                                className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Login here</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
