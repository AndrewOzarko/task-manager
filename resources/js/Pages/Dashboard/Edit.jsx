import { Link, Head, usePage, useForm, router } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Edit() {
    const { taskId } = usePage().props;
    const [options, setOptions] = useState({ statuses: [], priorities: [] });
    const [errors, setErrors] = useState({});
    const { data, setData, post, put, processing, } = useForm({
        title: '',
        description: '',
        priority: 'low',
        status: 'pending',
    });



    const fetchOptions = async () => {
        try {
            const response = await axios.get('/api/tasks/options');
            setOptions(response.data);
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    const fetchTask = async () => {
        try {
            const response = await axios.get(`/api/tasks/${taskId}`);
            const task = response.data.data;
            setData({
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
            });
        } catch (error) {
            console.error('Error fetching task details:', error);
        }
    };

    useEffect(() => {
        fetchOptions();
        fetchTask();
    }, [taskId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/tasks/${taskId}`, data);
            router.visit(`/tasks/${taskId}`)
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
            console.error('Error updating task:', error);
        }

    };

    return (
        <Layout>
            <Head title="Edit Task" />
            <div className="p-6">
                <h3 className="text-3xl font-bold dark:text-white">Edit Task</h3>
                <form onSubmit={handleSubmit} className="mt-6 bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-lg font-semibold">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
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
                            onChange={(e) => setData('description', e.target.value)}
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
                            onChange={(e) => setData({...data, priority: e.target.value})}
                            className="w-full p-2 border rounded-md"
                        >
                            {options.priorities.map(({value, label}) => (
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
                            onChange={(e) => setData({...data, status: e.target.value})}
                            className="w-full p-2 border rounded-md"
                        >
                            {options.statuses.map(({value, label}) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>

                    <div className="flex justify-end">
                        <Link
                            href={`/tasks/${taskId}`}
                            className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            disabled={processing}
                        >
                            {processing ? 'Updating...' : 'Update Task'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
