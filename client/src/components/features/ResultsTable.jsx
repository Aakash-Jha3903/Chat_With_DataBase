import React, { useState } from 'react';
import { Table, Download, FileJson, FileSpreadsheet, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { exportToCSV, exportToJSON } from '../../utils/formatters';

export const ResultsTable = ({ data, query }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    if (!data || data.length === 0) {
        return (
            <Card variant="default" className="animate-slide-up">
                <CardContent>
                    <div className="text-center py-12">
                        <Table className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            No Results
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Your query returned no data. Try a different query.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const columns = Object.keys(data[0]);

    // Filter data based on search
    const filteredData = data.filter(row =>
        columns.some(col =>
            String(row[col] ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleExportCSV = () => {
        exportToCSV(data, 'query-results.csv');
    };

    const handleExportJSON = () => {
        exportToJSON(data, 'query-results.json');
    };

    return (
        <Card variant="default" className="animate-slide-up">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Table className="h-5 w-5 text-primary-500" />
                        <CardTitle>Query Results</CardTitle>
                        <Badge variant="success">{data.length} rows</Badge>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleExportCSV}
                            icon={FileSpreadsheet}
                        >
                            Export CSV
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleExportJSON}
                            icon={FileJson}
                        >
                            Export JSON
                        </Button>
                    </div>
                </div>

                {/* Search */}
                <div className="mt-4">
                    <Input
                        placeholder="Search in results..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="max-w-md"
                    />
                </div>
            </CardHeader>

            <CardContent>
                <div className="overflow-x-auto scrollbar-thin">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                {columns.map((col) => (
                                    <th
                                        key={col}
                                        className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/50"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {paginatedData.map((row, rowIdx) => (
                                <tr
                                    key={rowIdx}
                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={col}
                                            className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100 whitespace-nowrap"
                                        >
                                            {row[col] !== null && row[col] !== undefined
                                                ? String(row[col])
                                                : <span className="text-slate-400 italic">null</span>}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <span className="px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
