import { useState } from 'react';
import { ArrowRight12 } from '../assets/ArrowRightIcon';
import { ArrowLeft12 } from '../assets/ArrowLeftIcon';

interface CalendarRangeProps {
	onDateChange: (date: Date) => void;
	selectedDate: Date | null;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarRange = ({ onDateChange, selectedDate }: CalendarRangeProps) => {
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
	const nextDates = calculateDates(
		currentMonth === 11 ? 0 : currentMonth + 1,
		currentMonth === 11 ? currentYear + 1 : currentYear
	);

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

	return (
		<div className='calendar-range flex flex-col items-center rounded-8pxr border-none bg-white p-16pxr'>
			<div className='space-x-16pxr text-14pxr'>
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
			<div className='flex gap-12pxr'>
				<div className='w-1/2 w-302pxr'>
					<div className='relative flex items-center'>
						<button
							onClick={handlePrevMonth}
							className='absolute left-0 text-Grey_Lighten-2'
						>
							<ArrowLeft12 />
						</button>
						<span className='mx-auto text-center text-14pxr'>
							{currentYear}.{String(currentMonth + 1).padStart(2, '0')}
						</span>
					</div>
					<div className='mt-12pxr grid grid-cols-7 gap-10pxr text-center'>
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
				<div className='my-12pxr w-1pxr bg-Grey_Lighten-8'></div>
				<div className='w-1/2 w-302pxr'>
					<div className='relative flex items-center'>
						<button
							onClick={handleNextMonth}
							className='absolute right-0 text-Grey_Lighten-2'
						>
							<ArrowRight12 />
						</button>
						<span className='mx-auto text-center text-14pxr'>
							{currentMonth === 11
								? `${currentYear + 1}.01`
								: `${currentYear}.${String(currentMonth + 2).padStart(2, '0')}`}{' '}
						</span>
					</div>
					<div className='mt-12pxr grid grid-cols-7 gap-10pxr text-center'>
						{DAYS.map((day) => (
							<div
								key={day}
								className='flex h-28pxr w-28pxr items-center justify-center text-Grey_Default'
							>
								{day}
							</div>
						))}
						{nextDates.map((date, i) =>
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
			</div>
		</div>
	);
};

export default CalendarRange;
