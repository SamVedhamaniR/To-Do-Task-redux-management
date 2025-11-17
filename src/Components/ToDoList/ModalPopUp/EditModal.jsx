import React, { useState } from "react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default calendar styling
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../../store/todoSlice";

const EditModal = ({ task, onSave, onCancel }) => {
    const [taskName, setTaskName] = useState(task.task);
    const [priority, setPriority] = useState(task.priority);
    const [assignedUser, setAssignedUser] = useState(task.assignedUser);
    const [dueDate, setDueDate] = useState(task.dueDate ? new Date(task.dueDate) : null); // New state for due date
    const dispatch = useDispatch();

    const handleSave = () => {
        onSave({
            ...task,
            task: taskName,
            priority,
            assignedUser,
            dueDate: dueDate ? dueDate.toISOString() : null,
        });
    };

    const handleDelete = () => {
        dispatch(deleteTodo(task.id));
        onCancel(); // Close the modal after deleting
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-primary bg-opacity-50 z-50"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-secondary dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-96"
            >
                <button
                    className="absolute top-2 right-2 text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-secondary transition"
                    onClick={onCancel}
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-primary dark:text-secondary">Edit Task</h2>
                <input
                    type="text"
                    className="w-full p-2 mb-4 border border-neutral-300 dark:border-neutral-700 rounded text-primary dark:text-secondary bg-neutral-100 dark:bg-neutral-900 focus:outline-none"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <input
                    type="text"
                    className="w-full p-2 mb-4 border border-neutral-300 dark:border-neutral-700 rounded text-primary dark:text-secondary bg-neutral-100 dark:bg-neutral-900 focus:outline-none"
                    placeholder="Assigned User"
                    value={assignedUser}
                    onChange={(e) => setAssignedUser(e.target.value)}
                />
                <select
                    className="w-full p-2 mb-4 border border-neutral-300 dark:border-neutral-700 rounded text-primary dark:text-secondary bg-neutral-100 dark:bg-neutral-900 focus:outline-none"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <div className="mb-4">
                    <label className="block text-primary dark:text-secondary text-sm font-bold mb-2">Due Date:</label>
                    <Calendar
                        onChange={setDueDate}
                        value={dueDate}
                        className="react-calendar bg-neutral-100 dark:bg-neutral-900 text-primary dark:text-secondary border-neutral-300 dark:border-neutral-700 rounded"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button className="bg-red-500 text-secondary px-4 py-2 rounded hover:bg-red-600 transition" onClick={handleDelete}>
                        <TrashIcon className="w-5 h-5 inline-block mr-1" /> Delete
                    </button>
                    <button className="bg-neutral-500 text-secondary px-4 py-2 rounded hover:bg-neutral-600 transition" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="bg-accent text-secondary px-4 py-2 rounded hover:bg-neutral-500 transition" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default EditModal;
