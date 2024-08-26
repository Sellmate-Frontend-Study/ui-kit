import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SCheckbox from '../components/SCheckbox';
import '@testing-library/jest-dom';

describe('SCheckbox', () => {
  
  //라벨 렌더링
  it('renders the label correctly', () => {
    const { getByText } = render(<SCheckbox label="Test Checkbox" />);
    expect(getByText('Test Checkbox')).toBeInTheDocument();
  });

  //토글 여부
  it('toggles the checked state when clicked', () => {
    const { getByRole } = render(<SCheckbox />);
    const checkbox = getByRole('checkbox');

    expect(checkbox).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  //disabled
  it('does not toggle when disabled', () => {
    const { getByRole } = render(<SCheckbox disabled={true} />);
    const checkbox = getByRole('checkbox');

    expect(checkbox).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  //onclick handler 출력
  it('calls the onClick handler with the correct checked value', () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(<SCheckbox onClick={onClickMock} />);
    const checkbox = getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(onClickMock).toHaveBeenCalledWith(true);

    fireEvent.click(checkbox);
    expect(onClickMock).toHaveBeenCalledWith(false);
  });

  //css 적용
  it('renders the correct classes based on checked and disabled states', () => {
    const { getByRole } = render(<SCheckbox className="custom-class" />);
    const checkbox = getByRole('checkbox');
    expect(checkbox).toHaveClass('custom-class');

    fireEvent.click(checkbox);
    const checkboxDiv = checkbox.firstChild as HTMLElement;
    expect(checkboxDiv).toHaveClass('border-blue-500 bg-blue-500');
  });

  it('applies hover styles when the checkbox is hovered', () => {
    const { getByRole } = render(<SCheckbox />);
    const checkbox = getByRole('checkbox');
    const checkboxDiv = checkbox.firstChild as HTMLElement;

    expect(checkboxDiv).toHaveClass('group-hover:bg-blue-200');
    expect(checkboxDiv).toHaveClass('group-hover:border-blue-500');

  });
});