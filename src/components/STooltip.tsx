import { useId, useState } from 'react';
import { createPortal } from 'react-dom';
import STooltip from './STooltipContainer.tsx';

export interface STooltipContainerProps {
	type: 'top' | 'left' | 'bottom' | 'right';
	text: string;
	targetComponent?: React.ReactNode;
	zIndex?: number;
	close?: boolean;
}

const STooltipContainer = ({
	type,
	text,
	targetComponent,
	zIndex = 10,
	close,
}: STooltipContainerProps) => {
	const [isHover, setIsHover] = useState(false);
	const id = useId();

	if (text === '') return false;

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
			onMouseLeave={() => !close && setIsHover(false)}
		>
			{targetComponent ? targetComponent : <img src='/questionMarkIcon.png' />}

			{isHover &&
				createPortal(
					// <div
					// 	className={`${tooltipPosition} ${arrowPosition} ${!close && 'pointer-events-none'} ${zIndexClass} absolute flex items-center`}
					// 	style={{ filter: 'drop-shadow(2px 2px 8px 2px #00000033)' }}
					// >
					// 	<TooltipArrow className={arrowStyle} />
					// 	<div
					// 		className={`relative flex-1 gap-12pxr rounded-4pxr bg-Blue_B_Darken-2 px-20pxr py-8pxr text-white ${close && 'pr-36pxr'}`}
					// 	>
					// 		<div className='font-medium leading-20pxr'>{text}</div>
					// 		{close && (
					// 			<Close12
					// 				onClick={() => setIsHover(false)}
					// 				className='absolute right-12pxr top-12pxr'
					// 			/>
					// 		)}
					// 	</div>
					// </div>,
					<STooltip
						tooltipId={id}
						type={type}
						text={text}
						setIsHover={setIsHover}
						zIndex={zIndex}
						close={close}
					/>,
					document.body
				)}
		</div>
	);
};

export default STooltipContainer;
