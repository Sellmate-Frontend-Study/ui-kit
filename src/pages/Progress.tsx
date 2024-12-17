import SProgress from '../components/SProgress';

const Progress = () => {
	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Progress</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SProgress
					type='circle'
					// loading='loading'
					progressLabel='loading'
					progress={60}
				/>
			</div>

			<SProgress
				type='bar'
				size={360}
				progressLabel='loading'
				progress={51}
			/>
			<SProgress
				type='bar'
				size={360}
				progressLabel='loading'
				progressColor='Red_Lighten-1'
				progress={51}
			/>
		</div>
	);
};

export default Progress;
