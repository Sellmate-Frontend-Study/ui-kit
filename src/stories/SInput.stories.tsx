import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'storybook/internal/preview-api';

import SInput from '../components/SInput';

const meta = {
	title: 'SInput',
	component: SInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { setState: fn() },
} satisfies Meta<typeof SInput>;

export default meta;

type Story = StoryObj<typeof SInput>;

export const Default: Story = {
 args: {
		value: 'Text Value',
	},
};

export const Label: Story = {
 args: {
		value: 'Text Value',
  label: 'Label'
	},
};

export const PasswordOn: Story = {
 args: {
		value: 'Text Value',
  type: 'password'
 },
};

export const PasswordOff: Story = {
 args: {
		value: 'Text Value',
  type: 'password'
	},
};

export const Hint: Story = {
 args: {
		value: 'Text Value',
  description: 'This is Hint',
	},
};

export const Rules: Story = {
 render: function Render() {
  const [value, setValue] = useState('');
  return <SInput
   value={value}
   setState={setValue}
   rules={[(val: string) => !!val || 'This is Error']}
  />
 }
};

export const InsideLabel: Story = {
 args: {
		value: 'Text Value',
  insideLabel: 'Label'
	},
};

export const DefaultDisabled: Story = {
 args: {
		value: 'Text Value',
  disabled: true,
	},
};

export const LabelDisabled: Story = {
 args: {
		value: 'Text Value',
  label: 'Label',
  disabled: true,
	},
};

export const InsideLabelDisabled: Story = {
 args: {
		value: 'Text Value',
  insideLabel: 'Label',
  disabled: true,
	},
};

export const ErrorStatus: Story = {
 args: {
		value: 'Text Value',
  status: 'error'
	},
};

export const SuccessStatus: Story = {
 args: {
		value: 'Text Value',
  status: 'success'
	},
};

export const FocusStatus: Story = {
 args: {
		value: 'Text Value',
  status: 'focus'
	},
};


