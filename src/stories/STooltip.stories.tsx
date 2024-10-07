import type { Meta, StoryObj } from '@storybook/react';
import { Question24 } from '../assets/QuestionIcon';
import STooltip, { type STooltipProps } from '../components/STooltip';

const meta = {
  title: 'STooltip',
  component: STooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof STooltip>;

export default meta;

type Story = StoryObj<STooltipProps>;

const listExample = (
  <ul>
    <li>Pizza ipsum dolor meat lovers buffalo.</li>
    <li>Pizza ipsum dolor meat lovers buffalo.</li>
    <li>Pizza ipsum dolor meat lovers buffalo.</li>
  </ul>
);

export const Default: Story = {
  args: {
    position: 'top',
    children: listExample,
    trigger: <Question24 />,
  },
};

export const useClose: Story = {
  args: {
    position: 'top',
    children: listExample,
    trigger: <Question24 />,
    useClose: true, 
  },
};

export const usePopover: Story = {
  args: {
    position: 'top',
    children: listExample,
    trigger: <Question24 />,
    usePopover: true, 
  },
};


