import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import Layout from "../../Layouts/Layout.jsx";
import {Head, router, usePage} from "@inertiajs/react";
import TaskModal from './TaskModal';
import "./kanban.css";

export default function  Kanban() {
    const { tasks, options } = usePage().props

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const openModal = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            router.visit('/kanban', {
                only: ['tasks'],
            })
        } catch (error) {
            console.error('Error deleting task:', error);
        } finally {
        }
    };

    const [columns, setColumns] = useState(
        options.statuses.map((status) => ({
            id: status.value,
            title: status.label,
            tasks: tasks.data.filter((task) => task.status === status.value),
        }))
    );

    const moveTask = async (taskId, targetStatusId) => {
        try {
            await axios.post(`/api/tasks/${taskId}/transfer`, { status: targetStatusId });

            setColumns((prevColumns) =>
                prevColumns.map((column) => ({
                    ...column,
                    tasks:
                        column.id === targetStatusId
                            ? [...column.tasks, tasks.data.find((task) => task.id === taskId)]
                            : column.tasks.filter((task) => task.id !== taskId),
                }))
            );
        } catch (error) {
            console.error("Error transferring task:", error);
        }
    };

    const Column = ({ column }) => {
        const [, dropRef] = useDrop({
            accept: "TASK",
            drop: (item) => moveTask(item.id, column.id),
        });

        return (
            <div className="kanban-column" ref={dropRef}>
                <h2>{column.title}</h2>
                <div className="kanban-tasks">
                    {column.tasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))}
                </div>
            </div>
        );
    };

    const Task = ({ task }) => {
        const [, dragRef] = useDrag({
            type: "TASK",
            item: { id: task.id },
        });

        return (
            <div className="kanban-task" ref={dragRef} onClick={() => openModal(task)}>
                <div className={"flex items-center pb-3"}>
                    <h5 className={"text-gray-800 text-xl font-bold flex-1"}>{task.title}</h5>
                    <button type={"button"} onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(task.id);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="w-3 ml-2 cursor-pointer shrink-0 fill-red-400 hover:fill-red-500"
                             viewBox="0 0 320.591 320.591">
                            <path
                                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
                            <path
                                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
                        </svg>
                    </button>
                </div>

                <span>{task.priority_label}</span>
            </div>
        );
    };

    return (
        <Layout>
            <Head title={'Kanban'}/>
            <div className="p-6">
                <h3 className="text-3xl font-bold dark:text-white mb-6">Kanban</h3>
                <DndProvider backend={HTML5Backend}>
                    <div className="kanban-board">
                        {columns.map((column) => (
                            <Column key={column.id} column={column}/>
                        ))}
                    </div>
                </DndProvider>
                <TaskModal task={selectedTask} isOpen={isModalOpen} onClose={closeModal}/>
            </div>
        </Layout>
    );
};

