import type { Meta, StoryObj } from '@storybook/react';
import STooltip from '../components/STooltip';
import SButton from '../components/SButton';
import React from 'react';
import STag from '../components/STag';

const meta = {
	title: 'STooltip',
	component: STooltip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
		text: { control: 'text' },
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
		close: { control: 'boolean' },
	},
} satisfies Meta<typeof STooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTooltip: Story = {
	args: {
		type: 'top',
		text: 'default text',
	},
};

export const CloseTooltip: Story = {
	args: {
		type: 'top',
		text: 'default text',
		close: true,
	},
};

export const ButtonTooltip: Story = {
	args: {
		type: 'top',
		text: 'default text',
		targetComponent: React.createElement(SButton, {
			outline: true,
			label: 'xs button',
		}),
	},
};
