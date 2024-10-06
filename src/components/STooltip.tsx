import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Arrow16 } from '../assets/ArrowIcon';
import { Close12 } from '../assets/CloseIcon';

interface STooltipProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger: React.ReactNode;
  children: React.ReactNode;
  useClose?: boolean;
  usePopover?: boolean; 
}

const STooltip = ({ position = 'top', children, trigger, useClose=false, usePopover = false } : STooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);


  const actualUseClose = usePopover ? true : useClose;
  const updateTooltipPosition = useCallback(() => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = triggerRect.top + window.scrollY - tooltipRef.current.offsetHeight - 16;
          left = triggerRect.left + window.scrollX + triggerRect.width / 2 - tooltipRef.current.offsetWidth / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + window.scrollY + 16;
          left = triggerRect.left + window.scrollX + triggerRect.width / 2 - tooltipRef.current.offsetWidth / 2;
          break;
        case 'left':
          top = triggerRect.top + window.scrollY + triggerRect.height / 2 - tooltipRef.current.offsetHeight / 2;
          left = triggerRect.left + window.scrollX - tooltipRef.current.offsetWidth - 16;
          break;
        case 'right':
          top = triggerRect.top + window.scrollY + triggerRect.height / 2 - tooltipRef.current.offsetHeight / 2;
          left = triggerRect.right + window.scrollX + 16;
          break;
      }

      setTooltipPosition({ top, left });
    }
  }, [position]); 
  
  useEffect(() => {
    if (isVisible) {
      updateTooltipPosition();
    }
  }, [isVisible, position, updateTooltipPosition]);

  const tooltipClasses = 'absolute z-50 w-max px-20pxr py-8pxr text-sm text-white bg-Blue_B_Darken-2 rounded-md transition-opacity duration-300';
  const closeIconClasses = 'absolute top-2 right-2 cursor-pointer';
  const arrowIconClasses = 'w-16pxr h-12pxr text-Blue_B_Darken-2';
  const arrowPositionClasses = {
    top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full',
    bottom: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full rotate-180',
    left: 'right-[2px] top-1/2 transform -translate-y-1/2 translate-x-full -rotate-90',
    right: 'left-[2px] top-1/2 transform -translate-y-1/2 -translate-x-full rotate-90',
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => {
        if (!usePopover) {
          setIsVisible(false);
        }
      }}
    >
      {trigger}
      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
            className={[tooltipClasses].join(' ')}
          >
            {actualUseClose && (
              <Close12
                className={[closeIconClasses].join(' ')}
                onClick={() => setIsVisible(false)}
              />
            )}
            <div className={['absolute', arrowPositionClasses[position]].join(' ')}>
              <Arrow16 className={[arrowIconClasses].join(' ')} />
            </div>
            <div className={`${actualUseClose ? 'pr-12pxr' : ''}`}>{children}</div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default STooltip;
