import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SRadio from '../components/SRadio';

const meta = {
	title: 'SRadio',
	component: SRadio,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		checked: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
	args: { onChange: fn() },
} satisfies Meta<typeof SRadio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {
	args: {
		label: 'radio',
		checked: true,
	},
};

export const Disabled: Story = {
	args: {
		label: 'radio',
		checked: false,
		disabled: true,
	},
};

export const CheckedAndDisabled: Story = {
	args: {
		label: 'radio',
		checked: true,
		disabled: true,
	},
};
