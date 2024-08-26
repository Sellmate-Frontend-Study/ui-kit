import { useState } from 'react';

export interface CheckboxProps {
  disabled?: boolean;
  className?: string;
  label?: string;
  checked?: boolean;
  onClick?: (checked: boolean) => void;
}

const SCheckbox = ({
  label = "check box",
  disabled = false,
  className = "",
  checked: propChecked,
  onClick,
}: CheckboxProps) => {
  const [initialChecked, setInitialChecked] = useState(propChecked || false);
  const checked = propChecked !== undefined ? propChecked : initialChecked;

  const handleClick = () => {
    if (disabled) return; 
    setInitialChecked(!checked);
    if (onClick) onClick(!checked);
  };

  const borderColor = checked ? 'border-blue-500' : 'border border-gray-300';
  const bgColor = checked && 'bg-blue-500';
  const hoverBgColor = !checked && !disabled ? 'group-hover:bg-blue-200' : '';
  const hoverBorderColor = !checked && !disabled ? 'group-hover:border-blue-500' : '';

  const checkboxClass = `
    w-4 h-4 rounded-sm flex justify-center items-center transition-colors duration-150
    ${borderColor}
    ${bgColor}
    ${hoverBgColor}
    ${hoverBorderColor}
  `;
  const labelClass = disabled && 'opacity-50 cursor-not-allowed' ;

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={`inline-flex items-center mr-5 ${className} ${disabled ? 'opacity-50 cursor-not-allowed': 'group hover:cursor-pointer'}`}
      onClick={handleClick}
    >
      <div className={checkboxClass}>
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`ml-2 ${labelClass}`}>{label}</span>
    </div>
  );
};

export default SCheckbox;