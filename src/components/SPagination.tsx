import { useEffect } from 'react';
import { ArrowLeft12, ArrowLeftEnd12 } from '../assets/ArrowLeftIcon';
import { ArrowRight12, ArrowRightEnd12 } from '../assets/ArrowRightIcon';

interface SPaginationProps {
	currentPage: number;
	totalPages: number;
	changePage: (page: number) => void;
	perPage: number;
	setPerPage: (newPerPage: number) => void;
}

const SPagination = ({
	currentPage,
	totalPages,
	changePage,
	perPage,
	setPerPage,
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

	const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPerPage(Number(e.target.value));
		changePage(1);
	};

	return (
		<div className='relative mt-2pxr flex h-37pxr w-full items-center justify-center space-x-2 rounded-5pxr border bg-Grey_Lighten-6'>
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

			<select
				value={perPage}
				onChange={handleChangePerPage}
				className='absolute right-5 w-76pxr rounded-1pxr border px-5pxr py-2pxr'
			>
				<option value={10}>10개</option>
				<option value={15}>15개</option>
			</select>
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
