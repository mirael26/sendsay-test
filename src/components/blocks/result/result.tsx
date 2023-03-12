interface IResultProps {
  draggable?: boolean;
}


const Result = ({ draggable = false }: IResultProps) => {
  return (
    <div className="result" id="result" draggable={draggable}>
      <button className="result__button">
        <span>=</span>
      </button>
    </div>
  );
};

export default Result;
