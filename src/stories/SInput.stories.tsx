import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SInput, { SInputProps } from '../components/SInput';

const meta = {
  title: 'SInput',
  component: SInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SInput>;

export default meta;

type Story = StoryObj<typeof SInput>;

export const Default: Story = {};

export const LabelInput: Story = {
  args: {
    label: 'sellmate',
  },
};

export const AddonLabelInput: Story = {
  args: {
    label: 'sellmate',
    labelType: 'addon',
  },
};

const InputPassword = (args: SInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <SInput
      {...args}  
      value={inputValue}
      onChange={handleChange}
    />
  );
};
export const PasswordInput: Story = {
  args: {
    password: true,
    rule: /^.{5,}$/, 
    errorMsg: '5글자 이상이어야 합니다.',
  },
  render: (args) => <InputPassword {...args} />,
};
