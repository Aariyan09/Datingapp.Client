import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getMembers(){
    return this.http.get<member[]>(this.baseUrl+'Users');
  }

  getMember(name:string){
    return this.http.get<member>(this.baseUrl+'Users/GetUserByName/'+name);
  }


}
