import { Link, Head, useForm, router } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Create() {
    const [options, setOptions] = useState({ statuses: [], priorities: [] });
    const [data, setData] = useState({
        title: '',
        description: '',
        priority: 1,
        status: 1,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const fetchOptions = async () => {
        try {
            const response = await axios.get('/api/tasks/options');
            setOptions(response.data);
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            await axios.post('/api/tasks', data);
            router.visit(`/`)
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
            console.error('Error creating task:', error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Layout>
            <Head title="Create Task" />
            <div className="p-6">
                <h3 className="text-3xl font-bold dark:text-white">Create Task</h3>
                <form onSubmit={handleSubmit} className="mt-6 bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-lg font-semibold">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg font-semibold">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            rows="4"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="priority" className="block text-lg font-semibold">Priority:</label>
                        <select
                            id="priority"
                            value={data.priority}
                            onChange={(e) => setData({ ...data, priority: parseInt(e.target.value) })}
                            className="w-full p-2 border rounded-md"
                        >
                            {options.priorities.map(({ value, label }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                        {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status" className="block text-lg font-semibold">Status:</label>
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) => setData({ ...data, status: parseInt(e.target.value) })}
                            className="w-full p-2 border rounded-md"
                        >
                            {options.statuses.map(({ value, label }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>

                    <div className="flex justify-end">
                        <Link
                            href="/tasks"
                            className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            disabled={processing}
                        >
                            {processing ? 'Creating...' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
