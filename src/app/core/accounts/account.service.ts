import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Account } from '../accounts/account.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {
  totalBalance: number = 0;

  constructor(private http: HttpClient) { }

  getUserAccounts(): Observable<Array<Account>> {
    return this.http.get<Array<Account>>(`${environment.API_URL}/banking/accounts`);
  }

  getTotalAccountsBalance(accounts :Array<Account>) {
    accounts.forEach(account => {
      this.totalBalance = +this.totalBalance + +account.balance
    });
    return this.totalBalance;
  }
}
