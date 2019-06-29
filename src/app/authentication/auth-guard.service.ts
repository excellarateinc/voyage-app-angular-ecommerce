import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { UserService } from 'app/core/user/user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authenticated = this.authenticationService.isAuthenticated();
    if (!authenticated) {
      this.userService.emitUserAuthenticated(false);
      this.router.navigate(['authentication/login'], {
        queryParams: {
          redirectUrl: state.url
        }
      });
      return false;
    }
    this.userService.emitUserAuthenticated(true);
    return true;
  }
}
