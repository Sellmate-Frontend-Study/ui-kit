import { useState } from 'react';
import Calendar from './Calendar';
import { Calendar16 } from '../assets/Calendar';

interface SDatePickerProps {
	selectedDate: Date | null;
	onChange: (date: Date) => void;
}

const SDatePicker = ({ selectedDate, onChange }: SDatePickerProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleDateChange = (date: Date) => {
		onChange(date);
		setIsOpen(false);
	};

	return (
		<div className='relative w-134pxr'>
			<div
				className='flex cursor-pointer items-center rounded-2pxr border border-Grey_Lighten-1 bg-white px-8pxr py-4pxr'
				onClick={() => setIsOpen(!isOpen)}
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
			{isOpen && (
				<div className='shadow-12px-light absolute left-0 top-12 z-10 rounded-8pxr border bg-white'>
					<Calendar
						selectedDate={selectedDate}
						onDateChange={handleDateChange}
					/>
				</div>
			)}
		</div>
	);
};

export default SDatePicker;
