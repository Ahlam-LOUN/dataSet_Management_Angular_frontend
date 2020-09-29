import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  submitted=false;
   @Output() modalUser = new EventEmitter();
   users: User[]=[];
   isCreate:boolean=false;
   userExist:boolean=false;
   userError:User;
  constructor( 
    private toastr: ToastrService,
    private user: UserService)  { }
    passwordFormat:boolean=false;
    passPattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,12}";
    userForm = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      firstname:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      lastname:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      password:new FormControl(null,[Validators.minLength(8),Validators.pattern(this.passPattern)]),
      admin: new FormControl("false", Validators.required)
    })

  ngOnInit(): void {
  }

  /*createUser(data: User) {
   data.email= this.userForm.get("email").value;  
   data.firstname= this.userForm.get("firstname").value;  
   data.lastname=this.userForm.get("lastname").value;  
   data.password= this.userForm.get("password").value;  
    data.admin=this.userForm.get("admin").value;  
    this.submitted = true;  
    this.user.Save(data)
    .subscribe((res: User) => this.users = [res, ...this.users])
    this.userForm.reset();  
}*/


createUser(data: User) {
  data.email= this.userForm.get("email").value;  
  data.firstname= this.userForm.get("firstname").value;  
  data.lastname=this.userForm.get("lastname").value;  
  data.password= this.userForm.get("password").value;  
   data.admin=this.userForm.get("admin").value;  
   this.submitted = true;  
   this.user.Save(data)
   .subscribe(
     (res: User) =>{ this.users = [res, ...this.users]
          this.isCreate=true;
          this.userExist=false;
          this.userError=new User();
          this.passwordFormat=false;
          this.userForm.reset();
          this.toastr.info(
            'Congratulations your account was created !!',
            '',
      {
        timeOut: 3000,
        positionClass: 'toast-top-left'
      }
          );
        },
     error => 
      {
       this.userError=error.error;
       this.isCreate=false;
       console.log(error);
       if(error.status==500){
        this.isCreate=false;
        this.userExist=true;
        this.toastr.error(
          'User already exist !!',
          'Try it again!',
    {
      timeOut: 3000,
      positionClass: 'toast-battom-left'
    }
        );
       }
       if(error.status==400){
        this.isCreate=false;
        this.passwordFormat=true;
        this.toastr.warning(
          'It is a Warning!!',
          'Try it again!',
    {
      timeOut: 3000,
      positionClass: 'toast-battom-left'
    }
        );
       }

      }
  )
     ;
   
}
  addUserForm(){  
    this.submitted=false;  
    this.userForm.reset();  
  }  
 


}
