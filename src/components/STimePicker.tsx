import { useEffect, useMemo, useRef, useState } from 'react';
import { ClockIcon } from '../assets/ClockIcon';
import TimePickerPortal from './timePicker/TimePickerPortal';
import TimeController from './timePicker/TimeController';

interface STimePickerProps {
	value?: string;
	is24HourFormat?: boolean;
	rangeValue?: string | null;
	label?: string;
	disabled?: boolean;
	onChange?: (time: string) => void;
}

const STimePicker = ({
	value = '00:00',
	disabled = false,
	is24HourFormat = true,
	rangeValue,
	label,
	onChange,
}: STimePickerProps) => {
	const [time, setTime] = useState(value.split(':'));
	const [rangeTime, setRangeTime] = useState<string[] | null>(
		rangeValue ? rangeValue.split(':') : null
	);
	const [timeFormat, setTimeFormat] = useState('AM');
	const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
	const [isRangePickerOpen, setIsRangePickerOpen] = useState(false);

	const [timePickerRect, setTimePickerRect] = useState<DOMRect | null>(null);
	const hourLimit = is24HourFormat ? 23 : 12;
	const minuteLimit = 59;
	const timePickerRef = useRef<HTMLDivElement>(null);

	// 24시간 포맷이 아닐때만 오전 오후 노출
	const displayTime = useMemo(() => {
		const timeString = time.join(':');
		return is24HourFormat ? timeString : `${timeString} ${timeFormat}`;
	}, [is24HourFormat, time, timeFormat]);

	const displayRange = useMemo(() => {
		const timeString = rangeTime ? rangeTime.join(':') : null;
		return is24HourFormat ? timeString : `${timeString} ${timeFormat}`;
	}, [is24HourFormat, rangeTime, timeFormat]);

	const handleHourChange = (
		originTime: string[],
		hour: string,
		isPlus?: boolean,
		isOverLimit?: boolean
	) => {
		const timeCopy = [...originTime];
		if (!isOverLimit) return [hour, timeCopy[1]];
		else if (isPlus) {
			return [is24HourFormat ? '00' : '01', timeCopy[1]];
		} else {
			return [is24HourFormat ? '23' : '12', timeCopy[1]];
		}

		// if (!isOverLimit) {
		// 	setTime((prev) => [hour, prev[1]]);
		// } else if (isPlus) {
		// 	setTime((prev) => [is24HourFormat ? '00' : '01', prev[1]]);
		// } else {
		// 	setTime((prev) => [is24HourFormat ? '23' : '12', prev[1]]);
		// }
	};

	function changeTimeHour(
		hour: string,
		isPlus?: boolean,
		isOverLimit?: boolean
	) {
		setTime(handleHourChange(time, hour, isPlus, isOverLimit));
	}

	function changeRangeHour(
		hour: string,
		isPlus?: boolean,
		isOverLimit?: boolean
	) {
		if (!rangeTime) return;
		setRangeTime(handleHourChange(rangeTime, hour, isPlus, isOverLimit));
	}

	function handleMinutesChange(
		originTime: string[],
		minutes: string,
		isPlus?: boolean,
		isOverLimit?: boolean
	) {
		const timeCopy = [...originTime];
		const rowHourLimit = is24HourFormat ? 0 : 1;
		if (!isOverLimit) return [timeCopy[0], minutes];
		else if (isPlus) {
			const roundedHour = Number(time[0]) + 1;
			return [
				roundedHour > hourLimit
					? `${rowHourLimit}`.padStart(2, '0')
					: `${roundedHour}`.padStart(2, '0'),
				'00',
			];
		} else {
			const roundedHour = Number(time[0]) - 1;
			const finallHour = roundedHour < rowHourLimit ? hourLimit : roundedHour;
			return [`${finallHour}`.padStart(2, '0'), '59'];
		}

		// if (!isOverLimit) {
		// 	setTime((prev) => [prev[0], minutes]);
		// } else if (isPlus) {
		// 	const roundedHour = Number(time[0]) + 1;
		// 	setTime([
		// 		roundedHour > hourLimit
		// 			? `${rowHourLimit}`.padStart(2, '0')
		// 			: `${roundedHour}`.padStart(2, '0'),
		// 		'00',
		// 	]);
		// } else {
		// 	const roundedHour = Number(time[0]) - 1;
		// 	const finallHour = roundedHour < rowHourLimit ? hourLimit : roundedHour;
		// 	setTime([`${finallHour}`.padStart(2, '0'), '59']);
		// }
	}

	function changeTimeMinutes(
		minutes: string,
		isPlus?: boolean,
		isOverLimit?: boolean
	) {
		setTime(handleMinutesChange(time, minutes, isPlus, isOverLimit));
	}

	function changeRangeMinutes(
		minutes: string,
		isPlus?: boolean,
		isOverLimit?: boolean
	) {
		if (!rangeTime) return;
		setRangeTime(handleMinutesChange(rangeTime, minutes, isPlus, isOverLimit));
	}

	useEffect(() => {
		if (timePickerRef.current) {
			setTimePickerRect(timePickerRef.current.getBoundingClientRect());
		}
	}, [time, isTimePickerOpen]);

	useEffect(() => {
		const hourString = time[0].padStart(2, '0');
		const minuteString = time[1].padStart(2, '0');
		onChange?.(`${hourString}:${minuteString}`);
	}, [time, onChange]);

	useEffect(() => {
		if (isTimePickerOpen) console.log('isTimePickerOpen');
		if (isRangePickerOpen) console.log('isRangePickerOpen');
	}, [isTimePickerOpen, isRangePickerOpen]);

	return (
		<>
			<div
				ref={timePickerRef}
				className='flex'
			>
				{label && (
					<div className='rounded-l-2pxr border border-Grey_Lighten-1 px-12pxr py-4pxr text-Grey_Darken-4'>
						{label}
					</div>
				)}
				<div
					className={[
						'flex items-center rounded-2pxr border border-Grey_Lighten-1 px-8pxr py-4pxr',
						rangeTime ? 'w-182pxr' : 'w-127pxr',
						label && 'rounded-l-none border-l-0',
						disabled && 'cursor-not-allowed bg-Grey_Lighten-4 text-Grey_Default',
					].join(' ')}
				>
					<ClockIcon className='text-Grey_Darken-1' />
					<input
						value={displayTime}
						disabled={disabled}
						className={[
							'mx-auto w-60pxr text-center focus:outline-none',
							disabled && 'pointer-events-none',
						].join(' ')}
						onClick={() => {
							setIsTimePickerOpen(true);
							setIsRangePickerOpen(false);
						}}
					/>

					{rangeTime && (
						<>
							<span>~</span>
							<input
								value={displayRange!}
								disabled={disabled}
								className={[
									'mx-auto w-60pxr text-center focus:outline-none',
									disabled && 'pointer-events-none',
								].join(' ')}
								onClick={() => {
									setIsTimePickerOpen(false);
									setIsRangePickerOpen(true);
								}}
							/>
						</>
					)}
				</div>
				{/* <SInput
					label={label}
					value={displayTime}
					readonly
					disable={disabled}
					prepend={<ClockIcon className='text-Grey_Darken-1' />}
					inputContainerClassName='px-8pxr'
					inputClassName='w-127pxr text-center'
				/> */}
			</div>
			<TimePickerPortal
				parentRef={timePickerRef}
				parentRect={timePickerRect}
				isOpen={isTimePickerOpen || isRangePickerOpen}
				setIsOpen={isTimePickerOpen ? setIsTimePickerOpen : setIsRangePickerOpen}
			>
				<div className='flex rounded-8pxr shadow-[2px_2px_12px_2px_#0000001A]'>
					{!is24HourFormat && (
						<div className='flex flex-col gap-y-8pxr border-r border-Grey_Lighten-4 px-24pxr py-30pxr'>
							<button
								className='rounded-4pxr border border-Grey_Default px-12pxr py-4pxr'
								onClick={() => setTimeFormat('AM')}
							>
								오전
							</button>
							<button
								className='rounded-4pxr border border-Grey_Default px-12pxr py-4pxr'
								onClick={() => setTimeFormat('PM')}
							>
								오후
							</button>
						</div>
					)}

					<div className='flex items-center gap-2pxr p-24pxr'>
						<TimeController
							value={isRangePickerOpen && rangeTime ? rangeTime[0] : time[0]}
							limit={hourLimit}
							NotAllowZero={!is24HourFormat}
							onChange={isTimePickerOpen ? changeTimeHour : changeRangeHour}
						/>
						<span className='w-16pxr text-center font-bold text-Grey_Darken-2'>
							:
						</span>
						<TimeController
							value={isRangePickerOpen && rangeTime ? rangeTime[1] : time[1]}
							limit={minuteLimit}
							onChange={isTimePickerOpen ? changeTimeMinutes : changeRangeMinutes}
						/>
					</div>
				</div>
			</TimePickerPortal>
		</>
	);
};

export default STimePicker;
