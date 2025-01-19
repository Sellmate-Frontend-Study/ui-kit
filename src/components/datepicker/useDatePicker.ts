import { useState, useEffect, useRef } from 'react';

export const useDatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputRef.current?.contains(event.target as Node) ||
      calendarRef.current?.contains(event.target as Node)
    ) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY + rect.height + 4,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  return { isOpen, setIsOpen, position, inputRef, calendarRef };
};
