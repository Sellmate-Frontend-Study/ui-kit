import { useEffect, useState } from 'react';

type Value = boolean;

interface ToggleProps {
	type: 'switch' | 'button';
	value: Value;
	onChange: (arg: Value) => void;
	label?: string;
	labelClass?: string;
	disabled?: boolean;
}

const SToggle = ({ type, value, onChange, label, disabled }: ToggleProps) => {
	const [isToggled, setIsToggled] = useState<Value>(false);

	useEffect(() => {
		setIsToggled(value);
	}, [value]);

	const handleToggle = () => {
		onChange(!isToggled);
	};

	const switchColor = isToggled
		? !disabled
			? 'bg-Blue_C_Default'
			: 'bg-Blue_C_Lighten-4'
		: !disabled
			? 'bg-Grey_Lighten-2'
			: 'bg-Grey_Lighten-4';

	const buttonColor = !disabled
		? isToggled
			? 'border-Blue_C_Default text-Blue_C_Default'
			: 'border-Grey_Default text-Grey_Darken-1'
		: 'border-Grey_Lighten-2 text-Grey_Default bg-Grey_Lighten-4';

	return (
		<div className='flex items-center'>
			{type === 'switch' ? (
				<>
					<span className='mr-16pxr'>{label}</span>
					<div
						className={[
							'relative flex h-20pxr w-36pxr cursor-pointer items-center rounded-full p-2pxr transition-colors duration-300 ease-in-out',
							disabled && 'pointer-events-none',
							switchColor,
						].join(' ')}
						onClick={handleToggle}
					>
						<span
							className={[
								'h-16pxr w-16pxr transform rounded-full bg-white shadow-md duration-300 ease-in-out',
								isToggled ? 'translate-x-16pxr' : 'translate-x-0',
							].join(' ')}
						></span>
					</div>
				</>
			) : (
				<>
					<div
						className={[
							'h-28pxr rounded-14pxr border px-12pxr py-4pxr',
							disabled && 'pointer-events-none',
							buttonColor,
						].join(' ')}
						onClick={handleToggle}
					>
						{label}
					</div>
				</>
			)}
		</div>
	);
};

export default SToggle;
