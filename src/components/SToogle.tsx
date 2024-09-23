import { useState, useEffect } from "react";

export interface SToggleProps {
  initToggle?: boolean;
  onChange?: (updatedToggled: boolean) => void; 
  type?: 'switch' | 'button';
  disabled?: boolean;
  className?: string;
  onLabel?: string;  
  offLabel?: string; 
  label?: string;  
}

const SToggle = ({
  disabled = false,
  className = '',
  initToggle = false,
  type = 'switch',
  onLabel = 'on',
  offLabel = 'off',
  label = '',
  onChange, 
}: SToggleProps) => {

  const [isToggled, setIsToggled] = useState(initToggle);

  useEffect(() => {
    setIsToggled(initToggle);
  }, [initToggle]);

  const handleToggle = () => {
    if (!disabled) {
      const updatedToggled = !isToggled;
      setIsToggled(updatedToggled);
      if (onChange) {
        onChange(updatedToggled); 
      }
    }
  };

  const DefaultToggle = `relative inline-flex items-center justify-center w-36pxr h-20pxr rounded-10pxr transition-colors duration-300 overflow-hidden`;
  const disabledStyle = disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer';
  const switchItemStyle = `absolute flex items-center justify-center left-0 m-2pxr w-16pxr h-16pxr bg-white rounded-full transition-transform duration-300 transform ${isToggled && 'translate-x-full'}`;

  const toggleColor = (() => {
    if (type === 'switch') {
      return isToggled
        ? disabled ? 'bg-Blue_C_Lighten-4' : 'bg-positive'
        : disabled ? 'bg-Grey_Lighten-4' : 'bg-Grey_Lighten-2';
    } else {
      return isToggled
        ? 'bg-positive text-white'
        : 'bg-Grey_Lighten-2 text-black';
    }
  })();

  if (type === 'switch') {
    return (
      <div className={`flex items-center ${className}`}>
        {label && <span className="mr-2">{label}</span>}
        <div
          className={[DefaultToggle, disabledStyle, toggleColor].join(' ')}
          onClick={handleToggle}
        >
          <span className={switchItemStyle} />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className={[DefaultToggle, disabledStyle, toggleColor].join(' ')}
        onClick={handleToggle}
      >
        {isToggled ? onLabel : offLabel} 
      </div>
    </div>
  );
};

export default SToggle;
