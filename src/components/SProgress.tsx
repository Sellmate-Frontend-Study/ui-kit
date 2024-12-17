import { useEffect, useState } from 'react';
import colors from '../css/colors';

export interface Props {
	type: 'bar' | 'circle';
	percent: number;
	loading?: string;
	progressLabel?: string;
	size?: number;
	strokeWidth?: number;
	trackColor?: string;
	progressColor?: string;
}

const SProgress = ({
	type = 'circle',
	percent,
	loading,
	progressLabel,
	size = 80,
	strokeWidth = 12,
	trackColor = 'Grey_Lighten-4',
	progressColor = 'Blue_C_Default',
}: Props) => {
	const [progress, setProgress] = useState(0);
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference * (1 - progress / 100);

	const circleProps = {
		cx: size / 2,
		cy: size / 2,
		r: radius,
		strokeWidth,
		fill: 'none',
	};

	const barTextProps: React.CSSProperties = {
		width: '100%',
		textAlign: 'center',
		fontSize: '12px',
		fontWeight: 'bold',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	};

	useEffect(() => {
		let startTime: number | null = null;
		const duration = 2000;
		const step = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const easeOutProgress = Math.min(1, 1 - Math.pow(1 - elapsed / duration, 2));
			const currentProgress = Math.round(easeOutProgress * percent);
			setProgress(currentProgress);
			if (elapsed < duration) {
				requestAnimationFrame(step);
			} else {
				setProgress(percent);
			}
		};
		requestAnimationFrame(step);
	}, [percent]);

	return (
		<div style={{ width: `${size}px` }}>
			{type === 'bar' ? (
				<>
					<div
						className={`relative h-20pxr w-full overflow-hidden rounded-4pxr`}
						style={{
							backgroundColor: `${(colors as Record<string, string>)[trackColor]}`,
						}}
					>
						<div
							style={{
								color: `${(colors as Record<string, string>)[progressColor]}`,
								backgroundColor: `${(colors as Record<string, string>)[trackColor]}`,
								zIndex: 1,
								clipPath: `inset(0 0 0 ${progress}%)`,
								...barTextProps,
							}}
						>
							{progress}%
						</div>
						<div
							style={{
								color: `white`,
								backgroundColor: `${(colors as Record<string, string>)[progressColor]}`,
								zIndex: 1,
								clipPath: `inset(0 ${100 - progress}% 0 0)`,
								...barTextProps,
							}}
						>
							{progress}%
						</div>
					</div>
					{progressLabel && (
						<div className='mt-16pxr text-center text-12pxr leading-20pxr text-Grey_Darken-5 '>
							{progressLabel}
						</div>
					)}
				</>
			) : (
				<>
					<svg
						width={size}
						height={size}
						className='mb-8pxr'
					>
						<circle
							className='track-circle'
							{...circleProps}
							stroke={(colors as Record<string, string>)[trackColor]}
						/>
						<circle
							className='progress-circle'
							stroke={(colors as Record<string, string>)[progressColor]}
							strokeDasharray={circumference}
							strokeDashoffset={strokeDashoffset}
							strokeLinecap='round'
							transform={`rotate(-90 ${size / 2} ${size / 2})`}
							{...circleProps}
						/>
					</svg>
					{loading ? (
						<div className='text-center'>{loading}</div>
					) : (
						<>
							<div className='text-center text-16pxr font-bold leading-26pxr text-Blue_C_Default'>
								{progress}%
							</div>
							{progressLabel && (
								<div className='mt-4pxr text-center text-12pxr leading-20pxr text-Grey_Darken-5'>
									{progressLabel}
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};

export default SProgress;
