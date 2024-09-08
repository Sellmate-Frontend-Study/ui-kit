import React, { useState, useEffect } from 'react';
import colors from '../css/colors';
import { ChipIcon12 } from '../assets/ChipIcon';

interface SChipProps {
  initInput: string;
  removeIcon?: React.ReactNode;
  color?: keyof typeof colors;
  remove?: boolean;
  inputChange?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl'; 
}

const SChip = ({ initInput, removeIcon, color = 'white', remove = false, inputChange = false, className, size = 'md' }: SChipProps) => {
  const argColor = colors[color] || color;
  const [input, setInput] = useState(initInput);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    setInput(initInput);
  }, [initInput]);

  const handleInput = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (inputChange) {
      const target = event.target as HTMLSpanElement;
      setInput(target.innerText);

      if (event.key === 'Enter') {
        event.preventDefault();
        target.blur();
      }
    }
  };

  const handleRemove = () => {
    if (remove) {
      setIsRemoved(true);
    }
  };

  if (isRemoved) {
    return null;
  }

  const sizeClasses = {
    sm: 'h-8 p-2',  
    md: 'h-10 p-3', 
    lg: 'h-12 p-4', 
    xl: 'h-16 p-5'  
  }[size];

  const chipClasses = `s-chip flex items-center justify-between rounded-md bg-[${argColor}] border hover:border-Grey_Darken-4 ${sizeClasses} ${className}`;
  const chipInputClasses = `s-chip-input flex-grow text-Grey_Darken-4 focus:outline-none`;
  const cursorClasses = `${remove || inputChange ? 'cursor-pointer' : 'cursor-default'}`;

  return (
    <div className={[chipClasses, cursorClasses].join(' ')}>
      <span
        className={chipInputClasses}
        role="textbox"
        contentEditable={!!input && inputChange}
        onKeyDown={handleInput}
        suppressContentEditableWarning={true}
      >
        {input}
      </span>

      <button
        onClick={handleRemove}
        className={['ml-2 focus:outline-none', cursorClasses].join(' ')}
      >
        {removeIcon || <ChipIcon12 />}
      </button>
    </div>
  );
};

export default SChip;