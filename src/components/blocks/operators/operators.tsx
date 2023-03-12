import Button from '../button/button';

interface IOperatorsProps {
  draggable?: boolean;
}

const Operators = ({ draggable = false }: IOperatorsProps) => {
  return (
    <div className="operators" id="operators" draggable={draggable}>
      <Button type={'operator'} sign={'/'}/>
      <Button type={'operator'} sign={'*'}/>
      <Button type={'operator'} sign={'-'}/>
      <Button type={'operator'} sign={'+'}/>
    </div>
  );
};

export default Operators;
