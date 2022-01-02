import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Terrain } from "../models/terrain.model"
import { Complexe } from "../models/complexe.model"
import { AuthenticationService } from "./authentication.service";
@Injectable({
  providedIn: 'root'
}) 
export class TerrainService {

  private readonly baseUrl = `${environment.apiUrl}/terrains`;

  openedTerrain : Terrain = new Terrain();
  constructor(
    private http : HttpClient,
    private router : Router,
    private auth: AuthenticationService
  ) { }

  create(terrain: Terrain){
    return this.http.post(`${this.baseUrl}`,  terrain, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  update(terrain: Terrain, _id){
    return this.http.put(`${this.baseUrl}/${_id}`,  terrain, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  updateFrais(_id,frais){
    return this.http.put(`${this.baseUrl}/${_id}`,{frais}, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  delete(_id){
    return this.http.delete(`${this.baseUrl}/${_id}`,  { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  getAll(){
    return this.http.get(`${this.baseUrl}`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  findOne(_id : string){
    return this.http.get(`${this.baseUrl}/${_id}`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }

  updateImageSelect(image, _id){
    return this.http.put(`${this.baseUrl}/image/select/${_id}`, { image }, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  uploadImage(_id, data){
    return this.http.post(`${this.baseUrl}/image/upload/${_id}`, data , { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  changeImageName(_id, data){
    return this.http.put(`${this.baseUrl}/image/change/${_id}`, data , { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }

  createComplexe(complexe: Complexe, user){
    return this.http.post(`${this.baseUrl}/complexe/${user}`, complexe);
  }
  getComplexe(){
    return this.http.get(`${this.baseUrl}/complexe` , { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  updateComplexe(complexe: Complexe){
    return this.http.put(`${this.baseUrl}/complexe`, complexe , { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }

}
