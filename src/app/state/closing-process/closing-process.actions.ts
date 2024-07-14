import { createAction, props } from '@ngrx/store';
import {
  ProcessData,
  ScannedTransaction,
  TransferDetail,
} from './closing-process.reducers';

export const uploadFile = createAction(
  '[Closing Process] upload File',
  props<{ file: File }>(),
);

export const finishUpload = createAction('[Closing Process] finishUpload');

export const finishTransfer = createAction('[Closing Process] finishTransfer');

export const getScannedTransactionsSuccess = createAction(
  '[Closing Process] getScannedTransactions success',
  props<{ scannedTransactions: ScannedTransaction[] }>(),
);

export const loadTransferDetailsSuccess = createAction(
  '[Closing Process] loadTransferDetails success',
  props<{ transferDetails: TransferDetail[] }>(),
);

export const loadProcessData = createAction(
  '[Closing Process] loadProcessData',
);

export const loadProcessDataSuccess = createAction(
  '[Closing Process] loadProcessDataSuccess',
  props<{ data: ProcessData }>(),
);

export const finishUploadSuccess = createAction(
  '[Closing Process] finishUploadSuccess',
  props<{ data: ProcessData }>(),
);

export const finishTransferSuccess = createAction(
  '[Closing Process] finishTransfer sucess',
  props<{ data: ProcessData }>(),
);

export const loadProcessTransactions = createAction(
  '[Closing Process] showProcessTransactions',
);

export const loadTransferDetails = createAction(
  '[Closing Process] loadTransferDetails',
);

export const saveProcessTransactions = createAction(
  '[Closing Process] saveProcessTransactions',
  props<{
    transactionIds: string[];
    creditedAccountId: string;
    debitedAccountId: string;
    throughAccountId: string;
  }>(),
);
