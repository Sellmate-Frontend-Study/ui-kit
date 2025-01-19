import { ArrowRight12 } from '../assets/ArrowRightIcon';
import { ArrowLeft12 } from '../assets/ArrowLeftIcon';
import { useCalendarDates } from './datepicker/useCalendarDate';
import { DAYS } from './datepicker/datePickerUtils';

interface CalendarRangeProps {
	onDateChange: (startDate: Date | null, endDate: Date | null) => void;
	startDate: Date | null;
	endDate: Date | null;
	limitNum?: number;
	limitStartDate?: Date;
	limitEndDate?: Date;
}

interface CalendarMonthProps {
	dates: (Date | null)[];
	onDateClick: (date: Date) => void;
	isDisabled: (date: Date) => boolean;
	isStartOfRange: (date: Date) => boolean;
	isEndOfRange: (date: Date) => boolean;
	isInRange: (date: Date) => boolean;
	isToday: (date: Date) => boolean;
}

const CalendarMonth = ({
	dates,
	onDateClick,
	isDisabled,
	isStartOfRange,
	isEndOfRange,
	isInRange,
	isToday,
}: CalendarMonthProps) => {
	return (
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
						className={`relative h-32pxr w-32pxr ${
							isDisabled(date)
								? 'cursor-not-allowed text-Grey_Lighten-2'
								: isStartOfRange(date)
									? 'rounded-l-full bg-Blue_C_Lighten-5'
									: isEndOfRange(date)
										? 'rounded-r-full bg-Blue_C_Lighten-5'
										: isInRange(date)
											? 'bg-Blue_C_Lighten-5'
											: 'text-Grey_Darken-4 hover:rounded-full hover:bg-Blue_C_Default hover:text-white'
						} ${isInRange(date) && !(isStartOfRange(date) || isEndOfRange(date)) ? 'mx-0 rounded-none' : ''} ${
							isToday(date) && !isDisabled(date) ? 'rounded-full border' : ''
						}`}
						onClick={() => !isDisabled(date) && onDateClick(date)}
						disabled={isDisabled(date)}
					>
						<span
							className={`flex h-32pxr w-32pxr items-center justify-center ${
								isStartOfRange(date) || isEndOfRange(date)
									? 'rounded-full bg-Blue_C_Default font-bold text-white'
									: ''
							}`}
						>
							{date.getDate()}
						</span>
					</button>
				) : (
					<div
						key={i}
						className='h-32pxr w-32pxr'
					></div>
				)
			)}
		</div>
	);
};

const CalendarRange = ({
	onDateChange,
	startDate,
	endDate,
	limitNum,
	limitStartDate,
	limitEndDate,
}: CalendarRangeProps) => {
	const {
		currentMonth,
		currentYear,
		handlePrevMonth,
		handleNextMonth,
		calculateDates,
		setCurrentMonth,
		setCurrentYear,
	} = useCalendarDates();
	const today = new Date();

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

	const handleTodayClick = () => {
		setCurrentMonth(today.getMonth());
		setCurrentYear(today.getFullYear());
	};
	const isToday = (date: Date): boolean =>
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate();

	const isInRange = (date: Date): boolean => {
		if (!startDate || !endDate) return false;
		return date >= startDate && date <= endDate;
	};

	const isStartOfRange = (date: Date): boolean =>
		!!(startDate && date.getTime() === startDate.getTime());

	const isEndOfRange = (date: Date): boolean =>
		!!(endDate && date.getTime() === endDate.getTime());

	const isDisabled = (date: Date): boolean => {
		if (limitStartDate && date.getTime() < limitStartDate.getTime()) return true;
		if (limitEndDate && date.getTime() > limitEndDate.getTime()) return true;

		if (limitNum && startDate) {
			const maxDate = new Date(startDate);
			maxDate.setDate(startDate.getDate() + limitNum - 1);
			if (date > maxDate) return true;
		}

		return false;
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
					<CalendarMonth
						dates={dates}
						onDateClick={handleDateClick}
						isDisabled={isDisabled}
						isStartOfRange={isStartOfRange}
						isEndOfRange={isEndOfRange}
						isInRange={isInRange}
						isToday={isToday}
					/>
				</div>
				<div className='my-12pxr w-1pxr bg-Grey_Lighten-8'></div>
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
					<CalendarMonth
						dates={nextDates}
						onDateClick={handleDateClick}
						isDisabled={isDisabled}
						isStartOfRange={isStartOfRange}
						isEndOfRange={isEndOfRange}
						isInRange={isInRange}
						isToday={isToday}
					/>
				</div>
			</div>
		</div>
	);
};

export default CalendarRange;
