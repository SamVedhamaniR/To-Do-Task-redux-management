import React, { useState } from "react";

const TodoTable = ({ data }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTasks, setSelectedTasks] = useState([]);
 
     const [dataList, setDataList] = useState([
        { task: "Task 1", priority: "High", assignedUser: "User A" },
        { task: "Task 2", priority: "Medium", assignedUser: "User B" },
        { task: "Task 3", priority: "Low", assignedUser: "User C" },
        { task: "Task 4", priority: "High", assignedUser: "User D" },
        { task: "Task 5", priority: "Medium", assignedUser: "User E" },
        { task: "Task 6", priority: "Low", assignedUser: "User F" },
        { task: "Task 7", priority: "High", assignedUser: "User G" },
        { task: "Task 8", priority: "Medium", assignedUser: "User H" },
        { task: "Task 9", priority: "Low", assignedUser: "User I" },
        { task: "Task 10", priority: "High", assignedUser: "User J" },
        { task: "Task 11", priority: "Medium", assignedUser: "User K" },
        { task: "Task 12", priority: "Low", assignedUser: "User L" },
    ]);
    const totalPages = Math.ceil(dataList?.length / rowsPerPage);

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
    const selectedData = dataList.slice(startIndex, startIndex + rowsPerPage);

    const handleCheckboxChange = (task) => {
        setSelectedTasks((prev) => {
            if (prev.includes(task)) {
                return prev.filter((t) => t !== task);
            } else {
                return [...prev, task];
            }
        });
    };
    const handleDeleteSelected = () => {
        // Remove selected tasks from the data list
        const updatedDataList = dataList.filter((item) => !selectedTasks.includes(item.task));
        setDataList(updatedDataList);
        setSelectedTasks([]);
        console.log("Deleted Tasks:", selectedTasks);
        console.log("Updated Data List:", updatedDataList);
    };
    return (
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md ">
            <div className="flex justify-end mb-2">
                <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded p-2"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </div>
            <div className="overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                    <thead className="bg-gray-100 dark:bg-gray-900  sticky overflow-hidden">
                        <tr>
                            <th className="px-6 py-3">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-violet-600 dark:text-violet-400"
                                    checked={selectedTasks.length === selectedData.length}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedTasks(selectedData.map((item) => item.task));
                                        } else {
                                            setSelectedTasks([]);
                                        }
                                    }}
                                />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Sequence Number
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Task
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Priority
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Assigned User
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {selectedData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-500">
                                <td className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-violet-600 dark:text-violet-400"
                                        checked={selectedTasks.includes(item.task)}
                                        onChange={() => handleCheckboxChange(item.task)}
                                    />
                                </td>
                                <td className="px-6 py-4 text-left whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {startIndex + index + 1}
                                </td>
                                <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.task}</td>
                                <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.priority}</td>
                                <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {item.assignedUser}
                                </td>
                                <td onClick={()=>handleDeleteSelected(index)} className="cursor-pointer ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="red"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="text-gray-500">
                    Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, dataList.length)} of {dataList.length} entries
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoTable;
