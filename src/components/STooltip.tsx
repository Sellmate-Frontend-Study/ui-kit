import { useState } from 'react';
import { TooltipArrow } from '../assets/tooltipArrow.tsx';
import { Close12 } from '../assets/CloseIcon.tsx';

export interface TooltipProps {
	type: 'top' | 'left' | 'bottom' | 'right';
	text: string;
	targetComponent?: JSX.Element;
	zIndex?: number;
	close?: boolean;
}

const STooltip = ({
	type,
	text,
	targetComponent,
	zIndex = 10,
	close,
}: TooltipProps) => {
	const [isHover, setIsHover] = useState(false);

	if (text === '') return false;

	const zIndexClass = `z-[${zIndex}]`;

	const tooltipPosition =
		type === 'top'
			? 'bottom-28pxr left-[50%] translate-x-[-50%]'
			: type === 'right'
				? 'left-24pxr top-[50%] translate-y-[-50%]'
				: type === 'bottom'
					? 'top-28pxr left-[50%] translate-x-[-50%]'
					: 'right-24pxr top-[50%] translate-y-[-50%]';

	const arrowPosition =
		type === 'top'
			? 'flex-col-reverse'
			: type === 'right'
				? 'flex'
				: type === 'bottom'
					? 'flex-col'
					: 'flex-row-reverse';

	const arrowStyle =
		type === 'top'
			? 'rotate-180'
			: type === 'right'
				? 'rotate-[270deg] translate-x-4pxr'
				: type === 'left'
					? 'rotate-90 translate-x-[-4px]'
					: '';

	return (
		<div
			className='relative h-24pxr w-24pxr'
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => !close && setIsHover(false)}
		>
			{targetComponent ? targetComponent : <img src='/questionMarkIcon.png' />}

			{isHover && (
				<div
					className={`${tooltipPosition} ${arrowPosition} ${!close && 'pointer-events-none'} ${zIndexClass} absolute flex items-center`}
					style={{ filter: 'drop-shadow(2px 2px 8px 2px #00000033)' }}
				>
					<TooltipArrow className={arrowStyle} />
					<div
						className={`relative flex-1 gap-12pxr rounded-4pxr bg-Blue_B_Darken-2 px-20pxr py-8pxr text-white ${close && 'pr-36pxr'}`}
					>
						<div className='font-medium leading-20pxr'>{text}</div>
						{close && (
							<Close12
								onClick={() => setIsHover(false)}
								className='absolute right-12pxr top-12pxr'
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default STooltip;
