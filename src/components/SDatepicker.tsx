import { ArrowLeft12 } from '../assets/ArrowLeftIcon';
import { ArrowRight12 } from '../assets/ArrowRightIcon';
import SButton from './SButton';

type Props = {
	date: string[];
	onChange: (date: string) => void;
};
export default function SDatepicker({ date, onChange }: Props) {
	// 하루만 사용하는 datePicker로 임시 지정
	const targetDate = new Date(date[0]); // 지정일 (12월 10일)
	const today = targetDate.getDate();
	const currentMonth = targetDate.getMonth();
	const year = targetDate.getFullYear();
	const currentMonthFirstDate = new Date(targetDate.setDate(1)); // 지정일의 달의 1일 (12월 10일 -> 12월 1일)

	// 이전 달의 마지막 날짜
	function getLastDate() {
		const temp = new Date(currentMonthFirstDate.getTime());
		temp.setMonth(currentMonthFirstDate.getMonth() + 1);
		temp.setDate(0);
		return temp.getDate();
	}
	// 현재 달의 마지막 날짜
	function getPrevLastDate() {
		const temp = new Date(currentMonthFirstDate.getTime());
		temp.setDate(0);
		return temp.getDate();
	}

	const lastDate = getLastDate(); // 이번달 말일 (12월 10일 -> 12월 31일 -> 31)
	const prevLastDate = getPrevLastDate(); // 저번달 말일 (12월 10일 -> 11월 30일 -> 30)
	const day = currentMonthFirstDate.getDay(); // 이번달 1일의 요일 (2024년 12월 1일 -> 일요일 -> 0)

	const weekRows = Math.ceil((lastDate + day) / 7); // 달력에 표시되어야할 행의 수
	const weekList = []; // 달력에 표시할 리스트 배열

	for (let w = 0; w < weekRows; w++) {
		const week = Array(7).fill(0);
		for (let i = 0; i < 7; i++) {
			if (w == 0) {
				const date = (i < day ? prevLastDate - (day - i) : i - day) + 1;
				week[i] = { flag: i < day ? 'prev' : 'curr', date };
			} else {
				const d = i + w * 7 - day + 1;
				const date = d > lastDate ? d - lastDate : (d ?? 0);
				week[i] = { flag: d > lastDate ? 'next' : 'curr', date };
			}
		}
		weekList.push(week);
	}

	function updateDate(date: any) {
		const { date: target, flag } = date;
		const changedDate = new Date(currentMonthFirstDate);
		changedDate.setDate(target);
		if (flag === 'next') changedDate.setMonth(currentMonth + 1);
		if (flag === 'prev') changedDate.setMonth(currentMonth - 1);

		console.log(changedDate.toISOString());

		onChange(changedDate.toISOString().split('T')[0]);
	}

	return (
		<div>
			<ul className='w-302pxr p-24pxr shadow-[2px_2px_12px_2px_#00000033]'>
				<div className='mb-8pxr flex justify-between text-14pxr text-Grey_Darken-4'>
					<div className='flex items-center gap-12pxr'>
						<button className='h-12pxr w-12pxr'>
							<ArrowLeft12 className='text-Grey_Lighten-2' />
						</button>
						<div className='w-40pxr text-center'>{year}</div>

						<button className='h-12pxr w-12pxr'>
							<ArrowRight12 className='text-Grey_Lighten-2' />
						</button>
					</div>

					<div className='flex items-center gap-12pxr'>
						<button className='h-12pxr w-12pxr'>
							<ArrowLeft12 className='text-Grey_Lighten-2' />
						</button>
						<div className='w-100pxr text-center'>{currentMonth + 1}월</div>
						{/* currentMonth는 date객체에서 사용하는 index값이므로 1을 더해줘야함 */}
						<button className='h-12pxr w-12pxr'>
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
						className='flex gap-10pxr py-4pxr'
					>
						{week.map((date, dateIndex) => (
							<div
								key={dateIndex}
								className={[
									'flex h-28pxr w-28pxr flex-1 items-center justify-center text-14pxr text-Grey_Darken-4',
									date.flag !== 'curr' && 'text-white',
									date.flag === 'curr' &&
										date.date === today &&
										'rounded-full bg-Blue_C_Default font-bold text-white',
								].join(' ')}
								onClick={() => updateDate(date)}
							>
								{date.date}
							</div>
						))}
					</li>
				))}
			</ul>
		</div>
	);
}
