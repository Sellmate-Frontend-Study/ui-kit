export interface ButtonProps {
 /**
  * How large should the button be?
  */
 size?: 'xs' | 'sm' | 'md' | 'lg';
 /**
  * What background color to use
  */
 color?: string;
 /**
  * Did you use Button hover style?
  */
 noHover?: boolean;
 /**
  * Button contents
  */
 label?: string;
 /**
  * Optional click handler
  */
 onClick?: () => void;
 /**
  * Button ClassName
  */
 className?: string;
 /**
  * Button type
  */
 type?: HTMLButtonElement['type'];
 /**
  * Button Outline
  */
 outline?: boolean;
 /**
  * Button Icon
  */
 icon?: string;
}

export const Button = ({
 size = 'sm',
 color = 'Blue_B_Default',
 type = 'button',
 label,
 ...props
}: ButtonProps) => {
 const btnColor = `bg-[]`
 return (
  <button
   className={['s-button font-Pretendard'].join(' ')}
   {...props}
  >
   {label}
  </button>
 );
};
