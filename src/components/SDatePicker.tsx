import Calendar from './Calendar';
import { Calendar16 } from '../assets/Calendar';
import { useDatePicker } from './datepicker/useDatePicker';
import { useState } from 'react';
import DatePickerContainer from './datepicker/DatePickerContainer';

interface SDatePickerProps {
	className?: string;
	label?: string;
	disabled?: boolean;
	onChange: (date: Date) => void;
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
}: SDatePickerProps) => {
	const { isOpen, setIsOpen, position, inputRef, calendarRef } = useDatePicker();
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		onChange(date);
	};

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
						className={`flex items-center border-r bg-Grey_Lighten-5 px-12pxr py-4pxr ${
							disabled && 'border-Grey_Lighten-2 bg-Grey_Lighten-4 text-Grey_Default'
						}`}
					>
						<span className='text-Grey_Darken-2'>{label}</span>
					</div>
				)}
				<div className='flex w-134pxr flex-grow items-center px-8pxr py-4pxr'>
					<span className='mr-4pxr text-Grey_Darken-1'>
						<Calendar16 />
					</span>
					<span className='flex-grow text-center text-Grey_Darken-4'>
						{selectedDate ? utcFormat(selectedDate) : '날짜 선택'}
					</span>
				</div>
			</div>
			<DatePickerContainer
				isOpen={isOpen}
				position={position}
				calendarRef={calendarRef}
			>
				<Calendar
					selectedDate={selectedDate}
					onDateChange={handleDateChange}
				/>
			</DatePickerContainer>
		</>
	);
};

export default SDatePicker;
