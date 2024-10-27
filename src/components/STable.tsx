import { ReactNode, useEffect, useRef, useState } from 'react';

const sampleHeader = [
	{ label: 'Name', name: 'name', headerClass: '', columnClass: 'text-left' },
	{
		label: 'Position',
		name: 'position',
		headerClass: '',
		columnClass: 'text-left',
	},
	{ label: 'Office', name: 'office', headerClass: '', columnClass: 'text-left' },
	{ label: 'Extn', name: 'extn', headerClass: '', columnClass: 'text-left' },
	{
		label: 'Start date',
		name: 'start_date',
		headerClass: '',
		columnClass: 'text-left',
		node: (
			<div className='flex justify-between'>
				<div>start date</div>
				<button>test</button>
			</div>
		),
	},
	{
		label: 'Salary',
		name: 'salary',
		headerClass: '',
		columnClass: 'text-left',
		format: (data: number | string) => `$${Number(data).toLocaleString('ko-kr')}`,
	},
];

const sampleData = [
	{
		name: 'Tiger Nixon',
		position: 'System Architect',
		office: 'Edinburgh',
		extn: '5421',
		start_date: '2011/04/25',
		salary: '320800',
	},
	{
		name: 'Garrett Winters',
		position: 'Accountant',
		office: 'Tokyo',
		extn: '8422',
		start_date: '2011/07/25',
		salary: '170750',
	},
	{
		name: 'Ashton Cox',
		position: 'Junior Technical Author',
		office: 'San Francisco',
		extn: '1562',
		start_date: '2009/01/12',
		salary: '86000',
	},
	{
		name: 'Cedric Kelly',
		position: 'Senior Javascript Developer',
		office: 'Edinburgh',
		extn: '6224',
		start_date: '2012/03/29',
		salary: '433060',
	},
	{
		name: 'Airi Satou',
		position: 'Accountant',
		office: 'Tokyo',
		extn: '5407',
		start_date: '2008/11/28',
		salary: '162700',
	},
	{
		name: 'Brielle Williamson',
		position: 'Integration Specialist',
		office: 'New York',
		extn: '4804',
		start_date: '2012/12/02',
		salary: '372000',
	},
	{
		name: 'Herrod Chandler',
		position: 'Sales Assistant',
		office: 'San Francisco',
		extn: '9608',
		start_date: '2012/08/06',
		salary: '137500',
	},
	{
		name: 'Rhona Davidson',
		position: 'Integration Specialist',
		office: 'Tokyo',
		extn: '6200',
		start_date: '2010/10/14',
		salary: '327900',
	},
	{
		name: 'Colleen Hurst',
		position: 'Javascript Developer',
		office: 'San Francisco',
		extn: '2360',
		start_date: '2009/09/15',
		salary: '205500',
	},
	{
		name: 'Sonya Frost',
		position: 'Software Engineer',
		office: 'Edinburgh',
		extn: '1667',
		start_date: '2008/12/13',
		salary: '103600',
	},
	{
		name: 'Jena Gaines',
		position: 'Office Manager',
		office: 'London',
		extn: '3814',
		start_date: '2008/12/19',
		salary: '90560',
	},
	{
		name: 'Quinn Flynn',
		position: 'Support Lead',
		office: 'Edinburgh',
		extn: '9497',
		start_date: '2013/03/03',
		salary: '342000',
	},
	{
		name: 'Charde Marshall',
		position: 'Regional Director',
		office: 'San Francisco',
		extn: '6741',
		start_date: '2008/10/16',
		salary: '470600',
	},
	{
		name: 'Haley Kennedy',
		position: 'Senior Marketing Designer',
		office: 'London',
		extn: '3597',
		start_date: '2012/12/18',
		salary: '313500',
	},
	{
		name: 'Tatyana Fitzpatrick',
		position: 'Regional Director',
		office: 'London',
		extn: '1965',
		start_date: '2010/03/17',
		salary: '385750',
	},
	{
		name: 'Michael Silva',
		position: 'Marketing Designer',
		office: 'London',
		extn: '1581',
		start_date: '2012/11/27',
		salary: '198500',
	},
	{
		name: 'Paul Byrd',
		position: 'Chief Financial Officer (CFO)',
		office: 'New York',
		extn: '3059',
		start_date: '2010/06/09',
		salary: '725000',
	},
	{
		name: 'Gloria Little',
		position: 'Systems Administrator',
		office: 'New York',
		extn: '1721',
		start_date: '2009/04/10',
		salary: '237500',
	},
	{
		name: 'Bradley Greer',
		position: 'Software Engineer',
		office: 'London',
		extn: '2558',
		start_date: '2012/10/13',
		salary: '132000',
	},
	{
		name: 'Dai Rios',
		position: 'Personnel Lead',
		office: 'Edinburgh',
		extn: '2290',
		start_date: '2012/09/26',
		salary: '217500',
	},
	{
		name: 'Jenette Caldwell',
		position: 'Development Lead',
		office: 'New York',
		extn: '1937',
		start_date: '2011/09/03',
		salary: '345000',
	},
	{
		name: 'Yuri Berry',
		position: 'Chief Marketing Officer (CMO)',
		office: 'New York',
		extn: '6154',
		start_date: '2009/06/25',
		salary: '675000',
	},
	{
		name: 'Caesar Vance',
		position: 'Pre-Sales Support',
		office: 'New York',
		extn: '8330',
		start_date: '2011/12/12',
		salary: '106450',
	},
	{
		name: 'Doris Wilder',
		position: 'Sales Assistant',
		office: 'Sydney',
		extn: '3023',
		start_date: '2010/09/20',
		salary: '85600',
	},
	{
		name: 'Angelica Ramos',
		position: 'Chief Executive Officer (CEO)',
		office: 'London',
		extn: '5797',
		start_date: '2009/10/09',
		salary: '1200,000',
	},
	{
		name: 'Gavin Joyce',
		position: 'Developer',
		office: 'Edinburgh',
		extn: '8822',
		start_date: '2010/12/22',
		salary: '92575',
	},
	{
		name: 'Jennifer Chang',
		position: 'Regional Director',
		office: 'Singapore',
		extn: '9239',
		start_date: '2010/11/14',
		salary: '357650',
	},
	{
		name: 'Brenden Wagner',
		position: 'Software Engineer',
		office: 'San Francisco',
		extn: '1314',
		start_date: '2011/06/07',
		salary: '206850',
	},
	{
		name: 'Fiona Green',
		position: 'Chief Operating Officer (COO)',
		office: 'San Francisco',
		extn: '2947',
		start_date: '2010/03/11',
		salary: '850000',
	},
	{
		name: 'Shou Itou',
		position: 'Regional Marketing',
		office: 'Tokyo',
		extn: '8899',
		start_date: '2011/08/14',
		salary: '163000',
	},
	{
		name: 'Michelle House',
		position: 'Integration Specialist',
		office: 'Sydney',
		extn: '2769',
		start_date: '2011/06/02',
		salary: '95400',
	},
	{
		name: 'Suki Burks',
		position: 'Developer',
		office: 'London',
		extn: '6832',
		start_date: '2009/10/22',
		salary: '114500',
	},
	{
		name: 'Prescott Bartlett',
		position: 'Technical Author',
		office: 'London',
		extn: '3606',
		start_date: '2011/05/07',
		salary: '145000',
	},
	{
		name: 'Gavin Cortez',
		position: 'Team Leader',
		office: 'San Francisco',
		extn: '2860',
		start_date: '2008/10/26',
		salary: '235500',
	},
	{
		name: 'Martena Mccray',
		position: 'Post-Sales support',
		office: 'Edinburgh',
		extn: '8240',
		start_date: '2011/03/09',
		salary: '324050',
	},
	{
		name: 'Unity Butler',
		position: 'Marketing Designer',
		office: 'San Francisco',
		extn: '5384',
		start_date: '2009/12/09',
		salary: '85675',
	},
];

