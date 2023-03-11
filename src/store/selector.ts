import { RootState } from './store';

export const getMode = (state: RootState) => state.construction.mode;
