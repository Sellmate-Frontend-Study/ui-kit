import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft12 } from '../../assets/ArrowLeftIcon';
import { ArrowRight12 } from '../../assets/ArrowRightIcon';
import {
	compareDate,
	getLastDate,
	getPrevLastDate,
	isBeforeDate,
} from './calculateDate';

interface DateInfo {
	date: number;
	flag: 'prev' | 'curr' | 'next';
}

// 마지막 날짜가 첫번째 날짜보다 늦은 일자일시 true 아니면 false
// const isEndDateOver = (startDate: Date, endDate: Date) => {
// 	if (startDate.getFullYear() > endDate.getFullYear()) return false;
// 	if (startDate.getMonth() > endDate.getMonth()) return false;
// 	if (startDate.getDay() > endDate.getDay()) return false;
// 	return true;
// };

export const CalendarComponent = ({
	calendarYear,
	calendarMonth,
	date,
	hoverDate,
	type,
	changeCalendarMonth,
	onHoverDate,
	onChange,
	selectable,
	limit,
}: {
	calendarYear: number;
	calendarMonth: number;
	date: string[];
	hoverDate: string[];
	change?: unknown;
	type: 'prev' | 'next';
	changeCalendarMonth?: (prevOrNext: 'prev' | 'next') => void;
	onHoverDate?: (newDateString: string) => void;
	onChange?: (date: string[], shouldClose?: boolean) => void;
	selectable?: string[];
	limit?: number;
}) => {
	// 달력에 필요한 날짜 계산
	const currentMonthFirstDate = new Date(calendarYear, calendarMonth, 1);
	const day = currentMonthFirstDate.getDay();
	const lastDate = getLastDate(calendarYear, calendarMonth);
	const prevLastDate = getPrevLastDate(calendarYear, calendarMonth);
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

	// 선택된 날짜인지 확인하는 함수
	const isSelectedDate = (dateInfo: DateInfo): boolean => {
		const checkStartDate =
			date[0] && date[0].length === 10 ? new Date(date[0]) : null;
		const checkEndDate =
			date[1] && date[1].length === 10 ? new Date(date[1]) : null;
		const currentDate = new Date(calendarYear, calendarMonth, dateInfo.date);
		return (
			(!!checkStartDate && compareDate(checkStartDate, currentDate)) ||
			(!!checkEndDate && compareDate(checkEndDate, currentDate))
		);
	};

	const isBetweenDate = (dateInfo: DateInfo) => {
		const checkStartDate =
			date[0] && date[0].length === 10 ? new Date(date[0]) : null;
		const checkEndDate =
			date[1] && date[1].length === 10 ? new Date(date[1]) : null;
		const currentDate = new Date(calendarYear, calendarMonth, dateInfo.date);
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

	const isBetweenHoverDate = (dateInfo: DateInfo) => {
		const checkStartDate = hoverDate[0] ? new Date(hoverDate[0]) : null;
		const checkEndDate = hoverDate[1] ? new Date(hoverDate[1]) : null;
		const currentDate = new Date(calendarYear, calendarMonth, dateInfo.date);

		if (!!checkStartDate && compareDate(checkStartDate, currentDate))
			return [
				'before:bg-Blue_C_Lighten-5 before:w-1/2 before:h-full before:absolute before:right-0',
				'after:absolute after:left-1/2 after:top-1/2 after:flex after:h-28pxr after:w-28pxr after:-translate-x-1/2 after:-translate-y-1/2 after:items-center after:justify-center after:rounded-full after:bg-Blue_C_Default after:font-bold after:text-white after:content-[var(--custom-content)]',
			].join(' ');

		if (!!checkEndDate && compareDate(currentDate, checkEndDate)) {
			return [
				'before:bg-Blue_C_Lighten-5 before:w-1/2 before:h-full before:absolute before:left-0',
				'after:absolute after:left-1/2 after:top-1/2 after:flex after:h-28pxr after:w-28pxr after:-translate-x-1/2 after:-translate-y-1/2 after:items-center after:justify-center after:rounded-full after:bg-Blue_C_Default after:font-bold after:text-white after:content-[var(--custom-content)]',
			].join(' ');
		}

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

	const changeDate = (dateInfo: DateInfo) => {
		const newDateString = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(dateInfo.date).padStart(2, '0')}`;
		if (date.length === 1) {
			const currentDate = new Date(date[0]);
			const newDate = new Date(newDateString);
			const isPrev = isBeforeDate(currentDate, newDate);
			onChange?.(isPrev ? [date[0], newDateString] : [newDateString, date[0]]);
		} else {
			onChange?.([newDateString]);
		}
	};

	const isSelectable = (dateInfo: DateInfo) => {
		if (!selectable || selectable.length === 0) return true;

		const limitBothDate =
			selectable.length === 2 && selectable[0] !== '' && selectable[1] !== '';
		const limitOnlyStartDate =
			selectable[0] !== '' && (selectable.length === 1 || selectable[1] === '');
		const limitOnlyEndDate =
			selectable.length === 2 && selectable[1] !== '' && selectable[0] === '';

		const currentDate = new Date(calendarYear, calendarMonth, dateInfo.date);
		if (limitOnlyStartDate) {
			const checkStartDate = new Date(selectable[0]);
			return isBeforeDate(checkStartDate, currentDate);
		}
		if (limitOnlyEndDate) {
			const checkEndDate = new Date(selectable[1]);
			return isBeforeDate(currentDate, checkEndDate);
		}
		if (limitBothDate) {
			const checkStartDate = new Date(selectable[0]);
			const checkEndDate = new Date(selectable[1]);

			return (
				isBeforeDate(checkStartDate, currentDate) &&
				isBeforeDate(currentDate, checkEndDate)
			);
		}

		return true;
	};

	const isOverLimit = (dateInfo: DateInfo) => {
		if (!limit || !date[0] || date[0].length < 10) return false;
		const checkStartDate = new Date(date[0]).getTime();
		const currentDate = new Date(
			calendarYear,
			calendarMonth,
			dateInfo.date
		).getTime();
		const timeDifference = Math.abs(checkStartDate - currentDate);
		const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

		return dayDifference > limit;
	};

	const nonSelectableDate = (dateInfo: DateInfo) => {
		return !isSelectable(dateInfo) || isOverLimit(dateInfo);
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
						onClick={() => changeCalendarMonth?.(type)}
					>
						<ArrowLeft12 className='text-Grey_Lighten-2' />
					</button>

					<div className='w-100pxr text-center'>
						{calendarYear}.{String(calendarMonth + 1).padStart(2, '0')}
					</div>
					<button
						className={[
							'h-12pxr w-12pxr',
							type !== 'next' && 'pointer-event-none opacity-0',
						].join(' ')}
						onClick={() => changeCalendarMonth?.(type)}
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
					className='flex w-full py-4pxr'
				>
					{week.map((dateInfo, dateIndex) => (
						<div
							key={dateIndex}
							className={[
								'relative flex h-28pxr flex-1 items-center justify-center text-14pxr',
								dateInfo.flag !== 'curr'
									? 'pointer-events-none opacity-0'
									: 'text-Grey_Darken-4',
								isSelectedDate(dateInfo) &&
									'after:absolute after:left-1/2 after:top-1/2 after:flex after:h-28pxr after:w-28pxr after:-translate-x-1/2 after:-translate-y-1/2 after:items-center after:justify-center after:rounded-full after:bg-Blue_C_Default after:font-bold after:text-white after:content-[var(--custom-content)]',
								isBetweenDate(dateInfo),
								isBetweenHoverDate(dateInfo),
								nonSelectableDate(dateInfo)
									? 'cursor-not-allowed !text-Grey_Default'
									: 'cursor-pointer',
							].join(' ')}
							style={
								{ '--custom-content': `'${dateInfo.date}'` } as React.CSSProperties
							}
							onClick={() => {
								if (nonSelectableDate(dateInfo)) return;
								changeDate?.(dateInfo);
							}}
							onMouseEnter={() => {
								if (nonSelectableDate(dateInfo)) return;
								onHoverDate?.(
									`${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${dateInfo.date}`
								);
							}}
						>
							{dateInfo.date}
						</div>
					))}
				</li>
			))}
		</div>
	);
};
