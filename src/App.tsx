import SSelect from './components/SSelect';
import { routes } from './routes/router';
import { FaCircle, FaAngleRight } from 'react-icons/fa6';

function App() {
	const options = [
		{ label: 'option 1', value: 1 },
		{ label: 'option 2', value: 2 },
		{ label: 'option 3', value: 3 },
		{ label: 'option 4', value: 4 },
		{ label: 'option 5', value: 5 },
		{ label: 'option 6', value: 6 },
		{ label: 'option 7', value: 7 },
		{ label: 'option 8', value: 8 },
		{ label: 'option 9', value: 9 },
		{ label: 'option 10', value: 10 },
		{ label: 'option 11', value: 11 },
		{ label: 'option 12', value: 12 },
	];

	const groupOptions = [
		{
			groupName: 'group1',
			options: [
				{ label: 'option 1', value: 1 },
				{ label: 'option 2', value: 2 },
				{ label: 'option 3', value: 3 },
				{ label: 'option 4', value: 4 },
			],
		},
		{
			groupName: 'group2',
			groupChecked: true,
			options: [
				{ label: 'option 1', value: 'ㄴㅇ' },
				{ label: 'option 2', value: '3' },
				{ label: 'option 3', value: '4' },
				{ label: 'option 4', value: '5' },
			],
		},
	];

	return (
		<section className='flex items-center justify-center px-20pxr py-16pxr'>
			<ul className='flex w-full max-w-500pxr flex-col gap-4pxr'>
				{routes.map((route, idx) => (
					<li
						key={idx}
						className=' hover:bg-Grey_Lighten-4'
					>
						<a
							href={route.path}
							className='flex flex-nowrap items-center px-20pxr py-8pxr'
						>
							<FaCircle className='mr-16pxr text-8pxr text-Blue_C_Lighten-1' />
							<span>{route.name.replace('/', '')}</span>
							<div className='w-full'></div>
							<FaAngleRight className='text-Grey_Lighten-2' />
						</a>
					</li>
				))}
			</ul>
			<SSelect
				options={options}
				classname='w-150pxr'
				useMultiple={true}
			></SSelect>
			<SSelect
				options={options}
				classname='w-150pxr'
				checkbox={true}
			></SSelect>
			<SSelect
				options={groupOptions}
				classname='w-150pxr'
				groupCheckbox={true}
			></SSelect>
		</section>
	);
}

export default App;
