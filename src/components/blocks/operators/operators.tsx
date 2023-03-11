import Button from '../button/button';

const Operators = () => {
  return (
    <div className="operators">
      <Button type={'operator'} sign={'/'}/>
      <Button type={'operator'} sign={'*'}/>
      <Button type={'operator'} sign={'-'}/>
      <Button type={'operator'} sign={'+'}/>
    </div>
  );
};

export default Operators;
