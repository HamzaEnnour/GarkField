import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { IPayload, ICredentails, IRegisterCredentails, User } from '../models/user.model';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(
    private http : HttpClient,
    private router : Router,
  ) { }

  public logIn(credentials : ICredentails){
    // auth/signin
    return this.http.post(`${this.baseUrl}/signin`, credentials);
  }
  public register(credentials : IRegisterCredentails){
    // auth/signin
    return this.http.post(`${this.baseUrl}/sign-up`, credentials);
  }

  public requestPasswordReset(email){
    return this.http.post(`${this.baseUrl}/forgot-password`, {email});
  }
  public verifyPasswordReset(creds){
    return this.http.post(`${this.baseUrl}/verify-reset`, {creds});
  }
  public resetPassword(_id, password){
    return this.http.post(`${this.baseUrl}/reset-password`, {_id, password})
  }

  getProfile(){
    return this.http.get(`${this.baseUrl}/profile`, { headers :  new HttpHeaders({ 'Authorization' : this.Token  }) });
  }

  updateProfileImage(formData){
    return this.http.post(`${this.baseUrl}/profile-image`, formData, { headers :  new HttpHeaders({ 'Authorization' : this.Token  }) });
  }

  public updateProfile(user : User){
    return this.http.put(`${this.baseUrl}/profile`, user, { headers :  new HttpHeaders({ 'Authorization' : this.Token  }) });
  }
  public updatePassword( old, newPassword ){
    return this.http.post(`${this.baseUrl}/update-password`, {old, newPassword}, { headers :  new HttpHeaders({ 'Authorization' : this.Token  }) });
  }

  public assignNotificationToken(token: string){
    return this.http.put(`${this.baseUrl}/assign-notif`, {token}, { headers :  new HttpHeaders({ 'Authorization' : this.Token  }) });
  }

  public getNotificationToken() {
    return this.http.get(`${this.baseUrl}/assign-notif`, { headers :  new HttpHeaders({ 'Authorization' : this.Token  }) });
  }

  public rememberMe(email: string, password: string){

  }
 
  public signOut(){
    localStorage.removeItem('__SEC-ID');
    this.router.navigateByUrl('/home');
  }
  
  public saveToken(token :string){
    localStorage.setItem('__SEC-ID',token);
  }

  get Token(){
    return localStorage.getItem('__SEC-ID');
  }
 
  get isAuthenticated() : boolean{
    return this.Payload ? true : false;
  }

  get Payload() : IPayload {
    const token = this.Token;
    if(token){
      return jwt_decode(token);
    }
    return null;
  }
}
