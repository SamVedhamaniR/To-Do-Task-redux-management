import React from 'react';
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const HelpPopup = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-primary border border-secondary p-6 rounded-lg shadow-lg w-80 z-50"
        >
            <button
                className="absolute top-2 right-2 text-secondary hover:text-accent transition"
                onClick={onClose}
            >
                <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-secondary">How to Use</h2>
            <ul className="list-disc list-inside text-secondary space-y-2">
                <li>Click the <span className="font-semibold text-accent">+</span> button to add a new task.</li>
                <li>Use the <span className="font-semibold text-accent">Edit</span> icon to modify a task.</li>
                <li>Use the <span className="font-semibold text-red-500">Delete</span> icon to remove a task.</li>
                <li>Select multiple tasks using checkboxes and click "Delete Selected" to remove them.</li>
                <li>Download your tasks as .xlsx or .csv using the <span className="font-semibold text-accent">Download</span> button.</li>
                <li>Toggle Dark/Light mode using the <span className="font-semibold text-accent">Sun/Moon</span> icon.</li>
            </ul>
        </motion.div>
    );
};

export default HelpPopup;
