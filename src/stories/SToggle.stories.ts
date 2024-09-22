import type { Meta, StoryObj } from '@storybook/react';
import SToggle, { SToggleProps } from '../components/SToogle';

const meta: Meta<typeof SToggle> = {
  title: 'SToggle',
  component: SToggle, 
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    initToggle: { control: 'boolean' },
    type: {
      control: 'radio',
      options: ['switch', 'button'],  
    },
    onLabel: { control: 'text' },
    offLabel: { control: 'text' },
    label: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<SToggleProps>;

export const DefaultToggle: Story = {
  args: {
    type: 'switch',  
  },
};

export const ButtonToggle: Story = {
  args: {
    type: 'button', 
  },
};

export const DisabledToggle: Story = {
  args: {
    type: 'switch',
    initToggle: true,
    disabled: true,
  },
};
