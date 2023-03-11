import { IChangeMode } from '../../types/actions-types';
import { TModeType } from '../../types/data-types';

export const ActionType = {
  ChangeMode: 'changeMode'
} as const;

export const ActionCreator = {
  ChangeMode: (mode: TModeType): IChangeMode => ({
    type: ActionType.ChangeMode,
    payload: mode,
  }),
};

