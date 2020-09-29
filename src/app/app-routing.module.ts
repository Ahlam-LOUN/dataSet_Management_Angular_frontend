import { AfterAuthGuard } from './guards/after-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/partials/page-not-found/page-not-found.component';
import { ShowAddressesComponent } from './components/show-addresses/show-addresses.component';
import { ListAddressesComponent } from './components/list-addresses/list-addresses.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ListWorkflowComponent } from './components/list-workflow/list-workflow.component';
import { AddWorkflowComponent } from './components/add-workflow/add-workflow.component';
import { WorkflowUsersComponent } from './components/workflow-users/workflow-users.component';
import { UserOutWorkComponent } from './components/user-out-work/user-out-work.component';
import { AddDatasetComponent } from './components/add-dataset/add-dataset.component';
import { ListDatasetComponent } from './components/list-dataset/list-dataset.component';
import { AddAttributComponent } from './components/add-attribut/add-attribut.component';
import { WorkflowDataComponent } from './components/workflow-data/workflow-data.component';
import { DataOutWorkflowComponent } from './components/data-out-workflow/data-out-workflow.component';
import { ListWorkflowsComponent } from './components/list-workflows/list-workflows.component';
import { ListValuesComponent } from './components/list-values/list-values.component';
import { ListDatasetsComponent } from './components/list-datasets/list-datasets.component';

const routes: Routes = [
  { path: "", redirectTo: "/workflows", pathMatch: "full", canActivate: [AuthGuard] },
  { path: "users", children: [
     { path:"", component: ListUserComponent },
     { path:"create", component: AddUserComponent },
     { path:"{id}/edit", component: ListAddressesComponent },
     { path:"{id}", component: ShowAddressesComponent },
    ],canActivate: [AuthGuard]
  },
  { path: "datasets-structure", children: [
    { path:"", component: ListUserComponent },
    { path:"create", component: AddDatasetComponent },
    { path:"list", component: ListDatasetComponent },
    { path:"add-attributs/:dataSetId", component: AddAttributComponent },
   ],canActivate: [AuthGuard]
 },
  { path: "workflows-structure", children: [
    { path:"", component: ListWorkflowComponent },
    { path:"usersout/:workflowId", component:  UserOutWorkComponent  },
    { path:"data-out-workflow/:workflowId", component:  DataOutWorkflowComponent  },
    { path:"data-in-workflow/:workflowId", component: WorkflowDataComponent },
    { path:"usingby/:workflowId", component: WorkflowUsersComponent, children:[
    { path:"users-out", component:  UserOutWorkComponent  },
    ] ,canActivate: [AuthGuard] },
    { path:"{id}", component: ShowAddressesComponent,canActivate: [AuthGuard] },
   ]
 },

 { path: "workflows",children :[
  { path:"", component: ListWorkflowsComponent },
 {path:":id",component:ListDatasetsComponent},
    { path:"", component: ListValuesComponent }
   
   
], canActivate: [AuthGuard]},

{ path:"datasets/:id", component: ListValuesComponent },

  { path: "login", component: LoginComponent, canActivate: [AfterAuthGuard] },
  { path: "register", component: RegisterComponent,canActivate: [AfterAuthGuard]},
  { path: "account", component:AccountComponent,canActivate: [AuthGuard]},
  { path: "**", component: PageNotFoundComponent,canActivate: [AuthGuard]}

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
