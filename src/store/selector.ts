import { formatResult } from '../utils';
import { RootState } from './store';

export const getMode = (state: RootState) => state.construction.mode;
export const getResult = (state: RootState) => formatResult(state.calculator.result);
