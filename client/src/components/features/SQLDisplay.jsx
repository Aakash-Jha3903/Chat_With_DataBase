import React, { useState } from 'react';
import { Code, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { copyToClipboard } from '../../utils/formatters';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const SQLDisplay = ({ sqlData, darkMode }) => {
    const [copied, setCopied] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    if (!sqlData) return null;

    const handleCopy = async () => {
        const success = await copyToClipboard(sqlData.sql_query || sqlData);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const sqlQuery = typeof sqlData === 'string' ? sqlData : sqlData.sql_query;

    return (
        <Card variant="default" className="animate-slide-up">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-primary-500" />
                        <CardTitle>Generated SQL Query</CardTitle>
                        <Badge variant="primary">SQL</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            icon={copied ? Check : Copy}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCollapsed(!collapsed)}
                            icon={collapsed ? ChevronDown : ChevronUp}
                        >
                            {collapsed ? 'Expand' : 'Collapse'}
                        </Button>
                    </div>
                </div>
            </CardHeader>

            {!collapsed && (
                <CardContent>
                    <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                        <SyntaxHighlighter
                            language="sql"
                            style={darkMode ? vscDarkPlus : vs}
                            customStyle={{
                                margin: 0,
                                padding: '1rem',
                                fontSize: '0.875rem',
                                background: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(248, 250, 252, 0.8)',
                            }}
                            showLineNumbers
                        >
                            {sqlQuery}
                        </SyntaxHighlighter>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};
