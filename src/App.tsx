import { routes } from './routes/router';
import { FaCircle, FaAngleRight } from 'react-icons/fa6';
import SSelect from './components/SSelect';

function App() {
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
			<div className='flex w-800pxr flex-col gap-12pxr p-16pxr'>
				<SSelect
					className='w-200pxr'
					options={[
						{ label: '10개씩 보기', value: 10 },
						{ label: '20개씩 보기', value: 20 },
						{ label: '30개씩 보기', value: 30 },
						{ label: '40개씩 보기', value: 40 },
					]}
				></SSelect>
			</div>
		</section>
	);
}

export default App;
