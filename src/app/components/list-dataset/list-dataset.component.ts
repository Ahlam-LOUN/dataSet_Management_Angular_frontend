import { Component, OnInit } from '@angular/core';
import { Dataset } from 'src/app/models/dataset';
import { DatasetService } from 'src/app/services/dataset.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-dataset',
  templateUrl: './list-dataset.component.html',
  styleUrls: ['./list-dataset.component.css']
})
export class ListDatasetComponent implements OnInit {
 datasets:Dataset[]=[];
  constructor(private dataS:DatasetService,private workflowS: WorkflowService,
    private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.dataS.getAll()
    .subscribe((res: Dataset[]) => this.datasets = res);
       
  }


}
