import { Meta, StoryObj } from '@storybook/react';
import STable from '../components/STable';

const meta = {
	title: 'STable',
	component: STable,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof STable>;

export default meta;

type Story = StoryObj<typeof STable>;

export const Default: Story = {};
