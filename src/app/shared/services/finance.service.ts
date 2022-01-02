import { Finance } from 'src/app/shared/models/finance.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  private readonly baseUrl = `${environment.apiUrl}/financials`;
  
  constructor(
    private http : HttpClient,
    private router : Router,
    private auth: AuthenticationService
  ) { }

  createSpent(spent){
    return this.http.post(`${this.baseUrl}/spents`,  spent, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  createIncome(income){
    return this.http.post(`${this.baseUrl}`,  income, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  updateIncome(terrain: Finance, _id){
    return this.http.put(`${this.baseUrl}/${_id}`,  terrain, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  updateSpent(terrain: Finance, _id){
    return this.http.put(`${this.baseUrl}/spents/${_id}`,  terrain, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  delete(_id){
    return this.http.delete(`${this.baseUrl}/${_id}`,  { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  getAll(){
    return this.http.get(`${this.baseUrl}`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  
  getStats(){
    return this.http.get(`${this.baseUrl}/stats`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }



}
