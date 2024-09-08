import type { Meta, StoryObj } from '@storybook/react';
import SChip from '../components/SChip'; 
import colors from '../css/colors'; 

const meta: Meta<typeof SChip> = {
  title: 'Components/SChip',
  component: SChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(colors), 
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'], 
    },
  },
};

export default meta;
type Story = StoryObj<typeof SChip>;


export const Default: Story = {
  args: {
    initInput: 'Default Chip',
    remove: false,
    inputChange: false,
    size: 'md',
    color: 'white',
  },
};


export const ColorChip: Story = {
  args: {
    initInput: 'Colored Chip',
    remove: false,
    inputChange: false,
    size: 'md',
    color: 'Red_Lighten-4', 
  },
};

export const removeChip: Story = {
  args: {
    initInput: 'remove Chip',
    remove: true,
    inputChange: false,
    size: 'md',
  },
};

export const inputChangeChip: Story = {
  args: {
    initInput: 'inputChange Chip',
    remove: false,
    inputChange: true,
    size: 'lg',
  },
};
