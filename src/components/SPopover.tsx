import { useId, useState } from 'react';
import { createPortal } from 'react-dom';
import SPopoverContent from './SPopverContent.tsx';

export interface ButtonData {
	buttonText: string;
	buttonFn: () => void;
	buttonType: 'default' | 'text';
}

export interface SPopoverProps {
	type: 'top' | 'left' | 'bottom' | 'right';
	text: string | React.ReactNode;
	mainButton: ButtonData;
	title?: string;
	targetComponent?: React.ReactNode;
	zIndex?: number;
	secondaryButton?: ButtonData;
	close?: boolean;
}

const SPopover = ({
	type,
	title,
	text,
	targetComponent,
	mainButton,
	zIndex = 10,
	secondaryButton,
	close,
}: SPopoverProps) => {
	const [isHover, setIsHover] = useState(false);
	const id = useId();

	// const zIndexClass = `z-[${zIndex}]`;

	// const tooltipPosition =
	// 	type === 'top'
	// 		? 'bottom-28pxr left-[50%] translate-x-[-50%]'
	// 		: type === 'right'
	// 			? 'left-24pxr top-[50%] translate-y-[-50%]'
	// 			: type === 'bottom'
	// 				? 'top-28pxr left-[50%] translate-x-[-50%]'
	// 				: 'right-24pxr top-[50%] translate-y-[-50%]';

	// const arrowPosition =
	// 	type === 'top'
	// 		? 'flex-col-reverse'
	// 		: type === 'right'
	// 			? 'flex'
	// 			: type === 'bottom'
	// 				? 'flex-col'
	// 				: 'flex-row-reverse';

	// const arrowStyle =
	// 	type === 'top'
	// 		? 'rotate-180'
	// 		: type === 'right'
	// 			? 'rotate-[270deg] translate-x-4pxr'
	// 			: type === 'left'
	// 				? 'rotate-90 translate-x-[-4px]'
	// 				: '';

	return (
		<div
			id={`s-tooltip--${id}`}
			className='relative flex items-center justify-center'
			onMouseEnter={() => setIsHover(true)}
		>
			{targetComponent ? targetComponent : <img src='/questionMarkIcon.png' />}

			{isHover &&
				createPortal(
					<SPopoverContent
						tooltipId={id}
						type={type}
						text={text}
						setIsHover={setIsHover}
						mainButton={mainButton}
						title={title}
						secondaryButton={secondaryButton}
						zIndex={zIndex}
						close={close}
					/>,
					document.body
				)}
		</div>
	);
};

export default SPopover;
