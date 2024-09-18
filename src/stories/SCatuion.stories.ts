import type { Meta, StoryObj } from '@storybook/react';
import SCaution, { SCautionProps } from '../components/SCaution';

const meta: Meta<typeof SCaution> = {
  title: 'SCaution',
  component: SCaution, 
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    noIcon: { control: 'boolean' },
    useModal: { control: 'boolean' },
    useNotice: { control: 'boolean' },
    liStyle: { control: 'text' },
    label: { control: 'text' },
    contents: { control: 'object' }, 
  },
};

export default meta;

type Story = StoryObj<SCautionProps>;

const list = [
  'Aenean feugiat purus in, iaculis urna quiselit lobortis vestibulum.',
  'Pellentesque volutpat enim tincidunt orci ullamcorpe consequat lectusultricies, accumsan mauris ac, gravida elit. Nam fermentum quam sed libero iaculis, nec volutpat erat feugiat.',
  'Duis volutpat enim tincidunt orci ullamcorper, sit amet vehicula liberovenenatis',
  'Pellentesque volutpat enim tincidunt orci ullamcorpe consequat lectusultricies, accumsan mauris ac, gravida elit. Nam fermentum quam sed libero iaculis, nec volutpat erat feugiat. Aenean feugiat purus in, iaculis urna quiselit lobortis vestibulum.',
  'Duis volutpat enim tincidunt orci ullamcorper, sit amet vehicula liberovenenatis',
];

export const DefaultCaution: Story = {
  args: {
    label: '주의사항',
    contents: list, 
  },
};