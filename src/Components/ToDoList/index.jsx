import React, { useState, useEffect } from "react";
import Popper from "./ModalPopUp/index";
import TodoTable from "./table.jsx";
import { motion } from 'framer-motion';

function ToDoMain({ data, showPopper, handleCancel, handleCreateTask }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedPriorities, setSelectedPriorities] = useState([]);
    const [filteredData, setFilteredData] = useState(data);

    const statusOptions = ['backlog', 'in-progress', 'completed'];
    const priorityOptions = ['Low', 'Medium', 'High'];

    useEffect(() => {
        let currentFilteredData = data;

        // Apply search term filter
        if (searchTerm) {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            currentFilteredData = currentFilteredData.filter(task =>
                task.task.toLowerCase().includes(lowercasedSearchTerm) ||
                task.assignedUser.toLowerCase().includes(lowercasedSearchTerm) ||
                task.priority.toLowerCase().includes(lowercasedSearchTerm) ||
                task.status.toLowerCase().includes(lowercasedSearchTerm)
            );
        }

        // Apply status filter
        if (selectedStatuses.length > 0) {
            currentFilteredData = currentFilteredData.filter(task =>
                selectedStatuses.includes(task.status)
            );
        }

        // Apply priority filter
        if (selectedPriorities.length > 0) {
            currentFilteredData = currentFilteredData.filter(task =>
                selectedPriorities.includes(task.priority)
            );
        }

        setFilteredData(currentFilteredData);
    }, [searchTerm, selectedStatuses, selectedPriorities, data]);

    const handleStatusFilterChange = (status) => {
        setSelectedStatuses(prev =>
            prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
        );
    };

    const handlePriorityFilterChange = (priority) => {
        setSelectedPriorities(prev =>
            prev.includes(priority) ? prev.filter(p => p !== priority) : [...prev, priority]
        );
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {showPopper && <Popper onCreate={handleCreateTask} onCancel={handleCancel} />}
            <div className="mb-4 flex space-x-4">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="flex-1 p-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-secondary dark:bg-neutral-800 text-primary dark:text-secondary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Status Filter Dropdown */}
                <div className="relative">
                    <button className="p-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-secondary dark:bg-neutral-800 text-primary dark:text-secondary">
                        Status
                    </button>
                    <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-secondary dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {statusOptions.map(status => (
                                <label key={status} className="flex items-center px-4 py-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-accent rounded focus:ring-accent"
                                        checked={selectedStatuses.includes(status)}
                                        onChange={() => handleStatusFilterChange(status)}
                                    />
                                    <span className="ml-2 text-primary dark:text-secondary capitalize">{status}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Priority Filter Dropdown */}
                <div className="relative">
                    <button className="p-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-secondary dark:bg-neutral-800 text-primary dark:text-secondary">
                        Priority
                    </button>
                    <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-secondary dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {priorityOptions.map(priority => (
                                <label key={priority} className="flex items-center px-4 py-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-accent rounded focus:ring-accent"
                                        checked={selectedPriorities.includes(priority)}
                                        onChange={() => handlePriorityFilterChange(priority)}
                                    />
                                    <span className="ml-2 text-primary dark:text-secondary capitalize">{priority}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <TodoTable data={filteredData} />
        </motion.div>
    );
}

export default ToDoMain;
