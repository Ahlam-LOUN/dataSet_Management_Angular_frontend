import { JwtInterceptor } from './services/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AddAddressesComponent } from './components/add-addresses/add-addresses.component';
import { ListAddressesComponent } from './components/list-addresses/list-addresses.component';
import { EditAddressesComponent } from './components/edit-addresses/edit-addresses.component';
import { PageNotFoundComponent } from './components/partials/page-not-found/page-not-found.component';
import { ShowAddressesComponent } from './components/show-addresses/show-addresses.component';
import { RegisterComponent } from './components/register/register.component';
import { AddressComponent } from './components/address/address.component';
import { ModalComponent} from './components/workflows/modal/modal.component';
import {DataTablesModule} from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AccountComponent } from './components/account/account.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ListUserComponent } from './components/list-user/list-user.component'
import{NgxPaginationModule} from 'ngx-pagination'
import {  MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ListWorkflowComponent } from './components/list-workflow/list-workflow.component';
import { AddWorkflowComponent } from './components/add-workflow/add-workflow.component';
import { WorkflowUsersComponent } from './components/workflow-users/workflow-users.component';
import { UserComponent } from './components/user/user.component';
import { UserOutWorkComponent } from './components/user-out-work/user-out-work.component';
import { AddUserToWorkComponent } from './components/add-user-to-work/add-user-to-work.component';
import { AddDatasetComponent } from './components/add-dataset/add-dataset.component';
import { ListDatasetComponent } from './components/list-dataset/list-dataset.component';
import { DatasetComponent } from './components/dataset/dataset.component';
import { AddAttributComponent } from './components/add-attribut/add-attribut.component';
import { WorkflowDataComponent } from './components/workflow-data/workflow-data.component';
import { DataOutWorkflowComponent } from './components/data-out-workflow/data-out-workflow.component';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

import { ListDatasetsComponent } from './components/list-datasets/list-datasets.component';
import { ListWorkflowsComponent } from './components/list-workflows/list-workflows.component';
import { ListValuesComponent } from './components/list-values/list-values.component';
import { FooterComponent } from './components/partials/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AddAddressesComponent,
    ListAddressesComponent,
    EditAddressesComponent,
    PageNotFoundComponent,
    ShowAddressesComponent,
    RegisterComponent,
    AddressComponent,
    ModalComponent,
    AccountComponent,
    AddUserComponent,
    ListUserComponent,
    WorkflowComponent,
    ListWorkflowComponent,
    AddWorkflowComponent,
    WorkflowUsersComponent,
    UserComponent,
    UserOutWorkComponent,
    AddUserToWorkComponent,
    AddDatasetComponent,
    ListDatasetComponent,
    DatasetComponent,
    AddAttributComponent,
    WorkflowDataComponent,
    DataOutWorkflowComponent,
    FooterComponent,
    ListWorkflowsComponent,
    ListValuesComponent,
    ListDatasetsComponent  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    AppRoutingModule,
    NgxPaginationModule,
    MatPaginatorModule ,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: JwtInterceptor,
    multi: true,

   
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
