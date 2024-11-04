import { useEffect } from 'react';
import { ArrowLeft12, ArrowLeftEnd12 } from '../assets/ArrowLeftIcon';
import { ArrowRight12, ArrowRightEnd12 } from '../assets/ArrowRightIcon';

interface SPaginationProps {
	currentPage: number;
	totalPages: number;
	changePage: (page: number) => void;
}

const SPagination = ({
	currentPage,
	totalPages,
	changePage,
}: SPaginationProps) => {
	const pageNum = getPageNum(currentPage, totalPages);

	const first = () => changePage(1);
	const last = () => changePage(totalPages);
	const prev = () => changePage(Math.max(currentPage - 1, 1));
	const next = () => changePage(Math.min(currentPage + 1, totalPages));
	const paginate = (pageNum: number) => changePage(pageNum);

	useEffect(() => {
		if (currentPage > totalPages) {
			changePage(totalPages);
		}
	}, [totalPages, currentPage, changePage]);

	return (
		<div className='mt-2pxr flex h-37pxr w-full items-center justify-center space-x-2 rounded-5pxr border bg-Grey_Lighten-6'>
			{currentPage > 1 && (
				<ArrowLeftEnd12
					className='cursor-pointer'
					onClick={first}
				></ArrowLeftEnd12>
			)}
			{currentPage > 1 && (
				<ArrowLeft12
					className='cursor-pointer'
					onClick={prev}
				></ArrowLeft12>
			)}

			{pageNum.map((num) => (
				<button
					key={num}
					onClick={() => paginate(num)}
					className={`rounded-14pxr px-10pxr py-3pxr ${
						currentPage === num
							? 'bg-Blue_B_Lighten-1 text-white'
							: 'hover:border hover:border-Blue_B_Lighten-1 hover:text-Blue_B_Lighten-1'
					}`}
				>
					{num}
				</button>
			))}
			{currentPage > 1 && currentPage !== totalPages && (
				<ArrowRight12
					onClick={next}
					className='cursor-pointer'
				></ArrowRight12>
			)}
			{totalPages > 9 && currentPage !== totalPages && (
				<ArrowRightEnd12
					className='cursor-pointer'
					onClick={last}
				></ArrowRightEnd12>
			)}
		</div>
	);
};

function getPageNum(currentPage: number, totalPages: number) {
	const manVisiblePageNum = 10;
	let start = Math.max(1, currentPage - Math.floor(manVisiblePageNum / 2));
	let end = start + manVisiblePageNum - 1;

	if (end > totalPages) {
		end = totalPages;
		start = Math.max(1, end - manVisiblePageNum + 1);
	}

	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default SPagination;
