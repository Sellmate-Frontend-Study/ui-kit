import { SVGProps } from 'react';

export const Clock16 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width='16'
		height='16'
		viewBox='0 0 16 16'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<g clipPath='url(#clip0_11354_2564)'>
			<path
				d='M8 3.33398V8.00065H12.6667'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M8.00019 1.2002C11.7557 1.2002 14.8002 4.24466 14.8002 8.00019C14.8002 11.7557 11.7557 14.8002 8.00019 14.8002C4.24466 14.8002 1.2002 11.7557 1.2002 8.00019C1.2002 4.24466 4.24466 1.2002 8.00019 1.2002Z'
				stroke='currentColor'
				strokeLinecap='round'
			/>
		</g>
		<defs>
			<clipPath id='clip0_11354_2564'>
				<rect
					width='16'
					height='16'
					fill='white'
				/>
			</clipPath>
		</defs>
	</svg>
);
