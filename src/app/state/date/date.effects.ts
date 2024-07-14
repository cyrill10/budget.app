import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { loadDateData, loadDateDataSuccess } from './date.actions';
import { DateService } from '../../services/date.service';

@Injectable()
export class DateEffects {
  loadDateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDateData),
      switchMap((_) =>
        this.dateService
          .getMonths()
          .pipe(map((monthList) => loadDateDataSuccess({ monthList }))),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private dateService: DateService,
  ) {}
}
