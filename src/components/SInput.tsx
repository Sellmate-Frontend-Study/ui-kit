import {
	Dispatch,
	FormEvent,
	HTMLInputTypeAttribute,
	SetStateAction,
} from 'react';

export interface InputProps {
	type: HTMLInputTypeAttribute;
	textState: string;
	setTextState: Dispatch<SetStateAction<string>>;
	state?: 'active' | 'pass' | 'error';
	disabled?: boolean;
	inputClass?: string;
	label?: string;
	labelType?: 'basic' | 'addon';
	placeholder?: string;
}

const SInput = ({
	type = 'text',
	placeholder = 'placeholder',
	state = 'active',
	textState,
	setTextState,
	disabled,
	inputClass,
	label,
	labelType = 'basic',
}: InputProps) => {
	const basicStyle =
		'text-12pxr leading-20pxr py-4pxr px-12pxr border placeholder:text-Grey_Lighten-1 focus:outline-none focus:shadow-[0px_0px_4px_0px_#0071FF66] focus:border-Blue_C_Default disabled:border-Grey_Lighten-2 disabled:bg-Grey_Lighten-4 disabled:text-Grey_Default';
	const stateStyle =
		state === 'pass'
			? 'border-Green_Lighten-2'
			: state === 'error'
				? 'border-Red_Default'
				: 'border-Grey_Lighten-1';
	const labelStyle =
		labelType === 'basic'
			? 'mr-12pxr'
			: `px-12pxr border  border-r-0 rounded-l-2pxr ${disabled ? 'border-Grey_Lighten-2' : 'border-Grey_Lighten-1'}`;

	function handleChange(changeEvent: FormEvent<HTMLInputElement>) {
		setTextState(changeEvent.currentTarget.value);
	}

	const input = (
		<input
			type={type}
			value={textState}
			onInput={handleChange}
			className={[
				basicStyle,
				stateStyle,
				inputClass && inputClass,
				labelType === 'addon' && label
					? 'rounded-l-0 rounded-r-2pxr'
					: 'rounded-2pxr',
			].join(' ')}
			disabled={disabled}
			placeholder={placeholder && placeholder}
		/>
	);

	return (
		<div className='flex'>
			{label && (
				<div className={['py-4pxr leading-20pxr', labelStyle].join(' ')}>
					{label}
				</div>
			)}
			{input}
		</div>
	);
};

export default SInput;
