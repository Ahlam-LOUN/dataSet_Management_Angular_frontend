import { DatasetService } from 'src/app/services/dataset.service';
import { Dataset } from './../../models/dataset';
import { Component, OnInit, Input } from '@angular/core';
import { ListDatasetComponent } from '../list-dataset/list-dataset.component';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {
  @Input() dataset:Dataset=null;
  deleteMessage=false; 
  constructor(private dataS:DatasetService,
              private list:ListDatasetComponent ) { }

  ngOnInit(): void {
  }

  deleteWork(id: string) {  
    this.dataS.deleteData(id)
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.list.ngOnInit();
        },  
        error => console.log(error));    
}


}
