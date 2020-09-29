import { Workflow } from './../../models/workflow';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { WorkflowService } from 'src/app/services/workflow.service';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-workflow-users',
  templateUrl: './workflow-users.component.html',
  styleUrls: ['./workflow-users.component.css']
})
export class WorkflowUsersComponent implements OnInit {
  users: User[]=[];
  Workflow:Workflow[];
  deleteMessage:boolean=false;
  @Input() workflow: Workflow = null;
  out:boolean=false;
  constructor(private workflowS: WorkflowService,
    private _Activatedroute:ActivatedRoute
  
) { }
  sub;
  workflowId;
  ngOnInit() {        
   this.sub=this._Activatedroute.paramMap.subscribe(params => { 
  console.log(params);
  this.workflowId = params.get('workflowId'); 
   //let users=this.workflowS.getUsersInWork(this.workflowId);
     this.workflowS.getUsersInWork(this.workflowId )
     .subscribe((res: User[]) => this.users = res);  
                  });             
}



 
}


