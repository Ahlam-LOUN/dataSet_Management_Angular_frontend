import { WorkflowService } from 'src/app/services/workflow.service';
import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Workflow } from 'src/app/models/workflow';
import { throwIfEmpty } from 'rxjs/operators';
import { ListUserComponent } from '../list-user/list-user.component';
import { ListWorkflowComponent } from '../list-workflow/list-workflow.component';
import { User } from 'src/app/models/user';
import { WorkflowUsersComponent } from '../workflow-users/workflow-users.component';
import { Dataset } from 'src/app/models/dataset';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class WorkflowComponent implements OnInit {
  deleteMessage=false; 
  @Input() workflow: Workflow = null;
  workflows: any[]=[];
  users: any[]=[];
  ngOnInit(): void {
  }
  constructor(private workflowS: WorkflowService,
    private  listWork: ListWorkflowComponent,
    ) { }
deleteWork(id: string) {  
      this.workflowS.deleteWorkflow(id)  
        .subscribe(  
          data => {  
            console.log(data);  
            this.deleteMessage=true;  
            this.listWork.ngOnInit();
          },  
          error => console.log(error));    
  }
  getUsers(id: string) {  
    this.workflowS.getUsersInWork(id)
  .subscribe((res: User[]) => this.users = res);  
 
}
getUsersOut(id: string) {  
  this.workflowS.getUsersOutwork(id)
.subscribe((res: User[]) => this.users = res);  

}
datasets:Dataset[]=[];

getDataInWork(id: string) {  
  this.workflowS.getDataSetInWorkflow(id)
  .subscribe((res: Dataset[]) => this.datasets = res); 
  }

  getDataOutWork() {  
    this.workflowS.getDataSetOutWorkflow()
    .subscribe((res: Dataset[]) => this.datasets = res); 
    }
  
}


