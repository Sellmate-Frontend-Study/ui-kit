import { Meta, StoryObj } from '@storybook/react';
import SInput from '../components/SInput';

const meta = {
	title: 'SInput',
	component: SInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SInput>;

export default meta;

type Story = StoryObj<typeof SInput>;

export const Default: Story = {};

export const LabelInput: Story = {
  args:{
    label : "test"
  }
};

export const AddonLabelInput: Story = {
  args:{
    label : "test",
    labelType : "addon"
  }
};