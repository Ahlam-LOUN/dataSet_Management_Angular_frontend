import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowsService {
  

  constructor(private http: HttpClient) { }
  getAll(){

    return this.http.get(`${environment.baseUrl}/workflows`);
  }
  getAllDatasets(workflowId: String) {
    return this.http.get(`${environment.baseUrl}/datasets/dataset-manage/`+workflowId);
  }
  getAttributes(datasetId:String){
return this.http.get(`${environment.baseUrl}/attributs/datasets/`+datasetId)
  }
  getvalues(attributId:String){
    return this.http.get(`${environment.baseUrl}/values/attribut/`+attributId)
  }
  deleteValue(valueId:String){
    return this.http.delete(`${environment.baseUrl}/values/`+valueId)
  }
  updateValue(valueId:String,value:any): Observable<Object> {
   
    return this.http.put(`${environment.baseUrl}/values/`+valueId,value)
  }
  createValue(attributId:String,value:any): Observable<Object> {
   
    return this.http.post(`${environment.baseUrl}/values/`+attributId,value)
  }
}
