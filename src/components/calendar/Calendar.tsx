import { useMemo } from 'react';
import { ArrowLeft12 } from '../../assets/ArrowLeftIcon';
import { ArrowRight12 } from '../../assets/ArrowRightIcon';

interface DateInfo {
	date: number;
	flag: 'prev' | 'curr' | 'next';
}

// 이전 달의 마지막 날짜
const getPrevLastDate = (year: number, currentMonth: number) => {
	return new Date(year, currentMonth, 0).getDate();
};

// 현재 달의 마지막 날짜
const getLastDate = (year: number, currentMonth: number) => {
	return new Date(year, currentMonth + 1, 0).getDate();
};

// 마지막 날짜가 첫번째 날짜보다 늦은 일자일시 true 아니면 false
const isEndDateOver = (startDate: Date, endDate: Date) => {
	if (startDate.getFullYear() > endDate.getFullYear()) return false;
	if (startDate.getMonth() > endDate.getMonth()) return false;
	if (startDate.getDay() > endDate.getDay()) return false;
	return true;
};

export const CalendarComponent = ({
	calendarYear,
	calendarMonth,
	date,
	type,
}: {
	calendarYear: number;
	calendarMonth: number;
	date: string[];
	change?: unknown;
	type?: 'prev' | 'next' | 'both';
}) => {
	const startDate = new Date(date[0]);
	const endDate = new Date(date[1]);
	const currentDate = type === 'prev' ? startDate : new Date();
	const lastRangeDate =
		type === 'next' && startDate.getFullYear() !== endDate.getFullYear()
			? endDate
			: new Date();

	// 달력에 필요한 날짜 계산
	const year =
		type === 'prev' ? currentDate.getFullYear() : lastRangeDate.getFullYear();
	const currentMonth =
		type === 'prev' ? currentDate.getMonth() : lastRangeDate.getMonth();
	const currentMonthFirstDate = new Date(year, currentMonth, 1);
	const day = currentMonthFirstDate.getDay();

	const lastDate = getLastDate(year, currentMonth);
	const prevLastDate = getPrevLastDate(year, currentMonth);
	const weekRows = Math.ceil((lastDate + day) / 7);

	// 달력 데이터 생성
	const weekList = useMemo(() => {
		const result = [];
		for (let w = 0; w < weekRows; w++) {
			const week = Array(7).fill(0);
			for (let i = 0; i < 7; i++) {
				if (w === 0) {
					const date = (i < day ? prevLastDate - (day - i) : i - day) + 1;
					week[i] = { flag: i < day ? 'prev' : 'curr', date };
				} else {
					const d = i + w * 7 - day + 1;
					const date = d > lastDate ? d - lastDate : d;
					week[i] = { flag: d > lastDate ? 'next' : 'curr', date };
				}
			}
			result.push(week);
		}
		return result;
	}, [day, lastDate, prevLastDate, weekRows]);

	const compareDate = (firstDate: Date, secondDate: Date) => {
		return (
			firstDate.getFullYear() === secondDate.getFullYear() &&
			firstDate.getMonth() === secondDate.getMonth() &&
			firstDate.getDate() === secondDate.getDate()
		);
	};

	// 선택된 날짜인지 확인하는 함수
	const isSelectedDate = (dateInfo: DateInfo): boolean => {
		const checkStartDate = date[0] !== '' ? new Date(date[0]) : null;
		const checkEndDate = date[1] !== '' ? new Date(date[1]) : null;
		const currentDate = new Date(calendarYear, calendarMonth, dateInfo.date);

		return (
			(!!checkStartDate && compareDate(checkStartDate, currentDate)) ||
			(!!checkEndDate && compareDate(checkEndDate, currentDate))
		);
	};

	const isBeforeDate = (firstDate: Date, secondDate: Date) => {
		if (firstDate.getFullYear() > secondDate.getFullYear()) return false;
		else if (
			firstDate.getFullYear() === secondDate.getFullYear() &&
			firstDate.getMonth() > secondDate.getMonth()
		)
			return false;
		else if (
			firstDate.getMonth() === secondDate.getMonth() &&
			firstDate.getDate() > secondDate.getDate()
		)
			return false;
		else if (compareDate(firstDate, secondDate)) return 'same';

		return true;
	};

	// const calendarMonth = endDate.getMonth();

	const isBetweenDate = (dateInfo: DateInfo) => {
		const checkStartDate = date[0] !== '' ? new Date(date[0]) : null;
		const checkEndDate = date[1] !== '' ? new Date(date[1]) : null;
		const currentDate = new Date(calendarYear, calendarMonth, dateInfo.date);
		// const startCount =
		// 	startDate.getFullYear() * 365 +
		// 	(startDate.getMonth() + 1) * 30 +
		// 	startDate.getDate();
		// const endCount =
		// 	endDate.getFullYear() * 365 +
		// 	(endDate.getMonth() + 1) * 30 +
		// 	endDate.getDate();
		// const dateCount =
		// 	calendarYear * 365 + (calendarMonth + 1) * 30 + dateInfo.date;

		// if (dateCount > startCount && dateCount < endCount) {
		if (!!checkStartDate && compareDate(checkStartDate, currentDate))
			return 'before:bg-Blue_C_Lighten-5 before:w-1/2 before:h-full before:absolute before:right-0';

		if (!!checkEndDate && compareDate(currentDate, checkEndDate))
			return 'before:bg-Blue_C_Lighten-5 before:w-1/2 before:h-full before:absolute before:left-0';
		if (
			!!checkStartDate &&
			isBeforeDate(checkStartDate, currentDate) &&
			!!checkEndDate &&
			isBeforeDate(currentDate, checkEndDate)
		) {
			return 'bg-Blue_C_Lighten-5';
		}

		return '';
	};

	return (
		<div className='flex-1'>
			<div className='mb-8pxr flex justify-between text-14pxr text-Grey_Darken-4'>
				<div className='flex w-full items-center justify-between'>
					<button
						className={[
							'h-12pxr w-12pxr',
							type !== 'prev' && 'pointer-event-none opacity-0',
						].join(' ')}
						// onClick={() => changeMonth(-1)}
					>
						<ArrowLeft12 className='text-Grey_Lighten-2' />
					</button>

					<div className='w-100pxr text-center'>
						{year}.{currentMonth + 1}
					</div>
					<button
						className={[
							'h-12pxr w-12pxr',
							type !== 'next' && 'pointer-event-none opacity-0',
						].join(' ')}
						// onClick={() => changeMonth(1)}
					>
						<ArrowRight12 className='text-Grey_Lighten-2' />
					</button>
				</div>
			</div>

			<div className='mb-12pxr flex gap-10pxr'>
				{['일', '월', '화', '수', '목', '금', '토'].map((day) => (
					<div
						key={day}
						className='flex flex-1 items-center justify-center text-14pxr text-Grey_Default'
					>
						{day}
					</div>
				))}
			</div>

			{weekList.map((week, weekIndex) => (
				<li
					key={weekIndex}
					className='flex w-full cursor-pointer  py-4pxr' /* gap-10pxr */
				>
					{week.map((dateInfo, dateIndex) => (
						<div
							key={dateIndex}
							className={[
								'relative flex h-28pxr flex-1 items-center justify-center text-14pxr',
								// dateInfo.flag !== 'curr' ? 'text-Grey_Lighten-2' : 'text-Grey_Darken-4',
								dateInfo.flag !== 'curr'
									? 'pointer-events-none opacity-0'
									: 'text-Grey_Darken-4',
								isSelectedDate(dateInfo) &&
									'after:absolute after:left-1/2 after:top-1/2 after:flex after:h-28pxr after:w-28pxr after:-translate-x-1/2 after:-translate-y-1/2 after:items-center after:justify-center after:rounded-full after:bg-Blue_C_Default after:font-bold after:text-white after:content-[var(--custom-content)]',
								isBetweenDate(dateInfo),
							].join(' ')}
							style={
								{ '--custom-content': `'${dateInfo.date}'` } as React.CSSProperties
							}
							// onClick={() => handleDateClick(dateInfo)}
						>
							{dateInfo.date}
						</div>
					))}
				</li>
			))}
		</div>
	);
};
