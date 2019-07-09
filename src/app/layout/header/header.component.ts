import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { AccountService } from 'app/core/accounts/account.service';
import { Account } from 'app/core/accounts/account.model';

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
  accounts: Account[];
  totalBalance = 0;

  constructor(private userService: UserService, private accountService: AccountService) { }

  ngOnInit() {
    this.userService.verificationChanged$
      .subscribe(value => this.isVerificationRequired = value);

    this.userService.authenticationChanged$
      .subscribe(isAuthenticated => {
        if (isAuthenticated != null) {
          this.isAuthenticated = isAuthenticated;
          if (this.isAuthenticated) {
            this.getAccounts();
          }
        }
      });

    this.userService.menuShowing$
      .subscribe(isMenuShowing => this.isMenuShowing = isMenuShowing);
  }

  toggleSidebar(showMenu: boolean): void {
    this.onToggleSidebar.emit();
    this.userService.emitIsMenuShowing(showMenu);
  }

  // TODO: Move into an account balance component.
  private getAccounts(): void {
    this.accountService.getUserAccounts()
      .subscribe(result => {
        this.accounts = result;
        this.totalBalance = this.accountService.getTotalAccountsBalance(result);
      });
  }
}
