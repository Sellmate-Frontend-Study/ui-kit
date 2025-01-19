import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import CalendarIcon from '../assets/CalendarIcon';
import colors from '../css/colors';
import { Close12 } from '../assets/CloseIcon';
import RangeCalendar from './RangeCalendar';

type Props = {
	date: string[];
	onChange: (date: string[]) => void;
	label?: string;
	clearable?: boolean;
	selectable?: string[];
	limit?: number;
};

export default function SDateRangepicker({
	date,
	onChange,
	label,
	clearable = false,
	selectable,
	limit,
}: Props) {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [position, setPosition] = useState<{ top: number; left: number } | null>(
		null
	);
	const calendarIcon = useRef<null | HTMLInputElement>(null);
	const calendarInput = useRef<null | HTMLInputElement>(null);
	const prevDateRef = useRef<null | HTMLInputElement>(null);
	const nextDateRef = useRef<null | HTMLInputElement>(null);
	const calendarContainerRef = useRef<HTMLDivElement>(null);

	function handleClickOutside(event: MouseEvent) {
		// 달력 컨테이너와 input을 클릭한 경우에는 닫지 않음
		if (
			calendarIcon.current?.contains(event.target as Node) ||
			calendarInput.current?.contains(event.target as Node) ||
			calendarContainerRef.current?.contains(event.target as Node)
		)
			return;

		// 그 외의 영역을 클릭한 경우에만 달력을 닫음
		setIsFocused(false);
	}

	// const formatDate = (dateStr: string | null): string => {
	// 	if (!dateStr) return '';
	// 	const date = new Date(dateStr);
	// 	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	// };

	const handleDateChange = (newDate: string[], close: boolean = false) => {
		onChange(newDate);
		if (close) setIsFocused(false);
	};

	function clearDate() {
		onChange([]);
	}

	function changeDateInput(value: string, isFirst: boolean) {
		const dateCopy = [...date];
		if (isFirst) dateCopy[0] = convertInputformatDate(value);
		else dateCopy[1] = convertInputformatDate(value);
		onChange?.(dateCopy);
	}

	function resetEndDateWhenFirstInputChange() {
		const dateCopy = [...date];
		if (dateCopy[1]) date.pop();
		onChange?.(dateCopy);
	}

	// 날짜 형식 변환 함수
	const convertInputformatDate = (value: string) => {
		// 숫자만 필터링
		const numericValue = value.replace(/[^0-9]/g, '');

		// 날짜 형식으로 변환
		if (numericValue.length > 4 && numericValue.length <= 6) {
			return numericValue.slice(0, 4) + '-' + numericValue.slice(4);
		} else if (numericValue.length > 6) {
			return (
				numericValue.slice(0, 4) +
				'-' +
				numericValue.slice(4, 6) +
				'-' +
				numericValue.slice(6, 8)
			);
		}
		return numericValue;
	};

	function focuseEndDateInput(value: string) {
		const valueFullfilled = 7;
		if (value.length > valueFullfilled) {
			prevDateRef.current?.blur();
			nextDateRef.current?.focus();
		}
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
			const inputLeftPadding = 36;
			setPosition({
				top: position.top + window.scrollY + position.height + topMargin,
				left: position.left + window.scrollX - inputLeftPadding,
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
			<div
				className={[
					'relative w-207pxr py-3pxr pl-36pxr pr-16pxr text-center leading-20pxr',
					label ? 'rounded-[0_2pxr_2pxr_0]' : 'rounded-2pxr',
				].join(' ')}
				style={{
					border: '1px solid rgb(170, 170, 170)',
					color: 'rgba(51, 51, 51, 1)',
				}}
			>
				<div
					ref={calendarInput}
					className='flex w-147pxr items-center justify-between'
				>
					<input
						ref={prevDateRef}
						className='w-66pxr focus:outline-none'
						value={date[0] ? date[0] : ''}
						onInput={(event) => {
							resetEndDateWhenFirstInputChange();
							const value = (event.target as HTMLInputElement).value.replace(
								/-/gi,
								''
							);
							changeDateInput(value, true);
							focuseEndDateInput(value);
						}}
					/>
					<div>~</div>
					<input
						ref={nextDateRef}
						className='w-66pxr focus:outline-none'
						value={date[1] ? date[1] : ''}
						onInput={(event) => {
							const value = (event.target as HTMLInputElement).value.replace(
								/-/gi,
								''
							);
							changeDateInput(value, false);
						}}
					/>
				</div>
				{date.length > 0 && clearable && (
					<Close12
						className='absolute right-9pxr top-9pxr'
						onClick={() => clearDate()}
					/>
				)}
				<div
					className='absolute left-8pxr top-6pxr cursor-pointer'
					ref={calendarIcon}
					onClick={() => setIsFocused(true)}
				>
					<CalendarIcon />
				</div>
				{position &&
					createPortal(
						<div ref={calendarContainerRef}>
							<RangeCalendar
								isFocused={isFocused}
								position={position}
								date={date}
								onChange={handleDateChange}
								selectable={selectable}
								limit={limit}
							/>
						</div>,
						document.body
					)}
			</div>
		</div>
	);
}
