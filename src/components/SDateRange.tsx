import { useState } from 'react';
import { Calendar16 } from '../assets/Calendar';
import CalendarRange from './CalendarRange';
import { useDatePicker } from './datepicker/useDatePicker';
import DatePickerContainer from './datepicker/DatePickerContainer';

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
	const { isOpen, setIsOpen, position, inputRef, calendarRef } = useDatePicker();
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const handleDateChange = (
		newStartDate: Date | null,
		newEndDate: Date | null
	) => {
		setStartDate(newStartDate);
		setEndDate(newEndDate);
		onChange(newStartDate, newEndDate);
	};

	return (
		<>
			<div
				ref={inputRef}
				className={`s-date-range relative flex items-center rounded-2pxr border ${
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
				<div className='flex w-207pxr flex-grow items-center px-8pxr py-4pxr'>
					<span className='mr-4pxr text-Grey_Darken-1'>
						<Calendar16 />
					</span>
					<div className='flex flex-grow items-center justify-center whitespace-nowrap text-Grey_Darken-4'>
						{startDate ? (
							<>
								<span>{utcFormat(startDate)}</span>
								<span className='mx-2 text-center'>~</span>
								<span>{endDate ? utcFormat(endDate) : ''}</span>
							</>
						) : (
							<span>날짜 선택</span>
						)}
					</div>
				</div>
			</div>
			<DatePickerContainer
				isOpen={isOpen}
				position={position}
				calendarRef={calendarRef}
			>
				<CalendarRange
					startDate={startDate}
					endDate={endDate}
					onDateChange={handleDateChange}
					limitStartDate={limitStartDate}
					limitEndDate={limitEndDate}
					limitNum={limitNum}
				/>
			</DatePickerContainer>
		</>
	);
};

export default SDateRange;
