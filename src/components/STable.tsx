import React, { useState, useEffect, useCallback } from 'react';
import SPagination from './SPagination';

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
	resizable?: boolean;
	pagination?: boolean;
	changePage?: (page: number) => {
		currentPage: number;
		totalPages: number;
		data: Record<string, any>[];
	};
}
const ResizeIcon = ({ handleResize }: ResizeIconProps) => (
	<span
		onMouseDown={handleResize}
		className='absolute right-0 top-1/2 h-16pxr w-4pxr -translate-y-1/2 cursor-col-resize select-none border-l border-r border-Grey_Lighten-2 bg-transparent'
	/>
);

const STable = ({
	headers,
	resizable = false,
	pagination = false,
	changePage = () => ({ currentPage: 1, totalPages: 1, data: [] }),
}: STableProps) => {
	const [columnWidths, setColumnWidths] = useState(
		headers.map((header) => header.width || 100)
	);
	const [data, setData] = useState<Record<string, any>[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchData = useCallback(
		(page: number) => {
			const res = changePage(page);
			setData(res.data);
			setCurrentPage(res.currentPage);
			setTotalPages(res.totalPages);
		},
		[changePage]
	);

	useEffect(() => {
		fetchData(currentPage);
	}, [currentPage, fetchData]);

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
		<div
			className={`w-full border-collapse overflow-x-auto rounded-lg border border-b-0`}
		>
			<table className='w-full table-fixed'>
				<thead>
					<tr>
						{headers.map((header, i) => (
							<th
								key={header.field}
								style={{ width: columnWidths[i] }}
								className='relative border-b bg-Blue_C_Lighten-8 px-16pxr py-8pxr text-center'
							>
								<div className='overflow-hidden truncate text-ellipsis whitespace-nowrap'>
									{header.label}
								</div>
								{resizable && i < headers.length - 1 && (
									<ResizeIcon handleResize={(e) => handleResize(i, e)} />
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{headers.map((header, headerIndex) => (
								<td
									key={`${header.field}-${rowIndex}`}
									style={{ width: columnWidths[headerIndex] }}
									className='border-b px-16pxr py-8pxr text-center'
								>
									<div className='overflow-hidden truncate text-ellipsis whitespace-nowrap'>
										{row[header.field] || '-'}
									</div>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{pagination && (
				<SPagination
					currentPage={currentPage}
					totalPages={totalPages}
					changePage={(page) => setCurrentPage(page)}
				></SPagination>
			)}
		</div>
	);
};

export default STable;
