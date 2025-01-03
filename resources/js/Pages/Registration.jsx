import {Head, Link, router, useForm} from '@inertiajs/react'
import { useState } from 'react';
import axios from "axios";

export default function Registration() {

    const { data, setData } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        setErrors({});
        axios.post('/api/registration', data)
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
        <Head title="Registration"/>
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="max-w-md w-full">
                <a href="/">
                    <h1 className='inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white'>Task Manager</h1>
                </a>

                <div className="p-8 rounded-2xl bg-white shadow">
                    <h2 className="text-gray-800 text-center text-2xl font-bold">Registration</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                                <input name="name" type="text"
                                       className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                       onChange={e => setData('name', e.target.value)}
                                       placeholder="Enter name"/>
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <input name="email" type="text"
                                       className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                       onChange={e => setData('email', e.target.value)}
                                       placeholder="Enter email"/>
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <input name="password" type="password"
                                       className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                       onChange={e => setData('password', e.target.value)}
                                       placeholder="Enter password"/>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                                <input name="password_confirmation" type="password"
                                       className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                       onChange={e => setData('password_confirmation', e.target.value)}
                                       placeholder="Enter confirm password"/>
                                {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}
                            </div>

                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox"
                                       className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                                <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm">
                                    I accept the <a href="javascript:void(0);"
                                                    className="text-blue-600 font-semibold hover:underline ml-1">Terms
                                    and
                                    Conditions</a>
                                </label>
                            </div>
                        </div>

                        <div className="!mt-12">
                            <button type="submit"
                                    className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                Create an account
                            </button>
                        </div>
                        <p className="text-gray-800 text-sm mt-6 text-center">
                            Already have an account?
                            <Link href="/login" className="text-blue-600 font-semibold hover:underline ml-1">
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}
