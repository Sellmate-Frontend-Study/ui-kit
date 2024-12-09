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
		useMultiple: { control: 'boolean' },
		checkbox: { control: 'boolean' },
		groupCheckbox: { control: 'boolean' },
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof SSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
	{ label: 'option 1', value: 1 },
	{ label: 'option 2', value: 2 },
	{ label: 'option 3', value: 3 },
	{ label: 'option 4', value: 4 },
	{ label: 'option 5', value: 5 },
	{ label: 'option 6', value: 6 },
	{ label: 'option 7', value: 7 },
	{ label: 'option 8', value: 8 },
	{ label: 'option 9', value: 9 },
	{ label: 'option 10', value: 10 },
	{ label: 'option 11', value: 11 },
	{ label: 'option 12', value: 12 },
];

const groupOptions = [
	{
		groupName: 'group1',
		groupChecked: true,
		options: [
			{ label: 'option 1', value: 1 },
			{ label: 'option 2', value: 2 },
			{ label: 'option 3', value: 3 },
			{ label: 'option 4', value: 4 },
		],
	},
	{
		groupName: 'group2',
		groupChecked: true,
		options: [
			{ label: 'option 1', value: 5 },
			{ label: 'option 2', value: 6 },
			{ label: 'option 3', value: 7 },
			{ label: 'option 4', value: 8 },
		],
	},
];

const groupOptionsWithoutGroupChecked = [
	{
		groupName: 'group1',
		options: [
			{ label: 'option 1', value: 1 },
			{ label: 'option 2', value: 2 },
			{ label: 'option 3', value: 3 },
			{ label: 'option 4', value: 4, },
		],
	},
	{
		groupName: 'group2',
		options: [
			{ label: 'option 1', value: 5 },
			{ label: 'option 2', value: 6 },
			{ label: 'option 3', value: 7 },
			{ label: 'option 4', value: 8 },
		],
	},
];

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

export const MultipleSelect: Story = {
	args: {
		classname: 'w-150pxr',
		options,
		useMultiple: true,
	},
};

export const SelectCheckbox: Story = {
	args: {
		classname: 'w-150pxr',
		options: options,
		checkbox: true
	},
};

export const SelectGroupCheckboxWithoutGroupChecked: Story = {
	args: {
		classname: 'w-150pxr',
		options: groupOptionsWithoutGroupChecked,
		groupCheckbox : true
	},
};

export const SelectGroupCheckbox: Story = {
	args: {
		classname: 'w-150pxr',
		options: groupOptions,
		groupCheckbox : true
	},
};


