import { Meta, StoryObj } from '@storybook/react';
import STextArea from '../components/STextArea';

const meta = {
	title: 'STextArea',
	component: STextArea,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof STextArea>;

export default meta;

type Story = StoryObj<typeof STextArea>;

export const Default: Story = {};


