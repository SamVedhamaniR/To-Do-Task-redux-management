import React from 'react';
import { motion } from 'framer-motion';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-primary bg-opacity-50 z-50"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-secondary dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-xl font-bold mb-4 text-primary dark:text-secondary">Confirm Action</h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-6">{message}</p>
                <div className="flex justify-end space-x-2">
                    <button className="bg-neutral-500 text-secondary px-4 py-2 rounded hover:bg-neutral-600 transition" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="bg-red-500 text-secondary px-4 py-2 rounded hover:bg-red-600 transition" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ConfirmationModal;
