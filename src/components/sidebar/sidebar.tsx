import { Mode } from '../../consts';
import { useAppSelector } from '../../hooks/store-hooks';
import { getMode } from '../../store/selector';
import Display from '../blocks/display/display';
import Numbers from '../blocks/numbers/numbers';
import Operators from '../blocks/operators/operators';
import Result from '../blocks/result/result';

const Sidebar = () => {
  const mode = useAppSelector(getMode);

  const handleDragStart = (evt: React.DragEvent<HTMLDivElement>) => {
    const element = evt.target as HTMLElement;
    element.classList.add('selected');
  };

  const handleDragEnd = (evt: React.DragEvent<HTMLDivElement>) => {
    const element = evt.target as HTMLElement;
    element.classList.remove('selected');
  };

  const hiddenClass = mode === Mode.Runtime ? ' is-hidden' : '';

  return (
    <div className={"sidebar" + hiddenClass} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="sidebar__container">
        <Display draggable={true}/>
      </div>
      <div className="sidebar__container">
        <Operators draggable={true}/>
      </div>
      <div className="sidebar__container">
        <Numbers draggable={true}/>
      </div>
      <div className="sidebar__container">
        <Result draggable={true}/>
      </div>
    </div>
  );
};

export default Sidebar;
