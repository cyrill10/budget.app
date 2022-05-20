import { createSelector } from '@ngrx/store';
import { DateState } from './date.reducers';
import { State } from '../../app.module';

export const selectDateState = (state: State) => state.date;

export const selectSelectedDate = createSelector(
  selectDateState,
  (state: DateState) => state.selectedDate
);

export const selectMonthList = createSelector(
  selectDateState,
  (state: DateState) => {
    return state.monthList;
  }
);