export interface STableColumn {
	label: string;
	name: string;
	headerClass?: string;
	columnClass?: string;
	node?: ReactNode;
	format?: (data: string | number) => string | number;
}

export interface STableProps {
	tableColumn?: STableColumn[];
	tableData?: Record<string, string | number>[];
	tableClass?: string;
	resizable?: boolean;
	stickyHeader?: boolean;
	scrollHandle?: () => void;
}

const STable = ({
	tableClass,
	tableColumn = sampleHeader,
	tableData = sampleData,
	resizable = false,
	stickyHeader = false,
	scrollHandle,
}: STableProps) => {
	const [cellWidth, setCellWidth] = useState<string[] | null>(null);
	const [resizableTarget, setResizableTarget] = useState<{
		startX: any;
		startWidth: any;
		cuurentCol: any;
	} | null>(null);
	const table = useRef<ReactNode | null>(null);

	useEffect(() => {
		if (table.current) {
			const tableElement = table.current as any;
			const thArray = Array.from(tableElement.querySelectorAll('thead tr th'));
			setCellWidth(thArray.map((th: any) => th.offsetWidth));
		}
	}, []);

	const theadClass =
		'relative bg-Blue_C_Lighten-8 text-Grey_Darken-5 font-medium leading-20pxr px-20pxr py-8pxr';

	const resizableDivClass =
		'resizable-div h-16pxr w-4pxr cursor-col-resize border-x border-Grey_Lighten-2 absolute top-10pxr';
	// 'resizable-div h-16pxr w-2pxr cursor-col-resize border-l border-Grey_Lighten-2 absolute top-10pxr';

	const tdClass = 'py-12pxr px-16pxr leading-20pxr';
	const tbodyClass = '';

	function mouseMoveHandler(e: MouseEvent, position: string) {
		const targetElement = e.target.parentElement;
		// position === 'left'
		// 	? e.target.parentElement.previousElementSibling

		const newTargetData = {
			startX: e.pageX,
			currentCol: targetElement,
			startWidth: targetElement.offsetWidth,
		};
		setResizableTarget(newTargetData);
	}

	useEffect(() => {
		document.addEventListener('mousemove', resizeColumn);
		document.addEventListener('mouseup', stopResize);
		return () => {
			console.log(1);

			document.removeEventListener('mouseup', stopResize);
			document.removeEventListener('mousemove', resizeColumn);
		};
	}, [resizableTarget]);

	function resizeColumn(e) {
		if (resizableTarget) {
			const { startX, currentCol, startWidth } = resizableTarget;

			const newWidth = startWidth + (e.pageX - startX);
			currentCol.style.width = `${newWidth}px`;
			currentCol.style.minWidth = `${newWidth}px`;
			currentCol.style.maxWwidth = `${newWidth}px`;
		}
	}

	function stopResize() {
		setResizableTarget(null);
	}

	return (
		<div
			className={['relative overflow-auto', tableClass].join(' ')}
			onScroll={scrollHandle}
		>
			<table
				className='min-w-full'
				ref={table}
			>
				<thead>
					<tr>
						{tableColumn.map((column, columnIdx) => (
							<th
								className={[
									theadClass,
									stickyHeader && 'sticky top-0',
									cellWidth && `w-${cellWidth[columnIdx]}pxr`,
									column.columnClass,
								].join(' ')}
							>
								{/* {resizable && (
									<div
										className={[resizableDivClass, 'resizable-div left-0'].join(' ')}
										data-index={columnIdx}
										onMouseDown={(event) => mouseMoveHandler(event, 'left')}
									></div>
									// onMouseUp={() => setResizableTarget(null)}
									// // onMouseMove={(event) => mouseMoveHandler(event, 'left')}
								)} */}
								{column.node ? (column.node as ReactNode) : (column.label as string)}
								{resizable && columnIdx !== tableColumn.length - 1 && (
									<div
										className={[resizableDivClass, 'right-0'].join(' ')}
										data-index={columnIdx}
										onMouseDown={(event) => mouseMoveHandler(event, 'right')}
									></div>
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody className={[tbodyClass].join(' ')}>
					{tableData.map((dataRow) => (
						<tr className=''>
							{tableColumn.map((column) => {
								const text = dataRow[column.name as string];
								const formattedText = column.format ? column.format(text) : text;
								return (
									<td className={[column.columnClass, tdClass].join(' ')}>
										{formattedText}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default STable;
