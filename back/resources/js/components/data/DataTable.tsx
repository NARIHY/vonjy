import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { DataTableProps } from '@/interface/utils';

export function DataTable<T extends object>({ title, columns, data, pagination }: DataTableProps<T>) {
    const [theme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('appearance') as 'light' | 'dark' | null;
            if (storedTheme) return storedTheme;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        }
        return 'light';
    });

    const tableClass = theme === 'dark'
        ? 'min-w-full border border-gray-700 bg-gray-900 text-gray-100'
        : 'min-w-full border border-gray-300 bg-white text-gray-900';

    const theadClass = theme === 'dark'
        ? 'bg-gray-800'
        : 'bg-gray-100';

    const trHoverClass = theme === 'dark'
        ? 'hover:bg-gray-800'
        : 'hover:bg-gray-50';

    return (
        <div className="p-4">
            {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

            <div className="overflow-x-auto">
                <table className={tableClass}>
                    <thead className={theadClass}>
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} className="px-4 py-2 border">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, rowIndex) => (
                                <tr
                                    key={'id' in item && item.id ? String((item as { id: React.Key }).id) : rowIndex}
                                    className={trHoverClass}
                                >
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="px-4 py-2 border">
                                            {col.render
                                                ? col.render(item, rowIndex)
                                                : col.key
                                                ? String(item[col.key])
                                                : ''}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-4">
                                    Aucun résultat trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <div className="mt-4 flex gap-2 flex-wrap">
                    {pagination.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-3 py-1 border rounded text-sm ${
                                link.active
                                    ? theme === 'dark'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-600 text-white'
                                    : theme === 'dark'
                                    ? 'bg-gray-900 text-gray-100'
                                    : 'bg-white text-gray-700'
                            } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
