import { Transaction } from './transaction.model';

export class Account {
  accountId: string;
  accountNumber: string;
  name: string;
  type: string;
  balance: number;
  transactions: Array<Transaction>;
}
