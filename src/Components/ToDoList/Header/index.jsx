import React, { useState } from "react";
import { SunIcon, MoonIcon, PlusIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

function Header() {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };
    return (
        <div>
            {" "}
            <div className="top-[200px]">
                {" "}
                <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow-md ">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">ToDo Task List</h1>
                    <div className="flex items-center space-x-4">
                        <button className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition" onClick={""}>
                            {darkMode ? <SunIcon className="w-6 h-6 text-yellow-300" /> : <MoonIcon className="w-6 h-6 text-blue-300" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
