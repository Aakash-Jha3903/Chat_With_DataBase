import React from 'react';
import { Database, Moon, Sun } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const Header = ({ darkMode, toggleDarkMode, dbInitialized }) => {
    return (
        <header className="glass sticky top-0 z-50 border-b border-white/20 dark:border-slate-700/50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg">
                            <Database className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold gradient-text">Chat With Database<span className="text-primary-500">🤖</span></h1>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Natural Language to SQL</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {dbInitialized !== null && (
                            <Badge variant={dbInitialized ? 'success' : 'warning'}>
                                {dbInitialized ? '● Database Connected' : '○ Not Initialized'}
                            </Badge>
                        )}

                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg glass-hover transition-all"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? (
                                <Sun className="h-5 w-5 text-yellow-500" />
                            ) : (
                                <Moon className="h-5 w-5 text-slate-700" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
