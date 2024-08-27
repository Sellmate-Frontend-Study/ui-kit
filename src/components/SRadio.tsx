import { ChangeEvent, InputHTMLAttributes, useEffect, useMemo, useState } from 'react';
import { Circle10 } from '../assets/CircleIcon';

export interface RadioProps {
	/**
	 * Radio disable
	 */
	disabled?: boolean;
	/**
	 * Radio className
	 */
	className?: string;
	/**
	 * Radio text
	 */
	label?: string;
	/**
	 * Radio value
	 */
	value?: string;
	/**
	 * Radio checked
	 */
	checked: boolean;
	/**
	 * Radio name
	 */
	name?: InputHTMLAttributes<HTMLInputElement>['name'];
	/**
	 * Click handler
	 */
	onChange?: (arg: boolean) => void;
}

const SRadio = ({ disabled, checked, label = '' }: RadioProps) => {
	const [isChecked, setIsChecked] = useState(checked);
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { target } = event;
		setIsChecked(target.checked);
	};

 useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

 const isCheckedInIcon = useMemo(() => isChecked !== false, [isChecked]);
 const iconClass = useMemo(
		() =>
			isCheckedInIcon && !disabled
				? 'text-Blue_C_Default'
				: isCheckedInIcon && disabled
					? 'text-Grey_Lighten-2'
					: !isCheckedInIcon
						? 'text-transparent'
						: '',
		[isCheckedInIcon, disabled]
	);
	return (
		<label
			className={[
				's-checkbox inline-flex items-center group',
				disabled ? 'cursor-not-allowed' : 'cursor-pointer',
			].join(' ')}
		>
			<input
				hidden
				type='radio'
				checked={isChecked}
				disabled={disabled}
				onChange={handleChange}
				className='hidden'
			/>
			<span
				className={[
					`relative mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-full
    before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:border
     aria-disabled:bg-Grey_Lighten-4 aria-disabled:before:border-Grey_Lighten-2`,
					isChecked
						? 'before:border-Blue_C_Default'
						: 'bg-white before:border-Grey_Default group-hover:before:border-Blue_C_Default',
				].join(' ')}
    aria-disabled={disabled}
			>
				<Circle10 className={iconClass} />
			</span>
			<span>{label}</span>
		</label>
	);
};

export default SRadio;
