import { useState, useRef, useEffect } from 'react';
import { icons } from '../assets/icons';
import SInput from './SInput';
import DatePickerPortal from './datePicker/DatePickerPortal';
import { Meridiem, TIME_FORMAT } from './timePicker/time';
import TimeBox from './timePicker/TimeBox';

interface STimePickerProps {
	value?: string;
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
	const [meridiem, setMeridiem] = useState<Meridiem>(TIME_FORMAT.AM);
	const inputRef = useRef<HTMLDivElement>(null);
	const [inputRect, setInputRect] = useState<DOMRect | null>(null);
	const Clock = icons.Clock[16];

	useEffect(() => {
		if (value) {
			setTime(value);
			const hours = parseInt(value.split(':')[0]);
			setMeridiem(hours >= TIME_FORMAT.HOURS_12 ? TIME_FORMAT.PM : TIME_FORMAT.AM);
		}
	}, [value]);

	useEffect(() => {
		if (inputRef.current) {
			setInputRect(inputRef.current.getBoundingClientRect());
		}
	}, [isOpen]);

	const handleInputClick = () => {
		if (!disabled) {
			setIsOpen((prev) => !prev);
		}
	};

	const displayTime = (time: string) => {
		const [hours, minutes] = time.split(':').map(Number);
		if (is24Hour) {
			return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
		}
		const displayHours = hours % TIME_FORMAT.HOURS_12 || TIME_FORMAT.HOURS_12;
		const ampm =
			meridiem === TIME_FORMAT.PM ? TIME_FORMAT.PM_EN : TIME_FORMAT.AM_EN;
		return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
	};

	const handleTimeChange = (hours: number, minutes: number) => {
		if (!is24Hour) {
			if (meridiem === TIME_FORMAT.PM && hours < TIME_FORMAT.HOURS_12) {
				hours += TIME_FORMAT.HOURS_12;
			} else if (meridiem === TIME_FORMAT.AM && hours === TIME_FORMAT.HOURS_12) {
				hours = 0;
			}
		}

		const newTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
		setTime(newTime);
		onChange?.(newTime);
	};

	const handleMeridiemChange = (meridiem: Meridiem) => {
		setMeridiem(meridiem);
		const [hours, minutes] = time.split(':').map(Number);
		let newHours = hours;
		if (meridiem === TIME_FORMAT.PM && hours < TIME_FORMAT.HOURS_12) {
			newHours += TIME_FORMAT.HOURS_12;
		} else if (meridiem === TIME_FORMAT.AM && hours >= TIME_FORMAT.HOURS_12) {
			newHours -= TIME_FORMAT.HOURS_12;
		}
		handleTimeChange(newHours, minutes);
	};

	return (
		<div className={['relative', className].join(' ')}>
			<div
				ref={inputRef}
				onClick={handleInputClick}
			>
				<SInput
					label={label}
					value={displayTime(time)}
					readonly
					disable={disabled}
					prepend={<Clock />}
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
				<TimeBox
					is24Hour={is24Hour}
					time={time}
					meridiem={meridiem}
					TIME_FORMAT={TIME_FORMAT}
					onTimeChange={handleTimeChange}
					onMeridiemChange={handleMeridiemChange}
				/>
			</DatePickerPortal>
		</div>
	);
};

export default STimePicker;
