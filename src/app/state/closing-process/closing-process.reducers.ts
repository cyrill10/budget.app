import { Action, createReducer, on } from '@ngrx/store';
import {
  finishUploadSuccess,
  getScannedTransactionsSuccess,
  loadProcessDataSuccess,
} from './closing-process.actions';

export interface ClosingProcessState {
  processData: ProcessData;
  scannedTransactions: ScannedTransaction[];
}

export const initialState: ClosingProcessState = {
  processData: undefined,
  scannedTransactions: [],
};

export interface ProcessData {
  year: number;
  month: number;
  uploadStatus: ClosingProcessStatus;
  manualEntryStatus: ClosingProcessStatus;
}

export interface ClosingProcessStatus {
  value: ClosingProcessStatusEnum;
}

export enum ClosingProcessStatusEnum {
  NEW = 0,
  STARTED = 1,
  DONE = 2,
}

export interface ScannedTransaction {
  date: string;
  amount: number;
  cardType: string;
  description: string;
  id: string;
  transactionCreated: boolean;
}

const selectProcessData = createReducer(
  initialState,
  on(loadProcessDataSuccess, finishUploadSuccess, (state, newProcessData) => ({
    ...state,
    processData: newProcessData.data,
  })),
  on(getScannedTransactionsSuccess, (state, scannedTransactions) => ({
    ...state,
    scannedTransactions: scannedTransactions.scannedTransactions,
  }))
);

export function reducer(state: ClosingProcessState, action: Action) {
  return selectProcessData(state, action);
}
