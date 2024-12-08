import { Dispatch, SetStateAction } from 'react';
import SCheckbox from '../SCheckbox';
import { SelectGroupOptionProps } from './SelectGruopCheckboxItems';

type Props = {
	value: SelectGroupOptionProps[];
	group: string;
	options: SelectGroupOptionProps[];
	setValue: Dispatch<SetStateAction<SelectGroupOptionProps[]>>;
	onChange: (arg: SelectGroupOptionProps) => void;
};
export default function SelectGroupOption({
	value,
	group,
	options,
	setValue,
	onChange,
}: Props) {
	const { other, children } = value.reduce(
		(acc, cur) => {
			if (options.includes(cur)) acc[0].children.push(cur);
			else acc[0].other.push(cur);
			return acc;
		},
		[
			{
				other: [] as SelectGroupOptionProps[],
				children: [] as SelectGroupOptionProps[],
			},
		]
	)[0];
	const isGroupChecked =
		children.length === options.length ? true : children.length ? null : false;

	function handleGroupClick(/* checked: Checked */) {
		if (isGroupChecked || isGroupChecked === null) setValue(other);
		else setValue([...other, ...options]);

		// if (checked) setValue([...other, ...options]);
		// else setValue(other);
	}

	return (
		<>
			<li
				className={[
					'group/select-dropdown-item flex w-full items-center gap-8pxr bg-Grey_Lighten-5 px-12pxr py-4pxr  text-Grey_Darken-4',
				].join(' ')}
			>
				<SCheckbox
					checked={
						children.length === options.length ? true : children.length ? null : false
					}
					label={group}
					labelClass='w-full'
					name={group}
					onChange={handleGroupClick}
				/>
			</li>
			{options.map((child) => (
				<li
					key={child.value}
					className={[
						'group/select-dropdown-item flex w-full items-center gap-8pxr px-16pxr py-4pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white aria-disabled:pointer-events-none aria-disabled:bg-white aria-disabled:text-Grey_Lighten-1',
					].join(' ')}
					aria-disabled={child.disabled}
				>
					<SCheckbox
						className={`${value.includes(child) && 'group-hover/select-dropdown-item:before:border-white'}`}
						checked={value.includes(child)}
						label={child.label}
						labelClass='w-full'
						name={child.label}
						onChange={() => onChange(child)}
					/>
				</li>
			))}
		</>
	);
}
