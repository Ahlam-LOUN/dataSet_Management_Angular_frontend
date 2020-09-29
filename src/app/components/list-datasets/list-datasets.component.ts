import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Dataset } from 'src/app/models/dataset';
import { WorkflowsService } from 'src/app/services/workflows.service';

@Component({
  selector: 'app-list-datasets',
  templateUrl: './list-datasets.component.html',
  styleUrls: ['./list-datasets.component.css']
})
export class ListDatasetsComponent implements OnInit {
 
  datasets:Dataset[];
  workflowName:any=localStorage.getItem('workflowName');
  workflowId:String;
  constructor(private route:ActivatedRoute,private workflowService:WorkflowsService,private router:Router) { }

  ngOnInit(): void {
 
    this.workflowService.getAllDatasets(this.route.snapshot.paramMap.get('id'))
    .subscribe((res: Dataset[]) => {this.datasets = res,console.log(res)}) 
    this.workflowId=this.route.snapshot.paramMap.get('id');
  }
  
  voir(idD:String,name:any)
  {
    this.router.navigate(['/datasets',idD]);
     localStorage.setItem('datasetName',name)
  }
}
