import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { UserService } from 'app/core/user/user.service';

@Injectable()
export class PublicGuardService implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService) { }

  canActivate(): boolean {
    const authenticated = this.authenticationService.isAuthenticated();
    if (authenticated) {
      this.router.navigate(['store']);
      this.userService.emitUserAuthenticated(true);
      return false;
    }
    this.userService.emitUserAuthenticated(false);
    return true;
  }
}
