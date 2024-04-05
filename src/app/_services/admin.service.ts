import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getUsersWithRoles(){
    return this.http.get<User[]>(this.baseUrl+'admin/users-with-roles');
  }

  updateUserRole(username:string,role:string){
    return this.http.put<string[]>(this.baseUrl+'admin/edit-roles/'+username+'?roles='+role,{});
  }
}
