import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted=false;
  @Output() modalUser = new EventEmitter();
  users: User[]=[];
 constructor( 
  private toastr: ToastrService,
  private user: UserService,
  private router: Router
   ) {}
  
 userError:User;
 isCreate:boolean=false;
 userExist:boolean=false;
 passwordFormat:boolean=false;
 passPattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,12}";
   userForm = new FormGroup({
     email:new FormControl(null,[Validators.required,Validators.email]),
     firstname:new FormControl(null,[Validators.required,Validators.minLength(3)]),
     lastname:new FormControl(null,[Validators.required,Validators.minLength(3)]),
     password:new FormControl(null,[Validators.required,Validators.minLength(8),Validators.pattern(this.passPattern)]),
     admin: new FormControl("false", Validators.required)
   })
  
 ngOnInit(): void {
 
 }



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
          this.router.navigateByUrl('/login');
          this.toastr.info(
    
            'Congratulations your account was created !!',
          
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
        
       }
       if(error.status==403){
        this.isCreate=true;
        this.passwordFormat=true;
        this.userForm.reset();
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
