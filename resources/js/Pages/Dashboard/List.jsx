import { Link, Head, router } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function List() {
    const [tasks, setTasks] = useState({ data: [], meta: { links: [] } });
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        sort: 'created_at',
        order: 'desc',
    });
    const [options, setOptions] = useState({ status: [], priority: [] });

    const fetchOptions = async () => {
        try {
            const response = await axios.get('/api/tasks/options');
            setOptions(response.data);
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    const fetchTasks = async (url = '/api/tasks') => {
        setLoading(true);
        try {
            const params = {
                ...filters,

                sort: filters.order === 'asc' ? filters.sort : `-${filters.sort}`,
                'filter[status]': filters.status || undefined,
                'filter[priority]': filters.priority || undefined,
            };

            const query = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined));

            const response = await axios.get(url, { params: query });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await axios.delete(`/api/tasks/${id}`);

            const isLastItemOnPage = tasks.data.length === 1;
            const shouldGoToPreviousPage = isLastItemOnPage && tasks.meta.current_page > 1;

            if (shouldGoToPreviousPage) {
                fetchTasks(tasks.meta.prev_page_url);
            } else {
                setTasks((prevState) => ({
                    ...prevState,
                    data: prevState.data.filter((task) => task.id !== id),
                }));
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const handlePageChange = (url) => {
        if (url) {
            fetchTasks(url);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handleSortChange = (field) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sort: field,
            order: prevFilters.order === 'asc' ? 'desc' : 'asc',
        }));
    };

    useEffect(() => {
        fetchTasks();
    }, [filters]);

    useEffect(() => {
        fetchOptions();
    }, []);

    return (
        <Layout>
            <Head title="Task list" />
            <h3 className="text-3xl font-bold dark:text-white">List</h3>
            <section className="main-content w-full overflow-auto p-6">
                <div className="mb-4">
                    <label className="mr-2 font-semibold">Status:</label>
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="p-2 border rounded-md"
                    >
                        <option value="">All</option>
                        {options.statuses && options.statuses.length > 0 ? (
                            options.statuses.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))
                        ) : (
                            <option value="">No options available</option>
                        )}
                    </select>
                    <label className="ml-4 mr-2 font-semibold">Priority:</label>
                    <select
                        name="priority"
                        value={filters.priority}
                        onChange={handleFilterChange}
                        className="p-2 border rounded-md"
                    >
                        <option value="">All</option>
                        {options.priorities && options.priorities.length > 0 ? (
                            options.priorities.map((priority) => (
                                <option key={priority.value} value={priority.value}>
                                    {priority.label}
                                </option>
                            ))
                        ) : (
                            <option value="">No options available</option>
                        )}
                    </select>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : (
                        <>
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-800 whitespace-nowrap">
                                <tr>
                                    <th className="p-4 text-left text-sm font-medium text-white">ID</th>
                                    <th
                                        className="p-4 text-left text-sm font-medium text-white cursor-pointer"
                                    >
                                        Title
                                    </th>
                                    <th className="p-4 text-left text-sm font-medium text-white">Status</th>
                                    <th className="p-4 text-left text-sm font-medium text-white">Priority</th>
                                    <th
                                        className="p-4 text-left text-sm font-medium text-white cursor-pointer"
                                        onClick={() => handleSortChange('created_at')}
                                    >
                                        Created {filters.sort === 'created_at' && (filters.order === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="p-4 text-left text-sm font-medium text-white">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="whitespace-nowrap">
                                {tasks.data.map((task) => (
                                    <tr key={task.id} className="even:bg-blue-50">
                                        <td className="p-4 text-sm text-black">{task.id}</td>
                                        <td className="p-4 text-sm text-black">{task.title}</td>
                                        <td className="p-4 text-sm text-black">{task.status_label}</td>
                                        <td className="p-4 text-sm text-black">{task.priority_label}</td>
                                        <td className="p-4 text-sm text-black">{task.created_at}</td>
                                        <td className="p-4">
                                            <button title="View"
                                                    type="button"
                                                    className="mr-2"
                                                    onClick={() => router.visit(`/tasks/${task.id}`)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor"
                                                     className="mr-2" viewBox="0 0 64 64">
                                                    <path
                                                        d="M31.991 48.248c-.452 0-.905-.012-1.36-.036-9.677-.516-18.492-6.558-22.456-15.394a2 2 0 1 1 3.65-1.637c3.357 7.482 10.822 12.6 19.019 13.036 9.046.485 17.617-4.758 21.332-13.036a2 2 0 0 1 3.65 1.637c-4.201 9.361-13.661 15.43-23.835 15.43z"
                                                        data-original="#000000"></path>
                                                    <path
                                                        d="M9.999 34.001a2 2 0 0 1-1.824-2.82c4.387-9.776 14.515-15.958 25.194-15.394 9.677.516 18.492 6.558 22.456 15.394a2 2 0 1 1-3.65 1.637c-3.357-7.482-10.822-12.6-19.019-13.036-9.042-.483-17.617 4.758-21.332 13.036a1.997 1.997 0 0 1-1.825 1.183z"
                                                        data-original="#000000"></path>
                                                    <path
                                                        d="M32 40.242c-4.545 0-8.243-3.697-8.243-8.242s3.698-8.242 8.243-8.242 8.243 3.697 8.243 8.242-3.698 8.242-8.243 8.242zm0-12.484c-2.3 0-4.243 1.942-4.243 4.242S29.7 36.242 32 36.242 36.243 34.3 36.243 32 34.3 27.758 32 27.758z"
                                                        data-original="#000000"></path>
                                                </svg>
                                            </button>
                                            <button className="mr-4" title="Edit"
                                                    onClick={() => router.visit(`/tasks/${task.id}/edit`)}
                                                        >
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="w-5 fill-blue-500 hover:fill-blue-700"
                                                        viewBox="0 0 348.882 348.882">
                                                        <path
                                                        d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                                        data-original="#000000"/>
                                                        <path
                                                        d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                                        data-original="#000000"/>
                                                        </svg>
                                                        </button>
                                                        <button className="mr-4" title="Delete" onClick={() => handleDelete(task.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className="w-5 fill-red-500 hover:fill-red-700"
                                                     viewBox="0 0 24 24">
                                                    <path
                                                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                        data-original="#000000"/>
                                                    <path
                                                        d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                                        data-original="#000000"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <ul className="flex space-x-4 justify-center mt-8 font-[sans-serif]">
                                {tasks.meta.links.map((link, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold px-[13px] h-9 rounded-md ${
                                            link.active
                                                ? 'bg-blue-100 text-gray-800'
                                                : link.url
                                                    ? 'text-gray-800'
                                                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                        }`}
                                        onClick={() => handlePageChange(link.url)}
                                        dangerouslySetInnerHTML={{__html: link.label}}
                                    ></li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
}
