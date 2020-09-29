import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Dataset } from '../models/dataset';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  constructor(private http: HttpClient) { }
  Save(data: Dataset) {
    return this.http.post(`${environment.baseUrl}/datasets`, data);
  }
  getAll() {
    return this.http.get(`${environment.baseUrl}/datasets`);
  }

  deleteData(id: string): Observable<any> {  
    return this.http.delete(`${environment.baseUrl}/datasets/${id}`, { responseType: 'text' });  
  } 
  
  addDataToWork(dataSetId:string,workflowId:string):Observable<any>{
    return this.http.put(`${environment.baseUrl}/datasets/${dataSetId}/${workflowId}`, { responseType: 'text' });  

  }

}
