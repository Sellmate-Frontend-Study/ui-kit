import { useEffect, useState } from 'react';
import ArrowLeft from '../assets/ArrowLeft.svg';
import ArrowLeftTwo from '../assets/ArrowLeftTwo.svg';
import ArrowRight from '../assets/ArrowRight.svg';
import ArrowRightTwo from '../assets/ArrowRightTwo.svg';
import SSelect from './SSelect';

const pageNumberWidth: Record<number, number> = {
	1: 26,
	2: 36,
	3: 42,
	4: 50,
	5: 58,
};

export interface PaginationMeta {
	currentPage: number;
	lastPage: number;
	itemPerPage?: number;
}
export interface PaginationProps {
	pagePerPagination?: number;
	itemPerPage?: number;
	paginationClass?: string;
	paginationType?: 'multiple' | 'single';
	usePaginationLimit?: boolean;
	meta?: PaginationMeta;
	fetchFn?: (meta: PaginationMeta) => Promise<void>;
}

const Pagenation = ({
	pagePerPagination = 5,
	paginationClass,
	paginationType = 'multiple',
	usePaginationLimit,
	meta = {
		currentPage: 1,
		lastPage: 20,
		itemPerPage: 5,
	},
	fetchFn,
}: PaginationProps) => {
	const [pageNumber, setPageNumber] = useState(meta.currentPage);
	const [pagination, setPagination] = useState(1);

	useEffect(() => {
		if (pageNumber > pagePerPagination * pagination)
			setPagination((prev) => ++prev);

		if (pageNumber <= pagePerPagination * (pagination - 1))
			setPagination((prev) => --prev);

		if (fetchFn) fetchFn(meta);
	}, [pageNumber, pagination]);

	const pageNumberClass =
		'leading-20pxr py-3pxr px-9pxr flex items-center justify-center rounded-14pxr text-Grey_Darken-2 border border-transparent';
	const activePageNumberClass = 'bg-Blue_B_Lighten-1 text-[#fff]';
	const paginationNavButtonClass =
		'rounded-full border border-transparent p-7pxr hover:border-Blue_B_Lighten-1';

	function goFirstPage() {
		setPageNumber(1);
		setPagination(1);
	}

	function goLastPage() {
		setPageNumber(meta.lastPage);
		setPagination(Math.ceil(meta.lastPage / pagePerPagination));
	}

	function prevPage() {
		const prevPage =
			paginationType === 'single'
				? pageNumber - 1
				: pageNumber - pagePerPagination;

		if (prevPage > 0) {
			setPageNumber(prevPage);
		}
	}
	function nextPage() {
		const nextPage =
			paginationType === 'single'
				? pageNumber + 1
				: pageNumber + pagePerPagination;

		if (nextPage <= meta.lastPage) {
			setPageNumber(nextPage);
		}
	}

	const checkPaginationWidth = (number: number) => {
		const numberLength = number.toString().length;
		const paginationWidth = pageNumberWidth[numberLength];

		return paginationWidth;
	};

	const isLeftButtonHidden =
		(paginationType === 'multiple' && pagination === 1) ||
		(paginationType === 'single' && pageNumber === 1);

	const isRightButtonHidden =
		(paginationType === 'multiple' &&
			pagination === Math.ceil(meta.lastPage / pagePerPagination)) ||
		(paginationType === 'single' && pageNumber === meta.lastPage);

	return (
		<div
			className={[
				'relative flex w-full items-center justify-center gap-8pxr',
				paginationClass,
			].join(' ')}
		>
			<div className={`${isLeftButtonHidden && 'opacity-0'}`}>
				<button
					className={[
						'mr-8pxr',
						paginationNavButtonClass,
						isLeftButtonHidden && 'cursor-default',
					].join(' ')}
					onClick={goFirstPage}
				>
					<img src={ArrowLeftTwo} />
				</button>
				<button
					className={[
						paginationNavButtonClass,
						isLeftButtonHidden && 'cursor-default',
					].join(' ')}
					onClick={prevPage}
				>
					<img src={ArrowLeft} />
				</button>
			</div>
			<div className='flex gap-8pxr'>
				{paginationType === 'multiple' ? (
					Array.from({ length: pagePerPagination }, (_, index) => {
						const pageIndex = (pagination - 1) * pagePerPagination + index + 1;
						const numberLength = (pagination * pagePerPagination).toString().length;

						return (
							<button
								className={[
									pageNumberClass,
									pageIndex === pageNumber && activePageNumberClass,
									'hover:border-Blue_B_Lighten-1',
								].join(' ')}
								style={{ width: `${pageNumberWidth[numberLength]}px` }}
								onClick={() => setPageNumber(pageIndex)}
							>
								{pageIndex}
							</button>
						);
					})
				) : (
					<>
						<div
							className={[pageNumberClass].join(' ')}
							style={{ width: `${checkPaginationWidth(pageNumber)}px` }}
						>
							{pageNumber}
						</div>
						<div className={[pageNumberClass].join(' ')}>/</div>
						<div className={[pageNumberClass].join(' ')}>{meta.lastPage}</div>
					</>
				)}
			</div>
			<div className={`${isRightButtonHidden && 'cursor-none opacity-0'}`}>
				<button
					className={[
						'mr-8pxr',
						paginationNavButtonClass,
						isRightButtonHidden && 'cursor-default',
					].join(' ')}
					onClick={nextPage}
				>
					<img src={ArrowRight} />
				</button>
				<button
					className={[
						paginationNavButtonClass,
						isRightButtonHidden && 'cursor-default',
					].join(' ')}
					onClick={goLastPage}
				>
					<img src={ArrowRightTwo} />
				</button>
			</div>

			{usePaginationLimit && (
				<div className='absolute right-10pxr top-0 w-150pxr'>
					<SSelect
						classname='w-full'
						options={[
							{ label: '10개씩 보기', value: 10 },
							{ label: '20개씩 보기', value: 20 },
							{ label: '30개씩 보기', value: 30 },
							{ label: '40개씩 보기', value: 40 },
						]}
						handleChange={(value) => {
							if (fetchFn) {
								const newMeta = {
									currentPage: pageNumber,
									lastPage: meta.lastPage,
									itemPerPage: Number(value[0].value),
								};

								fetchFn(newMeta);
							}
						}}
					></SSelect>
				</div>
			)}
		</div>
	);
};

export default Pagenation;
