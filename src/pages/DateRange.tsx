import { useState } from 'react';
import SDateRange from '../components/SDateRange';

const DateRange = () => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const handleDateRangeChange = (start: Date | null, end: Date | null) => {
		setStartDate(start);
		setEndDate(end);
	};

	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>SDateRange</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SDateRange
					onChange={handleDateRangeChange}
					limitStartDate={new Date('2025-01-01')}
					limitEndDate={new Date('2025-02-10')}
					// limitNum={30}
				/>
			</div>
		</div>
	);
};

export default DateRange;
