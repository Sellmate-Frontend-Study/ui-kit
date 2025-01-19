import { useState } from 'react';
import { ArrowLeft12 } from '../assets/ArrowLeftIcon';
import { ArrowRight12 } from '../assets/ArrowRightIcon';
import { CalendarComponent } from './calendar/Calendar';
import { isBeforeDate } from './calendar/calculateDate';

type Props = {
	isFocused: boolean;
	position: { top: number; left: number };
	date: string[];
	onChange: (date: string[], shouldClose?: boolean) => void;
	selectable?: string[];
	limit?: number;
};
export default function RangeCalendar({
	isFocused,
	position,
	date,
	onChange,
	selectable,
	limit,
}: Props) {
	const [initDate, setInitDate] = useState(new Date(date[0]));
	const [hoverDate, setHoverDate] = useState<string[]>([]);

	// 달력에 필요한 날짜 계산
	const year = initDate.getFullYear();
	const currentMonth = initDate.getMonth();
	const isNextCalendarMonthOverDec = currentMonth + 1 > 11;
	const nextCalendarYear = isNextCalendarMonthOverDec ? year + 1 : year;
	const nextCalendarMonth = isNextCalendarMonthOverDec ? 0 : currentMonth + 1;

	function changeCalendarMonth(prevOrNext: 'prev' | 'next') {
		const newDate = new Date();
		newDate.setFullYear(year);
		const newMonth = prevOrNext === 'next' ? currentMonth + 1 : currentMonth - 1;
		newDate.setMonth(newMonth);

		setInitDate(newDate);
	}

	function changeCalendarYear(monthDiff: number) {
		const newDate = new Date();
		newDate.setMonth(currentMonth);
		newDate.setFullYear(year + monthDiff);
		setInitDate(newDate);
	}

	function onHoverDate(newDateString: string) {
		if (date.length === 1) {
			const currentDate = new Date(date[0]);
			const newDate = new Date(newDateString);
			const isPrev = isBeforeDate(currentDate, newDate);
			setHoverDate(isPrev ? [date[0], newDateString] : [newDateString, date[0]]);
		} else setHoverDate([]);
	}

	if (!isFocused) return null;

	return (
		<ul
			className='w-609pxr bg-white p-24pxr shadow-[2px_2px_12px_2px_#00000033]'
			style={{
				position: 'fixed',
				top: position.top,
				left: position.left,
			}}
		>
			<div className='mb-16pxr flex justify-between text-14pxr text-Grey_Darken-4'>
				<div className='mx-auto flex items-center gap-12pxr'>
					<button
						className='h-12pxr w-12pxr'
						onClick={() => changeCalendarYear(-1)}
					>
						<ArrowLeft12 className='text-Grey_Lighten-2' />
					</button>
					<div className='w-40pxr text-center'>{year}</div>
					<button
						className='h-12pxr w-12pxr'
						onClick={() => changeCalendarYear(1)}
					>
						<ArrowRight12 className='text-Grey_Lighten-2' />
					</button>
				</div>
			</div>
			<div className='flex w-full justify-between gap-20pxr'>
				<CalendarComponent
					key={initDate.getDate()}
					calendarYear={year}
					calendarMonth={currentMonth}
					date={date}
					hoverDate={hoverDate}
					type='prev'
					changeCalendarMonth={changeCalendarMonth}
					onHoverDate={onHoverDate}
					onChange={onChange}
					selectable={selectable}
				/>
				<div className='w-1pxr bg-Grey_Lighten-8'></div>
				<CalendarComponent
					key={initDate.getDate() + 1}
					calendarYear={nextCalendarYear}
					calendarMonth={nextCalendarMonth}
					date={date}
					hoverDate={hoverDate}
					type='next'
					changeCalendarMonth={changeCalendarMonth}
					onHoverDate={onHoverDate}
					onChange={onChange}
					selectable={selectable}
					limit={limit}
				/>
			</div>
		</ul>
	);
}
