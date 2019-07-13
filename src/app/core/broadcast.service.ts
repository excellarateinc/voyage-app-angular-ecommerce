import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user/user.model';

@Injectable()
export class BroadcastService {

  private profileUpdated = new Subject<User>();
  profileUpdated$ = this.profileUpdated.asObservable();

  private getCart = new BehaviorSubject<void>(null);
  getCart$ = this.getCart.asObservable();

  private balanceUpdated = new BehaviorSubject<number>(null);
  balanceUpdated$ = this.balanceUpdated.asObservable();

  private getBalance = new BehaviorSubject<void>(null);
  getBalance$ = this.getBalance.asObservable();

  emitProfileUpdated(user: User) {
    this.profileUpdated.next(user);
  }

  emitGetCart() {
    this.getCart.next(null);
  }

  emitBalanceUpdated(balance: number) {
    this.balanceUpdated.next(balance);
  }

  emitGetBalance() {
    this.getBalance.next(null);
  }
}
