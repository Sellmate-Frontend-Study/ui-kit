import { useEffect, useState } from 'react';

const initParentDOMRect = {
	height: 0,
	width: 0,
	x: 0,
	y: 0,
	bottom: 0,
	left: 0,
	top: 0,
};

export interface SelectOptionProps {
	label: string;
	value: number | string;
}

export interface SelectOptionsProps {
	isOpen: boolean;
	parentId: string;
	options: SelectOptionProps[];
	onClick: (arg: SelectOptionProps) => void;
}

const SelectOptions = ({
	isOpen,
	parentId = '',
	options = [],
	onClick,
}: SelectOptionsProps) => {
	const [position, setPosition] =
		useState<Omit<DOMRect, 'toJSON' | 'right'>>(initParentDOMRect);

	useEffect(() => {
		const parent = document.getElementById(`s-select--${parentId}`) || null;

		if (parent) setPosition(parent.getBoundingClientRect());
	}, [parentId]);

	return (
		<ul
			id={`s-select__options--${parentId}`}
			className={[
				's-select__options rounded-2pxr bg-white  shadow-dropdownOptions',
				isOpen ? 'opacity-1' : 'opacity-0',
			].join(' ')}
			style={{
				position: 'absolute',
				top: position.top + position.height + 4 + window.scrollY,
				left: position.left + window.scrollX,
				width: position.width,
				transition: 'opacity 0.4s',
			}}
		>
			{options.map((option) => (
				<li
					key={option.value}
					className={[
						'px-12pxr py-4pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white aria-disabled:bg-white aria-disabled:text-Grey_Lighten-1',
					].join(' ')}
					onMouseDown={() => onClick(option)}
				>
					{typeof option.label === 'string' ? (
						<div>{option.label}</div>
					) : (
						<div dangerouslySetInnerHTML={{ __html: option.label }}></div>
					)}
				</li>
			))}
		</ul>
	);
};
export default SelectOptions;
