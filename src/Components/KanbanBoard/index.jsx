import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ tasks, onDragEnd }) => {
    const columns = {
        'backlog': {
            title: 'Backlog',
            tasks: tasks.filter(task => task.status === 'backlog')
        },
        'in-progress': {
            title: 'In Progress',
            tasks: tasks.filter(task => task.status === 'in-progress')
        },
        'completed': {
            title: 'Completed',
            tasks: tasks.filter(task => task.status === 'completed')
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex space-x-4 p-4">
                {Object.entries(columns).map(([columnId, column]) => (
                    <KanbanColumn
                        key={columnId}
                        id={columnId}
                        title={column.title}
                        tasks={column.tasks}
                    />
                ))}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;
