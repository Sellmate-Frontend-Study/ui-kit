import { useState } from 'react';
import { ArrowRight12 } from '../assets/ArrowRightIcon';
import { ArrowLeft12 } from '../assets/ArrowLeftIcon';

interface CalendarProps {
	onDateChange: (date: Date) => void;
	selectedDate: Date | null;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = [
	'1월',
	'2월',
	'3월',
	'4월',
	'5월',
	'6월',
	'7월',
	'8월',
	'9월',
	'10월',
	'11월',
	'12월',
];

const Calendar = ({ onDateChange, selectedDate }: CalendarProps) => {
	const today = new Date();
	const [currentMonth, setCurrentMonth] = useState(today.getMonth());
	const [currentYear, setCurrentYear] = useState(today.getFullYear());

	const calculateDates = (month: number, year: number) => {
		const firstDay = new Date(year, month, 1).getDay();
		const lastDay = new Date(year, month + 1, 0).getDate();
		const dates = Array.from(
			{ length: lastDay },
			(_, i) => new Date(year, month, i + 1)
		);
		const empty = Array.from({ length: firstDay }, () => null);

		return [...empty, ...dates];
	};
	const dates = calculateDates(currentMonth, currentYear);

	const handleDateClick = (date: Date) => {
		onDateChange(date);
	};

	const handlePrevMonth = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear((year) => year - 1);
		} else {
			setCurrentMonth((month) => month - 1);
		}
	};
	const handleNextMonth = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear((year) => year + 1);
		} else {
			setCurrentMonth((month) => month + 1);
		}
	};

	console.log('selectedDate', selectedDate);

	return (
		<div className='calendar w-302pxr flex-col items-center rounded-8pxr border-none bg-white p-16pxr'>
			<div className='mb-12pxr flex items-center justify-between'>
				<div className='flex items-center space-x-16pxr'>
					<button
						onClick={() => setCurrentYear((year) => year - 1)}
						className='text-Grey_Lighten-2'
					>
						<ArrowLeft12 />
					</button>
					<span className='text-14pxr'>{currentYear}</span>
					<button
						onClick={() => setCurrentYear((year) => year + 1)}
						className='text-Grey_Lighten-2'
					>
						<ArrowRight12 />
					</button>
				</div>
				<div className='flex items-center space-x-48pxr'>
					<button
						onClick={handlePrevMonth}
						className='text-Grey_Lighten-2'
					>
						<ArrowLeft12 />
					</button>
					<span className='w-40pxr text-center text-14pxr'>
						{MONTHS[currentMonth]}
					</span>
					<button
						onClick={handleNextMonth}
						className='text-Grey_Lighten-2'
					>
						<ArrowRight12 />
					</button>
				</div>
			</div>

			<div className='grid grid-cols-7 gap-10pxr'>
				{DAYS.map((day) => (
					<div
						key={day}
						className='flex h-28pxr w-28pxr items-center justify-center text-Grey_Default'
					>
						{day}
					</div>
				))}

				{dates.map((date, i) =>
					date ? (
						<button
							key={i}
							className={`h-28pxr w-28pxr text-center ${
								selectedDate && selectedDate.getTime() === date.getTime()
									? 'rounded-full bg-Blue_C_Default font-bold text-white'
									: 'text-Grey_Darken-4 hover:rounded-full hover:bg-Blue_C_Default hover:font-bold hover:text-white'
							}`}
							onClick={() => handleDateClick(date)}
						>
							{date.getDate()}
						</button>
					) : (
						<div
							className='h-28pxr w-28pxr'
							key={i}
						></div>
					)
				)}
			</div>
		</div>
	);
};

export default Calendar;
