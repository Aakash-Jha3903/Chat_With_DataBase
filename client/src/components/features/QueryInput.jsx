import React, { useState, useEffect } from 'react';
import { Send, Sparkles, Clock, Database } from 'lucide-react';
import { TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { EXAMPLE_QUERIES } from '../../utils/constants';

export const QueryInput = ({ onSubmit, loading, disabled }) => {
    const [query, setQuery] = useState('');
    const [recentQueries, setRecentQueries] = useState([]);

    // Load recent queries from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('recentQueries');
        if (stored) {
            try {
                setRecentQueries(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to load recent queries:', e);
            }
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() && !loading) {
            // Save to recent queries
            const newRecentQueries = [query.trim(), ...recentQueries.filter(q => q !== query.trim())].slice(0, 5);
            setRecentQueries(newRecentQueries);
            localStorage.setItem('recentQueries', JSON.stringify(newRecentQueries));

            onSubmit(query);
        }
    };

    const handleExampleClick = (example) => {
        setQuery(example);
    };

    return (
        <Card variant="default" className="animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        <Sparkles className="inline h-4 w-4 mr-2 text-primary-500" />
                        Ask in Natural Language
                    </label>
                    <TextArea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., Show me all users who registered in the last 30 days..."
                        rows={4}
                        disabled={disabled || loading}
                        className="font-mono text-sm"
                    />
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            {query.length} characters
                        </span>
                    </div>
                </div>

                {/* Quick Query Section */}
                <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <Database className="inline h-4 w-4 mr-2 text-primary-500" />
                        Quick Query
                    </p>

                    {/* Example Queries */}
                    <div className="space-y-2">
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">General Examples:</p>
                        <div className="flex flex-wrap gap-2">
                            {EXAMPLE_QUERIES.map((example, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleExampleClick(example)}
                                    disabled={disabled || loading}
                                    className="px-3 py-1.5 text-xs rounded-lg bg-white/60 dark:bg-slate-700/60 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {example}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recent Queries */}
                    {recentQueries.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                <Clock className="inline h-3 w-3 mr-1" />
                                Recent Successful Queries:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {recentQueries.map((recentQuery, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleExampleClick(recentQuery)}
                                        disabled={disabled || loading}
                                        className="px-3 py-1.5 text-xs rounded-lg bg-primary-50/60 dark:bg-primary-900/20 hover:bg-primary-50 dark:hover:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {recentQuery}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    disabled={disabled || !query.trim()}
                    icon={Send}
                    className="w-full"
                >
                    Go
                </Button>
            </form>
        </Card>
    );
};
