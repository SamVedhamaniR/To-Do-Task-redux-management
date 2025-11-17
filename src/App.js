import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import Header from './Components/Header';
import ToDoMain from './Components/ToDoList';
import SkeletonLoader from './Components/SkeletonLoader';
import KanbanBoard from './Components/KanbanBoard';
import CalendarView from './Components/CalendarView';
import HelpPopup from './Components/HelpPopup';
import { addTodo, updateTaskStatus } from './store/todoSlice';

function App() {
    const { todos } = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const [showPopper, setShowPopper] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showDownloadOptions, setShowDownloadOptions] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('list'); // 'list', 'kanban', or 'calendar'

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate 2 seconds loading time
        return () => clearTimeout(timer);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    const handleAdd = () => {
        setShowPopper(true);
    };

    const handleDownload = (format) => {
        if (format === 'xlsx') {
            const ws = XLSX.utils.json_to_sheet(todos);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Tasks");
            XLSX.writeFile(wb, "tasks.xlsx");
        } else if (format === 'csv') {
            const csv = Papa.unparse(todos);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "tasks.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        setShowDownloadOptions(false);
    };

    const handleCancel = () => {
        setShowPopper(false);
    };

    const handleCreateTask = (task) => {
        dispatch(addTodo({ ...task, id: Date.now() }));
        setShowPopper(false);
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Assuming draggableId is the task ID and destination.droppableId is the new status
        dispatch(updateTaskStatus({ id: parseInt(draggableId), status: destination.droppableId }));
    };

    const toggleViewMode = () => {
        if (viewMode === 'list') {
            setViewMode('kanban');
        } else if (viewMode === 'kanban') {
            setViewMode('calendar');
        } else {
            setViewMode('list');
        }
    };

    return (
        <div className="App bg-neutral-100 dark:bg-primary min-h-screen">
            <Header 
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                handleDownload={handleDownload}
                showDownloadOptions={showDownloadOptions}
                setShowDownloadOptions={setShowDownloadOptions}
                viewMode={viewMode}
                toggleViewMode={toggleViewMode}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AnimatePresence>
                    {loading ? (
                        <SkeletonLoader />
                    ) : viewMode === 'list' ? (
                        <ToDoMain 
                            data={todos} 
                            showPopper={showPopper}
                            handleCancel={handleCancel}
                            handleCreateTask={handleCreateTask}
                        />
                    ) : viewMode === 'kanban' ? (
                        <KanbanBoard tasks={todos} onDragEnd={onDragEnd} />
                    ) : (
                        <CalendarView tasks={todos} />
                    )}
                </AnimatePresence>
            </main>
            <motion.button
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-4 left-4 bg-accent text-secondary p-3 rounded-full shadow-lg hover:bg-blue-600 transition z-50"
                onClick={handleAdd}
            >
                <PlusIcon className="w-8 h-8" />
            </motion.button>
            <button
                className="fixed bottom-4 right-4 bg-accent text-secondary p-3 rounded-full shadow-lg hover:bg-blue-600 transition z-50"
                onClick={() => setShowHelp(true)}
            >
                <QuestionMarkCircleIcon className="w-8 h-8" />
            </button>
            <AnimatePresence>
                {showHelp && <HelpPopup onClose={() => setShowHelp(false)} />}
            </AnimatePresence>
        </div>
    );
}

export default App;
