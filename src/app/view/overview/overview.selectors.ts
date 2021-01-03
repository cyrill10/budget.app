import {createSelector} from '@ngrx/store';
import {OverviewState} from './overview.reducers';

export const selectOverview = (state: AppState) => state;

export interface AppState {
  overview: OverviewState;
}

export const selectSelectedMonth = createSelector(
  selectOverview,
  (state: AppState) => {
    return state.overview.selectedMonth;
  }
);
