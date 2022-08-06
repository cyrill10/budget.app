import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTransferDetail } from '../../../state/closing-process/closing-process.selectors';
import { TransferDetail } from '../../../state/closing-process/closing-process.reducers';
import { Observable } from 'rxjs';
import { selectSelectedDate } from '../../../state/date/date.selectors';
import { finishTransfer } from '../../../state/closing-process/closing-process.actions';

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.scss'],
})
export class TransferDetailsComponent implements OnInit {
  constructor(private route: Router, private store: Store) {}

  transferDetails$: Observable<TransferDetail[]>;
  currentMonth$: Observable<Date>;
  displayedColumns: string[] = ['name', 'amount'];

  ngOnInit() {
    this.currentMonth$ = this.store.select(selectSelectedDate);
    this.transferDetails$ = this.store.select(selectTransferDetail);
  }

  navigateToToProcess() {
    this.route.navigate(['/closingProcess']);
  }

  finishTransfer() {
    this.store.dispatch(finishTransfer());
  }
}
