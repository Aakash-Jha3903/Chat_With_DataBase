import React from 'react';

export const Input = ({
    label,
    error,
    className = '',
    containerClassName = '',
    ...props
}) => {
    return (
        <div className={`w-full ${containerClassName}`}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-4 py-2 rounded-lg border ${error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-600 focus:ring-primary-500'
                    } bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
};

export const TextArea = ({
    label,
    error,
    className = '',
    containerClassName = '',
    ...props
}) => {
    return (
        <div className={`w-full ${containerClassName}`}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {label}
                </label>
            )}
            <textarea
                className={`w-full px-4 py-3 rounded-lg border ${error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-600 focus:ring-primary-500'
                    } bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all resize-none scrollbar-thin ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
};
