import { Link, Head, usePage } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Task() {
    const {taskId} = usePage().props
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTask = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/tasks/${taskId}`);
            setTask(response.data.data);
        } catch (error) {
            console.error('Error fetching task details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [taskId]);

    return (
        <Layout>
            <Head title="Task Details" />
            <div className="p-6">
                <h3 className="text-3xl font-bold dark:text-white">Task Details</h3>
                {loading ? (
                    <p className="text-center text-gray-500 mt-4">Loading...</p>
                ) : task ? (
                    <div className="mt-6 bg-white shadow-md rounded-lg p-6">
                        <div className="mb-4">
                            <h4 className="text-lg font-bold">Title:</h4>
                            <p className="text-gray-800">{task.title}</p>
                        </div>
                        <div className="mb-4">
                            <h4 className="text-lg font-bold">Status:</h4>
                            <p className="text-gray-800">{task.status_label}</p>
                        </div>
                        <div className="mb-4">
                            <h4 className="text-lg font-bold">Priority:</h4>
                            <p className="text-gray-800">{task.priority_label}</p>
                        </div>
                        <div className="mb-4">
                            <h4 className="text-lg font-bold">Description:</h4>
                            <p className="text-gray-800">{task.description}</p>
                        </div>
                        <div className="mb-4">
                            <h4 className="text-lg font-bold">Created At:</h4>
                            <p className="text-gray-800">{task.created_at}</p>
                        </div>
                        <Link
                            href={`/tasks/${task.id}/edit`}
                            className="mr-2 inline-block px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                        >
                            Edit
                        </Link>
                        <Link
                            href="/"
                            className="inline-block px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                        >
                            Back to Task List
                        </Link>
                        <Link
                            href="/kanban"
                            className="ml-2 inline-block px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                        >
                            Back to Kanban
                        </Link>

                    </div>
                ) : (
                    <p className="text-center text-red-500 mt-4">Task not found.</p>
                )}
            </div>
        </Layout>
    );
}
