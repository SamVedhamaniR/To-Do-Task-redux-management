import React, { useState } from "react";
import { SunIcon, MoonIcon, PlusIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import Popper from "./ModalPopUp/index";
function ToDoMain() {
    const [showPopper, setShowPopper] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    const handleAdd = () => {
        setShowPopper(true);
    };

    const handleDownload = () => {
        alert("Download initiated!");
    };
    const handleCancel = () => {
        setShowPopper(false);
    };
    const onCreateTask = () => {};
    const handleCreateTask = (task) => {
        onCreateTask(task);
        setShowPopper(false);
    };
    return (
        <div className="top-[200px]">
            {" "}
            <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow-md ">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">ToDo Task List</h1>
                <div className="flex items-center space-x-4">
                    <button className="bg-violet-500 text-white p-2 rounded hover:bg-violet-600 transition" onClick={handleAdd}>
                        <PlusIcon className="w-6 h-6" />
                    </button>
                    <button className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition" onClick={handleDownload}>
                        <ArrowDownTrayIcon className="w-6 h-6" />
                    </button>
                    <button className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition" onClick={""}>
                        {darkMode ? <SunIcon className="w-6 h-6 text-yellow-300" /> : <MoonIcon className="w-6 h-6 text-blue-300" />}
                    </button>
                </div>
            </div>
            {showPopper && <Popper onCreate={handleCreateTask} onCancel={handleCancel} />}
        </div>
    );
}

export default ToDoMain;
