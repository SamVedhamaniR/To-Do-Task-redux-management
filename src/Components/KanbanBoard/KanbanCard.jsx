import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const KanbanCard = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-secondary dark:bg-neutral-700 p-3 rounded-md shadow mb-3"
                >
                    <p className="text-primary dark:text-secondary font-medium">{task.task}</p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">{task.assignedUser}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.priority === 'High' ? 'bg-red-500 text-white' :
                        task.priority === 'Medium' ? 'bg-orange-400 text-white' :
                        'bg-yellow-400 text-white'
                    }`}>
                        {task.priority}
                    </span>
                </div>
            )}
        </Draggable>
    );
};

export default KanbanCard;
