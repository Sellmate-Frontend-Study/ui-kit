import type { Meta, StoryObj } from '@storybook/react';
import STooltip from '../components/STooltip';

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
		close: { control: 'boolean' },
	},
} satisfies Meta<typeof STooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		type: 'top',
		text: 'default text',
	},
};
