// import { useState } from 'react';
import { ArrowDown12 } from '../../assets/ArrowDownIcon';

interface TimeControllerProps {
	value: string;
	limit: number;
	NotAllowZero?: boolean;
	onChange: (changeValue: string, isPluse?: boolean, round?: boolean) => void;
}

const TimeController = ({
	value,
	limit,
	NotAllowZero = false,
	onChange,
}: TimeControllerProps) => {
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		let newValue = `${Number(event.target.value)}`;

		if (isNaN(Number(newValue))) {
			newValue = newValue.slice(0, -1);
		}

		if ((newValue !== '' && Number(newValue) > limit) || newValue.length > 2) {
			newValue = limit.toString();
		}

		if (NotAllowZero && Number(newValue) === 0) {
			newValue = '01';
		}

		onChange(newValue);
	}

	function handlePlus() {
		const isPlus = true;
		const plusTime = Number(value) + 1;
		const isOverLimit = plusTime > limit;
		const finallValue = !isOverLimit
			? `${plusTime}`.padStart(2, '0')
			: NotAllowZero
				? '01'
				: '00';

		onChange(`${finallValue}`, isPlus, isOverLimit);
	}

	function handleMinus() {
		const isPlus = false;
		const minusTime = Number(value) - 1;
		const rowLimit = NotAllowZero ? 1 : 0;
		const isLessRowLimit = minusTime < rowLimit;
		const finallValue = isLessRowLimit
			? `${limit}`
			: `${minusTime}`.padStart(2, '0');

		onChange(`${finallValue}`, isPlus, isLessRowLimit);
	}

	return (
		<div className='flex flex-col items-center justify-center gap-12pxr'>
			<button onClick={handlePlus}>
				<ArrowDown12 className='rotate-180 text-Grey_Lighten-2' />
			</button>
			<input
				className='w-38pxr rounded-4pxr border border-Grey_Lighten-1 px-8pxr py-4pxr text-center focus-within:shadow-input hover:border-positive hover:shadow-input focus:border-positive focus:outline-none'
				value={value}
				onInput={handleChange}
				onBlur={() => {
					if (value.length < 2) onChange(value.padStart(2, '0'));
				}}
				inputMode='numeric'
			/>
			<button onClick={handleMinus}>
				<ArrowDown12 className='text-Grey_Lighten-2' />
			</button>
		</div>
	);
};

export default TimeController;
