const Calculator = () => {
  return (
    <div className="calculator is-empty is-dropped is-calculatetable">
      <div className="calculator__drag-n-drop">
        <svg className='calculator__drag-n-drop-icon' width="22" height="22" aria-hidden="true">
          <use xlinkHref="#icon-add-image"/>
        </svg>
        <p className='calculator__drag-n-drop-text calculator__drag-n-drop-text--accent'>Перетащите сюда</p>
        <p className='calculator__drag-n-drop-text'>любой элемент из&nbsp;левой панели</p>
      </div>
    </div>
  );
};

export default Calculator;
