export interface ButtonProps {
  size?: "xs" | "sm" | "md" | "lg";
  color?: string;
  label?: string;
  disabled?: boolean;
  noHover?: boolean;
  type?: HTMLButtonElement["type"];
  outline?: boolean;
  onClick?: () => void;
  icon?: JSX.Element; 
  className ?:string
}

export const Button = ({
  size = "sm",
  color = "blue",
  label = "button",
  disabled = false,
  noHover = false,
  outline = false,
  className = "",
  icon,
  onClick,
}: ButtonProps) => {

  const colorClasses: { [key: string]: string } = {
    red: "bg-red-500 text-white border-red-500",
    blue: "bg-blue-500 text-white border-blue-500",
    green: "bg-green-500 text-white border-green-500",
  };

  const outlineClasses = outline ? `bg-transparent text-${color} border border-${color}-500` : colorClasses[color];
  const sizeClasses = {
    xs: "text-xs py-1 px-3 rounded-sm",
    sm: "text-sm py-2 px-4 rounded",
    md: "text-base py-3 px-6 rounded-md",
    lg: "text-lg py-4 px-8 rounded-lg",
  };
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  const hoverClasses = noHover ? "" : "hover:bg-opacity-90";

  return (
    <button
      className={`${outlineClasses} ${sizeClasses[size]} ${disabledClasses} ${hoverClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon || label }
    </button>
  );
};