import { TModeType } from './data-types';

export interface IConstructorReducer {
  mode: TModeType;
}

export interface ICalculatorReducer {
  lastOperation: {
    operator: string | null,
    number: string | null
  },
  firstNumber: string | null,
  secondNumber: string | null,
  result: string | number,
  operator: string | null
}
