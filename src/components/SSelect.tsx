import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Dropdown12 } from '../assets/DropdownIcon';
import { createPortal } from 'react-dom';
import SelectOptions, { SelectOptionProps } from './SelectOptions';

export interface SelectProps {
	defaultValue?: SelectOptionProps[];
	options: { label: string; value: string | number }[];
	classname?: string;
	placeholder?: string;
	disabled?: boolean;
	handleChange?: (item: SelectOptionProps[]) => void;
}

const SSelect = ({
	defaultValue,
	options,
	classname,
	placeholder = '선택',
	disabled = false,
	handleChange,
}: SelectProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [value, setValue] = useState<SelectOptionProps[]>(defaultValue || []);
	const selectRef = useRef<HTMLButtonElement>(null);
	const id = useId();

	const handleClickOutSide = useCallback((e: MouseEvent) => {
		if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
			setIsDropdownOpen(false);
		}
	}, []);

	useEffect(() => {
		if (isDropdownOpen) {
			document.addEventListener('mousedown', handleClickOutSide);
		} else {
			document.removeEventListener('mousedown', handleClickOutSide);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutSide);
		};
	}, [isDropdownOpen, handleClickOutSide]);

	const handleClick = (arg?: SelectOptionProps) => {
		setIsDropdownOpen(false);
		console.log(arg);

		if (arg) setValue([arg]);
		if (handleChange && arg) handleChange([arg]);
	};

	return (
		<>
			<button
				id={`s-select--${id}`}
				ref={selectRef}
				className={[
					`s-select relative inline-block cursor-pointer text-ellipsis border border-Grey_Lighten-1 py-4pxr pl-12pxr pr-20pxr text-start hover:bg-Grey_Lighten-5 disabled:cursor-not-allowed disabled:border-Grey_Lighten-2 disabled:bg-Grey_Lighten-4 disabled:text-Grey_Default`,
					classname,
				].join(' ')}
				onClick={() => setIsDropdownOpen((previousStatus) => !previousStatus)}
				disabled={disabled}
			>
				{!value.length ? placeholder : value.map((item) => item.label).join(', ')}
				<Dropdown12
					className={`absolute right-8pxr top-8pxr ${isDropdownOpen && 'rotate-180'}`}
					style={{ transition: 'transform 0.3s' }}
				/>
			</button>
			{isDropdownOpen &&
				createPortal(
					<SelectOptions
						isOpen={isDropdownOpen}
						parentId={id}
						options={options}
						onClick={handleClick}
					/>,
					document.body
				)}
		</>
	);
};

export default SSelect;
