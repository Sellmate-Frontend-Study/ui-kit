import { useState, useEffect } from 'react';

export interface RadioProps {
	label: string;
	name: string;
	disabled?: boolean;
	model: string | number;
	value: string | number;
	className?: string;
	onChange?: (model: string | number) => void;
}

const SRadio = ({
	label,
	name,
	disabled = false,
	model,
	value,
	className = '',
	onChange,
}: RadioProps) => {
	const [internalChecked, setInternalChecked] = useState<string | number>(model);

	useEffect(() => {
		setInternalChecked(model);
	}, [model]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (disabled) return;
		const targetValue = e.target.value;
		onChange?.(targetValue);
	};

	const sRadioClass = `s-radio flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`;

	const inputClass =
		'box-border mr-8 relative w-16 h-16 appearance-none rounded-full border border-Grey_Default transition-all checked:before:border-2 before:content[""] before:absolute before:block before:w-full before:h-full before:rounded-full before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4';

	const disabledClass = disabled
		? 'border-Grey_Lighten-2 bg-Grey_Lighten-4 cursor-not-allowed checked:before:!bg-Grey_Lighten-2 checked:before:border-Grey_Lighten-4'
		: 'border-Grey_Default cursor-pointer hover:border-positive checked:border-positive checked:before:!bg-positive checked:before:border-white';

	return (
		<label
			htmlFor={label}
			className={[sRadioClass, className].join(' ')}
		>
			<input
				type='radio'
				id={label}
				name={name}
				value={value}
				disabled={disabled}
				checked={internalChecked === value}
				onChange={handleChange}
				className={[inputClass, disabledClass].join(' ')}
			/>
			<span>{label}</span>
		</label>
	);
};
export default SRadio;
