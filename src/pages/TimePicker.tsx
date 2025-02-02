import { useState } from 'react';
import STimePicker from '../components/STimePicker';

const TimePicker = () => {
	const [time, setTime] = useState('12:00');

	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>TimePicker</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<STimePicker
					value={time}
					onChange={(time) => setTime(time)}
				/>
				<STimePicker
					value={time}
					rangeValue='01:00'
					is24HourFormat={false}
				/>
			</div>
			<div>
				<STimePicker
					label='label'
					disabled
				/>
			</div>
		</div>
	);
};

export default TimePicker;
