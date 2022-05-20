import { createAction, props } from '@ngrx/store';

export const updateSelectedDate = createAction(
  '[Date] update selected Date',
  props<{ selectedDate: Date }>()
);

export const loadDateData = createAction('[Date] load Date data');

export const loadDateDataSuccess = createAction(
  '[Date] load Date data success',
  props<{ monthList: Date[] }>()
);
