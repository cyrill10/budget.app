import { createSelector } from '@ngrx/store';
import { State } from '../../app.module';
import { ClosingProcessState } from './closing-process.reducers';

export const selectClosingProcess = (state: State) => state.closingProcess;

export const selectClosingProcessData = createSelector(
  selectClosingProcess,
  (state: ClosingProcessState) => {
    return state.processData;
  },
);

export const selectScannedTransactions = createSelector(
  selectClosingProcess,
  (state: ClosingProcessState) => {
    return state.scannedTransactions;
  },
);

export const selectTransferDetail = createSelector(
  selectClosingProcess,
  (state: ClosingProcessState) => {
    return state.transferDetails;
  },
);
