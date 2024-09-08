import type { Meta, StoryObj } from '@storybook/react';
import STabs from '../components/STab'; 

const meta: Meta<typeof STabs> = {
  title: 'Components/STabs',
  component: STabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof STabs>;

export const Default: Story = {
  args: {
    tabs: [
      { name: 'tab1', label: 'Tab 1', badge: '1' },
      { name: 'tab2', label: 'Tab 2', badge: '2' },
      { name: 'tab3', label: 'Tab 3' },
      { name: 'tab4', label: 'Tab 4' },
    ],
  },
};