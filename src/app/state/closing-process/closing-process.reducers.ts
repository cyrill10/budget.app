import { Action, createReducer, on } from '@ngrx/store';
import {
  finishTransferSuccess,
  finishUploadSuccess,
  getScannedTransactionsSuccess,
  loadProcessDataSuccess,
  loadTransferDetailsSuccess,
} from './closing-process.actions';

export interface ClosingProcessState {
  processData: ProcessData;
  scannedTransactions: ScannedTransaction[];
  transferDetails: TransferDetail[];
}

export const initialState: ClosingProcessState = {
  processData: undefined,
  scannedTransactions: [],
  transferDetails: [],
};

export interface ProcessData {
  year: number;
  month: number;
  uploadStatus: ClosingProcessStatus;
  manualEntryStatus: ClosingProcessStatus;
  transferStatus: ClosingProcessStatus;
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

export interface TransferDetail {
  name: string;
  amount: number;
}

const selectProcessData = createReducer(
  initialState,
  on(
    loadProcessDataSuccess,
    finishUploadSuccess,
    finishTransferSuccess,
    (state, newProcessData) => ({
      ...state,
      processData: newProcessData.data,
    }),
  ),
  on(getScannedTransactionsSuccess, (state, scannedTransactions) => ({
    ...state,
    scannedTransactions: scannedTransactions.scannedTransactions,
  })),
  on(loadTransferDetailsSuccess, (state, transferDetails) => ({
    ...state,
    transferDetails: transferDetails.transferDetails,
  })),
);

export function reducer(state: ClosingProcessState, action: Action) {
  return selectProcessData(state, action);
}
