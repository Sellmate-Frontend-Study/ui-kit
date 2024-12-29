import { useMemo, useState } from 'react';
import { ArrowLeft12 } from '../assets/ArrowLeftIcon';
import { ArrowRight12 } from '../assets/ArrowRightIcon';

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
export default function Calendar({
	isFocused,
	position,
	date,
	onChange,
}: Props) {
	const [currentDate, setCurrentDate] = useState(() => new Date(date[0]));
	const selectedDate = new Date(date[0]); // 선택된 날짜를 별도로 관리

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
		onChange(formattedDate, true); // true를 전달하여 달력을 닫도록 함
	};

	// 선택된 날짜인지 확인하는 함수
	const isSelectedDate = (dateInfo: DateInfo): boolean => {
		const checkDate = new Date(currentDate);

		if (dateInfo.flag === 'prev') {
			checkDate.setMonth(currentMonth - 1);
		} else if (dateInfo.flag === 'next') {
			checkDate.setMonth(currentMonth + 1);
		}

		checkDate.setDate(dateInfo.date);

		return (
			checkDate.getDate() === selectedDate.getDate() &&
			checkDate.getMonth() === selectedDate.getMonth() &&
			checkDate.getFullYear() === selectedDate.getFullYear()
		);
	};

	if (!isFocused) return null;

	return (
		<ul
			className='w-302pxr bg-white p-24pxr shadow-[2px_2px_12px_2px_#00000033]'
			style={{
				position: 'fixed',
				top: position.top,
				left: position.left,
			}}
		>
			<div className='mb-8pxr flex justify-between text-14pxr text-Grey_Darken-4'>
				<div className='flex items-center gap-12pxr'>
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

				<div className='flex items-center gap-12pxr'>
					<button
						className='h-12pxr w-12pxr'
						onClick={() => changeMonth(-1)}
					>
						<ArrowLeft12 className='text-Grey_Lighten-2' />
					</button>
					<div className='w-100pxr text-center'>{currentMonth + 1}월</div>
					<button
						className='h-12pxr w-12pxr'
						onClick={() => changeMonth(1)}
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
					className='flex cursor-pointer gap-10pxr py-4pxr'
				>
					{week.map((dateInfo, dateIndex) => (
						<div
							key={dateIndex}
							className={[
								'flex h-28pxr w-28pxr flex-1 items-center justify-center text-14pxr',
								dateInfo.flag !== 'curr' ? 'text-Grey_Lighten-2' : 'text-Grey_Darken-4',
								isSelectedDate(dateInfo) &&
									'rounded-full bg-Blue_C_Default font-bold text-white',
							].join(' ')}
							onClick={() => handleDateClick(dateInfo)}
						>
							{dateInfo.date}
						</div>
					))}
				</li>
			))}
		</ul>
	);
}
