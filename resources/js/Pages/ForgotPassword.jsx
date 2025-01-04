import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await axios.post('/api/forgot', { email });
            setSuccess(true);
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setError(err.response.data.errors.email ? err.response.data.errors.email[0] : 'Unknown error');
            } else {
                setError('An error occurred, please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <Head title="Forgot password" />
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <a href="/">
                        <h1 className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Task Manager</h1>
                    </a>
                    <div className="p-8 rounded-2xl bg-white shadow">
                        {!success ? (
                            <>
                                <h2 className="text-gray-800 text-center text-2xl font-bold">Forgot password</h2>
                                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                            placeholder="Enter Email"
                                        />
                                        {error && <div className="text-red-600 text-sm">{error}</div>}
                                    </div>
                                    <div className="!mt-8">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                            {loading ? 'Sending...' : 'Reset'}
                                        </button>
                                    </div>
                                    <p className="text-gray-800 text-sm !mt-8 text-center">
                                        Already have an account?
                                        <Link
                                            href="/login"
                                            className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Login here</Link>
                                    </p>
                                </form>
                            </>
                        ) : (
                            <div className="text-center">
                                <div className="text-green-600 text-4xl mb-4">✔</div>
                                <p className="text-gray-800 text-lg font-semibold">The email was successfully sent. Please check your inbox!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
