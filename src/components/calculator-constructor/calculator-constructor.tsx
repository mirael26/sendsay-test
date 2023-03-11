import Calculator from '../calculator/calculator';
import ModeControl from '../mode-control/mode-control';
import Sidebar from '../sidebar/sidebar';

const CalculatorConstructor = () => {
  return (
    <article className="calculator-constructor">
      <h1 className="visually-hidden">Конструктор калькулятора</h1>
      <header className="calculator-constructor__header">
        <ModeControl/>
      </header>

      <div className="calculator-constructor__content">
        <Sidebar/>
        <Calculator/>
      </div>
    </article>
  );
}

export default CalculatorConstructor;
