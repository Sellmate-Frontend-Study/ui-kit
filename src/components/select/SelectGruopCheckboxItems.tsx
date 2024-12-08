import { Dispatch, SetStateAction } from 'react';
import SCheckbox from '../SCheckbox';
import SelectGroupOption from './SelectGroupOption';

export interface SelectGroupOptionProps {
	label: string;
	value: number | string;
	disabled?: boolean;
	group?: string;
}

export interface SelectCheckboxItemsProps {
	options: SelectGroupOptionProps[];
	value: SelectGroupOptionProps[];
	setValue: Dispatch<SetStateAction<SelectGroupOptionProps[]>>;
}

const SelectGroupCheckboxItems = ({
	options = [],
	value,
	setValue,
}: SelectCheckboxItemsProps) => {
	function handleClick(arg: SelectGroupOptionProps) {
		const isExist = value.includes(arg);

		if (isExist) setValue((prev) => prev.filter((item) => item !== arg));
		else setValue((prev) => [...prev, arg]);
	}

	function toggleTotal() {
		if (value.length === 0)
			setValue(options.filter((option) => !option.disabled));
		else setValue([]);
	}

	const groupedOption = Object.groupBy(options, ({ group }) => group || '');

	return (
		<>
			<li
				className={[
					'group/select-dropdown-item flex w-full items-center gap-8pxr px-12pxr py-4pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white',
				].join(' ')}
			>
				<SCheckbox
					className={`${value.length === options.length && 'group-hover/select-dropdown-item:before:border-white'}`}
					label='전체'
					labelClass='w-full'
					checked={
						!value.length
							? false
							: value.length === options.filter((option) => !option.disabled).length
								? true
								: null
					}
					onChange={toggleTotal}
				/>
			</li>
			{Object.entries(groupedOption).map(([group, items]) => (
				<SelectGroupOption
					key={group}
					value={value}
					group={group}
					options={items!}
					setValue={setValue}
					onChange={handleClick}
				/>
			))}
		</>
	);
};
export default SelectGroupCheckboxItems;
