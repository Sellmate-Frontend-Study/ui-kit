import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SRadio from '../components/SRadio';

describe('SRadio ', () => {
  it('renders', () => {
    
    render(<SRadio label="Test Radio" name="testRadio" />);

    const labelElement = screen.getByText(/Test Radio/i);
    expect(labelElement).toBeInTheDocument();
  });

  it('defaultChecked', () => {
    render(<SRadio label="Checked Radio" name="testRadio" defaultChecked={true} />);

    const radioElement = screen.getByRole('radio');
    expect(radioElement).toBeChecked();
  });

  it('onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<SRadio label="Clickable Radio" name="testRadio" onChange={handleChange} />);
    
    const radioElement = screen.getByRole('radio');
    fireEvent.click(radioElement);
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('disabled', () => {
    const handleChange = vi.fn();

    render(<SRadio label="disabled Radio" name="testRadio" disabled={true} onChange={handleChange} />);

    const radioElement = screen.getByRole('radio');
    fireEvent.click(radioElement);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

});