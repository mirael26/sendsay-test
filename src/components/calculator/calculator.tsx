import { useState } from 'react';
import { Block, Mode } from '../../consts';
import { useAppSelector } from '../../hooks/store-hooks';
import { getMode } from '../../store/selector';
import Display from '../blocks/display/display';
import Numbers from '../blocks/numbers/numbers';
import Operators from '../blocks/operators/operators';
import Result from '../blocks/result/result';

const Calculator = () => {
  const mode = useAppSelector(getMode);

  const [blocks, setBlocks] = useState<Array<string>>([]);
  const [highlightAfter, setHighlightAfter] = useState<number | null>(null);

  const handleDragStart = (evt: React.DragEvent<HTMLDivElement>) => {
    const element = evt.target as HTMLElement;
    element.classList.add('selected');
  };

  const handleDragEnd = (evt: React.DragEvent<HTMLDivElement>) => {
    const element = evt.target as HTMLElement;
    element.classList.remove('selected');
  };

  const handleDragOver = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();

    const druggedElement = document.querySelector('.selected');
    const druggedName = druggedElement?.id;
    const currentElement = evt.target as HTMLElement;
    const currentBlockElement = currentElement.closest('.calculator__block');
    const currentCalculatorElement = currentElement.closest('.calculator');

    if (druggedElement === currentElement) {
      return;
    }

    const isCalculatorEmpty = currentCalculatorElement && blocks.length === 0;
    const isOverBlock = !isCalculatorEmpty && currentBlockElement && currentBlockElement.id;
    const isOverSpace = currentElement.classList.contains('calculator') && !isCalculatorEmpty && !isOverBlock;

    if (isCalculatorEmpty) {
      currentCalculatorElement.classList.add('is-dropped');
    }
    
    if (isOverBlock) {
      if (druggedName === Block.Display) {
        setHighlightAfter(0);
        return;
      }

      if (currentBlockElement.id === Block.Display) {
        setHighlightAfter(1);
        return;
      }

      let index = blocks.findIndex((block) => currentBlockElement.id === block);
      const currentBlockElementCoord = currentBlockElement.getBoundingClientRect();
      const currentBlockElementCenter = currentBlockElementCoord.y + currentBlockElementCoord.height / 2;

      if (evt.clientY > currentBlockElementCenter) {
        index ++;
      }
      setHighlightAfter(index);
    }

    if (isOverSpace) {
      if (druggedName === Block.Display) {
        setHighlightAfter(0);
        return;
      }

      // если drag происходит на пустом пространстве и это не дисплей
      // находим все дочерние элементы родителя и ищем по координатам ближайшего ребенка
      let index;
      const blocks = Array.from(currentElement.children);
      blocks.forEach((block, i) => {
        const blockCoord = block.getBoundingClientRect();
        if (blockCoord.y > evt.clientY) {
          index = i;
          return;
        }
      });

      if (!index) {
        index = blocks.length;
      }
      setHighlightAfter(index);
    }
  };

  const handleDragLeave = (evt: React.DragEvent<HTMLDivElement>) => {
    const currentElement = evt.target as HTMLElement;

    if (currentElement.classList.contains('is-dropped')) {
      currentElement.classList.remove('is-dropped');
    }
    setHighlightAfter(null);
  };
  
  const handleDrop = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    const currentElement = evt.target as HTMLElement;
    const druggedElement = document.querySelector('.selected');
    const droppedName = druggedElement?.id;

    if (blocks.length === 0 && droppedName) { // если блоков нет, вставляем наш элемент
      setBlocks([droppedName]);
    } else if (highlightAfter !== null && droppedName) {
      const existId = blocks.findIndex((block) => block === droppedName); // иначе проверяем, был ли уже такой элемент

      let shift = 0;
      if (existId >= 0 && existId < highlightAfter) { // если был, и он стоит раньше новой позиции - учитываем сдвиг
        shift = -1;
      }
      const newBlocks = blocks.filter((block) => block !== droppedName); // убираем старый элемент
      newBlocks.splice(highlightAfter + shift, 0, droppedName); // вставляем новый на нужное место
      setBlocks(newBlocks);
    }

    const parentDruggedElement = druggedElement?.parentElement;
    if (parentDruggedElement?.classList.contains('sidebar__container')) {
      parentDruggedElement.classList.add('is-disabled');
    }
    if (currentElement.classList.contains('is-dropped')) {
      currentElement.classList.remove('is-dropped');
    }
    setHighlightAfter(null);
  }

  const isCalculatorEmpty = blocks.length === 0;
  const calculatorEmptyClass = isCalculatorEmpty ? ' is-empty' : '';
  const runtimeMod = mode === Mode.Runtime ? ' calculator--runtime' : '';
  const isDraggable = mode === Mode.Constructor;

  return (
    <div className={"calculator" + runtimeMod + calculatorEmptyClass}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >

      {isCalculatorEmpty && (
        <div className="calculator__drag-n-drop">
          <svg className='calculator__drag-n-drop-icon' width="22" height="22" aria-hidden="true">
            <use xlinkHref="#icon-add-image"/>
          </svg>
          <p className='calculator__drag-n-drop-text calculator__drag-n-drop-text--accent'>Перетащите сюда</p>
          <p className='calculator__drag-n-drop-text'>любой элемент из&nbsp;левой панели</p>
        </div>
      )}

      {blocks.map((block, i) => {
        const highlightedClass = highlightAfter === (i + 1) ? ' highlighted' : '';
        const highlightedBeforeClass = highlightAfter === 0 && i === 0 ? ' highlighted highlighted--before' : '';
        const key = `block-${i}`;

        switch (block) {
          case Block.Display:
            return (
              <div key={key} id={Block.Display} className={'calculator__block' + highlightedClass + highlightedBeforeClass}>
                <Display draggable={isDraggable}/>
              </div>
            );
          case Block.Operators:
            return (
              <div key={key} id={Block.Operators} className={'calculator__block' + highlightedClass + highlightedBeforeClass}>
                <Operators draggable={isDraggable}/>
              </div>
            );
          case Block.Numbers:
            return (
              <div key={key} id={Block.Numbers} className={'calculator__block' + highlightedClass + highlightedBeforeClass}>
                <Numbers draggable={isDraggable}/>
              </div>
            );
          case Block.Result:
            return (
              <div key={key} id={Block.Result} className={'calculator__block' + highlightedClass + highlightedBeforeClass}>
                <Result draggable={isDraggable}/>
              </div>
            );
          default:
            return;
        }
      })}
    </div>
  );
};

export default Calculator;
