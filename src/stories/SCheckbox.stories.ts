import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SCheckbox from '../components/SCheckbox';

const meta = {
	title: 'SCheckbox',
	component: SCheckbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		checked: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
	args: { onChange: fn() },
} satisfies Meta<typeof SCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
	args: {
		checked: true,
	},
};

export const Disabled: Story = {
	args: {
		checked: false,
		disabled: true,
	},
};

export const CheckedAndDisabled: Story = {
	args: {
		checked: true,
		disabled: true,
	},
};

export const Multi: Story = {
	args: {
		checked: true,
		multi: true,
	},
};