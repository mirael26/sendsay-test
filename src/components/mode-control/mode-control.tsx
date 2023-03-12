import { Mode } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { ActionCreator } from '../../store/action';
import { getMode } from '../../store/selector';
import { TModeType } from '../../types/data-types';

const ModeControl = () => {
  const currentMode = useAppSelector(getMode);
  const dispatch = useAppDispatch();

  const handleModeButtonClick = (mode: TModeType) => {
    if (currentMode !== mode) {
      dispatch(ActionCreator.ChangeMode(mode));
    }
  }

  const runtimeButtonActiveClass = currentMode === Mode.Runtime ? ' is-active' : '';
  const constructorButtonActiveClass = currentMode === Mode.Constructor ? ' is-active' : '';

  return (
    <div className="mode-control">
      <button className={"mode-control__button" + runtimeButtonActiveClass} onClick={() => handleModeButtonClick(Mode.Runtime)}>
        <svg width="18" height="14" aria-hidden="true">
          <use xlinkHref="#icon-eye"/>
        </svg>
        <span>{Mode.Runtime}</span>
      </button>

      <button className={"mode-control__button" + constructorButtonActiveClass} onClick={() => handleModeButtonClick(Mode.Constructor)}>
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#icon-selector"/>
        </svg>
        <span>{Mode.Constructor}</span>
      </button>
    </div>
  );
};

export default ModeControl;
