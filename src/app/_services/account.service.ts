import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/users';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  baseUrl:string = environment.apiUrl;
  currentUser$ = new BehaviorSubject<User | null>(null);
  
  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post<User>(this.baseUrl+'account/login',model).pipe(
      map((response:User) => {
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user))
          this.currentUser$.next(user);
        }
      })
    )
  }

  setCurrentUser(user:User){
    this.currentUser$.next(user);
  }

  logout(){
    localStorage.removeItem('user')
    this.currentUser$.next(null)
  }


  register(model:any){
    return this.http.post<User>(this.baseUrl+'account/Register',model).pipe(
      map((response:User) => {
        if(response){
          localStorage.setItem("user",JSON.stringify(response));
          this.currentUser$.next(response);
        }
      })
    );
  }

}
