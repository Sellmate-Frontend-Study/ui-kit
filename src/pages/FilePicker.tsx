import { useState } from 'react';
import SFilePicker from '../components/SFilePicker';

const FilePicker = () => {
	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>FilePicker</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SFilePicker />
				<SFilePicker disabled />
			</div>
			<div></div>
		</div>
	);
};

export default FilePicker;
