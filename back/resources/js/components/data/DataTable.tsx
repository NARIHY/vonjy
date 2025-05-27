import React from 'react';
import { Link } from '@inertiajs/react';
import { DataTableProps } from '@/interface/utils';


export function DataTable<T extends object>({ title, columns, data, pagination }: DataTableProps<T>) {
  return (
    <div className="p-4">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
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
                <tr key={'id' in item && item.id ? String((item as { id: React.Key }).id) : rowIndex} className="hover:bg-gray-50">
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
                link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
