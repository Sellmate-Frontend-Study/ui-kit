import { useState } from "react";
import { Button } from "../components/Button";
import { FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  label: string;
  options: string[];
  color?: string;
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
  outline?: boolean;
}

export const Dropdown = ({
  label,
  options,
  color = "blue",
  size = "sm",
  disabled = false,
  outline = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex">
        <Button
          label={label}
          onClick={toggleDropdown}
          color={color}
          size={size}
          disabled={disabled}
          outline={outline}
          className={`rounded-r-none ${outline ? "border-r-0" : ""}`}
        />
        <Button
          icon={<FaChevronDown />}
          onClick={toggleDropdown}
          color={color}
          size={size}
          disabled={disabled}
          outline={outline}
          className={`rounded-l-none border-l-0 ${outline ? "border-l-0" : ""}`}
        />
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {options.map((option, index) => (
              <Button
                key={index}
                label={option}
                size={size}
                color="gray"
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};