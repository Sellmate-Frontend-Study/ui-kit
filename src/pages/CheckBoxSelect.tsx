import { useState } from 'react';
import SCheckBoxSelect from '../components/SCheckboxSelect';

const SelectCheckbox = () => {
	const [selectedOptions, setSelectedOptions] = useState([]);

	const handleSelectChange = (selectedOptions) => {
		setSelectedOptions(selectedOptions);
		console.log(selectedOptions);
	};

	return (
		<div className='flex w-200pxr flex-col gap-12pxr p-16pxr'>
			<div>
				<b>CheckBoxSelect</b>
			</div>
			<SCheckBoxSelect
				className='w-200pxr'
				options={[
					{ label: '1aaaaaa', value: 1 },
					{ label: '2aaaaaaaasa', value: 2 },
					{ label: '3adaadsdadsd', value: 3 },
					{ label: '4adasdasda', value: 4 },
				]}
				handleChange={handleSelectChange}
			></SCheckBoxSelect>
		</div>
	);
};

export default SelectCheckbox;
