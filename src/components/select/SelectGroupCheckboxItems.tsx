import { Dispatch, SetStateAction } from 'react';
import SCheckbox from '../SCheckbox';
import { SelectOptionProps } from './SelectItems';
import { GroupProps } from '../SSelectGroupCheckbox';

export interface SelectGroupCheckboxItemsProps {
	options: GroupProps[];
	value: SelectOptionProps[];
	setValue: Dispatch<SetStateAction<SelectOptionProps[]>>;
}

const SelectGroupCheckboxItems = ({
	options = [],
	value,
	setValue,
}: SelectGroupCheckboxItemsProps) => {
	function handleClick(option: SelectOptionProps) {
		if (value.includes(option)) {
			setValue((prev) => prev.filter((item) => item !== option));
		} else {
			setValue((prev) => [...prev, option]);
		}
	}

	function handleGroupClick(group: GroupProps) {
		if (group.disabled) return;

		const isGroupSelected = group.options.every((option) =>
			value.includes(option)
		);

		if (isGroupSelected) {
			setValue((prev) => prev.filter((item) => !group.options.includes(item)));
		} else {
			setValue((prev) => [
				...prev,
				...group.options.filter((option) => !prev.includes(option)),
			]);
		}
	}

	return (
		<ul>
			{options.map((group) => (
				<li
					key={group.groupName}
					aria-disabled={group.disabled}
				>
					<div className='group-name flex w-full items-center items-center gap-8pxr bg-Grey_Lighten-5 px-12pxr py-4pxr font-bold aria-disabled:bg-white aria-disabled:text-Grey_Lighten-1'>
						{group.groupChecked ? (
							<SCheckbox
								label={group.groupName}
								checked={group.options.every((option) => value.includes(option))}
								onChange={() => handleGroupClick(group)}
								labelClass='w-full'
								disabled={group.disabled}
							/>
						) : (
							<span>{group.groupName}</span>
						)}
					</div>

					<ul className='group-options'>
						{group.options.map((option) => (
							<li
								key={option.value}
								className={[
									'group-options flex w-full items-center gap-8pxr px-12pxr py-4pxr pl-16pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white aria-disabled:pointer-events-none aria-disabled:bg-white aria-disabled:text-Grey_Lighten-1',
								].join(' ')}
								aria-disabled={group.disabled || option.disabled}
							>
								<SCheckbox
									label={option.label}
									checked={value.includes(option)}
									labelClass='w-full'
									onChange={() => handleClick(option)}
									aria-disabled={group.disabled || option.disabled}
								/>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
};

export default SelectGroupCheckboxItems;
