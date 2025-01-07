import { useState } from 'react';
import SDatePicker from '../components/SDatePicker';

const DatePicker = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const handleChange = (date: Date) => {
		setSelectedDate(date);
	};

	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>SDatePicker</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SDatePicker
					onChange={handleChange}
					// disabled={true}
					label='Label'
				/>
			</div>
			{selectedDate && (
				<div className='mt-4pxr'>{selectedDate.toLocaleDateString()}</div>
			)}
		</div>
	);
};

export default DatePicker;
