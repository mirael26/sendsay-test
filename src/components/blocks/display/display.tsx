import { Mode } from '../../../consts';
import { useAppSelector } from '../../../hooks/store-hooks';
import { getMode } from '../../../store/selector';

interface IDisplayProps {
  draggable?: boolean;
}

const Display = ({ draggable = false }: IDisplayProps) => {
  return (
    <div className="display" id="display" draggable={draggable}>
      <div className="display__container">
        <span>0</span>
      </div>
    </div>
  );
};

export default Display;
