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
	onCheckboxChange: (arg: OptionProps) => void;
	dropdownRef: React.RefObject<HTMLUListElement>;
}

const SelectOptions = forwardRef<HTMLUListElement, SelectOptionsProps>(
	({
		parentId,
		options,
		value,
		isAllSelected,
		onCheckboxChange,
		dropdownRef,
	}) => {
		const [position, setPosition] =
			useState<Omit<DOMRect, 'toJSON' | 'right'>>(initParentDOMRect);

		useEffect(() => {
			const parent = document.getElementById(`s-select--${parentId}`) || null;

			if (parent) setPosition(parent.getBoundingClientRect());
		}, [parentId]);

		return (
			<ul
				id={`s-select__options--${parentId}`}
				ref={dropdownRef}
				className='s-select__options absolute z-10 rounded bg-white shadow-lg'
				style={{
					top: position.top + position.height + 4 + window.scrollY,
					left: position.left + window.scrollX,
					width: position.width,
					transition: 'opacity 0.4s',
				}}
			>
				{options.map((option) => (
					<li
						key={option.value}
						className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100'
					>
						<SCheckbox
							label={option.label}
							value={String(option.value)}
							checked={
								option.value === 'all'
									? isAllSelected
									: value.some((item) => item.value === option.value)
							}
							onChange={() => onCheckboxChange(option)}
						/>
					</li>
				))}
			</ul>
		);
	}
);

SelectOptions.displayName = 'SelectOptions';

export default SelectOptions;
