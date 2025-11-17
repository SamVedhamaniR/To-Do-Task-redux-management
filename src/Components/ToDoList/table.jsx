import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../../store/todoSlice";
import { motion } from 'framer-motion';
import EditModal from "./ModalPopUp/EditModal";
import ConfirmationModal from "../ConfirmationModal";
import EmptyState from "../EmptyState";

const TodoTable = ({ data }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [deletingSelected, setDeletingSelected] = useState(false);
    const dispatch = useDispatch();
    const headerCheckboxRef = useRef();
    const prevDataLengthRef = useRef(data.length);

    useEffect(() => {
        const newTotalPages = Math.ceil(data.length / rowsPerPage);
        if (prevDataLengthRef.current < data.length) {
            setCurrentPage(newTotalPages);
        }
        prevDataLengthRef.current = data.length;
    }, [data.length, rowsPerPage]);

    useEffect(() => {
        const newTotalPages = Math.ceil(data.length / rowsPerPage);
        if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1);
        }
    }, [data.length, rowsPerPage, currentPage]);

    const totalPages = Math.ceil(data?.length / rowsPerPage);

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const selectedData = data.slice(startIndex, startIndex + rowsPerPage);

    useEffect(() => {
        const numSelected = selectedTasks.filter(taskId => selectedData.some(item => item.id === taskId)).length;
        const numOnPage = selectedData.length;
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.checked = numSelected === numOnPage && numOnPage > 0;
            headerCheckboxRef.current.indeterminate = numSelected > 0 && numSelected < numOnPage;
        }
    }, [selectedTasks, selectedData]);

    const handleHeaderCheckboxChange = (e) => {
        if (e.target.checked) {
            setSelectedTasks((prev) => [...new Set([...prev, ...selectedData.map((item) => item.id)])]);
        } else {
            setSelectedTasks((prev) => prev.filter(taskId => !selectedData.some(item => item.id === taskId)));
        }
    };

    const handleCheckboxChange = (taskId) => {
        setSelectedTasks((prev) => {
            if (prev.includes(taskId)) {
                return prev.filter((id) => id !== taskId);
            } else {
                return [...prev, taskId];
            }
        });
    };

    const confirmDelete = (taskId) => {
        setTaskToDelete(taskId);
        setDeletingSelected(false);
        setShowDeleteConfirm(true);
    };

    const confirmDeleteSelected = () => {
        setDeletingSelected(true);
        setShowDeleteConfirm(true);
    };

    const executeDelete = () => {
        if (deletingSelected) {
            selectedTasks.forEach(taskId => {
                dispatch(deleteTodo(taskId));
            });
            setSelectedTasks([]);
        } else if (taskToDelete) {
            dispatch(deleteTodo(taskToDelete));
        }
        setShowDeleteConfirm(false);
        setTaskToDelete(null);
        setDeletingSelected(false);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setTaskToDelete(null);
        setDeletingSelected(false);
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleSave = (task) => {
        dispatch(editTodo(task));
        setEditingTask(null);
    };

    return (
        <div className="bg-secondary dark:bg-neutral-900 p-4 shadow-md rounded-lg">
            {editingTask && <EditModal task={editingTask} onSave={handleSave} onCancel={() => setEditingTask(null)} />}
            {showDeleteConfirm && (
                <ConfirmationModal
                    message={deletingSelected ? "Are you sure you want to delete selected tasks?" : `Are you sure you want to delete task "${data.find(t => t.id === taskToDelete)?.task}"?`}
                    onConfirm={executeDelete}
                    onCancel={cancelDelete}
                />
            )}
            <div className="flex justify-between mb-4">
                <button onClick={confirmDeleteSelected} className="bg-red-500 text-secondary px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50" disabled={selectedTasks.length === 0}>Delete Selected</button>
                <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    className="bg-neutral-100 dark:bg-neutral-900 text-primary dark:text-secondary border border-neutral-300 dark:border-neutral-700 rounded p-2"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </div>
                        {data.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                                        <thead className="bg-neutral-100 dark:bg-neutral-900">
                                            <tr>
                                                <th className="px-8 py-4">
                                                    <input
                                                        type="checkbox"
                                                        ref={headerCheckboxRef}
                                                        className="form-checkbox h-5 w-5 text-accent rounded focus:ring-accent"
                                                        onChange={handleHeaderCheckboxChange}
                                                    />
                                                </th>
                                                <th className="px-8 py-4 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                                    Sequence Number
                                                </th>
                                                <th className="px-8 py-4 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                                    Task
                                                </th>
                                                <th className="px-8 py-4 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                                    Priority
                                                </th>
                                                <th className="px-8 py-4 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                                    Assigned User
                                                </th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-secondary dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
                                            {selectedData.map((item, index) => (
                                                <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layout className="hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200">
                                                    <td className="px-8 py-5 text-base font-medium text-primary dark:text-secondary">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox h-5 w-5 text-accent rounded focus:ring-accent"
                                                            checked={selectedTasks.includes(item.id)}
                                                            onChange={() => handleCheckboxChange(item.id)}
                                                        />
                                                    </td>
                                                    <td className="px-8 py-5 text-left whitespace-nowrap text-base font-medium text-primary dark:text-secondary">
                                                        {startIndex + index + 1}
                                                    </td>
                                                    <td className="px-8 py-5 text-left whitespace-nowrap text-base text-neutral-500 dark:text-neutral-400">{item.task}</td>
                                                    <td className="px-8 py-5 text-left whitespace-nowrap text-base">
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        item.priority === 'High' ? 'bg-red-500 text-white' :
        item.priority === 'Medium' ? 'bg-orange-400 text-white' :
        'bg-yellow-400 text-white'
    }`}>
        {item.priority}
    </span>
</td>
                                                    <td className="px-8 py-5 text-left whitespace-nowrap text-base text-neutral-500 dark:text-neutral-400">
                                                        {item.assignedUser}
                                                    </td>
                                                    <td onClick={() => handleEdit(item)} className="cursor-pointer px-8 py-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-neutral-500 hover:text-accent dark:hover:text-accent transition-colors duration-200">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                        </svg>
                                                    </td>
                                                    <td onClick={() => handleDelete(item.id)} className="cursor-pointer px-8 py-5">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="size-6 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                            />
                                                        </svg>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-neutral-500">
                                        Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, data.length)} of {data.length} entries
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                            className="bg-neutral-500 text-secondary px-3 py-1 rounded hover:bg-neutral-600 transition disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                            className="bg-neutral-500 text-secondary px-3 py-1 rounded hover:bg-neutral-600 transition disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
        </div>
    );
};

export default TodoTable;
