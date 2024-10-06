import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Close12 } from '../assets/CloseIcon';
import { TooltipArrow } from '../assets/TooltipArrow';

interface Position {
	height: number;
	width: number;
	bottom: number;
	right: number;
	left: number;
	top: number;
}
const initParentDOMRect: Position = {
	height: 0,
	width: 0,
	bottom: 0,
	right: 0,
	left: 0,
	top: 0,
};

interface STooltipContentProps {
	tooltipId: string;
	type: 'top' | 'left' | 'bottom' | 'right';
	text: string;
	setIsHover: Dispatch<SetStateAction<boolean>>;
	zIndex: number;
	close?: boolean;
}

const STooltipContent = ({
	tooltipId,
	type,
	text,
	setIsHover,
	zIndex,
	close,
}: STooltipContentProps) => {
	const [position, setPosition] = useState<Position>(initParentDOMRect);
	const tooltipRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const parent = document.getElementById(`s-tooltip--${tooltipId}`);

		const scrollT = window.scrollY;
		const scrollX = window.scrollX;
		if (parent) {
			const parentPosition = parent.getBoundingClientRect();

			setPosition({
				height: parentPosition.height,
				width: parentPosition.width,
				top: parentPosition.top + scrollT,
				bottom: parentPosition.bottom + scrollT,
				left: parentPosition.left + scrollX,
				right: parentPosition.right + scrollX,
			});
		}
	}, [tooltipId]);

	const zIndexClass = `z-[${zIndex}]`;

	const { top: pTop, left: pLeft, width: pWidth, height: pHeight } = position;

	const tooltipPosition =
		type === 'top'
			? {
					top: tooltipRef.current
						? `${pTop - tooltipRef.current.offsetHeight - 4}px`
						: `${pTop - 4}px`,
					left: `${pLeft + pWidth / 2}px`,
					translate: `-50% 0`,
				}
			: type === 'right'
				? {
						top: `${pTop + pHeight / 2}px`,
						left: `${pLeft + pWidth}px`,
						translate: `0 -50%`,
					}
				: type === 'bottom'
					? {
							top: `${pTop + pHeight + 4}px`,
							left: `${pLeft + pWidth / 2}px`,
							translate: `-50% 0`,
						}
					: {
							top: `${pTop + pHeight / 2}px`,
							left: tooltipRef.current
								? `${pLeft - tooltipRef.current.offsetWidth}px`
								: `${pLeft}px`,
							translate: `0 -50%`,
						};

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
			className={`${arrowPosition} ${!close && 'pointer-events-none'} ${zIndexClass} absolute flex items-center`}
			style={{
				...tooltipPosition,
				filter: 'drop-shadow(2px 2px 8px 2px #00000033)',
			}}
			ref={tooltipRef}
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
	);
};

export default STooltipContent;
