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

export const ResizableTable: Story = {
	args: {
		tableClass: 'w-800pxr h-300pxr',
		resizable: true,
		usePagination: true,
		paginationType: 'multiple',
		paginationClass: 'mt-10pxr',
	},
};

export const StickyHeaderTable: Story = {
	args: {
		tableClass: 'h-300pxr',
		stickyHeader: true,
		usePagination: true,
		paginationType: 'multiple',
		paginationClass: 'mt-10pxr',
	},
};

export const PaginationTable: Story = {
	args: {
		tableClass: 'h-300pxr',
		usePagination: true,
		paginationType: 'multiple',
		paginationClass: 'mt-10pxr',
	},
};

export const SinglePaginationTable: Story = {
	args: {
		tableClass: 'h-300pxr',
		usePagination: true,
		paginationType: 'single',
		paginationClass: 'mt-10pxr',
	},
};

export const PaginationWithLimitTable: Story = {
	args: {
		tableClass: 'h-300pxr',
		usePagination: true,
		paginationType: 'single',
		paginationClass: 'mt-10pxr',
		usePaginationLimit: true,
	},
};
