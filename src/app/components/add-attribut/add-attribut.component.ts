import { Component, OnInit } from '@angular/core';
import { Attribut } from 'src/app/models/attribut';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AttributService } from 'src/app/services/attribut.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-attribut',
  templateUrl: './add-attribut.component.html',
  styleUrls: ['./add-attribut.component.css']
})
export class AddAttributComponent implements OnInit {
  attributs: Attribut[]=[];
  submitted=false;
  constructor(private attribut: AttributService,private _Activatedroute:ActivatedRoute,private toastr: ToastrService) { }
  attributForm = new FormGroup({
    name:new FormControl(null,Validators.required),
    datatype:new FormControl(null,Validators.required)
  })
  ngOnInit(): void {
  }
 sub;
 dataSetId;
 isCreate:boolean=false;
 attributExist:boolean=false;
 attributError:Attribut;
  createAttribut(att:Attribut){
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
    this.dataSetId = params.get('dataSetId'); }); 
    att.name= this.attributForm.get("name").value;  
    att.datatype=this.attributForm.get("datatype").value; 
    this.submitted = true;  
    this.attribut.Save(att,this.dataSetId)
    .subscribe((res: Attribut) => {
    this.attributs = [res, ...this.attributs];
    this.isCreate=true;
    this.attributExist=false;
    this.attributError=new Attribut();
    this.attributForm.reset();
    this.toastr.info(
      'Congratulations your Attribut was created !!',
      '',
{
  timeOut: 3000,
  positionClass: 'toast-bottom-left'
}
    );
   },  
   error => 
    {
     this.attributError=error.error;
     this.isCreate=false;
     console.log(error);
     if(error.status==500){
      this.isCreate=false;
      this.attributExist=true;
     }
     if(error.status==400){
      this.isCreate=false;
    }
  }
);
}
  
}

