import { useEffect, useMemo, useRef, useState } from 'react';
import { ClockIcon } from '../assets/ClockIcon';
import TimePickerPortal from './timePicker/TimePickerPortal';
import TimeController from './timePicker/TimeController';
import SInput from './SInput';
import { FileIcon } from '../assets/FileIcon';

interface SFilePickerProps {
	file?: File | null;
	onChange?: (file: File) => void;
	placeholder?: string;
	disabled?: boolean;
}

const SFilePicker = ({
	file = null,
	onChange,
	placeholder = 'Click to upload',
	disabled = false,
}: SFilePickerProps) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(file);
	const fileInputRef = useRef<HTMLInputElement>(null);
	return (
		<>
			<input
				ref={fileInputRef}
				type='file'
				onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
				hidden
			/>
			<div
				className={[
					'flex w-150pxr  items-center rounded-2pxr border border-Grey_Lighten-1 px-8pxr py-4pxr ',
					disabled
						? 'cursor-not-allowed bg-Grey_Lighten-5 text-Grey_Default'
						: 'cursor-pointer text-Grey_Darken-5',
				].join(' ')}
				onClick={() => {
					if (disabled) return;
					fileInputRef.current?.click();
				}}
			>
				<FileIcon className='mr-8pxr text-Grey_Darken-1' />
				<input
					type='text'
					className={[
						'w-full truncate bg-transparent focus:outline-none',
						disabled ? 'cursor-not-allowed' : 'cursor-pointer ',
					].join(' ')}
					value={selectedFile ? selectedFile.name : placeholder}
					readOnly
				/>
			</div>
		</>
	);
};

export default SFilePicker;
