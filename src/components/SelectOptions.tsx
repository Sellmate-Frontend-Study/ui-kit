import { useEffect, useState, forwardRef } from 'react';
import SCheckbox from './SCheckbox';

const initParentDOMRect = {
	height: 0,
	width: 0,
	x: 0,
	y: 0,
	bottom: 0,
	left: 0,
	top: 0,
};

export interface OptionProps {
	label: string;
	value: number | string;
}

export interface SelectOptionsProps {
	parentId: string;
	options: OptionProps[];
	value: OptionProps[];
	isAllSelected: boolean;
	onOptionChange: (selectedOption: OptionProps) => void;
	selectOptionsRef: React.RefObject<HTMLUListElement>;
}

const SelectOptions = forwardRef(
	({
		parentId,
		options,
		value,
		isAllSelected,
		onOptionChange,
		selectOptionsRef,
	}: SelectOptionsProps) => {
		const [position, setPosition] =
			useState<Omit<DOMRect, 'toJSON' | 'right'>>(initParentDOMRect);
		const SCheckBoxSelectOptionsClasses =
			's-checkbox-select__options absolute rounded bg-white shadow-lg';
		const SCheckBoxSelectOptionClasses =
			'flex items-center gap-2 px-4 py-2 hover:bg-Grey_Lighten-5';

		const checkedOption = (option: OptionProps) => {
			if (option.value === options[0].value) {
				return isAllSelected;
			}
			return value.some((item) => item.value === option.value);
		};

		useEffect(() => {
			const parent = document.getElementById(`s-select--${parentId}`) || null;

			if (parent) setPosition(parent.getBoundingClientRect());
		}, [parentId]);

		return (
			<ul
				id={`s-select__options--${parentId}`}
				ref={selectOptionsRef}
				className={SCheckBoxSelectOptionsClasses}
				style={{
					top: position.top + position.height + 4 + window.scrollY,
					left: position.left + window.scrollX,
					width: position.width,
				}}
			>
				{options.map((option) => (
					<li
						key={option.value}
						className={SCheckBoxSelectOptionClasses}
					>
						<SCheckbox
							label={option.label}
							value={String(option.value)}
							checked={checkedOption(option)}
							onChange={() => onOptionChange(option)}
						/>
					</li>
				))}
			</ul>
		);
	}
);

export default SelectOptions;
