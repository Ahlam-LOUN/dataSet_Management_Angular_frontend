
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { WorkflowUsersComponent } from '../workflow-users/workflow-users.component';
import { Workflow } from 'src/app/models/workflow';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User = null;
  deleteMessage=false; 
  out:boolean=false;
  constructor(private userS: UserService,
              private listUsers: WorkflowUsersComponent,
              private _Activatedroute:ActivatedRoute,
              private _router:Router) { }

  sub;
   workflowId;
   ngOnInit() {   

               this.sub=this._Activatedroute.paramMap.subscribe(params => { 
                console.log(params);
                this.workflowId = params.get('workflowId'); }); }


                

  deleteUserfromwork(workflowId: string,userId:string) {  
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params);
      workflowId = params.get('workflowId'); });
    this.userS.deleteUserInWork(workflowId,userId)  
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.listUsers.ngOnInit();
        },  
        error => console.log(error));    
}

}
