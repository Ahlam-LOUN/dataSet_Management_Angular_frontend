import { Address } from './../models/address';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAll() {
    console.log('my req :'+`${environment.baseUrl}/adresses`);
    console.log('my req Ahlam :'+this.http.get(`${environment.baseUrl}/adresses`));

    return this.http.get(`${environment.baseUrl}/adresses`);
  }
  Save(data: Address) {
    return this.http.post(`${environment.baseUrl}/adresses`, data);
  }
  Delete(){
    return this.http.delete(`${environment.baseUrl}/adresses`);
  }
}
