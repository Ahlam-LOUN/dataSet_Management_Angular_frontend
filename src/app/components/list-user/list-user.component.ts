import { Component, OnInit } from '@angular/core';
import {  UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  page:number=0;
  limit:number=7;
  totalElements: number = 0;
  loading: boolean;
  user:User=new User();
  users: any[] = [];
  userlist:any; 

  pages: Array<number>;
  constructor( private userS: UserService) {
   }
  
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();    
  deleteMessage=false;  
  isupdated = false;     
  //userlist:any[] = []; 
  search: string= '';
  userForm=new FormGroup({  
    userId:new FormControl(),  
    firstname:new FormControl(),  
    lastname:new FormControl(),  
    email:new FormControl(),
    password:new FormControl() 
  });  
  updateuser(id: string){  
    this.userS.getUser(id)  
      .subscribe(  
        data => {  
          this.userlist=data ;
          
          this.userForm.get("email").setValue( this.userlist.email);
          this.userForm.get("firstname").setValue( this.userlist.firstname);
          this.userForm.get("lastname").setValue( this.userlist.lastname);
          this.userForm.get("userId").setValue( this.userlist.userId);
          this.userForm.get("password").setValue("");
          
          
          console.log(this.userlist.userId); 
               
        },  
        error => console.log(error));  
  }  

// Init DataTable
ngOnInit(): void {
 this.isupdated = false;  
 this.getTodos({ page: "0", limit: "7", search:"", status:"0"})
  } 
  private getTodos(request) {
    this.loading = true;
    this.userS.getAll(request)
      .subscribe(data => {
        this.users = data['content'];
        this.totalElements = data['totalElements'];
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }
 // Next page
  nextPage(event: PageEvent) {
    this.loading = true;
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['limit'] = event.pageSize.toString();
    request['search']=this.search;
    request['status']="0";
    this.searchTitle(request);
  }
 
 // Search Field 
 searchUser(){
  const request = {};
  request['page']=this.page;
  request['limit']=this.limit;
  request['search']=this.search;
  request['status']="0";
  this.searchTitle(request);
 }
 
 searchTitle(request): void {
  this.loading = true;

  
  this.userS.findByTitle(request,this.search)
    .subscribe(
      data => {
        this.users= data['content'];
        this.totalElements = data['totalElements'];
        this.loading = false;
        console.log(data);
      },
      error => {
        console.log(error);
        this.loading = false;
      });
}
 
 
updateUs(updus){  
  this.user=new User();   
 this.user.userId=this.userId.value;  
 this.user.firstname=this.firstname.value;  
 this.user.lastname=this.lastname.value;  
 this.user.email=this.email.value; 
 this.user.password=this.password.value;  

 console.log(this.firstname.value);  
   

 this.userS.updateUserr(this.user.userId,this.user).subscribe(  
  data => {       
    this.isupdated=true;  
    this.getTodos({ page: "0", limit: "7", search:"", status:"0"})
    this.userS.getUserList().subscribe(data =>{  
      this.users =data;
      })  
  },  
  error => console.log(error));  
}  

get firstname(){  
  return this.userForm.get('firstname');  
}  

get lastname(){  
  return this.userForm.get('lastname');
}  

get email(){  
  return this.userForm.get('email');  
}  

get userId(){  
  return this.userForm.get('userId');  
} 
  
get password(){  
  return this.userForm.get('password');  
}  

changeisUpdate(){  
  this.isupdated=false;  
}  

deleteUser(id: string) { 
  this.deleteMessage=false; 
  this.userS.deleteUser(id)  
    .subscribe(  
      data => {  
        console.log(data);  
        this.deleteMessage=true;  
        this.getTodos({ page: "0", limit: "7", search:"", status:"0"})
        this.userS.getUserList().subscribe(data =>{  
          this.users =data  
          })  
      },  
      error => console.log(error));  
}   
 
}
