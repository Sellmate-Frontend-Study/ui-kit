import React, { useState, useEffect } from 'react';
import colors from '../css/colors';

interface SChipProps {
  initInput: string;
  removeIcon?: string;
  color?: keyof typeof colors;
}

const SChip = ({ initInput, removeIcon, color = 'Grey_Default' }: SChipProps) => {
  const argColor = colors[color] || color;
  const [input, setInput] = useState(initInput);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    setInput(initInput);
  }, [initInput]);

  const handleInput = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    const target = event.target as HTMLSpanElement;
    setInput(target.innerText);

    if (event.key === 'Enter') {
      event.preventDefault();
      target.blur();
    }
  };

  const handleRemove = () => {
    setIsRemoved(true);
  };

  if (isRemoved) {
    return null;
  }

  const basicClasses = `s-chip flex items-center justify-between border rounded-md bg-white px-2 py-1 cursor-pointer hover:border-Grey_Darken-4`;
  const sizeClasses = `w-32 h-12`

  return (
    <div className={[basicClasses, sizeClasses].join(' ')}>
      <span
        className="chip-input flex-grow text-Grey_Darken-4 focus:outline-none"
        role="textbox"
        contentEditable={!!input}
        onKeyDown={handleInput}
        suppressContentEditableWarning={true}
      >
        {input}
      </span>

      <button
        onClick={handleRemove}
        className="text-Grey_Darken-4 ml-2 focus:outline-none"
      >
        {removeIcon || 'X'}
      </button>
    </div>
  );
};

export default SChip;