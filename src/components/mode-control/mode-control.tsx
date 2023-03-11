import { Mode } from '../../consts';

const ModeControl = () => {
  return (
    <div className="mode-control">
      <button className="mode-control__button is-active">
        <svg width="18" height="14" aria-hidden="true">
          <use xlinkHref="#icon-eye"/>
        </svg>
        <span>{Mode.Runtime}</span>
      </button>

      <button className="mode-control__button">
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#icon-selector"/>
        </svg>
        <span>{Mode.Constructor}</span>
      </button>
    </div>
  );
};

export default ModeControl;