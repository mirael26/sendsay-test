import { IChangeMode, IDispatchNumber, IDispatchOperator, IGetResult, IResetCalculator } from '../types/actions-types';
import { TModeType } from '../types/data-types';

export const ActionType = {
  ChangeMode: 'changeMode',
  ResetCalculator: 'resetCalculator',
  DispatchNumber: 'dispatchNumber',
  DispatchOperator: 'dispatchOperator',
  GetResult: 'getResult'
} as const;

export const ActionCreator = {
  ChangeMode: (mode: TModeType): IChangeMode => ({
    type: ActionType.ChangeMode,
    payload: mode
  }),
  ResetCalculator: (): IResetCalculator => ({
    type: ActionType.ResetCalculator
  }),
  DispatchNumber: (number: number | '.'): IDispatchNumber => ({
    type: ActionType.DispatchNumber,
    payload: number
  }),
  DispatchOperator: (operator: string): IDispatchOperator => ({
    type: ActionType.DispatchOperator,
    payload: operator
  }),
  GetResult: (): IGetResult => ({
    type: ActionType.GetResult
  }),
};
