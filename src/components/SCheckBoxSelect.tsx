import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Dropdown12 } from '../assets/DropdownIcon';
import { createPortal } from 'react-dom';
import SelectOptions, { OptionProps } from './SelectOptions';

export interface SCheckBoxSelectProps {
	options: { label: string; value: string | number }[];
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	handleChange?: (items: OptionProps[]) => void;
}

const SCheckBoxSelect = ({
	options,
	className,
	placeholder = '선택',
	disabled = false,
	handleChange,
}: SCheckBoxSelectProps) => {
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [value, setValue] = useState<OptionProps[]>([]);
	const selectRef = useRef<HTMLButtonElement>(null);
	const selectOptionsRef = useRef<HTMLUListElement>(null);
	const isAll = { label: '전체', value: 'all' };
	const id = useId();

	const handleClickOutside = useCallback((e: MouseEvent) => {
		if (
			selectRef.current &&
			!selectRef.current.contains(e.target as Node) &&
			selectOptionsRef.current &&
			!selectOptionsRef.current.contains(e.target as Node)
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

	const handleCheckBoxOptionChange = (selectedOption: OptionProps) => {
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

	const getSelectLabel = () => {
		if (isAllSelected) return isAll.label;
		if (value.length === 0) return placeholder;
		return value.map((item) => item.label).join(', ');
	};

	const isAllSelected = value.length === options.length && options.length > 0;
	const SCheckBoxSelectClasses = `s-checkbox-select relative inline-block cursor-pointer overflow-hidden text-ellipsis text-ellipsis whitespace-nowrap border border-Grey_Lighten-1 py-4pxr pl-12pxr pr-20pxr text-start hover:bg-Grey_Lighten-5 disabled:cursor-not-allowed disabled:border-Grey_Lighten-2 disabled:bg-Grey_Lighten-4 disabled:text-Grey_Default`;
	const DropdownIconClasses = `absolute right-8pxr top-8pxr ${isSelectOpen && 'rotate-180'}`;

	return (
		<>
			<button
				id={`s-select--${id}`}
				ref={selectRef}
				className={[SCheckBoxSelectClasses, className].join(' ')}
				onClick={() => setIsSelectOpen(!isSelectOpen)}
				disabled={disabled}
			>
				{getSelectLabel()}
				<Dropdown12 className={DropdownIconClasses} />
			</button>
			{isSelectOpen &&
				createPortal(
					<SelectOptions
						parentId={id}
						options={[isAll, ...options]}
						value={value}
						isAllSelected={isAllSelected}
						onCheckboxOptionChange={handleCheckBoxOptionChange}
						selectOptionsRef={selectOptionsRef}
					/>,
					document.body
				)}
		</>
	);
};

export default SCheckBoxSelect;
