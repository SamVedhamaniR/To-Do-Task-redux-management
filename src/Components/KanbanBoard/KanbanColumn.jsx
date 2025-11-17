import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ title, tasks, id }) => {
    return (
        <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold mb-4 text-primary dark:text-secondary">{title}</h3>
            <Droppable droppableId={id}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[100px]" // Minimum height to make droppable area visible
                    >
                        {tasks.map((task, index) => (
                            <KanbanCard key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default KanbanColumn;
