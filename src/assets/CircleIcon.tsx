import { SVGProps } from 'react';

export const Circle10 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width='10'
		height='10'
		viewBox='0 0 10 10'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
  {...props}
	>
		<circle
			cx='5'
			cy='5'
			r='5'
			fill='currentColor'
		/>
	</svg>
);
