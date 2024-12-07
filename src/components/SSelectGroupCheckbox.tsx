import { useEffect, useRef, useState } from 'react';
import { Dropdown12 } from '../assets/DropdownIcon';
import { SelectOptionProps } from './select/SelectOptions';
import SelectDropdownContainer from './select/SelectDropdownContainer';
import SelectGroupCheckboxItems from './select/SelectGroupCheckboxItems';

export interface SelectGroupProps {
	defaultValue?: SelectOptionProps[];
	options: {
		groupName: string;
		options: SelectOptionProps[];
	}[];
	classname?: string;
	placeholder?: string;
	disabled?: boolean;
	handleChange?: (item: SelectOptionProps[]) => void;
}

const SSelectGroupCheckbox = ({
	defaultValue,
	options,
	classname,
	placeholder = '선택',
	disabled = false,
	handleChange,
}: SelectGroupProps) => {
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
				onClick={() => setIsDropdownOpen((prev) => !prev)}
				disabled={disabled}
			>
				{/* group이 다 선택 -> 전체 선택
        group이 하나라도 선택 -> 옵션이 다 선택된 그룹은 그룹명, 아닌 그룹은 옵션명
        group이 다 선택된게 하나도 없다? -> 옵션 이름 */}
				{!value.length ? placeholder : value.map((item) => item.label).join(', ')}
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
				<SelectGroupCheckboxItems
					options={options}
					value={value}
					setValue={setValue}
				/>
			</SelectDropdownContainer>
		</>
	);
};

export default SSelectGroupCheckbox;
