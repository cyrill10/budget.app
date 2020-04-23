import { VirtualAccount } from './virtualaccount';
import { PaymentType } from './paymenttype';
import { Indication } from './indication';
import { Status } from './status';

export class Transaction {
    id: number;
    date: Date;
    creditedAccount: VirtualAccount;
    debitedAccount: VirtualAccount;
    paymentType: PaymentType;
    indication: Indication;
    status: Status;
    budgetedAmount: number;
    effectiveAmount: number;

    constructor(id: number, date: Date, creditedAccount: VirtualAccount, debitedAccount: VirtualAccount,
                paymentType: PaymentType, indication: Indication, status: Status, budgetedAmount: number, effectiveAmount: number) {
        this.id = id;
        this.date = date;
        this.creditedAccount = creditedAccount;
        this.debitedAccount = debitedAccount;
        this.paymentType = paymentType;
        this.indication = indication;
        this.status = status;
        this.budgetedAmount = budgetedAmount;
        this.effectiveAmount = effectiveAmount;
    }
}
