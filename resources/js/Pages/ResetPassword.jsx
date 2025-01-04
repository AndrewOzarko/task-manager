import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function ResetPassword() {
    const { token, email } = usePage().props; // Отримання токена і email з props
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await axios.post('/api/reset', {
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            setSuccess(true);
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setError(err.response.data.errors.password ? err.response.data.errors.password[0] : 'Unknown error');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 font-[sans-serif] min-h-screen flex items-center justify-center">
            <Head title="Reset Password" />
            <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
                {!success ? (
                    <>
                        <h2 className="text-gray-800 text-2xl font-bold text-center mb-6">Reset Password</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-3 text-sm"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-3 text-sm"
                                    placeholder="Confirm new password"
                                />
                                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition">
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="text-green-600 text-4xl mb-4">✔</div>
                        <p className="text-gray-800 text-lg font-semibold">Password reset successfully!</p>
                        <a
                            href="/login"
                            className="text-blue-600 hover:underline text-sm font-medium mt-4 inline-block">
                            Go to Login
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
