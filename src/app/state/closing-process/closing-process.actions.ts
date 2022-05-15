import { createAction, props } from '@ngrx/store';
import { ProcessData, ScannedTransaction } from './closing-process.reducers';

export const uploadFile = createAction(
  '[Closing Process] upload File',
  props<{ file: File }>()
);

export const finishUpload = createAction('[Closing Process] finishUpload');

export const getScannedTransactionsSuccess = createAction(
  '[Closing Process] getScannedTransactions sucess',
  props<{ scannedTransactions: ScannedTransaction[] }>()
);

export const loadProcessData = createAction(
  '[Closing Process] loadProcessData'
);

export const loadProcessDataSuccess = createAction(
  '[Closing Process] loadProcessDataSuccess',
  props<{ data: ProcessData }>()
);

export const finishUploadSuccess = createAction(
  '[Closing Process] finishUploadSuccess',
  props<{ data: ProcessData }>()
);

export const loadProcessTransactions = createAction(
  '[Closing Process] showProcessTransactions'
);

export const saveProcessTransactions = createAction(
  '[Closing Process] saveProcessTransactions',
  props<{
    transactionIds: number[];
    creditedAccountId: number;
    debitedAccountId: number;
    throughAccountId: number;
  }>()
);
