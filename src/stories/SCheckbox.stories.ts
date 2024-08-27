import type { Meta, StoryObj } from '@storybook/react';
<<<<<<< HEAD
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

export const Indeterminate: Story = {
	args: {
		checked: null,
	},
};

export const CheckedAndDisabled: Story = {
	args: {
		checked: true,
		disabled: true,
	},
};

export const Array: Story = {
	args: {
		checked: ['사자', '호랑이', '코끼리'],
		value: '코끼리',
		label: '코끼리',
	},
=======
import SCheckbox from '../components/SCheckbox';

const meta: Meta<typeof SCheckbox> = {
  title: 'SCheckbox',
  component: SCheckbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    checked: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof SCheckbox>;

export const Default: Story = {
  args: {
    label: 'Default Checkbox',
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    checked: false,
    disabled: true,
  },
>>>>>>> f44b1c68bcb3c90a48a0b36f5e6d53888152d8b6
};
