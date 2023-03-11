import { Mode } from '../../consts';
import { TConstructorAction } from '../../types/actions-types';
import { IConstructorReducer } from '../../types/reducers-types';
import { ActionType } from './action';

export const initialState: IConstructorReducer = {
  mode: Mode.Constructor,
};

export const constructorReducer = (state = initialState, action: TConstructorAction): IConstructorReducer => {
  switch (action.type) {
    case ActionType.ChangeMode:
      return {...state, mode: action.payload};
    default:
      return state;
  }
};
