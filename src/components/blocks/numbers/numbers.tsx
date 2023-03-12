import Button from '../button/button';

interface INumbersProps {
  draggable?: boolean;
}

const Numbers = ({ draggable = false }: INumbersProps) => {
  return (
    <div className="numbers" id="numbers" draggable={draggable}>
      <Button type={'number'} sign={'7'}/>
      <Button type={'number'} sign={'8'}/>
      <Button type={'number'} sign={'9'}/>
      <Button type={'number'} sign={'4'}/>
      <Button type={'number'} sign={'5'}/>
      <Button type={'number'} sign={'6'}/>
      <Button type={'number'} sign={'1'}/>
      <Button type={'number'} sign={'2'}/>
      <Button type={'number'} sign={'3'}/>
      <Button type={'number'} sign={'0'}/>
      <Button type={'number'} sign={','}/>
    </div>
  );
};

export default Numbers;
