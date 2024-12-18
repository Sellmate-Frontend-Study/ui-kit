type Status = 'progress' | 'complete' | 'error' | 'default';

interface SProgressProps {
	progress: number;
	status?: Status;
	label?: string;
	className?: string;
	labelClassName?: string;
}

const STATUS_BG_COLORS = {
	default: 'bg-Grey_Lighten-4',
	progress: 'bg-Blue_C_Default',
	complete: 'bg-Green_Lighten-1',
	error: 'bg-Red_Lighten-1',
};

const STATUS_TEXT_COLORS = {
	default: 'text-Grey_Lighten-1',
	progress: 'text-Blue_C_Default',
	complete: 'text-Green_Lighten-1',
	error: 'text-Red_Lighten-1',
};

const getStatusFromProgress = (progress: number, status?: Status): Status => {
	if (status === 'error') return 'error';
	if (progress === 0) return 'default';
	if (progress >= 100) return 'complete';
	return 'progress';
};

const SProgress = ({
	progress,
	status = 'progress',
	label,
	className,
	labelClassName,
}: SProgressProps) => {
	const test = getStatusFromProgress(progress, status);
	const barColor = STATUS_BG_COLORS[test];
	const textColor = progress > 50 ? 'text-white' : STATUS_TEXT_COLORS[test];

	return (
		<div
			className={[
				's-progress flex w-full flex-col items-center justify-center gap-8pxr',
				className,
			].join(' ')}
		>
			<div className='relative h-20pxr w-full rounded-4pxr  bg-Grey_Lighten-4 text-center'>
				<div
					className={[
						'h-full rounded-l-4pxr bg-Blue_C_Default transition-all duration-100',
						barColor,
						progress === 100 && 'rounded-r-4pxr',
					].join(' ')}
					style={{
						width: `${progress}%`,
					}}
				></div>
				<b className={['absolute left-1/2 top-0 h-20pxr', textColor].join(' ')}>
					{progress} %
				</b>
			</div>
			{label && (
				<span
					className={[
						'text-12pxr font-normal text-Grey_Darken-5',
						labelClassName,
					].join(' ')}
				>
					{label}
				</span>
			)}
		</div>
	);
};

export default SProgress;
