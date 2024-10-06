import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import STag from '../components/STag';
import SPopover from '../components/SPopover';

const meta = {
	title: 'SPopover',
	component: SPopover,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
		text: { control: 'text' },
		mainButton: { control: 'object' },
		targetComponent: {
			control: 'select',
			options: [
				'test text',
				React.createElement(STag, {
					label: 'xs tag',
					color: 'blue',
				}),
				'',
			],
		},
		title: { control: 'text' },
		close: { control: 'boolean' },
	},
} satisfies Meta<typeof SPopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPopover: Story = {
	args: {
		type: 'top',
		text: 'default text',
		mainButton: {
			buttonText: 'main button',
			buttonFn: () => console.log('test'),
			buttonType: 'default',
		},
	},
};

export const TitlePopover: Story = {
	args: {
		type: 'top',
		text: 'default texttextextext',
		mainButton: {
			buttonText: 'main button',
			buttonFn: () => console.log('test'),
			buttonType: 'default',
		},
		title: 'title',
	},
};

export const PopoverWithClose: Story = {
	args: {
		type: 'top',
		text: 'default texttextextext',
		mainButton: {
			buttonText: 'main button',
			buttonFn: () => console.log('test'),
			buttonType: 'default',
		},
		title: 'title',
		close: true,
	},
};

export const PopoverWithSecondaryButton: Story = {
	args: {
		type: 'top',
		text: 'default texttextextext',
		mainButton: {
			buttonText: 'main button',
			buttonFn: () => console.log('test'),
			buttonType: 'default',
		},
		title: 'title',
		secondaryButton: {
			buttonText: 'second button',
			buttonFn: () => console.log('seconde test'),
			buttonType: 'default',
		},
	},
};

export const SButtonPopover: Story = {
	args: {
		type: 'top',
		text: 'default texttextextext',
		mainButton: {
			buttonText: 'main button',
			buttonFn: () => console.log('test'),
			buttonType: 'default',
		},
		title: 'title',
		secondaryButton: {
			buttonText: 'second button',
			buttonFn: () => console.log('seconde test'),
			buttonType: 'default',
		},
		targetComponent: React.createElement(STag, {
			label: 'xs tag',
			color: 'blue',
		}),
	},
};
