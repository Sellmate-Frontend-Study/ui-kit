import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Dropdown12 } from '../assets/DropdownIcon';
import { createPortal } from 'react-dom';
import SelectOptions, { OptionProps } from './SelectOptions';

export interface SelectProps {
	options: { label: string; value: string | number }[];
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	handleChange?: (items: OptionProps[]) => void;
}

const SSelect = ({
	options,
	className,
	placeholder = '선택',
	disabled = false,
	handleChange,
}: SelectProps) => {
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [value, setValue] = useState<OptionProps[]>([]);
	const selectRef = useRef<HTMLButtonElement>(null);
	const dropdownRef = useRef<HTMLUListElement>(null);
	const id = useId();

	const handleClickOutside = useCallback((e: MouseEvent) => {
		if (
			selectRef.current &&
			!selectRef.current.contains(e.target as Node) &&
			dropdownRef.current &&
			!dropdownRef.current.contains(e.target as Node)
		) {
			setIsSelectOpen(false);
		}
	}, []);

	useEffect(() => {
		if (isSelectOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSelectOpen, handleClickOutside]);

	const handleCheckboxChange = (selectedOption: OptionProps) => {
		if (selectedOption.value === 'all') {
			const isAllSelected = value.length === options.length;
			const updatedValue = isAllSelected ? [] : [...options];
			setValue(updatedValue);
			handleChange?.(updatedValue);
		} else {
			const isSelected = value.some((item) => item.value === selectedOption.value);
			const updatedValue = isSelected
				? value.filter((item) => item.value !== selectedOption.value)
				: [...value, selectedOption];
			setValue(updatedValue);
			handleChange?.(updatedValue);
		}
	};

	const isAllSelected = value.length === options.length && options.length > 0;

	return (
		<>
			<button
				id={`s-select--${id}`}
				ref={selectRef}
				className={[
					`s-select relative inline-block cursor-pointer text-ellipsis border border-Grey_Lighten-1 py-4pxr pl-12pxr pr-20pxr text-start hover:bg-Grey_Lighten-5 disabled:cursor-not-allowed disabled:border-Grey_Lighten-2 disabled:bg-Grey_Lighten-4 disabled:text-Grey_Default`,
					className,
				].join(' ')}
				onClick={() => setIsSelectOpen(!isSelectOpen)}
				disabled={disabled}
			>
				{value.length === 0
					? placeholder
					: value.map((item) => item.label).join(', ')}
				<Dropdown12
					className={`absolute right-8pxr top-8pxr ${isSelectOpen && 'rotate-180'}`}
					style={{ transition: 'transform 0.3s' }}
				/>
			</button>
			{isSelectOpen &&
				createPortal(
					<SelectOptions
						parentId={id}
						options={[{ label: '전체', value: 'all' }, ...options]}
						value={value}
						isAllSelected={isAllSelected}
						onCheckboxChange={handleCheckboxChange}
						dropdownRef={dropdownRef}
					/>,
					document.body
				)}
		</>
	);
};

export default SSelect;
