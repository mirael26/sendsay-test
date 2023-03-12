import { Mode } from '../../../consts';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { ActionCreator } from '../../../store/action';
import { getMode } from '../../../store/selector';
import { TButtonType } from '../../../types/data-types';

interface IButtonProps {
  type: TButtonType;
  sign: string;
}

const Button = ({type, sign}: IButtonProps) => {
  const mode = useAppSelector(getMode);
  const dispatch = useAppDispatch();

  const displayedSign = sign === '*' ? 'x' : sign;

  const handleBtnClick = () => {
    if (type === 'number' && sign === ',') {
      dispatch(ActionCreator.DispatchNumber('.'));
    }

    if (type === 'number' && sign !== ',') {
      dispatch(ActionCreator.DispatchNumber(+sign));
    }

    if (type === 'operator') {
      dispatch(ActionCreator.DispatchOperator(sign));
    }
  }

  const isDisabledClass = mode === Mode.Runtime ? '' : ' is-disabled';

  return (
    <button className={"button" + isDisabledClass} onClick={handleBtnClick}>
      <span className='button__text'>{displayedSign}</span>
    </button>
  );
};

export default Button;
