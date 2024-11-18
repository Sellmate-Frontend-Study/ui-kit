import { Dispatch, SetStateAction } from 'react';
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
	pageNumber: number;
	pagination: number;
	paginationType?: 'single' | 'multiple';
	pagePerPagination: number;
	lastPage: number;
	paginationClass?: string;
	usePaginationLimit?: boolean;
	setPageNumber: Dispatch<SetStateAction<number>>;
	setPagination: Dispatch<SetStateAction<number>>;
	setItemPerPage: Dispatch<SetStateAction<number>>;
	setLastPage: Dispatch<SetStateAction<number>>;
	fetchFn?: (meta: PaginationMeta) => Promise<void>;
}

const Pagination = ({
	pageNumber,
	pagination,
	paginationType = 'single',
	pagePerPagination,
	paginationClass,
	usePaginationLimit,
	lastPage,
	setPageNumber,
	setPagination,
	setItemPerPage,

	fetchFn,
}: PaginationProps) => {
	console.log(pagePerPagination);

	const isSingle = paginationType === 'single';

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
		setPageNumber(lastPage);
		setPagination(Math.ceil(lastPage / pagePerPagination));
	}

	function prevPage() {
		const prevPage = isSingle ? pageNumber - 1 : pageNumber - pagePerPagination;

		if (prevPage > 0) {
			setPageNumber(prevPage);
		}
	}
	function nextPage() {
		const nextPage = isSingle ? pageNumber + 1 : pageNumber + pagePerPagination;

		if (nextPage <= lastPage) {
			setPageNumber(nextPage);
		}
	}

	const checkPaginationWidth = (number: number) => {
		const numberLength = number.toString().length;
		const paginationWidth = pageNumberWidth[numberLength];

		return paginationWidth;
	};

	const isLeftButtonHidden =
		(!isSingle && pagination === 1) || (isSingle && pageNumber === 1);

	const isRightButtonHidden =
		(!isSingle && pagination === Math.ceil(lastPage / pagePerPagination)) ||
		(isSingle && pageNumber === lastPage);

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
				{!isSingle ? (
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
						<div className={[pageNumberClass].join(' ')}>{lastPage}</div>
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
						defaultValue={[{ label: '5개씩 보기', value: 5 }]}
						classname='w-full'
						options={[
							{ label: '5개씩 보기', value: 5 },
							{ label: '10개씩 보기', value: 10 },
							{ label: '20개씩 보기', value: 20 },
							{ label: '30개씩 보기', value: 30 },
							{ label: '40개씩 보기', value: 40 },
						]}
						handleChange={(value) => {
							setItemPerPage(Number(value[0].value));

							if (fetchFn) {
								const newMeta = {
									currentPage: pageNumber,
									lastPage: lastPage,
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

export default Pagination;
