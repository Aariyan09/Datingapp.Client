import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  member:member[] = [];

  constructor(private http:HttpClient) { }

  getMembers(){
    if(this.member.length > 0){
      return of(this.member);
    }
    return this.http.get<member[]>(this.baseUrl+'Users').pipe(
      map((members) => {
        members.forEach(x => {
          x.photoUrl = x.photoUrl ?? "https://cdn-icons-png.flaticon.com/512/219/219970.png";
        })
        this.member = members;
        return members;
      })
    )
  }

  getMember(name:string){
    const member = this.member.find(x => x.userName == name);
    if(member){
      member.photoUrl = member.photoUrl ?? "https://cdn-icons-png.flaticon.com/512/219/219970.png";
      return of(member)
    }
    return this.http.get<member>(this.baseUrl+'Users/GetUserByName/'+name);
  }


  updateMember(member:member){    
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(() => {
        const index = this.member.indexOf(member);
        this.member[index] = {...this.member[index],...member}
      })
    )
  }


  setMainPhoto(photoId:string){
    return this.http.put(this.baseUrl+'users/set-main-photo/'+photoId,{});
  }


  deletePhoto(photoId:string){
    return this.http.delete(this.baseUrl+'users/delete-photo/'+photoId);
  }

}
