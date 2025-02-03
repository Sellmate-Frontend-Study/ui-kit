import { icons } from '../../assets/icons';
import { Meridiem, TimeFormat } from './time';

interface TimeBoxProps {
	is24Hour: boolean;
	time: string;
	meridiem: Meridiem;
	TIME_FORMAT: TimeFormat;
	onTimeChange: (hours: number, minutes: number) => void;
	onMeridiemChange: (meridiem: Meridiem) => void;
}

const TimeBox = ({
	is24Hour,
	time,
	meridiem,
	TIME_FORMAT,
	onTimeChange,
	onMeridiemChange,
}: TimeBoxProps) => {
	const [hours, minutes] = time.split(':').map(Number);
	const displayHours = !is24Hour
		? hours % TIME_FORMAT.HOURS_12 || TIME_FORMAT.HOURS_12
		: hours;

	const ArrowUp = icons.ArrowUp[12];
	const ArrowDown = icons.ArrowDown[12];

	const renderMeridiemButton = (ampm: Meridiem) => (
		<button
			className={[
				'h-28pxr w-38pxr rounded-4pxr border border-Grey_Lighten-1 transition-all',
				meridiem === ampm && 'border-none bg-Blue_C_Default font-bold text-white',
			].join(' ')}
			onClick={() => onMeridiemChange(ampm)}
		>
			{ampm}
		</button>
	);

	const renderTimeButton = (
		value: number,
		onIncrease: () => void,
		onDecrease: () => void
	) => (
		<div className='flex flex-col items-center gap-8pxr'>
			<button
				className='text-Grey_Default hover:text-Grey_Darken-2'
				onClick={onIncrease}
			>
				<ArrowUp />
			</button>
			<input
				type='text'
				value={value.toString().padStart(2, '0')}
				className='h-28pxr w-38pxr rounded-4pxr border border-Grey_Lighten-1 text-center'
				readOnly
			/>
			<button
				className='text-Grey_Default hover:text-Grey_Darken-2'
				onClick={onDecrease}
			>
				<ArrowDown />
			</button>
		</div>
	);

	return (
		<div className='flex h-124pxr flex-row rounded-8pxr'>
			{!is24Hour && (
				<>
					<div className='flex flex-col justify-center gap-8pxr px-24pxr py-16pxr'>
						{renderMeridiemButton(TIME_FORMAT.AM)}
						{renderMeridiemButton(TIME_FORMAT.PM)}
					</div>
					<div className='h-full w-1pxr bg-Grey_Lighten-4' />
				</>
			)}
			<div className='flex flex-row items-center gap-8pxr px-24pxr py-16pxr'>
				{renderTimeButton(
					displayHours,
					() =>
						onTimeChange(
							(displayHours + 1) %
								(is24Hour ? TIME_FORMAT.HOURS_24 : TIME_FORMAT.HOURS_12),
							minutes
						),
					() =>
						onTimeChange(
							(displayHours -
								1 +
								(is24Hour ? TIME_FORMAT.HOURS_24 : TIME_FORMAT.HOURS_12)) %
								(is24Hour ? TIME_FORMAT.HOURS_24 : TIME_FORMAT.HOURS_12),
							minutes
						)
				)}
				<span>:</span>
				{renderTimeButton(
					minutes,
					() => onTimeChange(displayHours, (minutes + 1) % TIME_FORMAT.MINUTES_MAX),
					() =>
						onTimeChange(
							displayHours,
							(minutes - 1 + TIME_FORMAT.MINUTES_MAX) % TIME_FORMAT.MINUTES_MAX
						)
				)}
			</div>
		</div>
	);
};

export default TimeBox;
