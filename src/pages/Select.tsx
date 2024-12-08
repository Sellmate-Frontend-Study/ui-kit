import SSelect from '../components/SSelect';
import SSelectGroupCheckbox from '../components/SSelectGroupCheckbox';

const groupSelectOptions = [
	{
		label: '라벨1',
		value: '값1',
		group: '그룹1',
	},
	{
		label: '라벨2',
		value: '값2',
		group: '그룹1',
	},
	{
		label: '라벨3',
		value: '값3',
		group: '그룹1',
	},
	{
		label: '라벨4',
		value: '값4',
		group: '그룹1',
	},
	{
		label: '라벨5',
		value: '값5',
		group: '그룹1',
	},
	{
		label: '라벨6',
		value: '값6',
		group: '그룹2',
	},
	{
		label: '라벨7',
		value: '값7',
		group: '그룹2',
	},
];

const Select = () => {
	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Select</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SSelect
					classname='w-200pxr'
					options={groupSelectOptions}
					defaultValue={[]}
				/>
			</div>
			<div>
				<b>Group Select</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SSelectGroupCheckbox
					classname='w-200pxr'
					options={groupSelectOptions}
					defaultValue={[]}
				/>
			</div>
		</div>
	);
};

export default Select;
