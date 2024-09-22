import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SToggle from '../components/SToggle';

const meta = {
	title: 'SToggle',
	component: SToggle,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: ['switch', 'button'],
			defaultValue: 'switch',
		},
	},
	args: { onChange: fn() },
} satisfies Meta<typeof SToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSwtichToggle: Story = {
	args: {
		type: 'switch',
		value: false,
	},
};

export const ActiveSwtichToggle: Story = {
	args: {
		type: 'switch',
		value: true,
	},
};

export const DisabledSwtichToggle: Story = {
	args: {
		type: 'switch',
		value: false,
		disabled: true,
	},
};

export const DisabledActiveSwtichToggle: Story = {
	args: {
		type: 'switch',
		value: true,
		disabled: true,
	},
};

export const DefaultButtonToggle: Story = {
	args: {
		type: 'button',
		value: false,
		label: 'Toggle',
	},
};

export const ActiveButtonToggle: Story = {
	args: {
		type: 'button',
		value: true,
		label: 'Toggle',
	},
};

export const DisabledButtonToggle: Story = {
	args: {
		type: 'button',
		value: false,
		disabled: true,
		label: 'Toggle',
	},
};
