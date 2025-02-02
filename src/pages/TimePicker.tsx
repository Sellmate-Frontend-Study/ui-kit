import { useState } from 'react';
import STimePicker from '../components/STimePicker';

const TimePicker = () => {
	const [time, setTime] = useState('21:30');

	return (
		<div className='space-y-32pxr p-24pxr'>
			<strong>Time Picker</strong>
			<p>{time}</p>
			<div>
				<STimePicker
					value={time}
					onChange={setTime}
				/>
			</div>
			<div>
				<STimePicker
					value={time}
					onChange={setTime}
					is24Hour={false}
				/>
			</div>
		</div>
	);
};

export default TimePicker;
