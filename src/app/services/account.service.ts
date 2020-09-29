
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  private isAdmin = new BehaviorSubject<boolean>(false);
  private userName = new BehaviorSubject<String>("");
  authStatus = this.loggedIn.asObservable();
  userStatus = this.isAdmin.asObservable();
  user=this.userName.asObservable();

  constructor(private Token: TokenService) { }

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }
  changeUserStatus(value:boolean) {
    this.isAdmin.next(value);
   }
   changeUserName(value:string) {
     this.userName.next(value);
   }
}
