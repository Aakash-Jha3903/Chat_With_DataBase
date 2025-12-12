import React from 'react';

export const Card = ({ children, className = '', variant = 'default', ...props }) => {
    const variants = {
        default: 'glass',
        hover: 'glass-hover',
        solid: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
    };

    return (
        <div className={`rounded-xl p-6 ${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => (
    <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-xl font-bold text-slate-900 dark:text-white ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
    <p className={`text-sm text-slate-600 dark:text-slate-400 mt-1 ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = '' }) => (
    <div className={className}>{children}</div>
);
