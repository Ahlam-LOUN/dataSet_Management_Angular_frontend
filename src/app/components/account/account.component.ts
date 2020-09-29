import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  
  public loggedIn: boolean = false;
  public userInfos: any = null;
  
  constructor(
    private account: AccountService,
    private user: UserService,
    private router: Router,
    private Token: TokenService,
    private toastr: ToastrService,
    private authService: AuthService) { }

    loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
   accountForm = new FormGroup({
     email:new FormControl(null,Validators.required),
     firstname:new FormControl(null,[Validators.required,Validators.minLength(3)]),
     lastname:new FormControl(null,[Validators.required,Validators.minLength(3)]),
     password:new FormControl(null,[Validators.minLength(8),Validators.maxLength(12)]),
   })

   ngOnInit(): void {
    this.account.authStatus.subscribe(value => {
      this.loggedIn = value
      this.userInfos = this.Token.getInfos();
      this.accountForm.get("email").setValue(this.userInfos.sub);
      this.accountForm.get("firstname").setValue(this.userInfos.firstname);
      this.accountForm.get("lastname").setValue(this.userInfos.lastname);
      this.accountForm.get("password").setValue('');
    
    });
  }
  update(){  
    this.user.updateUser(this.accountForm.value)
      .subscribe(  
        res => this.handleResponse(res),
      err => this.toastr.error(
       
          `Erreur`,
          'Merci de Vérifier votre mot de passe !',
          {
            timeOut: 3000,
            positionClass: 'toast-bottom-left'
          }
       
      ))
  }  
  handleResponse(data) {
    //  this.token.handle(data);
    
   this.loginForm.get("email").setValue(this.accountForm.value.email);
   this.loginForm.get("password").setValue(this.accountForm.value.password);

   this.authService.login(this.loginForm.value)
   .subscribe(
     res =>  {this.Token.handle(res);
     this.account.changeUserName(this.Token.getInfos().name);
    },
     
     err =>  console.log(err)
     )
    this.toastr.info(

      ``,
      'Your Data was Updated with success !',
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-left'
      }
    );
    this.router.navigateByUrl('/account');
  }

}
