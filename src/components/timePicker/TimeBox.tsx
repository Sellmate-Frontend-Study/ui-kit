import { icons } from '../../assets/icons';
import { Period, TimeFormat } from './types';

interface TimeBoxProps {
	is24Hour: boolean;
	time: string;
	period: Period;
	TIME_FORMAT: TimeFormat;
	onTimeChange: (hours: number, minutes: number) => void;
	onPeriodChange: (period: Period) => void;
}

const TimeBox = ({
	is24Hour,
	time,
	period,
	TIME_FORMAT,
	onTimeChange,
	onPeriodChange,
}: TimeBoxProps) => {
	const [hours, minutes] = time.split(':').map(Number);
	const displayHours = !is24Hour
		? hours % TIME_FORMAT.HOURS_12 || TIME_FORMAT.HOURS_12
		: hours;

	const ArrowUp = icons.ArrowUp[12];
	const ArrowDown = icons.ArrowDown[12];

	const renderPeriodButton = (buttonPeriod: Period) => (
		<button
			className={[
				'h-28pxr w-38pxr rounded-4pxr border border-Grey_Lighten-1 transition-all',
				period === buttonPeriod &&
					'border-none bg-Blue_C_Default font-bold text-white',
			].join(' ')}
			onClick={() => onPeriodChange(buttonPeriod)}
		>
			{buttonPeriod}
		</button>
	);

	return (
		<div className='flex h-124pxr flex-row rounded-8pxr'>
			{!is24Hour && (
				<>
					<div className='flex flex-col justify-center gap-8pxr px-24pxr py-16pxr'>
						{renderPeriodButton(TIME_FORMAT.AM)}
						{renderPeriodButton(TIME_FORMAT.PM)}
					</div>
					<div className='h-full w-1pxr bg-Grey_Lighten-4' />
				</>
			)}
			<div className='flex flex-row items-center gap-8pxr px-24pxr py-16pxr'>
				<div className='flex flex-col items-center gap-8pxr'>
					<button
						className='text-Grey_Default hover:text-Grey_Darken-2'
						onClick={() =>
							onTimeChange(
								(displayHours + 1) %
									(is24Hour ? TIME_FORMAT.HOURS_24 : TIME_FORMAT.HOURS_12),
								minutes
							)
						}
					>
						<ArrowUp />
					</button>
					<input
						type='text'
						value={displayHours.toString().padStart(2, '0')}
						className='h-28pxr w-38pxr rounded-4pxr border border-Grey_Lighten-1 text-center'
						readOnly
					/>
					<button
						className='text-Grey_Default hover:text-Grey_Darken-2'
						onClick={() =>
							onTimeChange(
								(displayHours -
									1 +
									(is24Hour ? TIME_FORMAT.HOURS_24 : TIME_FORMAT.HOURS_12)) %
									(is24Hour ? TIME_FORMAT.HOURS_24 : TIME_FORMAT.HOURS_12),
								minutes
							)
						}
					>
						<ArrowDown />
					</button>
				</div>
				<span>:</span>
				<div className='flex flex-col items-center gap-8pxr'>
					<button
						className='text-Grey_Default hover:text-Grey_Darken-2'
						onClick={() =>
							onTimeChange(displayHours, (minutes + 1) % TIME_FORMAT.MINUTES_MAX)
						}
					>
						<ArrowUp />
					</button>
					<input
						type='text'
						value={minutes.toString().padStart(2, '0')}
						className='h-28pxr w-38pxr rounded-4pxr border border-Grey_Lighten-1 text-center'
						readOnly
					/>
					<button
						className='text-Grey_Default hover:text-Grey_Darken-2'
						onClick={() =>
							onTimeChange(
								displayHours,
								(minutes - 1 + TIME_FORMAT.MINUTES_MAX) % TIME_FORMAT.MINUTES_MAX
							)
						}
					>
						<ArrowDown />
					</button>
				</div>
			</div>
		</div>
	);
};

export default TimeBox;
