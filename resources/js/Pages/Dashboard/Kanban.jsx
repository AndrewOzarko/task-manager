import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import Layout from "../../Layouts/Layout.jsx";
import {Head, usePage} from "@inertiajs/react";
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

    const [columns, setColumns] = useState(
        options.statuses.map((status) => ({
            id: status.value,
            title: status.label,
            tasks: tasks.data.filter((task) => task.status === status.value),
        }))
    );

    const moveTask = async (taskId, targetStatusId) => {
        try {
            console.log(targetStatusId)
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
                <p>{task.title}</p>
                <span>Priority: {task.priority_label}</span>
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
                <TaskModal task={selectedTask} isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </Layout>
    );
};

