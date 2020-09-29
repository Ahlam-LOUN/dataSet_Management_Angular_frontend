import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  


  constructor(private token: TokenService,private http: HttpClient) { }
  updateUser(userInfo: {firstname: string,lastname: string, password: string}) {
    return this.http.put(`${environment.baseUrl}/user/${this.token.getId()}`, userInfo);
  }  
  Save(data: User) {
    return this.http.post(`${environment.baseUrl}/user`, data);
  }

  Delete(){
    return this.http.delete(`${environment.baseUrl}/user/${this.token.getId()}`);
  }
  getAll(request){
    const endpoint = environment.baseUrl + "/user";
    const params = request;
    console.log(request);
    console.log(this.http.get(endpoint, { params }));
    return this.http.get(endpoint, { params });

    //console.log(this.http.get(`${environment.baseUrl}/user?page=`+page+`&limit=5`));
   // return this.http.get(`${environment.baseUrl}/user?page=`+page+`&limit=5`); 
  }

  findByTitle(request,search) {
    const endpoint = environment.baseUrl + "/user";
    const params = request;
     params.search=search;
   // params.append('search', search);
    console.log(request);
   // console.log(this.http.get(endpoint, { params }));
    return this.http.get(endpoint, { params });
   // return this.http.get(`${environment.baseUrl}/user?page=0&limit=3&search=${search}`);
  }
  getUser(id: string): Observable<any> {  

    return this.http.get(`${environment.baseUrl}/user/${id}`);  
  } 
  
  getUserList(): Observable<any> {  
    return this.http.get(`${environment.baseUrl}/user`);  
  }  

  updateUserr(id: string, value: any): Observable<Object> {  
    return this.http.put(`${environment.baseUrl}/user/${id}`, value);  
  } 
  deleteUser(id: string): Observable<any> {  
    return this.http.delete(`${environment.baseUrl}/user/${id}`, { responseType: 'text' });  
  } 
 
  getUsersInWork(id: string): Observable<any> {  

    return this.http.get(`${environment.baseUrl}/user/workflow-manage/${id}`);  
  } 
  deleteUserInWork(workflowId:string,userId:string):Observable<any>{
    return this.http.put(`${environment.baseUrl}/workflows/removing/${workflowId}/${userId}`, { responseType: 'text' });  

  }
  addUserToWork(workflowId:string,userId:string):Observable<any>{
    return this.http.put(`${environment.baseUrl}/workflows/${workflowId}/${userId}`, { responseType: 'text' });  

  }
  }