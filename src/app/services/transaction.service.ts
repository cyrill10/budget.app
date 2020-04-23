import { Injectable } from '@angular/core';
import { Transaction } from '../element/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactions: Transaction[] = new Array();

  constructor() { }

  getTransactions() {
    return this.transactions;
  }
}
