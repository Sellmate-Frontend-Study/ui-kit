import { Meta, StoryObj } from '@storybook/react';
import SInput, { InputProps } from '../components/SInput';

// 스토리북 메타데이터

const meta = {
	title: 'SInput',
	component: SInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: { control: 'select', options: ['text', 'password'] },
		textState: { control: 'text' },
		state: { control: 'select', options: ['active', 'pass', 'error'] },
		disabled: { control: 'boolean' },
		label: { control: 'text' },
		labelType: { control: 'select', options: ['basic', 'addon'] },
	},
} satisfies Meta<typeof SInput>;

export default meta;

type Story = StoryObj<InputProps>;

export const DefaultInput: Story = {
	args: {
		textState: 'text value',
	},
};

export const PasswordInput: Story = {
	args: {
		type: 'password',
		textState: 'text value',
	},
};

export const HintInput: Story = {
	args: {
		textState: 'text value',
		inputClass: 'w-200pxr',
		hintText:
			'Lorem Ipsum has been the industry Lorem Ipsum has been the industry',
		hintClass: 'w-200pxr',
	},
};

export const PassInput: Story = {
	args: {
		textState: 'text value',
		state: 'pass',
	},
};

export const ErrorInput: Story = {
	args: {
		textState: 'text value',
		state: 'error',
	},
};

export const LabelInput: Story = {
	args: {
		textState: 'text value',
		label: 'label',
	},
};

export const AddonInput: Story = {
	args: {
		textState: 'text value',
		label: 'label',
		labelType: 'addon',
	},
};
