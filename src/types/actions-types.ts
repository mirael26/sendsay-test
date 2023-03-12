import { ActionType } from '../store/action';
import { TModeType } from './data-types';

export interface IChangeMode {
  type: typeof ActionType.ChangeMode;
  payload: TModeType;
}

export type TConstructorAction = IChangeMode;
