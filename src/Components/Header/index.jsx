import React from 'react';
import { SunIcon, MoonIcon, ArrowDownTrayIcon, ListBulletIcon, Squares2X2Icon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const Header = ({
    darkMode,
    toggleDarkMode,
    handleDownload,
    showDownloadOptions,
    setShowDownloadOptions,
    viewMode,
    toggleViewMode
}) => {
    return (
        <header className="bg-secondary dark:bg-neutral-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <h1 className="text-2xl font-bold text-primary dark:text-secondary">ToDo Task List</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative inline-block text-left">
                            <div>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                                    className="bg-neutral-200 dark:bg-neutral-700 text-primary dark:text-secondary p-2 rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
                                >
                                    <ArrowDownTrayIcon className="w-6 h-6" />
                                </motion.button>
                            </div>
                            {showDownloadOptions && (
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-secondary dark:bg-neutral-700 ring-1 ring-black ring-opacity-5">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <a
                                            href="#"
                                            onClick={() => handleDownload('xlsx')}
                                            className="block px-4 py-2 text-primary dark:text-secondary hover:bg-neutral-100 dark:hover:bg-neutral-600"
                                            role="menuitem"
                                        >
                                            Download as .xlsx
                                        </a>
                                        <a
                                            href="#"
                                            onClick={() => handleDownload('csv')}
                                            className="block px-4 py-2 text-primary dark:text-secondary hover:bg-neutral-100 dark:hover:bg-neutral-600"
                                            role="menuitem"
                                        >
                                            Download as .csv
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="bg-neutral-200 dark:bg-neutral-700 text-primary dark:text-secondary p-2 rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
                            onClick={toggleViewMode}
                        >
                            {viewMode === 'list' ? <Squares2X2Icon className="w-6 h-6" /> : viewMode === 'kanban' ? <CalendarDaysIcon className="w-6 h-6" /> : <ListBulletIcon className="w-6 h-6" />}
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="bg-neutral-200 dark:bg-neutral-700 text-primary dark:text-secondary p-2 rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? <SunIcon className="w-6 h-6 text-yellow-300" /> : <MoonIcon className="w-6 h-6 text-blue-300" />}
                        </motion.button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
