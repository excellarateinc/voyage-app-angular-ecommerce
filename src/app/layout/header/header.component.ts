import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { AccountService } from 'app/shared/accounts/account.service';
import { BroadcastService } from 'app/core/broadcast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  isMobile = false;
  @Input()
  isAuthenticated = false;
  @Output() onToggleSidebar = new EventEmitter<void>();
  isVerificationRequired = false;
  isMenuShowing = false;
  totalBalance = 0;

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.userService.verificationChanged$
      .subscribe(value => this.isVerificationRequired = value);

    this.userService.authenticationChanged$
      .subscribe(isAuthenticated => {
        if (isAuthenticated != null) {
          this.isAuthenticated = isAuthenticated;
          this.getAccounts();
        }
      });

    this.userService.menuShowing$
      .subscribe(isMenuShowing => this.isMenuShowing = isMenuShowing);

    this.broadcastService.getBalance$.subscribe(() => {
      this.getAccounts();
    });
  }

  toggleSidebar(showMenu: boolean): void {
    this.onToggleSidebar.emit();
    this.userService.emitIsMenuShowing(showMenu);
  }

  // TODO: Move into an account balance component.
  private getAccounts(): void {
    if (!this.isAuthenticated) {
      return;
    }
    this.totalBalance = 0;
    this.accountService.getUserAccounts()
      .subscribe(accounts => {
        // We're just supporting one account right now. Grab the first result.
        const account = accounts[0];
        this.totalBalance = account.balance;
        this.broadcastService.emitBalanceUpdated(this.totalBalance);
      });
  }
}
