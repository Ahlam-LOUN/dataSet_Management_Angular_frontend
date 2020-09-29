import { AttributService } from './../../services/attribut.service';
import { Dataset } from './../../models/dataset';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { DatasetService } from 'src/app/services/dataset.service';
import { Attribut } from 'src/app/models/attribut';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-dataset',
  templateUrl: './add-dataset.component.html',
  styleUrls: ['./add-dataset.component.css']
})
export class AddDatasetComponent implements OnInit {
  datasets: Dataset[]=[];
  submitted=false;
  dataSet:Dataset=new Dataset();

  dataSetId: string;
  
  constructor( 
   
    private dataset: DatasetService,
    private toastr: ToastrService)  { }

    attributForm = new FormGroup({
      nameData:new FormControl(null,Validators.required),
    })
  ngOnInit(): void {
  }

  isCreate:boolean=false;
   dataExist:boolean=false;
   dataError:Dataset;
  att:Attribut;
  createDataset(data: Dataset) {
    data.name= this.attributForm.get("nameData").value;  
   // alert(this.attributForm.get("nameData").value);
     this.submitted = true;  
     this.dataset.Save(data)
     .subscribe((res: Dataset)=>{this.datasets = [res, ...this.datasets]
      this.isCreate=true;
      this.dataExist=false;
      this.dataError=new Dataset();
      this.attributForm.reset();  
      this.toastr.info(
        'Congratulations your DataSet was created !!',
        '',
  {
    timeOut: 3000,
    positionClass: 'toast-bottom-left'
  }
      );
     },
     
     error => 
      {
       this.dataError=error.error;
       this.isCreate=false;
       console.log(error);
       if(error.status==500){
        this.isCreate=false;
        this.dataExist=true;
       }
       if(error.status==400){
        this.isCreate=false;
      }
    }
  ) ;
   
 }



}
