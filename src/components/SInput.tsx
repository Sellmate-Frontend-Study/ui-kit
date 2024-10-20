import React, { useState } from 'react';
import { Visible16 } from '../assets/visibleIcon';
import { InVisible16 } from '../assets/InVisibleIcon';

export interface SInputProps {
  className?: string;
  placeholder?: string; 
  disabled?: boolean; 
  required?: boolean; 
  status?: 'active' | 'pass' | 'error'; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string; 
  labelType?: 'default' | 'addon'; 
  password?: boolean;
}

const SInput = ({
  className,
  placeholder,
  disabled,
  required,
  status = 'active',
  value, 
  onChange,
  label, 
  labelType = 'default', 
  password = false,
}: SInputProps) => {

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const statusClasses = {
    active: 'border-Blue_C_Default',  
    pass: 'border-Green_Lighten-2',   
    error: 'border-Red_Default',   
  };
  const inputClasses = `
    w-152pxr h-28pxr px-12pxr py-4pxr border-1pxr text-12pxr font-400 text-Grey_Darken-5 leading-20pxr text-left
    placeholder:text-Grey_Lighten-1 focus:outline-none focus:shadow-[0px_0px_4px_0px_#0071FF66] focus:border-Blue_C_Default
    ${labelType === 'addon' ? 'rounded-l-0 rounded-r-2pxr' : 'rounded-2pxr'}
    ${password && 'pr-32pxr'}
  `;
  const disabledClasses = `${disabled && 'bg-Grey_Lighten-4 border-Grey_Lighten-2 text-Grey_Default cursor-not-allowed'}`;

  const labelClasses = 
    labelType === 'default' 
    ? 'mr-8pxr py-4pxr leading-20pxr text-Grey_Darken-4' 
    : `flex items-center justify-center h-28pxr px-12pxr leading-20pxr border border-r-0 rounded-l-2pxr bg-Grey_Lighten-5 text-Grey_Darken-4 ${disabled ? 'border-Grey_Lighten-2' : 'border-Grey_Lighten-1'}`;

  const inputIconClasses = `absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`

  return (
    <div className="flex items-center">
      {label && (
        <div className={labelClasses}>
          {label}
        </div>
      )}
      <div className="relative">
      <input
        type={password && !passwordVisible ? 'password' : 'text'} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        disabled={disabled} 
        required={required} 
        className={['s-input', inputClasses, disabledClasses, statusClasses[status], className].join(' ')}
      />
      {password && (
          <div className={inputIconClasses} onClick={togglePassword}>
            {passwordVisible ? (
               <Visible16 className='text-Grey_Darken-1' /> 
            ) : (
              <InVisible16 className='text-Grey_Darken-1' />  
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SInput;
