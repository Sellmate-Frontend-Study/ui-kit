import colors from '../css/colors';
import RadioCircle from '../assets/RadioCircle';

export interface SRadioProps {
  disabled?: boolean;
  color?: keyof typeof colors;
  className?: string;
  label?: string;
  value?: string;
  checked?: boolean;
  name?: string;
  onClick?: () => void;
}

const SRadio = ({ name, color = 'positive', disabled, value, checked = false, label, onClick}: SRadioProps) => {

  const argColor = colors[color] || color;

  return (
    <div className='flex'>
      <div className={`flex items-center cursor-pointer mb-5 mr-5 group ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
      <input
        type="radio"
        value={value}
        checked={checked}
        disabled={disabled}
        name={name}
        className="hidden"
        readOnly
      />
      <div
        className={`w-4 h-4 border flex items-center justify-center rounded-full 
          ${disabled ? 'bg-Grey_Lighten-4 cursor-not-allowed' : `group-hover:border-[${argColor}]`} 
          ${checked ? ` border-[${argColor}]` : 'border-Grey_Darken-4'}`}
          onClick={onClick} 
      >
        {checked && (
          <RadioCircle color={argColor}/>
        )}
      </div>
      <span onClick={onClick} className={`pl-2 ${disabled ? 'text-bg-Grey_Lighten-4 cursor-not-allowed' : 'text-Grey_Darken-4'}`}>
        {label}
      </span>
    </div>
    </div>
  );
};

export default SRadio;