import { Meta, StoryObj } from '@storybook/react';
import STable, { STableProps } from '../components/STable';

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
		paginationClass: 'mt-10pxr',
	},
};

export const StickyHeaderTable: Story = {
	args: {
		tableClass: 'h-300pxr',
		stickyHeader: true,
		usePagination: true,
		paginationClass: 'mt-10pxr',
	},
};

export const PaginationTable: Story = {
	args: {
		tableClass: 'h-300pxr',
		usePagination: true,
		paginationClass: 'mt-10pxr',
	},
};

export const SinglePaginationTable: Story = {
	args: {
		tableClass: 'h-300pxr',
		usePagination: true,
		pagePerPagination: 1,
		paginationClass: 'mt-10pxr',
	},
};

export const PaginationWithLimitTable: Story = {
	args: {
		tableClass: 'h-264pxr min-w-670pxr',
		resizable: true,
		usePagination: true,
		pagePerPagination: 5,
		paginationClass: 'mt-10pxr',
		usePaginationLimit: true,
		useTotalData: true,
	},
};
