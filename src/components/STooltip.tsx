import { useState } from 'react';
import { Arrow16 } from '../assets/ArrowIcon';
import {Close12} from '../assets/CloseIcon'

export interface STooltipProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  useClose?: boolean;
}

const STooltip = ({ position = 'top', children, trigger, useClose }: STooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipPosition = {
    'top': 'bottom-full mb-16pxr left-1/2 transform -translate-x-1/2',  
    'bottom': 'top-full mt-16pxr left-1/2 transform -translate-x-1/2',  
    'left': 'right-full mr-16pxr top-1/2 transform -translate-y-1/2',  
    'right': 'left-full ml-16pxr top-1/2 transform -translate-y-1/2'   
  };

  const tooltipContentClasses = 
    `absolute ${tooltipPosition[position]} w-max px-20pxr py-8pxr text-sm text-white bg-Blue_B_Darken-2 text-sm rounded-md transition-opacity duration-300`;

  const arrowPositionClasses = {
    'top': 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full',
    'bottom': 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full rotate-180',
    'left': 'right-[2px] top-1/2 transform -translate-y-1/2 translate-x-full -rotate-90',  
    'right': 'left-[2px] top-1/2 transform -translate-y-1/2 -translate-x-full rotate-90' 
  };

  return (
    <div  
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {trigger}
      {( 
        isVisible &&
        <div className={[tooltipContentClasses].join(' ')}>
          {useClose && (
            <Close12
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setIsVisible(false)}
            />
          )}
          <div className={`absolute ${arrowPositionClasses[position]}`}>
            <Arrow16 className="w-16pxr h-12pxr text-Blue_B_Darken-2" />
          </div>
          <div className={`${useClose && 'pr-12pxr'}`}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default STooltip;
