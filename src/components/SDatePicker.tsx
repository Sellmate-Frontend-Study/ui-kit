import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Calendar from './Calendar';
import { Calendar16 } from '../assets/Calendar';
import CalendarRange from './CalendarRange';

interface SDatePickerProps {
	className?: string;
	label?: string;
	disabled?: boolean;
	onChange: (date: Date) => void;
	isRange?: boolean;
}

const utcFormat = (date: Date) => {
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const day = String(date.getUTCDate() + 1).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const SDatePicker = ({
	onChange,
	className,
	label,
	disabled,
	isRange = false,
}: SDatePickerProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [position, setPosition] = useState<{ top: number; left: number } | null>(
		null
	);
	const inputRef = useRef<HTMLDivElement | null>(null);
	const calendarRef = useRef<HTMLDivElement | null>(null);

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		onChange(date);
		// setIsOpen(false);
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
						className={`flex items-center border-r border-Grey_Lighten-1 bg-Grey_Lighten-5 px-12pxr py-4pxr ${disabled && 'border-Grey_Lighten-2 bg-Grey_Lighten-4 text-Grey_Default'}`}
					>
						<span className='text-Grey_Darken-2'>{label}</span>
					</div>
				)}

				<div className='flex w-134pxr flex-grow items-center px-8pxr py-4pxr'>
					<span className='mr-4pxr text-Grey_Darken-1'>
						<Calendar16 />
					</span>
					<span className='flex-grow  whitespace-nowrap text-center text-Grey_Darken-4'>
						{selectedDate ? utcFormat(selectedDate) : '날짜 선택'}
					</span>
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
						{isRange ? (
							<CalendarRange
								selectedDate={selectedDate}
								onDateChange={handleDateChange}
							/>
						) : (
							<Calendar
								selectedDate={selectedDate}
								onDateChange={handleDateChange}
							/>
						)}
					</div>,
					document.body
				)}
		</>
	);
};

export default SDatePicker;
