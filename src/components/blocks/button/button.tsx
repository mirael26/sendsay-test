import { TButtonType } from '../../../types/data-types';

interface IButtonProps {
  type: TButtonType;
  sign: string;
}

const Button = ({type, sign}: IButtonProps) => {

  const displayedSign = sign === '*' ? 'x' : sign;

  return (
    <button className="button">
      <span className='button__text'>{displayedSign}</span>
    </button>
  );
};

export default Button;
