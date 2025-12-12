import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from './Button';

export const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message, sqlQuery }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative glass rounded-xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-700 shadow-2xl animate-slide-up">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                            {title || 'Confirm Action'}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {message || 'This action will modify your database. Are you sure you want to continue?'}
                        </p>
                    </div>
                </div>

                {/* SQL Query Display */}
                {sqlQuery && (
                    <div className="mb-6">
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                            SQL Query to Execute:
                        </p>
                        <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                            <code className="text-sm text-emerald-400 font-mono">
                                {sqlQuery}
                            </code>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 justify-end">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="min-w-[100px]"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onConfirm}
                        className="min-w-[100px] bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700"
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};
