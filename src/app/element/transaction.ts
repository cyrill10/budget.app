import { VirtualAccount } from './virtualaccount';
import { PaymentType } from './paymenttype';
import { Indication } from './indication';
import { Status } from './status';

export class Transaction {
    id: number;
    date: Date;
    description: string;
    creditedAccount: VirtualAccount;
    debitedAccount: VirtualAccount;
    paymentType: PaymentType;
    indication: Indication;
    paymentStatus: Status;
    budgetedAmount: number;
    effectiveAmount: number;
}
