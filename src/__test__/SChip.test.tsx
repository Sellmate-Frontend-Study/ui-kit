import { render, screen, fireEvent } from '@testing-library/react';
import SChip from '../components/SChip';
import { describe, it, expect } from 'vitest';

describe('SChip Component', () => {
  it('renders', () => {
    render(<SChip initInput="renders Chip" />);
    const chipElement = screen.getByText(/renders Chip/i);
    expect(chipElement).toBeInTheDocument();
  });

  it('remove', () => {
    render(<SChip initInput="remove Chip" remove={true} />);
    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton); 
    expect(screen.queryByText(/remove Chip/i)).toBeNull(); 
  });

  it('inputChange', () => {
    render(<SChip initInput="inputChange" inputChange={true} />);
    const chipElement = screen.getByText(/inputChange/i);
    fireEvent.input(chipElement, { target: { innerText: 'Updated' } });
    expect(chipElement.innerText).toBe('Updated');
  });

  it('removeIcon', () => {
    render(<SChip initInput="removeIcon Chip" />);
    const iconElement = screen.getByRole('button');
    expect(iconElement).toBeInTheDocument();
  });

  it('size', () => {
    render(<SChip initInput="sm" size="sm" />);
    const chipElement = screen.getByText(/sm/i);
    expect(chipElement.parentElement).toHaveClass('h-8', 'p-2');

    render(<SChip initInput="lg" size="lg" />);
    const largeChipElement = screen.getByText(/lg/i);
    expect(largeChipElement.parentElement).toHaveClass('h-12', 'p-4');
  });

  it('className', () => {
    render(<SChip initInput="Custom Class" className="custom-class" />);
    const chipElement = screen.getByText(/Custom Class/i);
    expect(chipElement.parentElement).toHaveClass('custom-class');
  });
});