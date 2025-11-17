import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

const CalendarView = ({ tasks }) => {
    const [date, setDate] = useState(new Date());

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dayTasks = tasks.filter(task => {
                if (!task.dueDate) return false;
                const taskDueDate = new Date(task.dueDate);
                return taskDueDate.getDate() === date.getDate() &&
                       taskDueDate.getMonth() === date.getMonth() &&
                       taskDueDate.getFullYear() === date.getFullYear();
            });

            return dayTasks.length > 0 ? (
                <div className="flex flex-col items-center justify-center text-xs">
                    <div className="w-2 h-2 rounded-full bg-accent mt-1"></div>
                    <span className="text-primary dark:text-secondary">{dayTasks.length}</span>
                </div>
            ) : null;
        }
    };

    return (
        <div className="bg-secondary dark:bg-neutral-900 p-4 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-primary dark:text-secondary">Task Calendar</h2>
            <Calendar
                onChange={setDate}
                value={date}
                tileContent={tileContent}
                className="react-calendar bg-neutral-100 dark:bg-neutral-800 text-primary dark:text-secondary border-neutral-300 dark:border-neutral-700 rounded w-full"
            />
            <div className="mt-4">
                <h3 className="text-xl font-bold mb-2 text-primary dark:text-secondary">Tasks for {format(date, 'PPP')}</h3>
                {tasks.filter(task => {
                    if (!task.dueDate) return false;
                    const taskDueDate = new Date(task.dueDate);
                    return taskDueDate.getDate() === date.getDate() &&
                           taskDueDate.getMonth() === date.getMonth() &&
                           taskDueDate.getFullYear() === date.getFullYear();
                }).map(task => (
                    <div key={task.id} className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-md shadow mb-2">
                        <p className="text-primary dark:text-secondary font-medium">{task.task}</p>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm">Priority: {task.priority}</p>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm">Assigned: {task.assignedUser}</p>
                    </div>
                ))}
                {tasks.filter(task => {
                    if (!task.dueDate) return false;
                    const taskDueDate = new Date(task.dueDate);
                    return taskDueDate.getDate() === date.getDate() &&
                           taskDueDate.getMonth() === date.getMonth() &&
                           taskDueDate.getFullYear() === date.getFullYear();
                }).length === 0 && (
                    <p className="text-neutral-500 dark:text-neutral-400">No tasks due on this date.</p>
                )}
            </div>
        </div>
    );
};

export default CalendarView;
