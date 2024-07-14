import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  finishTransfer,
  finishTransferSuccess,
  finishUpload,
  finishUploadSuccess,
  getScannedTransactionsSuccess,
  loadProcessData,
  loadProcessDataSuccess,
  loadProcessTransactions,
  loadTransferDetails,
  loadTransferDetailsSuccess,
  saveProcessTransactions,
  uploadFile,
} from './closing-process.actions';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  ClosingProcessService,
  SaveTransactionDto,
} from '../../services/closing-process.service';
import { Store } from '@ngrx/store';
import { selectSelectedDate } from '../date/date.selectors';

@Injectable()
export class ClosingProcessEffects {
  uploadPdf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadFile),
      withLatestFrom(this.store.select(selectSelectedDate)),
      switchMap(([action, date]) =>
        this.closingProcessService
          .uploadPdf(action.file, date)
          .pipe(
            map((scannedTransactions) =>
              getScannedTransactionsSuccess({ scannedTransactions }),
            ),
          ),
      ),
    ),
  );
  loadProcessData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProcessData),
      withLatestFrom(this.store.select(selectSelectedDate)),
      filter(([_, date]) => !!date),
      switchMap(([_, date]) =>
        this.closingProcessService
          .loadProcessData(date)
          .pipe(map((result) => loadProcessDataSuccess({ data: result }))),
      ),
    ),
  );

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProcessTransactions),
      withLatestFrom(this.store.select(selectSelectedDate)),
      switchMap(([_, date]) =>
        this.closingProcessService
          .loadProcessTransactions(date)
          .pipe(
            map((scannedTransactions) =>
              getScannedTransactionsSuccess({ scannedTransactions }),
            ),
          ),
      ),
    ),
  );

  loadTransferDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTransferDetails),
      withLatestFrom(this.store.select(selectSelectedDate)),
      switchMap(([_, date]) =>
        this.closingProcessService
          .loadTransferDetails(date)
          .pipe(
            map((transferDetails) =>
              loadTransferDetailsSuccess({ transferDetails }),
            ),
          ),
      ),
    ),
  );

  saveProcessTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveProcessTransactions),
      switchMap((action) => {
        const body = {
          ...action,
        } as SaveTransactionDto;
        return this.closingProcessService
          .saveProcessTransactions(body)
          .pipe(map(() => loadProcessTransactions()));
      }),
    ),
  );

  finishUpload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(finishUpload),
      withLatestFrom(this.store.select(selectSelectedDate)),
      filter(([_, date]) => !!date),
      switchMap(([_, date]) =>
        this.closingProcessService
          .closeFileUpload(date)
          .pipe(map((result) => finishUploadSuccess({ data: result }))),
      ),
    ),
  );

  finishTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(finishTransfer),
      withLatestFrom(this.store.select(selectSelectedDate)),
      filter(([_, date]) => !!date),
      switchMap(([_, date]) =>
        this.closingProcessService
          .finishTransfer(date)
          .pipe(map((result) => finishTransferSuccess({ data: result }))),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private closingProcessService: ClosingProcessService,
    private store: Store,
  ) {}
}
