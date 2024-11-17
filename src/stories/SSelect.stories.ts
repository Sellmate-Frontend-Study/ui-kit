import type { Meta, StoryObj } from '@storybook/react';
import SSelect from '../components/SSelect';

const meta = {
	title: 'SSelect',
	component: SSelect,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof SSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
	{ label: 'option 1', value: 1 },
	{ label: 'option 2', value: 2 },
];
export const DefaultSelect: Story = {
	args: {
		classname: 'w-100pxr',
		options,
	},
};

export const DisabledSelect: Story = {
	args: {
		classname: 'w-100pxr',
		options,
		disabled: true,
	},
};
