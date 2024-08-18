import { useState } from "react";
import { Button, ButtonProps } from "../components/Button";

interface ButtonGroupProps {
  buttons: ButtonProps[];
  toggleMode?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

export const ButtonGroup = ({
  buttons,
  toggleMode = false,
  size="sm"
}: ButtonGroupProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0); 

  const handleClick = (index: number, onClick?: () => void) => {
    if (toggleMode) {
      setSelectedIndex(index);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      {buttons.map((btn, index) => (
        <Button
          size={size}
          key={index}
          {...btn}
          onClick={() => handleClick(index, btn.onClick)}
          className={`${index === 0 ? "rounded-l-md" : index === buttons.length - 1 ? "rounded-r-md" : "rounded-none"} 
                      ${toggleMode ? (selectedIndex === index ? "bg-opacity-100" : "bg-opacity-50") : ""} 
                      border -ml-px`}
        />
      ))}
    </div>
  );
};