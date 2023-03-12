import { useAppSelector } from '../../../hooks/store-hooks';
import { getMode, getResult } from '../../../store/selector';

interface IDisplayProps {
  draggable?: boolean;
}

const Display = ({ draggable = false }: IDisplayProps) => {
  const result = useAppSelector(getResult);

  const displayedResult = result === Infinity ? 'Не определено' : result;
  const smallTextClass = displayedResult === 'Не определено' ? ' display__container--small-text' : '';

  return (
    <div className="display" id="display" draggable={draggable}>
      <div className={"display__container" + smallTextClass}>
        <span>{displayedResult}</span>
      </div>
    </div>
  );
};

export default Display;
