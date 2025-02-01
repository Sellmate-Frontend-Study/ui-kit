import { SVGProps } from 'react';

export const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width='17'
		height='16'
		viewBox='0 0 17 16'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<g clipPath='url(#clip0_11124_9584)'>
			<path
				d='M8.5 3.33398V8.00065H13.1667'
				stroke='#737373'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M8.50019 1.2002C12.2557 1.2002 15.3002 4.24466 15.3002 8.00019C15.3002 11.7557 12.2557 14.8002 8.50019 14.8002C4.74466 14.8002 1.7002 11.7557 1.7002 8.00019C1.7002 4.24466 4.74466 1.2002 8.50019 1.2002Z'
				stroke='#737373'
				strokeLinecap='round'
			/>
		</g>
		<defs>
			<clipPath id='clip0_11124_9584'>
				<rect
					width='16'
					height='16'
					fill='white'
					transform='translate(0.5)'
				/>
			</clipPath>
		</defs>
	</svg>
);
