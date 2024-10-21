import React from 'react';

export interface STextAreaProps {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const STextArea = ({
  className,
  placeholder,
  disabled,
  value,
  onChange,
}: STextAreaProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
  };

  const textAreaClasses = `
    w-320pxr h-211pxr px-12pxr py-4pxr border-1pxr text-12pxr font-400 text-Grey_Darken-5 leading-20pxr text-left
    placeholder:text-Grey_Lighten-1 focus:outline-none focus:shadow-[0px_0px_4px_0px_#0071FF66] focus:border-Blue_C_Default
    rounded-2pxr
  `;
  const disabledClasses = `${disabled && 'bg-Grey_Lighten-4 border-Grey_Lighten-2 text-Grey_Default cursor-not-allowed'}`;

  return (
    <textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={['s-textarea', textAreaClasses, disabledClasses, className].join(' ')}
    />
  );
};

export default STextArea;
