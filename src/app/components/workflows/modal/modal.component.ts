import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Workflow } from 'src/app/models/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';
import { ListWorkflowComponent } from '../../list-workflow/list-workflow.component';
import {Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
 workflows: Workflow[]=[];
  open: boolean;
  workflowForm: FormGroup;
  isupdated = false;
  @Output() modalWorkflow = new EventEmitter();

   
  constructor(private toastr: ToastrService,private workflow: WorkflowService,
    private router:Router, private route:ActivatedRoute) {

    this.workflowForm = new FormGroup({
        name: new FormControl(null,Validators.required),
    })

   }

  ngOnInit(): void {
  }
  isCreate:boolean=false;
  workflowExist:boolean=false;
  workflowError:Workflow;
  listw: ListWorkflowComponent


closeModal() : void {
  this.router.navigate(['/workflows-structure'],{relativeTo:this.route});
} 


  refresh(){
    this.listw.ngOnInit();
  }
  creatework() {

    this.modalWorkflow.emit(this.workflowForm.value)
        this.workflowForm.reset();
    this.toastr.info(
      'Congratulations your Workflow was created !!',
      '',
{
  timeOut: 3000,
  positionClass: 'toast-bottom-left'
}
    );
    this.workflowForm.reset();
  }
  createWorkflow(work:Workflow) {
   
    //this.modalWorkflow.emit(this.workflowForm.value);
    work.name= this.workflowForm.get("name").value;  
    this.workflow.Save(work)
    .subscribe((res:Workflow) => {
    this.workflows = [res, ...this.workflows];
    this.isCreate=true;
    this.workflowExist=false;
    //this.workflowError=new Workflow();
    this.workflowForm.reset();
    this.toastr.info(
      'Congratulations your Workflow was created !!',
      '',
{
  timeOut: 3000,
  positionClass: 'toast-bottom-left'
}
    );
   }, 
   error => 
    {
     this.workflowError=error.error;
     this.isCreate=false;
     console.log(error);
     if(error.status==500){
      this.isCreate=false;
      this.workflowExist=true;
     }
     if(error.status==400){
      this.isCreate=false;
    }
  }
);
}
}
