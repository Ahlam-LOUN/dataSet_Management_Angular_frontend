import { UserService } from 'src/app/services/user.service';
import { AccountService } from './../../services/account.service';
import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  constructor(
      private authService: AuthService,
      private token: TokenService,
      private account: AccountService,
      private router: Router,
      private toastr: ToastrService,
      private user:UserService

    ) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.login(this.loginForm.value)
        .subscribe(
          res => this.handleResponse(res),
          err => this.toastr.error(
              `Error`,
              'Try to verify your Email or Password!',
              {
                timeOut: 3000,
                positionClass: 'toast-bottom-left'
              }
          ))
  }

  handleResponse(data) {
    this.token.handle(data);
    this.account.changeAuthStatus(true);
    this.user.getUser( this.token.getId()).subscribe(
      value => {
       
        this.account.changeUserStatus(value.admin);
      
      });
    this.toastr.info(
      `Welcome: ${ this.token.getInfos().name }`,
      'You are connected !',
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-left'
      }
    );
    this.router.navigateByUrl('/');
    this.account.changeUserName(this.token.getInfos().name)
  }

}
