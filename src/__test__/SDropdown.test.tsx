import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SDropdown from '../components/SDropdown';
import '@testing-library/jest-dom';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

describe('SDropdown', () => {
  
  // 라벨 렌더링
  it('renders the dropdown with label correctly', () => {
    render(<SDropdown label="Test Dropdown" options={[]} onClick={() => {}} />);
    expect(screen.getByText('Test Dropdown')).toBeInTheDocument();
  });

  // 토글 동작
  it('toggles the dropdown options when clicked', () => {
    render(<SDropdown label="Test Dropdown" options={options} onClick={() => {}} />);
    const button = screen.getByText('Test Dropdown');
    
    fireEvent.click(button);
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  // onClick 핸들러 호출
  it('calls the onClick handler with the correct option when clicked', () => {
    const onClickMock = vi.fn();
    render(<SDropdown label="Test Dropdown" options={options} onClick={onClickMock} />);
    const button = screen.getByText('Test Dropdown');
    
    fireEvent.click(button);
    const option1 = screen.getByText('Option 1');
    fireEvent.click(option1);
    expect(onClickMock).toHaveBeenCalledWith({ label: 'Option 1', value: 'option1' });
  });

});