import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar16 } from '../assets/Calendar';
import CalendarRange from './CalendarRange';

interface SDateRangeProps {
	className?: string;
	label?: string;
	limitNum?: number;
	limitStartDate?: Date;
	limitEndDate?: Date;
	disabled?: boolean;
	onChange: (startDate: Date | null, endDate: Date | null) => void;
}

const utcFormat = (date: Date) => {
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const day = String(date.getUTCDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const SDateRange = ({
	onChange,
	className,
	label,
	disabled,
	limitNum,
	limitStartDate,
	limitEndDate,
}: SDateRangeProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [position, setPosition] = useState<{ top: number; left: number } | null>(
		null
	);
	const inputRef = useRef<HTMLDivElement | null>(null);
	const calendarRef = useRef<HTMLDivElement | null>(null);

	const handleDateChange = (
		newStartDate: Date | null,
		newEndDate: Date | null
	) => {
		setStartDate(newStartDate);
		setEndDate(newEndDate);
		onChange(newStartDate, newEndDate);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			inputRef.current?.contains(event.target as Node) ||
			calendarRef.current?.contains(event.target as Node)
		) {
			return;
		}
		setIsOpen(false);
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	useEffect(() => {
		if (inputRef.current) {
			const position = inputRef.current.getBoundingClientRect();
			setPosition({
				top: position.top + window.scrollY + position.height + 4,
				left: position.left + window.scrollX,
			});
		}
	}, [isOpen]);

	return (
		<>
			<div
				ref={inputRef}
				className={`s-date-picker relative flex items-center rounded-2pxr border ${
					disabled
						? 'cursor-not-allowed border-Grey_Lighten-2 bg-Grey_Lighten-4 text-Grey_Default'
						: 'cursor-pointer border-Grey_Lighten-1 bg-white'
				} ${className}`}
				onClick={() => {
					if (!disabled) setIsOpen((prev) => !prev);
				}}
			>
				{label && (
					<div
						className={`flex items-center border-r border-Grey_Lighten-1 bg-Grey_Lighten-5 px-12pxr py-4pxr ${
							disabled && 'border-Grey_Lighten-2 bg-Grey_Lighten-4 text-Grey_Default'
						}`}
					>
						<span className='text-Grey_Darken-2'>{label}</span>
					</div>
				)}

				<div className='flex w-207pxr flex-grow items-center px-8pxr py-4pxr'>
					<span className='mr-4pxr text-Grey_Darken-1'>
						<Calendar16 />
					</span>
					<div className='flex flex-grow items-center justify-center whitespace-nowrap text-Grey_Darken-4'>
						<span>{startDate ? utcFormat(startDate) : '날짜 선택'}</span>
						<span className='mx-2 text-center'>~</span>
						<span>
							{endDate || startDate ? (endDate ? utcFormat(endDate) : '') : ''}
						</span>
					</div>
				</div>
			</div>
			{isOpen &&
				position &&
				createPortal(
					<div
						ref={calendarRef}
						style={{
							position: 'absolute',
							top: position.top,
							left: position.left,
							zIndex: 10000,
						}}
						className='rounded-8pxr border bg-white'
					>
						<CalendarRange
							startDate={startDate}
							endDate={endDate}
							onDateChange={handleDateChange}
							limitStartDate={limitStartDate}
							limitEndDate={limitEndDate}
							limitNum={limitNum}
						/>
					</div>,
					document.body
				)}
		</>
	);
};

export default SDateRange;
