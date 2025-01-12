import { useMemo, useState } from 'react';
import { ArrowLeft12 } from '../assets/ArrowLeftIcon';
import { ArrowRight12 } from '../assets/ArrowRightIcon';
import { CalendarComponent } from './calendar/Calendar';

interface DateInfo {
	date: number;
	flag: 'prev' | 'curr' | 'next';
}

type Props = {
	isFocused: boolean;
	position: { top: number; left: number };
	date: string[];
	onChange: (date: string, shouldClose?: boolean) => void;
};
export default function RangeCalendar({
	isFocused,
	position,
	date,
	onChange,
}: Props) {
	const [currentDate, setCurrentDate] = useState(() => new Date(date[0]));

	// 달력에 필요한 날짜 계산
	const year = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentMonthFirstDate = new Date(year, currentMonth, 1);
	const day = currentMonthFirstDate.getDay();

	// 이전 달의 마지막 날짜
	const getPrevLastDate = () => {
		return new Date(year, currentMonth, 0).getDate();
	};

	// 현재 달의 마지막 날짜
	const getLastDate = () => {
		return new Date(year, currentMonth + 1, 0).getDate();
	};

	const lastDate = getLastDate();
	const prevLastDate = getPrevLastDate();
	const weekRows = Math.ceil((lastDate + day) / 7);

	const changeMonth = (monthDiff: number) => {
		setCurrentDate((prev) => {
			const newDate = new Date(prev);
			newDate.setMonth(prev.getMonth() + monthDiff);
			return newDate;
		});
	};

	const changeYear = (monthDiff: number) => {
		setCurrentDate((prev) => {
			const newDate = new Date(prev);
			newDate.setFullYear(prev.getFullYear() + monthDiff);
			return newDate;
		});
	};

	const handleDateClick = (dateInfo: DateInfo) => {
		const newDate = new Date(currentDate);

		if (dateInfo.flag === 'prev') {
			newDate.setMonth(currentMonth - 1);
		} else if (dateInfo.flag === 'next') {
			newDate.setMonth(currentMonth + 1);
		}

		newDate.setDate(dateInfo.date);
		const formattedDate = newDate.toISOString().split('T')[0];
		setCurrentDate(newDate);
		onChange(formattedDate, true); // true를 전달하여 달력을 닫도록 함
	};

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
						onClick={() => changeYear(-1)}
					>
						<ArrowLeft12 className='text-Grey_Lighten-2' />
					</button>
					<div className='w-40pxr text-center'>{year}</div>
					<button
						className='h-12pxr w-12pxr'
						onClick={() => changeYear(1)}
					>
						<ArrowRight12 className='text-Grey_Lighten-2' />
					</button>
				</div>
			</div>
			<div className='flex w-full justify-between gap-20pxr'>
				<CalendarComponent
					calendarYear={year}
					calendarMonth={currentMonth}
					date={date}
					type='prev'
				/>
				<div className='w-1pxr bg-Grey_Lighten-8'></div>
				<CalendarComponent
					calendarYear={year}
					calendarMonth={currentMonth + 1}
					date={date}
					type='next'
				/>
			</div>
		</ul>
	);
}
