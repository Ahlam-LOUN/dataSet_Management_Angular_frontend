import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from 'src/app/services/workflow.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-out-work',
  templateUrl: './user-out-work.component.html',
  styleUrls: ['./user-out-work.component.css']
})
export class UserOutWorkComponent implements OnInit {
 users: User[] ;
  constructor(private workflowS: WorkflowService,
    private userS:UserService,
    private _Activatedroute:ActivatedRoute,
    private _router:Router) { }

sub ;
workflowId: string;
ngOnInit() {             
     
  this.sub=this._Activatedroute.paramMap.subscribe(params => { 
    console.log(params);
    this.workflowId = params.get('workflowId'); 
   //  let users=this.workflowS.getUsersInWork(this.workflowId);
     this.workflowS.getUsersOutwork(this.workflowId )
     .subscribe((res: User[]) => this.users = res);  
                  });         
                  }

                  ngOnDestroy() {
                    this.sub.unsubscribe();
                  }
                  
                  onBack(): void {
                     this._router.navigate(['workflows-structure']);
                  }

                  addUserfromwork(userId:string) {  
                    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
                      console.log(params);
                      this.workflowId = params.get('workflowId'); });
                    this.userS.addUserToWork(this.workflowId,userId)  
                      .subscribe(  
                        data => {  
                          console.log(data);   
                          this.ngOnInit();
                        },  
                        error => console.log(error));    
                }             
                
                   }



