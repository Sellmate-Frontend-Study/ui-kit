import { useState, useRef, useEffect } from 'react';
import { icons } from '../assets/icons';
import SInput from './SInput';
import DatePickerPortal from './datePicker/DatePickerPortal';
import TimeBox from './timePicker/TimeBox';
import { Period, TIME_FORMAT } from './timePicker/types';

interface STimePickerProps {
	value: string;
	label?: string;
	disabled?: boolean;
	onChange?: (time: string) => void;
	className?: string;
	is24Hour?: boolean;
}

const STimePicker = ({
	value = '',
	label,
	disabled = false,
	onChange,
	className = '',
	is24Hour = true,
}: STimePickerProps) => {
	const [time, setTime] = useState(value || TIME_FORMAT.DEFAULT_TIME);
	const [isOpen, setIsOpen] = useState(false);
	const [period, setPeriod] = useState<Period>(TIME_FORMAT.AM);
	const inputRef = useRef<HTMLDivElement>(null);
	const [inputRect, setInputRect] = useState<DOMRect | null>(null);

	useEffect(() => {
		if (value) {
			setTime(value);
			const hours = parseInt(value.split(':')[0]);
			setPeriod(hours >= TIME_FORMAT.HOURS_12 ? TIME_FORMAT.PM : TIME_FORMAT.AM);
		}
	}, [value]);

	useEffect(() => {
		if (inputRef.current) {
			setInputRect(inputRef.current.getBoundingClientRect());
		}
	}, [isOpen]);

	const formatTimeDisplay = (timeStr: string) => {
		const [hours, minutes] = timeStr.split(':').map(Number);
		if (is24Hour) {
			return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
		}
		const displayHours = hours % TIME_FORMAT.HOURS_12 || TIME_FORMAT.HOURS_12;
		const ampm =
			period === TIME_FORMAT.PM ? TIME_FORMAT.PM_EN : TIME_FORMAT.AM_EN;
		return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
	};

	const handleTimeChange = (hours: number, minutes: number) => {
		let finalHours = hours;
		if (!is24Hour) {
			if (period === TIME_FORMAT.PM && hours < TIME_FORMAT.HOURS_12) {
				finalHours += TIME_FORMAT.HOURS_12;
			} else if (period === TIME_FORMAT.AM && hours === TIME_FORMAT.HOURS_12) {
				finalHours = 0;
			}
		}
		const newTime = `${finalHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
		setTime(newTime);
		onChange?.(newTime);
	};

	const handlePeriodChange = (newPeriod: Period) => {
		setPeriod(newPeriod);
		const [hours, minutes] = time.split(':').map(Number);
		let newHours = hours;
		if (newPeriod === TIME_FORMAT.PM && hours < TIME_FORMAT.HOURS_12) {
			newHours += TIME_FORMAT.HOURS_12;
		} else if (newPeriod === TIME_FORMAT.AM && hours >= TIME_FORMAT.HOURS_12) {
			newHours -= TIME_FORMAT.HOURS_12;
		}
		handleTimeChange(newHours, minutes);
	};

	const renderTimePicker = () => {
		if (!isOpen) return null;

		return (
			<TimeBox
				is24Hour={is24Hour}
				time={time}
				period={period}
				TIME_FORMAT={TIME_FORMAT}
				onTimeChange={handleTimeChange}
				onPeriodChange={handlePeriodChange}
			/>
		);
	};

	const handleInputClick = () => {
		if (!disabled) {
			setIsOpen((prev) => !prev);
		}
	};

	const Clock = icons.Clock[16];

	return (
		<div className={['relative', className].join(' ')}>
			<div
				ref={inputRef}
				onClick={handleInputClick}
			>
				<SInput
					label={label}
					value={formatTimeDisplay(time)}
					readonly
					disable={disabled}
					prepend={<Clock className='text-Grey_Darken-1' />}
					inputContainerClassName='px-8pxr'
					inputClassName='w-120pxr text-center cursor-pointer'
				/>
			</div>
			<DatePickerPortal
				parentRef={inputRef}
				parentRect={inputRect}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			>
				{renderTimePicker()}
			</DatePickerPortal>
		</div>
	);
};

export default STimePicker;
