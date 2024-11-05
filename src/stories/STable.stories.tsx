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

const headers = [
  {
    name: 'product_code',
    label: '상품코드',
    field: 'product_code',
  },
  {
    name: 'supplier_name',
    label: '공급처명',
    field: 'supplier_name',
  },
  {
    name: '상품명',
    label: '상품명sssssssss',
    field: '상품명',
    width: 200
  },
  {
    name: '옵션명',
    label: '옵션명',
    field: '옵션명'
  },
  {
    name: '발주수량',
    label: '발주수량',
    field: '발주수량',
  },
  {
    name: 'RFID발급할수량',
    label: 'RFID 발급할 수량',
    field: 'RFID발급할수량',
  },
];
const data = [
  {
    id: 1,
    barcode_no: 'M87017K2C',
    product_code: 'M87017K2C',
    supplier_name: 'UPTOWNHOLIC',
    상품명: 'UPTOWNHOLIC Before She Broke Yourzzzzzzzzzzzzzz',
    옵션명: '베이지, 235',
    발주수량: 2000,
    RFID발급할수량: 2000,
  },
  {
    id: 2,
    barcode_no: 'M87017K1C',
    product_code: 'M87017K1C',
    supplier_name: 'UPTOWNHOLIC',
    상품명: 'UPTOWNHOLIC Before She Broke Your',
    옵션명: '베이지, 230',
    발주수량: 100,
    RFID발급할수량: 100,
    classes: 'text-red',
  },
  {
    id: 3,
    barcode_no: 'M87017K2C',
    product_code: 'M87017K2C',
    supplier_name: 'UPTOWNHOLIC',
    상품명: 'UPTOWNHOLIC Before She Broke Yourzzzzzzzzzzzzzz',
    옵션명: '베이지, 235',
    발주수량: 2000,
    RFID발급할수량: 2000,
  },
  {
    id: 4,
    barcode_no: 'M87017K1C',
    product_code: 'M87017K1C',
    supplier_name: 'UPTOWNHOLIC',
    상품명: 'UPTOWNHOLIC Before She Broke Your',
    옵션명: '베이지, 230',
    발주수량: 100,
    RFID발급할수량: 100,
  },
  {
    id: 5,
    barcode_no: 'M87017K2C',
    product_code: 'M87017K2C',
    supplier_name: 'UPTOWNHOLIC',
    상품명: 'UPTOWNHOLIC Before She Broke Yourzzzzzzzzzzzzzz',
    옵션명: '베이지, 235',
    발주수량: 2000,
    RFID발급할수량: 2000,
  },
  {
    id: 6,
    barcode_no: 'M87017K1C',
    product_code: 'M87017K1C',
    supplier_name: 'UPTOWNHOLIC',
    상품명: 'UPTOWNHOLIC Before She Broke Your',
    옵션명: '베이지, 230',
    발주수량: 100,
    RFID발급할수량: 100,
  },
  {
    id: 7,
    barcode_no: 'M87017K1C',
    product_code: 'M87017K1C',
    supplier_name: 'UPTOWNHOLIC',
    상품명: 'UPTOWNHOLIC Before She Broke Your',
    옵션명: '베이지, 230',
    발주수량: 100,
    RFID발급할수량: 100,
  },
  {
    id: 8,
    barcode_no: 'M87017K1C',
    product_code: 'M87017K1C',
    supplier_name: 'UPTOWNHOLIC',
    상품명: 'UPTOWNHOLIC Before She Broke Your',
    옵션명: '베이지, 230',
    발주수량: 100,
    RFID발급할수량: 100,
  },
  {
    id: 9,
    barcode_no: 'M87017K1C',
    product_code: 'M87017K1C',
    supplier_name: 'UPTOWNHOLIC',
    상품명: 'UPTOWNHOLIC Before She Broke Your',
    옵션명: '베이지, 230',
    발주수량: 100,
    RFID발급할수량: 100,
  },
  {
    id: 10,
    barcode_no: 'M87017K1C',
    product_code: 'M87017K1C',
    supplier_name: 'UPTOWNHOLIC',
    상품명: 'UPTOWNHOLIC Before She Broke Your',
    옵션명: '베이지, 230',
    발주수량: 100,
    RFID발급할수량: 100,
  },
];


export const Default: Story = {
  args:{
    headers : headers,
		data : data,
  }
};

export const DefaultTable: Story = {
	args: {
    headers : headers,
		data : data,
    resizable : true,
	},
};
