import {
	type ChangeEvent,
	type Dispatch,
	type SetStateAction,
	useEffect,
	useId,
	useState,
} from 'react';
import { VisibilityOff16 } from '../assets/VisibilityOffIcon';
import { VisibilityOn16 } from '../assets/VisibilityOnIcon';

export interface InputProps {
	value: string;
	insideLabel?: string;
	label?: string;
	status?: 'error' | 'success' | 'focus' | 'normal';
	description?: string;
	placeholder?: string;
	disabled?: boolean;
	name?: string;
	readOnly?: boolean;
	setState?: Dispatch<SetStateAction<string>>;
	type?: 'text' | 'password';
	className?: string;
	inputClassName?: string;
 rules?: ((val: string) => boolean | string)[]
}

const SInput = ({
	value,
	label,
	insideLabel,
	description,
	setState,
	disabled,
	name,
	readOnly,
 rules,
	type = 'text',
	status = 'normal',
	placeholder = '',
	className = '',
	inputClassName = '',
}: InputProps) => {
	const id = useId();
	const [inputValue, setInputValue] = useState(value);
	const [inputStatus, setInputStatus] = useState(status);
	const [inputType, setInputType] = useState(type);
 const [hint, setHint] = useState(description || '')
	const statusClass = {
		error: 'shadow-0px_0px_4px_0px_[#E30000] border-Red_Default',
		success: 'shadow-0px_0px_4px_0px_[#05D358] border-Green_Lighten-2',
		focus: 'shadow-0px_0px_4px_0px_[#0071FF66] border-Blue_C_Default',
		normal: 'border-Grey_Lighten-1',
	};

 const hintStatusClass = {
  error: 'text-Red_Default',
		success: 'text-Green_Lighten-2',
		focus: 'text-Blue_C_Default',
		normal: 'text-Grey_Darken-5',
 }

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	useEffect(() => {
		setInputStatus(status);
	}, [status]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!setState || disabled) return;
  // if (rules === undefined) return;

  // rules.forEach((rule) => {   
  //  if (typeof rule === 'function') {
  //   console.log(rule(e.target.value))
  //   setInputStatus(rule(e.target.value) === false ? 'error' : inputStatus)
  //  } else if (typeof rule === 'string') {
  //   setHint(rule)
  //  }
  // })
		setState(e.target.value);
	};

	const handleFocus = () => {
		setInputStatus('focus');
	};

	const handleType = (val: 'off' | 'on') => {
		setInputType(val === 'off' ? 'text' : 'password');
	};

	return (
		<fieldset
			className={[
				's-input outline-none focus-visible:outline-none inline-flex flex-col',
				className,
			].join(' ')}
		>
			<div className='inline-flex items-center'>
				{label && <span className='mr-12pxr text-Grey_Darken-4'>{label}</span>}
				{insideLabel && (
					<label
						className={[
							'inline-flex h-28pxr items-center rounded-bl-2pxr rounded-tl-2pxr border border-r-0  px-12pxr text-Grey_Darken-4',
							disabled
								? 'border-Grey_Lighten-2 bg-Grey_Lighten-5'
								: 'border-Grey_Lighten-1 bg-Grey_Lighten-5',
						].join(' ')}
					>
						{insideLabel}
					</label>
				)}
    <label className={[
     'h-28pxr border py-4pxr inline-flex items-center',
     type === 'password' ? 'pl-12pxr pr-8pxr' : 'px-12pxr',
     insideLabel ? 'rounded-br-2pxr rounded-tr-2pxr' : 'rounded-2pxr',
     disabled
      ? 'border-Grey_Lighten-2 bg-Grey_Lighten-4 text-Grey_Default'
      : statusClass[inputStatus],
    ].join(' ')}>
				<input
					id={`s-input--${id}`}
					name={name}
					className={[
						'outline-none focus-visible:outline-none !bg-transparent',
						'text-Grey_Darken-4 placeholder:text-Grey_Lighten-1',
						inputClassName,
					].join(' ')}
					type={inputType}
					value={inputValue}
					disabled={disabled}
					readOnly={readOnly}
					placeholder={placeholder}
					onFocus={handleFocus}
					onChange={handleChange}
				/>
				{type === 'password' && (inputType === 'text' ? (
     <VisibilityOn16 onClick={() => handleType('on')} />
				) : (
					<VisibilityOff16 onClick={() => handleType('off')} />
				))}
    </label>
			</div>
			{hint && <span className={['mt-6pxr', hintStatusClass[status]].join(' ')}>{hint}</span>}
		</fieldset>
	);
};

export default SInput;
