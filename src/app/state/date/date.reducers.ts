import { Action, createReducer, on } from '@ngrx/store';
import { loadDateDataSuccess, updateSelectedDate } from './date.actions';

export interface DateState {
  selectedDate: Date;
  monthList: Date[];
}

export const initialState: DateState = {
  selectedDate: undefined,
  monthList: [],
};

const dateReducer = createReducer(
  initialState,
  on(updateSelectedDate, (state, { selectedDate }) => ({
    ...state,
    selectedDate,
  })),
  on(loadDateDataSuccess, (state, { monthList }) => {
    const now = new Date();
    const currentDate = monthList.find(
      (month) =>
        month.getMonth() === now.getMonth() &&
        month.getFullYear() === now.getFullYear()
    );
    return {
      ...state,
      selectedDate: currentDate,
      monthList,
    };
  })
);

export function reducer(state: DateState, action: Action) {
  return dateReducer(state, action);
}
