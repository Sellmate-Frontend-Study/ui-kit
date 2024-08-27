import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SDropdown from '../components/SDropdown';
import '@testing-library/jest-dom';

<<<<<<< HEAD
describe('SDropdown Component', () => {
  const defaultOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('renders the dropdown button with the correct label', () => {
    render(<SDropdown label="Dropdown" onClick={() => {}} options={defaultOptions} />);
    expect(screen.getByText('Dropdown')).toBeInTheDocument();
  });

  it('opens and closes the dropdown when the button is clicked', () => {
    render(<SDropdown label="Dropdown" onClick={() => {}} options={defaultOptions} />);
    const button = screen.getByText('Dropdown');

    // Initial state, dropdown should not be open
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();

    // Click to open dropdown
    fireEvent.click(button);
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    // Click to close dropdown
=======
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

>>>>>>> f44b1c68bcb3c90a48a0b36f5e6d53888152d8b6
    fireEvent.click(button);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

<<<<<<< HEAD
  it('calls the onClick handler with the correct option', () => {
    const handleClick = vi.fn();
    render(<SDropdown label="Dropdown" onClick={handleClick} options={defaultOptions} />);
    const button = screen.getByText('Dropdown');

    // Open dropdown
    fireEvent.click(button);

    // Click on an option
    fireEvent.click(screen.getByText('Option 2'));
    expect(handleClick).toHaveBeenCalledWith({ label: 'Option 2', value: 'option2' });
  });

  it('disables the dropdown when disabled prop is true', () => {
    render(<SDropdown label="Dropdown" onClick={() => {}} options={defaultOptions} disabled />);
    const button = screen.getByText('Dropdown').closest('button');

    expect(button).toBeDisabled(); // This checks for the `disabled` attribute using the matcher
  });

  it('applies the correct classes based on props', () => {
    const { container } = render(
      <SDropdown
        label="Styled Dropdown"
        color="Red_Default"
        outline
        size="md"
        onClick={() => {}}
        options={defaultOptions}
      />
    );

    const button = container.querySelector('button');
    expect(button).toHaveClass('before:border-[#E30000] text-[#E30000]');
  });
});
=======
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
>>>>>>> f44b1c68bcb3c90a48a0b36f5e6d53888152d8b6
