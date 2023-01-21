import { VirtualAccount } from './virtualaccount';
import { PaymentType } from './paymenttype';
import { Transaction } from './transaction';

export class ReoccurringTransaction {
  id: string;
  description: string;
  creditedAccount: VirtualAccount;
  debitedAccount: VirtualAccount;
  paymentType: PaymentType;
  amount: number;
  creationDate: Date;
  occurringMonths: number[];
  transactions: Transaction[];
}
