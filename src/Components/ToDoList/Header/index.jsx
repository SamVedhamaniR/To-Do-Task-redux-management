import React, { useState } from "react";
import { SunIcon, MoonIcon, PlusIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import Popper from "../ModalPopUp/index";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../../store/todoSlice";
import * as XLSX from 'xlsx';

function Header() {
    const [showPopper, setShowPopper] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const dispatch = useDispatch();
    const { todos } = useSelector(state => state.todos);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    const handleAdd = () => {
        setShowPopper(true);
    };

    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(todos);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "To-Do List");
        XLSX.writeFile(workbook, "todo-list.xlsx");
    };

    const handleCancel = () => {
        setShowPopper(false);
    };

    const handleCreateTask = (task) => {
        dispatch(addTodo({
            id: Date.now(),
            task,
            priority: 'Medium', // default priority
            assignedUser: 'Unassigned' // default user
        }));
        setShowPopper(false);
    };

    return (
        <div>
            <div className="top-[200px]">
                <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow-md ">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">ToDo Task List</h1>
                    <div className="flex items-center space-x-4">
                        <button className="bg-violet-500 text-white p-2 rounded hover:bg-violet-600 transition" onClick={handleAdd}>
                            <PlusIcon className="w-6 h-6" />
                        </button>
                        <button className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition" onClick={handleDownload}>
                            <ArrowDownTrayIcon className="w-6 h-6" />
                        </button>
                        <button className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition" onClick={toggleDarkMode}>
                            {darkMode ? <SunIcon className="w-6 h-6 text-yellow-300" /> : <MoonIcon className="w-6 h-6 text-blue-300" />}
                        </button>
                    </div>
                </div>
            </div>
            {showPopper && <Popper onCreate={handleCreateTask} onCancel={handleCancel} />}
        </div>
    );
}

export default Header;
