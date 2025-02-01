import React, {
	Dispatch,
	RefObject,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

const initParentDOMRect = {
	left: 0,
	top: 0,
};

type Props = {
	parentRect: DOMRect | null;
	parentRef: RefObject<HTMLDivElement>;
	children: React.ReactNode;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const TimePickerPortal = ({
	parentRect,
	parentRef,
	children,
	isOpen,
	setIsOpen,
}: Props) => {
	const [position, setPosition] = useState(initParentDOMRect);
	const portalRef = useRef<HTMLDivElement>(null);

	const handleClickOutSide = useCallback(
		(e: MouseEvent) => {
			if (
				parentRef.current &&
				!parentRef.current.contains(e.target as Node) &&
				portalRef.current &&
				!portalRef.current.contains(e.target as Node)
			)
				setIsOpen(false);
		},
		[parentRef, setIsOpen]
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutSide);

		return () => {
			document.removeEventListener('mousedown', handleClickOutSide);
		};
	}, [handleClickOutSide]);

	useEffect(() => {
		if (portalRef.current && parentRect) {
			const dropdownHeight = portalRef.current.offsetHeight;
			const viewportHeight = window.innerHeight;
			const margin = 4;

			const top =
				parentRect.bottom + dropdownHeight > viewportHeight
					? parentRect.top - (dropdownHeight + margin)
					: parentRect.bottom + margin;

			setPosition({
				top: top,
				left: parentRect.left,
			});
		}
	}, [parentRect, parentRef, portalRef, isOpen]);

	return (
		<>
			{createPortal(
				<div
					ref={portalRef}
					className={[
						'rounded-2pxr bg-white  shadow-dropdownOptions',
						isOpen ? 'opacity-1' : 'pointer-events-none opacity-0',
					].join(' ')}
					style={{
						position: 'absolute',
						top: position.top,
						left: position.left,
						transition: 'opacity 0.4s',
					}}
				>
					{children}
				</div>,
				document.body
			)}
		</>
	);
};

export default TimePickerPortal;
