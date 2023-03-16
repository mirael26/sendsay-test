import { Block } from './consts';
import { ICalculatorReducer } from './types/reducers-types';

export const getIndexByElementCenter = (blocks: Array<string>, currentBlock: Element, clientY: number): number => {
  let index = blocks.findIndex((block) => currentBlock.id === block);
  const currentBlockCoord = currentBlock.getBoundingClientRect();
  const currentBlockCenter = currentBlockCoord.y + currentBlockCoord.height / 2;

  if (clientY > currentBlockCenter) {
    index ++;
  }
  return index;
};

export const getClosestBlockIndex = (element: HTMLElement, clientY: number): number => {
  let index;
  const blocks = Array.from(element.children);
  index = blocks.findIndex((block, i) => {
    const blockCoord = block.getBoundingClientRect();
    return blockCoord.y > clientY;
  });

  if (index === 0 && blocks[0].id === Block.Display) {
    return 1;
  }

  return index !== -1 ? index : blocks.length;
};

export const getUpdatedBlocks = (blocks: Array<string>, newBlock: string, highlightAfter: number | null): Array<string> => {
  if (blocks.length === 0) { // если блоков нет, вставляем наш элемент
    return [newBlock];
  }

  if (highlightAfter !== null) {
    const existId = blocks.findIndex((block) => block === newBlock); // иначе проверяем, был ли уже такой элемент

    let shift = 0;
    if (existId >= 0 && existId < highlightAfter) { // если был, и он стоит раньше новой позиции - учитываем сдвиг
      shift = -1;
    }

    let newBlocks;
    if (existId >= 0) {
      newBlocks = blocks.filter((block) => block !== newBlock); // убираем старый элемент, если он был
    } else {
      newBlocks = blocks.slice(); // либо просто копируем исходный массив
    }

    newBlocks.splice(highlightAfter + shift, 0, newBlock); // вставляем новый на нужное место
    return newBlocks;
  }

  return blocks;
};

export const formatResult = (result: string | number) => {
  if (result === Infinity) {
    return result;
  }

  if (typeof result === 'string' && result[0] === '.') {
    return '0' + result;
  }

  if (typeof result === 'number') {
    const resultString = result.toString();
    resultString.replace(/./g, '');
    if (resultString.length > 16) {
      const roundingCount = 16 - Math.trunc(result).toString().length;
      return result.toFixed(roundingCount);
    }
    return result;
  }

  return result;
};

const calculate = (firstNumberString: string, secondNumberString: string, operator: string) => {
  const firstNumber = firstNumberString === '.' ? 0 : +firstNumberString;
  const secondNumber = secondNumberString === '.' ? 0 : +secondNumberString;
  switch (operator) {
    case '+':
      return firstNumber + secondNumber;
    case '-':
      return firstNumber - secondNumber;
    case '*':
      return firstNumber * secondNumber;
    case '/':
      return firstNumber / secondNumber;
    default:
      return;
  };
};

export const calculateNumber = (newNumber: number | '.', state: ICalculatorReducer) => {
  const {secondNumber, operator} = state;
  const newState: {[key: string]: any} = {};

  if (secondNumber === null) {
    newState.result = newNumber.toString();
    newState.secondNumber = newNumber.toString();
    if (!operator) {
      newState.firstNumber = null;
    }
  } else {
    newState.secondNumber = secondNumber + newNumber.toString();
    newState.result = newState.secondNumber;
  }

  return newState;
};

export const calculateOperator = (newOperator: string, state: ICalculatorReducer) => {
  const {firstNumber, secondNumber, operator} = state;
  const newState: {[key: string]: any} = {};

  if (operator) {
    if (secondNumber === null && firstNumber !== null) {
      newState.operator = newOperator;
      newState.lastOperation = { operator: null, number: null };
    } else if (firstNumber !== null && secondNumber !== null) {
      newState.result = calculate(firstNumber, secondNumber, operator);
      newState.firstNumber = newState.result;
      newState.secondNumber = null;
      newState.operator = newOperator;
      newState.lastOperation = { operator: null, number: null };
    }
  } else {
    if (firstNumber === null && secondNumber === null) {
      newState.firstNumber = 0;
      newState.operator = newOperator;
      newState.result = 0;
      newState.lastOperation = { operator: null, number: null };
    } else if (firstNumber === null && secondNumber !== null) {
      newState.firstNumber = secondNumber;
      newState.secondNumber = null;
      newState.operator = newOperator;
      newState.lastOperation = { operator: null, number: null };
    } else if (firstNumber !== null && secondNumber === null) {
      newState.operator = newOperator;
      newState.lastOperation = { operator: null, number: null };
    }
  }

  return newState;
};

export const calculateResult = (state: ICalculatorReducer) => {
  const {lastOperation, firstNumber, secondNumber, operator} = state;
  const newState: {[key: string]: any} = {};

  if (operator) {
    if (secondNumber !== null && firstNumber !== null) {
      newState.lastOperation = { operator: operator, number: secondNumber };
      newState.result = calculate(firstNumber, secondNumber, operator);
      newState.firstNumber = newState.result;
      newState.secondNumber = null;
      newState.operator = null;
    } else if (firstNumber !== null && secondNumber === null) {
      if (lastOperation.number !== null && lastOperation.operator !== null) {
        newState.result = calculate(firstNumber, lastOperation.number, lastOperation.operator);
        newState.firstNumber = newState.result;
        newState.secondNumber = null;
        newState.operator = null;
      } else {
        newState.lastOperation = { operator: operator, number: firstNumber };
        newState.result = calculate(firstNumber, firstNumber, operator);
        newState.firstNumber = newState.result;
        newState.secondNumber = null;
        newState.operator = null;
      }
    }
  } else if (firstNumber !== null && secondNumber === null && lastOperation.number !== null && lastOperation.operator !== null) {
    newState.result = calculate(firstNumber, lastOperation.number, lastOperation.operator);
    newState.firstNumber = newState.result;
    newState.secondNumber = null;
    newState.operator = null;
  }

  return newState;
};
