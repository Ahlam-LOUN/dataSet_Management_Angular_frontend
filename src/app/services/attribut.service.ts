import { Attribut } from './../models/attribut';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttributService {
  constructor(private http: HttpClient) { }
  Save(data:Attribut,id:string) {
    return this.http.post(`${environment.baseUrl}/attributs/${id}`, data);
  }
}
