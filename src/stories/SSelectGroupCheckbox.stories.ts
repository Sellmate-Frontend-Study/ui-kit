import type { Meta, StoryObj } from '@storybook/react';
import SSelectGroupCheckbox from '../components/SSelectGroupCheckbox';

const meta = {
	title: 'SSelectGroupCheckbox',
	component: SSelectGroupCheckbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof SSelectGroupCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
	{ label: 'option 1', value: 1, group: 'group1' },
	{ label: 'option 2', value: 2, group: 'group1' },
	{ label: 'option 3', value: 3, group: 'group1' },
	{ label: 'option 4', value: 4, group: 'group1' },
	{ label: 'option 5', value: 5, group: 'group1' },
	{ label: 'option 6', value: 6, group: 'group1' },
	{ label: 'option 7', value: 7, group: 'group1' },
	{ label: 'option 8', value: 8, group: 'group1' },
	{ label: 'option 9', value: 9, group: 'group2' },
	{ label: 'option 10', value: 10, group: 'group2' },
	{ label: 'option 11', value: 11, group: 'group3' },
	{ label: 'option 12', value: 12, group: 'group4' },
];

// const optionsWithDisable = [
// 	{ label: 'option 1', value: 1 },
// 	{ label: 'option 2', value: 2 },
// 	{ label: 'option 3', value: 3 },
// 	{ label: 'option 4', value: 4, disabled: true },
// 	{ label: 'option 5', value: 5 },
// 	{ label: 'option 6', value: 6 },
// 	{ label: 'option 7', value: 7 },
// 	{ label: 'option 8', value: 8, disabled: true },
// 	{ label: 'option 9', value: 9 },
// 	{ label: 'option 10', value: 10 },
// 	{ label: 'option 11', value: 11 },
// 	{ label: 'option 12', value: 12 },
// ];

export const DefaultSelect: Story = {
	args: {
		classname: 'w-150pxr',
		options,
	},
};

export const DisabledSelect: Story = {
	args: {
		classname: 'w-150pxr',
		options,
		disabled: true,
	},
};
