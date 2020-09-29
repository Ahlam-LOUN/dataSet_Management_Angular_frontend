import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { WorkflowUsersComponent } from '../workflow-users/workflow-users.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user-to-work',
  templateUrl: './add-user-to-work.component.html',
  styleUrls: ['./add-user-to-work.component.css']
})
export class AddUserToWorkComponent implements OnInit {
  @Input() user: User = null;
  users :User[]=[];
  deleteMessage=false; 
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
}
