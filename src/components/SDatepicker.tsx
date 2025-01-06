import { createPortal } from 'react-dom';
import Calendar from './Calendar';
import { useEffect, useRef, useState } from 'react';
import CalendarIcon from '../assets/CalendarIcon';
import colors from '../css/colors';
import { Close12 } from '../assets/CloseIcon';

type Props = {
	date: string[];
	onChange: (date: string[]) => void;
	label?: string;
	clearable?: boolean;
};

export default function SDatepicker({
	date,
	onChange,
	label,
	clearable = false,
}: Props) {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [position, setPosition] = useState<{ top: number; left: number } | null>(
		null
	);
	const calendarInput = useRef<null | HTMLInputElement>(null);

	const calendarContainerRef = useRef<HTMLDivElement>(null);

	function handleClickOutside(event: MouseEvent) {
		// 달력 컨테이너와 input을 클릭한 경우에는 닫지 않음
		if (
			calendarInput.current?.contains(event.target as Node) ||
			calendarContainerRef.current?.contains(event.target as Node)
		) {
			return;
		}

		// 그 외의 영역을 클릭한 경우에만 달력을 닫음
		setIsFocused(false);
	}

	const formatDate = (dateStr: string): string => {
		const date = new Date(dateStr);
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	};

	const handleDateChange = (newDate: string, close: boolean = false) => {
		onChange([newDate]);
		if (close) {
			setIsFocused(false);
		}
	};

	function clearDate() {
		onChange([]);
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const topMargin = 4;
	useEffect(() => {
		if (calendarInput.current) {
			const position = calendarInput.current.getBoundingClientRect();
			setPosition({
				top: position.top + window.scrollY + position.height + topMargin,
				left: position.left + window.scrollX,
			});
		}
	}, [calendarInput]);

	return (
		<div className='flex'>
			{label && (
				<div
					className='rounded-[2px_0_0_2px] border-r-0 px-12pxr py-4pxr'
					style={{
						backgroundColor: colors['Grey_Lighten-5'],
						color: colors['Grey_Darken-4'],
						border: '1px solid rgb(170, 170, 170)',
					}}
				>
					{label}
				</div>
			)}
			<button className='relative'>
				<input
					ref={calendarInput}
					value={date[0] ? formatDate(date[0]) : ''}
					readOnly
					className={[
						'cursor-pointer px-24pxr py-3pxr text-center leading-20pxr focus:outline-none',
						label ? 'rounded-[0_2pxr_2pxr_0]' : 'rounded-2pxr',
					].join(' ')}
					style={{
						border: '1px solid rgb(170, 170, 170)',
						color: 'rgba(51, 51, 51, 1)',
					}}
					onClick={() => setIsFocused(true)}
				/>
				{date.length > 0 && clearable && (
					<Close12
						className='absolute right-9pxr top-9pxr'
						onClick={() => clearDate()}
					/>
				)}
				<CalendarIcon className='absolute left-8pxr top-6pxr' />
				{position &&
					createPortal(
						<div ref={calendarContainerRef}>
							<Calendar
								isFocused={isFocused}
								position={position}
								date={date}
								onChange={handleDateChange}
							/>
						</div>,
						document.body
					)}
			</button>
		</div>
	);
}
