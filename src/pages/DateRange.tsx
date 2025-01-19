import { useState } from 'react';
import SDateRange from '../components/SDateRange';

const DateRange = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const handleChange = (date: Date) => {
		setSelectedDate(date);
	};

	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>SDateRange</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SDateRange
					onChange={handleChange}
					isRange
				/>
			</div>
		</div>
	);
};

export default DateRange;
