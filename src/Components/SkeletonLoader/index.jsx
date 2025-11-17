import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="bg-secondary dark:bg-neutral-900 p-4 shadow-md rounded-lg animate-pulse">
            <div className="flex justify-between mb-4">
                <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded w-32"></div>
                <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded w-24"></div>
            </div>
            <div className="overflow-x-auto">
                <div className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                    <div className="bg-neutral-100 dark:bg-neutral-800">
                        <div className="flex">
                            <div className="px-8 py-4 w-1/6 h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                            <div className="px-8 py-4 w-1/6 h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                            <div className="px-8 py-4 w-1/6 h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                            <div className="px-8 py-4 w-1/6 h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                            <div className="px-8 py-4 w-1/6 h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                            <div className="px-8 py-4 w-1/12 h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                            <div className="px-8 py-4 w-1/12 h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                        </div>
                    </div>
                    <div className="bg-secondary dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex">
                                <div className="px-8 py-5 w-1/6 h-12 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                                <div className="px-8 py-5 w-1/6 h-12 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                                <div className="px-8 py-5 w-1/6 h-12 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                                <div className="px-8 py-5 w-1/6 h-12 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                                <div className="px-8 py-5 w-1/6 h-12 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                                <div className="px-8 py-5 w-1/12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                                <div className="px-8 py-5 w-1/12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-48"></div>
                <div className="flex space-x-2">
                    <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-24"></div>
                    <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-24"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
