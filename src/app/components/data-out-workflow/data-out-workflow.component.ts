import { Component, OnInit, Input } from '@angular/core';
import { Dataset } from 'src/app/models/dataset';
import { Workflow } from 'src/app/models/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from 'src/app/services/dataset.service';

@Component({
  selector: 'app-data-out-workflow',
  templateUrl: './data-out-workflow.component.html',
  styleUrls: ['./data-out-workflow.component.css']
})
export class DataOutWorkflowComponent implements OnInit {

  datasets: Dataset[]=[] ;
  @Input() workflow: Workflow = null;

  constructor(private workflowS: WorkflowService,
    private _Activatedroute:ActivatedRoute,
    private dataS:DatasetService
    ) { }
  sub;
  workflowId;

  ngOnInit(): void {   
   this.sub=this._Activatedroute.paramMap.subscribe(params => { 
  console.log(params);
  this.workflowId = params.get('workflowId'); 
   //let users=this.workflowS.getUsersInWork(this.workflowId);
     this.workflowS.getDataSetOutWorkflow()
     .subscribe((res: Dataset[]) => this.datasets = res); 
                  });             
}


deleteWork(id: string) {  
  this.dataS.deleteData(id)
    .subscribe(  
      data => {  
        console.log(data);  
        //this.deleteMessage=true;  
        this.ngOnInit();
      },  
      error => console.log(error));    
}
addDatafromwork(dataSetId:string) {  
  this.sub=this._Activatedroute.paramMap.subscribe(params => { 
    console.log(params);
    this.workflowId = params.get('workflowId'); });
  this.dataS.addDataToWork(dataSetId,this.workflowId)  
    .subscribe(  
      data => {  
        console.log(data);   
        this.ngOnInit();
      },  
      error => console.log(error));    
} 

}
