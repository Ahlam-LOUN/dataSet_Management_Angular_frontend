import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Workflow } from '../models/workflow';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private http: HttpClient) { }

  getAll() {
    console.log('my req :'+`${environment.baseUrl}/workflows`);
    console.log('my req Ahlam :'+this.http.get(`${environment.baseUrl}/workflows`));
    return this.http.get(`${environment.baseUrl}/workflows`);
  }
  Save(data: Workflow) {
    return this.http.post(`${environment.baseUrl}/workflows`, data);
  }
  deleteWorkflow(id: string): Observable<any> {  
    return this.http.delete(`${environment.baseUrl}/workflows/${id}`, { responseType: 'text' });  
  } 
  getUsersInWork(id: string): Observable<any> {  

    return this.http.get(`${environment.baseUrl}/user/workflow-manage/${id}`);  
  } 
  getUsersOutwork(id: string): Observable<any> {  

    return this.http.get(`${environment.baseUrl}/user/users-out/${id}`);  
  } 
  getDataSetInWorkflow(id: string) {
    return this.http.get(`${environment.baseUrl}/datasets/dataset-manage/${id}`);
  }
  getDataSetOutWorkflow() {
    return this.http.get(`${environment.baseUrl}/datasets/dataset-out`);
  }
}
