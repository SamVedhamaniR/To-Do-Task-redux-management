import React from "react";
import Popper from "./ModalPopUp/index";
import TodoTable from "./table.jsx";
import { motion } from 'framer-motion';

function ToDoMain({ data, showPopper, handleCancel, handleCreateTask }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {showPopper && <Popper onCreate={handleCreateTask} onCancel={handleCancel} />}
            <TodoTable data={data} />
        </motion.div>
    );
}

export default ToDoMain;
