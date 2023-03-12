import { ActionType } from '../store/action';
import { TModeType } from './data-types';

export interface IChangeMode {
  type: typeof ActionType.ChangeMode;
  payload: TModeType;
}

export interface IResetCalculator {
  type: typeof ActionType.ResetCalculator;
}

export interface IDispatchNumber {
  type: typeof ActionType.DispatchNumber;
  payload: number | '.';
}

export interface IDispatchOperator {
  type: typeof ActionType.DispatchOperator;
  payload: string;
}

export interface IGetResult {
  type: typeof ActionType.GetResult;
}

export type TConstructorAction = IChangeMode;
export type TCalculatorAction = IResetCalculator | IDispatchNumber | IDispatchOperator | IGetResult;
