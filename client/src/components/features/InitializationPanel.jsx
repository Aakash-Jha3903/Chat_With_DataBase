import React from 'react';
import { Play, CheckCircle, Loader } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const InitializationPanel = ({
    onInitiate,
    onLoadSchema,
    initiateStatus,
    schemaStatus
}) => {
    return (
        <Card variant="default" className="animate-slide-up">
            <CardHeader>
                <CardTitle>Database Initialization</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${initiateStatus === 'success'
                                    ? 'bg-green-100 dark:bg-green-900/30'
                                    : initiateStatus === 'loading'
                                        ? 'bg-blue-100 dark:bg-blue-900/30'
                                        : 'bg-slate-100 dark:bg-slate-700'
                                }`}>
                                {initiateStatus === 'success' ? (
                                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                ) : initiateStatus === 'loading' ? (
                                    <Loader className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
                                ) : (
                                    <Play className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                    Step 1: Initiate AI Agent
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Connect to database and fetch table names
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {initiateStatus === 'success' && (
                                <Badge variant="success">Complete</Badge>
                            )}
                            <Button
                                variant={initiateStatus === 'success' ? 'secondary' : 'primary'}
                                size="sm"
                                onClick={onInitiate}
                                loading={initiateStatus === 'loading'}
                                disabled={initiateStatus === 'loading'}
                            >
                                {initiateStatus === 'success' ? 'Re-initiate' : 'Initiate'}
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${schemaStatus === 'success'
                                    ? 'bg-green-100 dark:bg-green-900/30'
                                    : schemaStatus === 'loading'
                                        ? 'bg-blue-100 dark:bg-blue-900/30'
                                        : 'bg-slate-100 dark:bg-slate-700'
                                }`}>
                                {schemaStatus === 'success' ? (
                                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                ) : schemaStatus === 'loading' ? (
                                    <Loader className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
                                ) : (
                                    <Play className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                    Step 2: Load Table Schemas
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Fetch detailed schema information for AI context
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {schemaStatus === 'success' && (
                                <Badge variant="success">Complete</Badge>
                            )}
                            <Button
                                variant={schemaStatus === 'success' ? 'secondary' : 'primary'}
                                size="sm"
                                onClick={onLoadSchema}
                                loading={schemaStatus === 'loading'}
                                disabled={schemaStatus === 'loading' || initiateStatus !== 'success'}
                            >
                                {schemaStatus === 'success' ? 'Reload' : 'Load Schema'}
                            </Button>
                        </div>
                    </div>

                    {initiateStatus === 'success' && schemaStatus === 'success' && (
                        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                            <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                                ✓ Database initialized successfully! You can now start querying.
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
