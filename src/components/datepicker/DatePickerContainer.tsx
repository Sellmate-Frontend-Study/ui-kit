import { createPortal } from 'react-dom';
import React, { ReactNode } from 'react';

interface DatePickerContainerProps {
	position: { top: number; left: number } | null;
	calendarRef: React.RefObject<HTMLDivElement>;
	isOpen: boolean;
	children: ReactNode;
}

const DatePickerContainer = ({
	position,
	calendarRef,
	isOpen,
	children,
}: DatePickerContainerProps) => {
	if (!isOpen || !position) return null;

	return createPortal(
		<div
			ref={calendarRef}
			style={{
				position: 'absolute',
				top: position.top,
				left: position.left,
				zIndex: 10000,
			}}
			className='rounded-8pxr border bg-white'
		>
			{children}
		</div>,
		document.body
	);
};

export default DatePickerContainer;
