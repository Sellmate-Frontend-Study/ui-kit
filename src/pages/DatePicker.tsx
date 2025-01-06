import { useEffect, useState } from 'react';
import SDatepicker from '../components/SDatepicker';

const DatePicker = () => {
	const [date, setDate] = useState(['2024-12-14']);

	useEffect(() => {
		setTimeout(() => {
			setDate(['2024-12-20']);
		}, 2000);
	}, []);

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
		</div>
	);
};

export default DatePicker;
