import type { Meta, StoryObj } from '@storybook/react';
import SRadio from '../components/SRadio'; 

const meta: Meta<typeof SRadio> = {
  title: 'Components/SRadio',
  component: SRadio,
  parameters: {
    layout: 'centered', 
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['positive', 'Red_Default', 'Blue_C_Default'], 
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SRadio>;


export const Default: Story = {
  args: {
    label: 'Default Radio',
    name: 'defaultRadio',
  },
};

export const CheckedRadio: Story = {
  args: {
    label: 'Checked Radio',
    name: 'checkedRadio',
    checked: true,
  },
};

export const ColoredRadio: Story = {
  args: {
    label: 'Red Radio',
    name: 'coloredRadio',
    color: 'Red_Default',
  },
};

export const DefaultCheckedRadio: Story = {
  args: {
    label: 'Default Checked Radio',
    name: 'defaultCheckedRadio',
    defaultChecked: true,
  },
};