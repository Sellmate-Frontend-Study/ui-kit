import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Calendar from './Calendar';
import { Calendar16 } from '../assets/Calendar';

interface SDatePickerProps {
	onChange: (date: Date) => void;
}

const SDatePicker = ({ onChange }: SDatePickerProps) => {
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
				className='relative flex w-134pxr cursor-pointer items-center rounded-2pxr border border-Grey_Lighten-1 bg-white px-8pxr py-4pxr'
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<span className='mr-4pxr text-Grey_Darken-1'>
					<Calendar16 />
				</span>
				<span className='flex-grow whitespace-nowrap text-center text-Grey_Darken-4'>
					{selectedDate
						? selectedDate.toLocaleDateString().split('T')[0]
						: '날짜 선택'}
				</span>
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
						<Calendar
							selectedDate={selectedDate}
							onDateChange={handleDateChange}
						/>
					</div>,
					document.body
				)}
		</>
	);
};

export default SDatePicker;
