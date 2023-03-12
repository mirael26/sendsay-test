import { Mode } from '../../../consts';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { ActionCreator } from '../../../store/action';
import { getMode } from '../../../store/selector';

interface IResultProps {
  draggable?: boolean;
}


const Result = ({ draggable = false }: IResultProps) => {
  const mode = useAppSelector(getMode);
  const dispatch = useAppDispatch();
  
  const isDisabledClass = mode === Mode.Runtime ? '' : ' is-disabled';

  return (
    <div className={"result" + isDisabledClass} id="result" draggable={draggable}>
      <button className="result__button" onClick={() => dispatch(ActionCreator.GetResult())}>
        <span>=</span>
      </button>
    </div>
  );
};

export default Result;
