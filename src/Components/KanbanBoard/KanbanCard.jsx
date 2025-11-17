import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditModal from '../ToDoList/ModalPopUp/EditModal';
import { useDispatch } from 'react-redux';
import { editTodo } from '../../store/todoSlice';

const KanbanCard = ({ task, index }) => {
    const [editingTask, setEditingTask] = useState(null);
    const dispatch = useDispatch();

    const handleEdit = () => {
        setEditingTask(task);
    };

    const handleSave = (updatedTask) => {
        dispatch(editTodo(updatedTask));
        setEditingTask(null);
    };

    const handleCancel = () => {
        setEditingTask(null);
    };

    return (
        <>
            <Draggable draggableId={task.id.toString()} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-secondary dark:bg-neutral-700 p-3 rounded-md shadow mb-3 cursor-pointer"
                        onClick={handleEdit}
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
            {editingTask && (
                <EditModal
                    task={editingTask}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

export default KanbanCard;
