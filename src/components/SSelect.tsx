import { useEffect, useRef, useState } from 'react';
import { Dropdown12 } from '../assets/DropdownIcon';
import SelectDropdownContainer from './select/SelectDropdownContainer';
import SelectItems from './select/SelectItems';
import SelectGroupCheckboxItems from './select/SelectGroupCheckboxItems';
import SelectCheckboxItems from './select/SelectCheckboxItems';

export interface SelectOptionProps {
	label: string;
	value: number | string;
	disabled?: boolean;
}

export interface GroupProps {
	groupName: string;
	disabled?: boolean;
	groupChecked?: boolean;
	options: SelectOptionProps[];
}

export interface SelectProps {
	defaultValue?: SelectOptionProps[];
	options: SelectOptionProps[] | GroupProps[];
	classname?: string;
	placeholder?: string;
	disabled?: boolean;
	useMultiple?: boolean; //select 일때만
	checkbox?: boolean;
	groupCheckbox?: boolean;
	handleChange?: (item: SelectOptionProps[]) => void;
}

const SSelect = ({
	defaultValue,
	options,
	classname,
	placeholder = '선택',
	disabled = false,
	useMultiple = false,
	checkbox = false,
	groupCheckbox = false,
	handleChange,
}: SelectProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [value, setValue] = useState<SelectOptionProps[]>(defaultValue || []);
	const selectRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (handleChange) handleChange(value);
	}, [value, handleChange]);

	const getSelectLabel = () => {
		if (!value.length) {
			return placeholder;
		}

		const allOptions = groupCheckbox
			? (options as GroupProps[])
					.flatMap((group) => group.options)
					.filter((option) => !option.disabled)
			: options.filter((option) => !option.disabled);

		const isSelectedAllOptions = allOptions.every((option) =>
			value.includes(option as SelectOptionProps)
		);

		if (isSelectedAllOptions) {
			return '전체';
		}

		if (groupCheckbox) {
			return (
				(options as GroupProps[])
					.map((group) => {
						if (group.disabled) return null;

						const selectedOptions = group.options.filter(
							(option) => !option.disabled && value.includes(option)
						);

						if (selectedOptions.length === group.options.length) {
							return group.groupName;
						} else if (selectedOptions.length > 0) {
							return selectedOptions.map((option) => option.label).join(', ');
						}

						return null;
					})
					.filter(Boolean)
					.join(', ') || placeholder
			);
		}

		return value.map((item) => item.label).join(', ');
	};

	const getDropDownItems = () => {
		if (groupCheckbox) {
			return (
				<SelectGroupCheckboxItems
					options={options as GroupProps[]}
					value={value}
					setValue={setValue}
				/>
			);
		}

		if (checkbox) {
			return (
				<SelectCheckboxItems
					options={options as SelectOptionProps[]}
					value={value}
					setValue={setValue}
				/>
			);
		}

		return (
			<SelectItems
				options={options as SelectOptionProps[]}
				useMultiple={useMultiple}
				value={value}
				setValue={setValue}
				setIsDropdownOpen={setIsDropdownOpen}
			/>
		);
	};

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
				<Dropdown12
					className={`absolute right-8pxr top-8pxr ${isDropdownOpen && 'rotate-180'}`}
					style={{ transition: 'transform 0.3s' }}
				/>
				{getSelectLabel()}
			</button>

			<SelectDropdownContainer
				parentRef={selectRef}
				isOpen={isDropdownOpen}
				setIsOpen={setIsDropdownOpen}
			>
				{getDropDownItems()}
			</SelectDropdownContainer>
		</>
	);
};

export default SSelect;
