// src/components/Popper.jsx
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Popper = ({ onCreate, onCancel }) => {
    const [task, setTask] = useState("");

    const handleCreate = () => {
        if (task.trim()) {
            onCreate(task);
            setTask("");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <button
                    className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition"
                    onClick={onCancel}
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Create Task</h2>
                <input
                    type="text"
                    className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 focus:outline-none"
                    placeholder="New Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600 transition" onClick={handleCreate}>
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popper;
