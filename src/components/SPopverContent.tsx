import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Close12 } from '../assets/CloseIcon';
import { TooltipArrow } from '../assets/TooltipArrow';
import { ButtonData } from './SPopover';

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

interface SPopoverContentProps {
	tooltipId: string;
	type: 'top' | 'left' | 'bottom' | 'right';
	text: string | React.ReactNode;
	setIsHover: Dispatch<SetStateAction<boolean>>;
	mainButton: ButtonData;
	zIndex: number;
	title?: string;
	secondaryButton?: ButtonData;
	close?: boolean;
}

const SPopoverContent = ({
	tooltipId,
	type,
	title,
	text,
	setIsHover,
	mainButton,
	zIndex,
	secondaryButton,
	close,
}: SPopoverContentProps) => {
	const [position, setPosition] = useState<Position>(initParentDOMRect);
	const popoverRef = useRef<HTMLDivElement>(null);
	const {
		buttonText: mainButtonText,
		buttonFn: mainButtonFn,
		buttonType: mainButtonType,
	} = mainButton;

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

	useEffect(() => {
		if (!close) {
			function closePopover() {
				setIsHover(false);
			}
			window.addEventListener('click', closePopover);
			return () => window.removeEventListener('click', closePopover);
		}
	}, []);

	const zIndexClass = `z-[${zIndex}]`;

	const { top: pTop, left: pLeft, width: pWidth, height: pHeight } = position;

	const tooltipPosition =
		type === 'top'
			? {
					top: popoverRef.current
						? `${pTop - popoverRef.current.offsetHeight - 4}px`
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
							left: popoverRef.current
								? `${pLeft - popoverRef.current.offsetWidth}px`
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

	const mainButtonClass =
		mainButtonType === 'default'
			? 'bg-Blue_B_Lighten-2 px-8pxr py-2pxr text-white'
			: 'text-Blue_B_Lighten-2 px-8pxr py-2pxr font-bold';

	return (
		<div
			className={`${arrowPosition} ${!close && 'pointer-events-none'} ${zIndexClass} absolute flex items-center`}
			style={{
				...tooltipPosition,
				filter: 'drop-shadow(2px 2px 8px 2px #00000033)',
			}}
			ref={popoverRef}
		>
			<TooltipArrow className={arrowStyle} />
			<div
				className={`relative flex-1 gap-12pxr rounded-4pxr bg-Blue_B_Darken-2 px-20pxr py-12pxr text-white`}
			>
				{title && <div className='mb-4pxr font-bold leading-20pxr'>{title}</div>}
				<div className='mb-12pxr font-medium leading-20pxr'>{text}</div>
				<div className='flex w-full items-center justify-between gap-10pxr'>
					<div>
						{secondaryButton && (
							<button onClick={secondaryButton.buttonFn}>
								{secondaryButton.buttonText}
							</button>
						)}
					</div>

					<button
						onClick={mainButtonFn}
						className={`${mainButtonClass} rounded px-8pxr py-2pxr `}
					>
						{mainButtonText}
					</button>
				</div>
				{close && (
					<Close12
						onClick={() => setIsHover(false)}
						className='absolute right-12pxr top-16pxr'
					/>
				)}
			</div>
		</div>
	);
};

export default SPopoverContent;
