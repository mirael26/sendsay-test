import { TCalculatorAction } from '../../types/actions-types';
import { ICalculatorReducer } from '../../types/reducers-types';
import { calculateNumber, calculateOperator, calculateResult } from '../../utils';
import { ActionType } from '../action';

export const initialState: ICalculatorReducer = {
  lastOperation: {
    operator: null,
    number: null
  },
  firstNumber: null,
  secondNumber: null,
  result: '0',
  operator: null
};

export const calculatorReducer = (state = initialState, action: TCalculatorAction): ICalculatorReducer => {
  switch (action.type) {
    case ActionType.ResetCalculator:
      return initialState;
    case ActionType.DispatchNumber:
      const newStateDispatchedNumber = calculateNumber(action.payload, state);
      return {...state, ...newStateDispatchedNumber};
    case ActionType.DispatchOperator:
      const newStateDispatchedOperator = calculateOperator(action.payload, state);
      return {...state, ...newStateDispatchedOperator};
    case ActionType.GetResult:
      const newStateResulted = calculateResult(state);
      return {...state, ...newStateResulted};
    default:
      return state;
  }
};
