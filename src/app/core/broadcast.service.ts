import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { User } from './user/user.model';

@Injectable()
export class BroadcastService {

  private profileUpdated = new Subject<User>();
  profileUpdated$ = this.profileUpdated.asObservable();

  private getCart = new ReplaySubject<void>();
  getCart$ = this.getCart.asObservable();

  private balanceUpdated = new ReplaySubject<number>();
  balanceUpdated$ = this.balanceUpdated.asObservable();

  private getBalance = new ReplaySubject<void>();
  getBalance$ = this.getBalance.asObservable();

  emitProfileUpdated(user: User) {
    this.profileUpdated.next(user);
  }

  emitGetCart() {
    this.getCart.next();
  }

  emitBalanceUpdated(balance: number) {
    this.balanceUpdated.next(balance);
  }

  emitGetBalance() {
    this.getBalance.next();
  }
}
