import type { Meta, StoryObj } from '@storybook/react';
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
};
