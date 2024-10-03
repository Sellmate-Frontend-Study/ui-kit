import { SVGProps } from 'react';

export const TooltipArrow = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width='16'
		height='12'
		viewBox='0 0 16 12'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M7.16795 1.24807C7.56377 0.65434 8.43623 0.654341 8.83205 1.24807L16 12L2.09815e-06 12L7.16795 1.24807Z'
			fill='#07284A'
		/>
	</svg>
);
