import React, { useState } from 'react';

export interface Header {
  name: string;
  label: string;
  field: string;
  class?: string;
  align?: string;
  width?: number;
}
export interface ResizeIconProps {
  handleResize: (e: React.MouseEvent) => void;
}
export interface STableProps {
  headers: Header[];
  data: Record<string, any>[];
  resizable?: boolean;
}

const ResizeIcon = ({ handleResize }: ResizeIconProps) => (
  <span
    onMouseDown={handleResize}
    className="absolute right-0 top-1/2 h-16pxr w-4pxr cursor-col-resize bg-transparent border-l border-r border-Grey_Lighten-2 -translate-y-1/2 select-none"
  />
);

const STable = ({ headers, data, resizable = false }: STableProps) => {
  const [columnWidths, setColumnWidths] = useState( headers.map((header) => header.width || 100) );

  const handleResize = (i: number, e: React.MouseEvent) => {
    e.preventDefault();
    const initClientX = e.clientX;
    const initWidth = columnWidths[i];

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = initWidth + (e.clientX - initClientX);
      setColumnWidths((widths) => {
        const updatedWidths = [...widths];
        updatedWidths[i] = Math.max(newWidth, 10);
        return updatedWidths;
      });
    };

    const stopResizing = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResizing);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
  };

  return (
    <div className={`w-full overflow-x-auto border rounded-lg border-b-0 border-collapse`}>
      <table className="w-full table-fixed">
        <thead >
          <tr>
            {headers.map((header, i) => (
              <th
                key={header.field}
                style={{width: columnWidths[i]}}
                className="relative px-16pxr py-8pxr border-b bg-Blue_C_Lighten-8 text-center"
              >
                <div className="overflow-hidden whitespace-nowrap text-ellipsis truncate">
                  {header.label}
                </div>
                {resizable && i < headers.length - 1 && (
                  <ResizeIcon handleResize={(e) => handleResize(i, e)} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody >
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, headerIndex) => (
                <td
                  key={`${header.field}-${rowIndex}`}
                  style={{width: columnWidths[headerIndex]}}
                  className="px-16pxr py-8pxr border-b text-center"
                >
                  <div className="overflow-hidden whitespace-nowrap text-ellipsis truncate">
                    {row[header.field] || '-'}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default STable;
