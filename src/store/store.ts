import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { constructorReducer } from './reducers/constructor-reducer';

const reducer = combineReducers({construction: constructorReducer});

export const store = configureStore({
  reducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
