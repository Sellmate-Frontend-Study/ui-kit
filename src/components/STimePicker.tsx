import { useEffect, useMemo, useRef, useState } from 'react';
import { ClockIcon } from '../assets/ClockIcon';
import SInput from './SInput';
import TimePickerPortal from './timePicker/TimePickerPortal';
import TimeController from './timePicker/TimeController';

interface STimePickerProps {
	value?: string;
	is24HourFormat?: boolean;
	label?: string;
	disabled?: boolean;
	onChange?: (time: string) => void;
}

const STimePicker = ({
	value = '00:00',
	disabled = false,
	is24HourFormat = true,
	label,
	onChange,
}: STimePickerProps) => {
	const [time, setTime] = useState(value.split(':'));
	const [timeFormat, setTimeFormat] = useState('AM');
	const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
	const [timePickerRect, setTimePickerRect] = useState<DOMRect | null>(null);
	const hourLimit = is24HourFormat ? 23 : 12;
	const minuteLimit = 59;
	const timePickerRef = useRef<HTMLDivElement>(null);

	// 24시간 포맷이 아닐때만 오전 오후 노출
	const displayTime = useMemo(() => {
		const timeString = time.join(':');
		return is24HourFormat ? timeString : `${timeString} ${timeFormat}`;
	}, [is24HourFormat, time, timeFormat]);

	function handleHourChange(
		hour: string,
		isPlus?: boolean,
		isOverLimit?: boolean
	) {
		if (!isOverLimit) {
			setTime((prev) => [hour, prev[1]]);
		} else if (isPlus) {
			setTime((prev) => [is24HourFormat ? '00' : '01', prev[1]]);
		} else {
			setTime((prev) => [is24HourFormat ? '23' : '12', prev[1]]);
		}
	}

	function handleMinutesChange(
		minutes: string,
		isPlus?: boolean,
		isOverLimit?: boolean
	) {
		if (!isOverLimit) {
			setTime((prev) => [prev[0], minutes]);
		} else if (isPlus) {
			const roundedHour = Number(time[0]) + 1;
			setTime([
				roundedHour > hourLimit ? '00' : `${roundedHour}`.padStart(2, '0'),
				'00',
			]);
		} else {
			const roundedHour = Number(time[0]) - 1;
			const rowHourLimit = is24HourFormat ? 0 : 1;
			const finallHour = roundedHour < rowHourLimit ? hourLimit : roundedHour;
			setTime([`${finallHour}`.padStart(2, '0'), '59']);
		}
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

	return (
		<>
			<div
				ref={timePickerRef}
				onClick={() => {
					if (disabled) return;
					setIsTimePickerOpen((prev) => !prev);
				}}
			>
				<SInput
					label={label}
					value={displayTime}
					readonly
					disable={disabled}
					prepend={<ClockIcon className='text-Grey_Darken-1' />}
					inputContainerClassName='px-8pxr'
					inputClassName='w-127pxr text-center'
				/>
			</div>
			<TimePickerPortal
				parentRef={timePickerRef}
				parentRect={timePickerRect}
				isOpen={isTimePickerOpen}
				setIsOpen={setIsTimePickerOpen}
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
							value={time[0]}
							limit={hourLimit}
							NotAllowZero={!is24HourFormat}
							onChange={handleHourChange}
						/>
						<span className='w-16pxr text-center font-bold text-Grey_Darken-2'>
							:
						</span>
						<TimeController
							value={time[1]}
							limit={minuteLimit}
							onChange={handleMinutesChange}
						/>
					</div>
				</div>
			</TimePickerPortal>
		</>
	);
};

export default STimePicker;
