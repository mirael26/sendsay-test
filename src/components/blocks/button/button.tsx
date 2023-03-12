import { useAppDispatch } from '../../../hooks/store-hooks';
import { ActionCreator } from '../../../store/action';
import { TButtonType } from '../../../types/data-types';

interface IButtonProps {
  type: TButtonType;
  sign: string;
}

const Button = ({type, sign}: IButtonProps) => {
  const dispatch = useAppDispatch();

  const displayedSign = sign === '*' ? 'x' : sign;

  const handleBtnClick = () => {
  }

  return (
    <button className="button" onClick={handleBtnClick}>
      <span className='button__text'>{displayedSign}</span>
    </button>
  );
};

export default Button;
