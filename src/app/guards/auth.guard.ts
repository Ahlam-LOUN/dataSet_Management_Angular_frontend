import { AccountService } from './../services/account.service';
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public loggedIn: boolean = false;
  constructor(
    private tokenService: TokenService,
    private accountService: AccountService,
    private router: Router
  ) {

  }

  canActivate(
  

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      this.accountService.authStatus.subscribe(value => {
        this.loggedIn = value
       
      });


      if(!this.loggedIn) {
       
        this.router.navigateByUrl('/login');
        this.tokenService.remove();
        this.accountService.changeAuthStatus(false);
        return false;
     }
     console.warn('ok')
     return true;
  }

}
