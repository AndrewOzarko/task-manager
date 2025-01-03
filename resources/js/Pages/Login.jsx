import { Head, Link, useForm, router } from '@inertiajs/react'
import axios from "axios";
import { useState } from 'react';

export default function Login() {
    const { data, setData, post, processing } = useForm({
        email: '',
        password: '',
        remember: true,
    });
    const [errors, setErrors] = useState({});
    function handleSubmit(e) {
        e.preventDefault();
        setErrors({});
        axios.post('/api/login', data)
            .then(function (resp) {
                router.visit('/');
            })
            .catch((e) => {
                if (e.response && e.response.data.errors) {
                    setErrors(e.response.data.errors);
                }
            });
    }

    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <Head title="Login" />
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <a href="/">
                        <h1 className='inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white'>Task Manager</h1>
                    </a>

                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Login</h2>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <div className="relative flex items-center">
                                    <input name="email" type="text" required
                                           className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                           onChange={e => setData('email', e.target.value)}
                                           placeholder="Enter email"/>
                                </div>
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <div className="relative flex items-center">
                                    <input name="password" type="password" required
                                           className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                           onChange={e => setData('password', e.target.value)}
                                           placeholder="Enter password"/>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox"
                                           className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <Link href="/forgot"
                                       className="text-blue-600 hover:underline font-semibold">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                            <div className="!mt-8">
                                <button type="submit"
                                        className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Sign in
                                </button>
                            </div>
                            <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account?
                                <Link
                                href="/registration"
                                className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register
                                here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
