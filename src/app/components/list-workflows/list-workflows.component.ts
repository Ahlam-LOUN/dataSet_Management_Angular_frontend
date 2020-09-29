import { Router } from '@angular/router';
import { WorkflowService } from './../../services/workflow.service';
import { Component, OnInit } from '@angular/core';
import { Workflow } from 'src/app/models/workflow';

@Component({
  selector: 'app-list-workflows',
  templateUrl: './list-workflows.component.html',
  styleUrls: ['./list-workflows.component.css']
})
export class ListWorkflowsComponent implements OnInit {
workflows: Workflow[];
  constructor(private workflowService:WorkflowService,private router:Router) { }

  ngOnInit(): void {
    this.workflowService.getAll()
    .subscribe((res: Workflow[]) => {this.workflows = res})
   
  }
voir(idW:String,name:any)
{

  this.router.navigate(['/workflows',idW]);
localStorage.setItem('workflowName',name)
}

}
