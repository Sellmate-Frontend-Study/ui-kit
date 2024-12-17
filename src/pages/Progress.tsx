import { useEffect, useState } from 'react';
import SProgress from '../components/SProgress';

const progress = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					return 100;
				}
				return prev + 10;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>progress</b>
			</div>
			<div className='flex flex-col items-center gap-24pxr'>
				<SProgress
					progress={progress}
					label='Progress Label..'
				/>
				<SProgress
					progress={progress}
					status='error'
					label='Progress Label..'
				/>
			</div>
		</div>
	);
};

export default progress;
