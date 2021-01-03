import {Action, createReducer, on} from '@ngrx/store';
import {selectMonth} from './overview.actions';

export interface OverviewState {
  selectedMonth: number;
}

export const initialState: OverviewState = {
  selectedMonth: 0
};


const selectMonthReducer = createReducer(
  initialState,
  on(selectMonth, (state, {month}) => ({
    ...state,
      selectedMonth: month
    })
  )
);

 export function reducer(state: OverviewState, action: Action) {
  return selectMonthReducer(state, action);
}
