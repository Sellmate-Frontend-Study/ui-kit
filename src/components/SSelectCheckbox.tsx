import { useEffect, useRef, useState } from 'react';
import { Dropdown12 } from '../assets/DropdownIcon';
import { SelectOptionProps } from './select/SelectOptions';
import SelectDropdownContainer from './select/SelectDropdownContainer';
import SelectCheckboxItems from './select/SelectCheckboxItems';

export interface SelectProps {
	defaultValue?: SelectOptionProps[];
	options: SelectOptionProps[];
	classname?: string;
	placeholder?: string;
	disabled?: boolean;
	useMultiple?: boolean;
	useCheck?: boolean;
	handleChange?: (item: SelectOptionProps[]) => void;
}

const SSelectCheckbox = ({
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

	useEffect(() => {
		if (handleChange) handleChange(value);
	}, [value, handleChange]);

	return (
		<>
			<button
				ref={selectRef}
				className={[
					`s-select relative inline-block cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap border border-Grey_Lighten-1 py-4pxr pl-12pxr pr-20pxr text-start hover:bg-Grey_Lighten-5 disabled:cursor-not-allowed disabled:border-Grey_Lighten-2 disabled:bg-Grey_Lighten-4 disabled:text-Grey_Default`,
					classname,
				].join(' ')}
				onClick={() => setIsDropdownOpen((previousStatus) => !previousStatus)}
				disabled={disabled}
			>
				{!value.length
					? placeholder
					: value.length === options.filter((option) => !option.disabled).length
						? '전체'
						: value.map((item) => item.value).join(', ')}
				<Dropdown12
					className={`absolute right-8pxr top-8pxr ${isDropdownOpen && 'rotate-180'}`}
					style={{ transition: 'transform 0.3s' }}
				/>
			</button>
			<SelectDropdownContainer
				parentRef={selectRef}
				isOpen={isDropdownOpen}
				setIsOpen={setIsDropdownOpen}
			>
				<SelectCheckboxItems
					options={options}
					value={value}
					setValue={setValue}
				/>
			</SelectDropdownContainer>
		</>
	);
};

export default SSelectCheckbox;
