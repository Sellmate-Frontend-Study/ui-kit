import { useState, useEffect } from 'react';
import colors from '../css/colors';
import RadioIcon8 from '../assets/RadioIcon';

export interface SRadioProps {
  disabled?: boolean;
  color?: keyof typeof colors;
  className?: string;
  label?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  name?: string;
  onChange?: (value: string) => void;  
}

const SRadio = ({ name, color = 'positive', disabled, value, checked, defaultChecked = false, label, onChange }: SRadioProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const argColor = colors[color] || color;

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = () => {
    if (!disabled) {
      if (onChange) {
        onChange(value || '');
      }
      if (checked === undefined) {
        setIsChecked((prev) => !prev);
      }
    }
  };

  const radioClasses = `flex items-center cursor-pointer mb-5 mr-5 group 
  ${ disabled ? 'opacity-60 cursor-not-allowed' : ''}`;
  const inputClasses = 'hidden';
  const iconClasses = `w-4 h-4 border flex items-center justify-center rounded-full 
  ${ disabled ? 'bg-Grey_Lighten-4 cursor-not-allowed' : `group-hover:border-[${argColor}]`} 
  ${isChecked ? `border-[${argColor}]` : 'border-Grey_Darken-4'}`;
  const labelClasses = `pl-2 ${disabled ? 'text-Grey_Lighten-4 cursor-not-allowed' : 'text-Grey_Darken-4'}`;

  return (
    <div className="flex">
      <div className={radioClasses} onClick={handleChange}>
        <input
          type="radio"
          value={value}
          checked={isChecked}
          disabled={disabled}
          name={name}
          className={inputClasses}
          onChange={handleChange}
          readOnly
        />
        <div className={iconClasses}>
          {isChecked && <RadioIcon8 color={argColor} />}
        </div>
        <span className={labelClasses}>
          {label}
        </span>
      </div>
    </div>
  );
};

export default SRadio;