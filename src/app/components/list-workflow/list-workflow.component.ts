import { Component, OnInit } from '@angular/core';
import { WorkflowService } from 'src/app/services/workflow.service';
import { Workflow } from 'src/app/models/workflow';

@Component({
  selector: 'app-list-workflow',
  templateUrl: './list-workflow.component.html',
  styleUrls: ['./list-workflow.component.css']
})
export class ListWorkflowComponent implements OnInit {

  workflows: Workflow[]=[];

  constructor(private workflowService: WorkflowService) { }

  ngOnInit(): void {
    this.workflowService.getAll()
    .subscribe((res: Workflow[]) => this.workflows = res);
         let a = this.workflowService.getAll();
        console.log('yo :'+a); 

  }

  persistWorkflow(data: Workflow) {
    this.workflowService.Save(data)
        .subscribe((res: Workflow) => this.workflows = [res, ...this.workflows])
  }


  
}
