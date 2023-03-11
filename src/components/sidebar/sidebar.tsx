import Display from '../blocks/display/display';
import Numbers from '../blocks/numbers/numbers';
import Operators from '../blocks/operators/operators';
import Result from '../blocks/result/result';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <Display/>
      </div>
      <div className="sidebar__container">
        <Operators/>
      </div>
      <div className="sidebar__container">
        <Numbers/>
      </div>
      <div className="sidebar__container">
        <Result/>
      </div>
    </div>
  );
};

export default Sidebar;
