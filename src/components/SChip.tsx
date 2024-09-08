import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { Close12 } from '../assets/CloseIcon';

export interface SChipProps {
	value: boolean;
	rounded?: boolean;
	clickable?: boolean;
	removable?: boolean;
	useInput?: boolean;
	inputValue?: string;
	onRemove?: () => void;
	onInput?: (value: string) => void;
	children?: ReactNode;
	className?: string;
}

const SChip = ({
	value,
	rounded = false,
	clickable = false,
	removable = false,
	useInput = false,
	inputValue = '',
	onRemove,
	onInput,
	children,
	className = '',
}: SChipProps) => {
	const [isVisible, setIsVisible] = useState(value);
	const [content, setContent] = useState(inputValue);
	const chipRef = useRef<HTMLSpanElement | null>(null);

	const handleRemove = () => {
		if (removable) {
			setIsVisible(false);
			onRemove?.();
		}
	};

	const handleInput = () => {
		if (useInput && onInput && chipRef.current) {
			onInput(chipRef.current.textContent || '');
		}
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
		console.log('key down event');

		if (useInput && e.key === 'Enter') {
			e.preventDefault();
			chipRef.current?.blur();
		}
	};

	// inputValue prop이 변경될 때만 contentEditable 요소의 내용을 업데이트
	useEffect(() => {
		if (
			useInput &&
			chipRef.current &&
			inputValue !== chipRef.current.textContent
		) {
			chipRef.current.textContent = inputValue;

			// 커서 위치를 끝으로 이동
			const range = document.createRange();
			const sel = window.getSelection();
			range.selectNodeContents(chipRef.current);
			range.collapse(false);
			sel?.removeAllRanges();
			sel?.addRange(range);
		}
	}, [inputValue, useInput]);

	return (
		<>
			{isVisible && (
				<div
					className={`s-chip flex h-24 w-fit items-center border  border-Grey_Default bg-white px-8 text-Grey_Darken-4 hover:bg-Grey_Lighten-5 ${rounded ? 'rounded-14' : 'rounded-4'} ${useInput ? 'cursor-text' : clickable ? 'cursor-pointer' : 'cursor-default'} ${className}`}
				>
					{useInput ? (
						<span
							className='chip-input outline-none'
							ref={chipRef}
							role='textbox'
							contentEditable
							suppressContentEditableWarning
							onInput={handleInput}
							onKeyDown={handleInputKeyDown}
						>
							{content}
						</span>
					) : (
						children
					)}

					{removable && (
						<Close12
							className='ml-4 cursor-pointer text-Grey_Default'
							onClick={handleRemove}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default SChip;
