import { useState } from 'react';
import { ArrowRight12 } from '../assets/ArrowRightIcon';
import { ArrowLeft12 } from '../assets/ArrowLeftIcon';

interface CalendarRangeProps {
	onDateChange: (startDate: Date | null, endDate: Date | null) => void;
	startDate: Date | null;
	endDate: Date | null;
}
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarRange = ({
	onDateChange,
	startDate,
	endDate,
}: CalendarRangeProps) => {
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
		if (!startDate || (startDate && endDate)) {
			onDateChange(date, null);
		} else if (date < startDate) {
			onDateChange(date, null);
		} else {
			onDateChange(startDate, date);
		}
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

	const isToday = (date: Date) =>
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate();

	const isInRange = (date: Date) => {
		if (!startDate || !endDate) return false;
		return date >= startDate && date <= endDate;
	};

	const isStartOfRange = (date: Date) =>
		startDate && date.getTime() === startDate.getTime();

	const isEndOfRange = (date: Date) =>
		endDate && date.getTime() === endDate.getTime();

	const handleTodayClick = () => {
		setCurrentMonth(today.getMonth());
		setCurrentYear(today.getFullYear());
	};

	return (
		<div className='calendar-range relative flex flex-col items-center rounded-8pxr border-none bg-white p-16pxr'>
			<button
				className='absolute right-6 top-4 text-14pxr underline'
				onClick={() => handleTodayClick()}
			>
				오늘
			</button>
			<div className='mb-16pxr flex items-center justify-between gap-12pxr text-14pxr'>
				<button
					onClick={() => setCurrentYear((year) => year - 1)}
					className='text-Grey_Lighten-2'
				>
					<ArrowLeft12 />
				</button>
				<span>{currentYear}</span>
				<button
					onClick={() => setCurrentYear((year) => year + 1)}
					className='text-Grey_Lighten-2'
				>
					<ArrowRight12 />
				</button>
			</div>

			<div className='flex gap-16pxr'>
				<div className='w-1/2'>
					<div className='relative flex items-center'>
						<button
							onClick={handlePrevMonth}
							className='absolute left-0 text-Grey_Lighten-2'
						>
							<ArrowLeft12 />
						</button>
						<span className='mx-auto'>
							{currentYear}.{String(currentMonth + 1).padStart(2, '0')}
						</span>
					</div>
					<div className='mt-12pxr grid grid-cols-7 gap-y-4pxr text-center'>
						{DAYS.map((day) => (
							<div
								key={day}
								className='mb-4pxr text-Grey_Default'
							>
								{day}
							</div>
						))}

						{dates.map((date, i) =>
							date ? (
								<button
									key={i}
									className={`relative h-28pxr w-28pxr ${
										isStartOfRange(date)
											? 'rounded-l-full bg-Blue_C_Lighten-5'
											: isEndOfRange(date)
												? 'rounded-r-full bg-Blue_C_Lighten-5'
												: isInRange(date)
													? 'bg-Blue_C_Lighten-5'
													: 'text-Grey_Darken-4 hover:rounded-full hover:bg-Blue_C_Default hover:text-white'
									} ${
										isInRange(date) && !isStartOfRange(date) && !isEndOfRange(date)
											? 'mx-0 rounded-none'
											: ''
									} ${isToday(date) && 'rounded-full border'}`}
									onClick={() => handleDateClick(date)}
								>
									<span
										className={`flex h-full w-full items-center justify-center ${
											isStartOfRange(date) || isEndOfRange(date)
												? 'rounded-full bg-Blue_C_Default text-white'
												: ''
										}`}
									>
										{date.getDate()}
									</span>
								</button>
							) : (
								<div
									key={i}
									className='h-28pxr w-28pxr'
								></div>
							)
						)}
					</div>
				</div>

				<div className='w-1/2'>
					<div className='relative flex items-center'>
						<button
							onClick={handleNextMonth}
							className='absolute right-0 text-Grey_Lighten-2'
						>
							<ArrowRight12 />
						</button>
						<span className='mx-auto'>
							{currentMonth === 11
								? `${currentYear + 1}.01`
								: `${currentYear}.${String(currentMonth + 2).padStart(2, '0')}`}
						</span>
					</div>
					<div className='mt-12pxr grid grid-cols-7 gap-y-4pxr text-center'>
						{DAYS.map((day) => (
							<div
								key={day}
								className='mb-4pxr text-Grey_Default'
							>
								{day}
							</div>
						))}

						{nextDates.map((date, i) =>
							date ? (
								<button
									key={i}
									className={`relative h-28pxr w-28pxr ${
										isStartOfRange(date)
											? 'rounded-l-full bg-Blue_C_Lighten-5'
											: isEndOfRange(date)
												? 'rounded-r-full bg-Blue_C_Lighten-5'
												: isInRange(date)
													? 'bg-Blue_C_Lighten-5'
													: 'text-Grey_Darken-4 hover:rounded-full hover:bg-Blue_C_Default hover:text-white'
									} ${
										isInRange(date) && !isStartOfRange(date) && !isEndOfRange(date)
											? 'mx-0 rounded-none'
											: ''
									}`}
									onClick={() => handleDateClick(date)}
								>
									<span
										className={`flex h-full w-full items-center justify-center ${
											isStartOfRange(date) || isEndOfRange(date)
												? 'rounded-full bg-Blue_C_Default text-white'
												: ''
										}`}
									>
										{date.getDate()}
									</span>
								</button>
							) : (
								<div
									key={i}
									className='h-28pxr w-28pxr'
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
