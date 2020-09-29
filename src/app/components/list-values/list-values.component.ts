import { Attribut } from './../../models/attribut';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Value } from 'src/app/models/value';
import { FormGroup, FormControl } from '@angular/forms';
import {ExcelService} from 'src/app/services/excel.service';
import { WorkflowsService } from 'src/app/services/workflows.service';

@Component({
  selector: 'app-list-values',
  templateUrl: './list-values.component.html',
  styleUrls: ['./list-values.component.css']
})
export class ListValuesComponent implements OnInit {
   dataSetName:any=localStorage.getItem('datasetName');
  attributes:Attribut[];
  numbers:any[]=[];
  values:Array<{id:any,valuesOfAtt:Value[]}>=[];
  showValues:boolean=false;
  isDeleted:boolean=true;
  isUpdate:boolean=true;
  deleteMessage:boolean=false;
  isupdated:boolean=false;
  isAdded:boolean=false;
  value:Value=new Value();
  num:any="";
  count:number=0;
 
  dataOfElementes:Array<{}>=[];
  dataOfItems=new FormGroup({});
 
  dataSetupdateform=new FormGroup({}); 
  dataSetNewform=new FormGroup({}); 
 

  constructor(private route:ActivatedRoute,private workflowService:WorkflowsService,private router:Router,private excelService:ExcelService) { }

  ngOnInit(): void {
   
    this.showValues=false;
    this.dataOfElementes=[];
      this.workflowService.getAttributes(this.route.snapshot.paramMap.get('id'))
      .subscribe((res: Attribut[]) => {this.attributes = res,console.log(this.attributes)
        this.forUpdate(),
        this.forCreate(),
        this.getValues(),
        
        this.showValues=true;
      }) 
  
   }
   
  
  getValues()
   {
    this.values=[];
    this.numbers=[];

     for(let attribut of this.attributes)
     {
       
      this.workflowService.getvalues(attribut.attributId)
      .subscribe((res: Value[]) => {this.values.push({id:attribut.name,valuesOfAtt:res}), this.numbers = Array.from({length:res.length},(v,k)=>k+1)})
     } 
     console.log(this.values);
 
   

   }
   forUpdate(){
    this.dataSetupdateform.addControl("num",new FormControl());
    for(let attribut of this.attributes){
 
      this.dataSetupdateform.addControl(`${attribut.name}`,new FormControl());
    }
    
   }
   forCreate(){
    for(let attribut of this.attributes){
 
      this.dataSetNewform.addControl(`${attribut.name}`,new FormControl());
    }
  }
  loadDataForDelete(){
    if(this.count==this.attributes.length)
    {
     
      this.getValues();
      this.deleteMessage=true;
    
    } 
  }
   deleteValues(num:any){
     this.count=0;
   this.deleteMessage=false;
     for(let item of this.values)
     {
     
      this.workflowService.deleteValue(item.valuesOfAtt[num].valueId)
      .subscribe(res => {this.count++,this.loadDataForDelete()},
                 err => this.isDeleted=false)
     } 
   
     
   }

   updatevalue(num:any)
   {
this.isupdated=false;
this.dataSetupdateform.get("num").setValue(num);
for(let item of this.values)
{
      
this.dataSetupdateform.get(item.id).setValue(item.valuesOfAtt[num].value);
 
   }
}

updateDataSet(updus){

this.count=0;
for(let item of this.values)
{
this.value.value=this.dataSetupdateform.get(item.id).value;
this.value.valueId="";


 this.workflowService.updateValue(item.valuesOfAtt[this.dataSetupdateform.get("num").value].valueId,this.value)
 .subscribe(res => {this.count++,this.loadData()},
            err => this.isUpdate=false)
}

}
loadData(){
 
  if(this.count==this.values.length)
  {
   
   this.getValues();
   this.isupdated=true; 
  
  } 
  }
  createValue(){
    this.isAdded=false;
    this.dataSetNewform.reset();
  }
  NewDataSet(){
    
    this.count=0;
    this.value=new Value();
    for(let attribut of this.attributes)
     {
     
  this.value.value=this.dataSetNewform.get(`${attribut.name}`).value
this.value.valueId="";

     this.workflowService.createValue(attribut.attributId,this.value)
      .subscribe((res: Value[]) => {this.count++,this.loadForCreate()
     }) 
 

  }}
  loadForCreate(){
    if(this.count==this.attributes.length)
    {
     
     this.getValues();
     this.isAdded=true; 
    
    } 
  }
  close(){}

  exportAsXLSX():void {
 

    this.getDataToExport();
   
   this.excelService.exportAsExcelFile( this.dataOfElementes, this.dataSetName);
  
 }
 getDataToExport():any{
  this.dataOfElementes=[];
  
   if(this.values.length!=0)
   {
    for(let item of this.values)
    {
    
    this.dataOfItems.addControl(`${item.id}`,new FormControl());  
    }

     for(let num of this.numbers)
     {
     
       for(let item of this.values)
       {
       this.dataOfItems.get(`${item.id}`).setValue(item.valuesOfAtt[num-1].value);
      
       }
       this.dataOfElementes.push(this.dataOfItems.value);
       
      
     }
    console.log(this.dataOfElementes)
    
   
   }
  
 }
}
