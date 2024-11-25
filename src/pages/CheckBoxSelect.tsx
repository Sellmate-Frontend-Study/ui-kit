import { useState } from 'react';
import SCheckBoxSelect from '../components/SCheckboxSelect';

const SelectCheckbox = () => {
	const [selectedOptions, setSelectedOptions] = useState([]);

	const handleSelectChange = (selectedOptions) => {
		setSelectedOptions(selectedOptions);
	};

	return (
		<div className='flex w-200pxr flex-col gap-12pxr p-16pxr'>
			<div>
				<b>CheckBoxSelect</b>
			</div>
			<SCheckBoxSelect
				className='w-200pxr'
				options={[
					{ label: '10개씩 보기', value: 10 },
					{ label: '20개씩 보기', value: 20 },
					{ label: '30개씩 보기', value: 30 },
					{ label: '40개씩 보기', value: 40 },
				]}
				handleChange={handleSelectChange}
			></SCheckBoxSelect>
		</div>
	);
};

export default SelectCheckbox;
