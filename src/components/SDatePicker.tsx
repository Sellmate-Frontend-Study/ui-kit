import { useRef, useState } from 'react';
import DateInput from './datePicker/DateInput';
import SingleDate from './datePicker/SingleDate';
import DateWrapper from './datePicker/DateWrapper';
import { DateDisable } from './datePicker/DateComponent';

interface SDatePickerProps {
	onChange: (date: string) => void;
 disable?: boolean;
 disableDates?: DateDisable;
 label?: string
 value?: string;
}

const SDatePicker = ({ onChange, disable, disableDates, label, value }: SDatePickerProps) => {
	const [selectedDate, setSelectedDate] = useState<string>(value || '');
	const [open, setOpen] = useState<boolean>(false);
	const datePickerRef = useRef<HTMLDivElement | null>(null);

	const handleDateChange = (value: string) => {
		setSelectedDate(value);
		onChange(value);
	};

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<div
			ref={datePickerRef}
			className='relative'
		>
			<DateInput
				value={selectedDate}
				onChange={(val) => handleDateChange(val as string)}
				onClick={handleClick}
    disable={disable}
    label={label}
			/>
			<DateWrapper
				open={open}
				onChange={setOpen}
				parentRef={datePickerRef}
			>
				<SingleDate
					date={selectedDate}
					onChange={setSelectedDate}
     disable={disableDates}
				/>
			</DateWrapper>
		</div>
	);
};

export default SDatePicker;
