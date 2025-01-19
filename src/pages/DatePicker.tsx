import { useEffect, useState } from 'react';
import SDatepicker from '../components/SDatepicker';
import SDateRangepicker from '../components/SDateRangepicker';

const DatePicker = () => {
	const [date, setDate] = useState(['2024-12-14']);
	const [dateRange, setDateRange] = useState(['2024-12-14', '2025-02-15']);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setDate(['2024-12-20']);
	// 	}, 2000);
	// }, []);

	useEffect(() => {
		console.log(date);
	}, [date]);
	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>DatePicker</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SDatepicker
					label={'label'}
					date={date}
					onChange={(date) => setDate(date)}
				/>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SDatepicker
					label={'label'}
					date={date}
					onChange={(date) => setDate(date)}
					clearable
				/>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SDateRangepicker
					label={'label'}
					date={dateRange}
					onChange={(date) => setDateRange(date)}
					selectable={['2024-12-01', '2025-12-01']}
					limit={30}
					clearable
				/>
			</div>
		</div>
	);
};

export default DatePicker;
