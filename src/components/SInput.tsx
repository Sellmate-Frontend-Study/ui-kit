import {
	Dispatch,
	FormEvent,
	HTMLInputTypeAttribute,
	SetStateAction,
	useState,
} from 'react';
import Close_Eye_Icon from '../assets/Close_Eye_Icon.svg';
import Eye_Icon from '../assets/Eye_Icon.svg';

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
	hintText?: string;
	hintState?: 'default' | 'error';
	hintClass?: string | string[];
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
	hintText,
	hintState = 'default',
	hintClass,
}: InputProps) => {
	const passwordType = type === 'password' ? true : null;
	const [hidePassword, setHidePassword] = useState<boolean | null>(passwordType);

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

	const hintStyle =
		hintClass && typeof hintClass === 'object'
			? (hintClass as string[]).join(' ')
			: hintClass;

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
				inputClass,
				labelType === 'addon' && label
					? 'rounded-l-0 rounded-r-2pxr'
					: 'rounded-2pxr',
			].join(' ')}
			disabled={disabled}
			placeholder={placeholder}
		/>
	);

	const passwordInput = (
		<>
			<input
				type={hidePassword ? 'password' : 'text'}
				value={textState}
				onInput={handleChange}
				className={[
					basicStyle,
					stateStyle,
					inputClass,
					labelType === 'addon' && label
						? 'rounded-l-0 rounded-r-2pxr'
						: 'rounded-2pxr',
					'pr-34pxr',
				].join(' ')}
				disabled={disabled}
				placeholder={placeholder}
			/>
			<button
				className='absolute right-8pxr top-6pxr'
				onClick={() => setHidePassword(!hidePassword)}
			>
				<img
					src={hidePassword ? Eye_Icon : Close_Eye_Icon}
					width={16}
					height={16}
					alt='password input icon'
				/>
			</button>
		</>
	);

	return (
		<div className='relative flex items-start'>
			{label && (
				<div className={['py-4pxr leading-20pxr', labelStyle].join(' ')}>
					{label}
				</div>
			)}
			<div className='w-fit-content flex flex-col'>
				{hidePassword === null ? input : passwordInput}
				{hintText && (
					<div
						className={[
							'mt-8pxr w-full leading-12pxr',
							hintStyle,
							hintState === 'default' ? 'text-primary' : 'text-Red_Lighten-1',
						].join(' ')}
					>
						{hintText}
					</div>
				)}
			</div>
		</div>
	);
};

export default SInput;
