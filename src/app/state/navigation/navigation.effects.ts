import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  finishUploadSuccess,
  getScannedTransactionsSuccess,
  loadTransferDetailsSuccess,
} from '../closing-process/closing-process.actions';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class NavigationEffects {
  navigateToScannedTransactions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getScannedTransactionsSuccess),
        map((_) => this.route.navigate(['/closingProcess/transactions'])),
      ),
    {
      dispatch: false,
    },
  );

  navigateToTransferDetail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadTransferDetailsSuccess),
        map((_) => this.route.navigate(['/closingProcess/transferDetail'])),
      ),
    {
      dispatch: false,
    },
  );

  navigateClosingProcess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(finishUploadSuccess),
        map((_) => this.route.navigate(['/closingProcess'])),
      ),
    {
      dispatch: false,
    },
  );

  constructor(
    private actions$: Actions,
    private route: Router,
  ) {}
}
