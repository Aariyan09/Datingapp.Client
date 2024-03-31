import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { member } from '../_models/member';
import { map, of, take } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { UserParams } from '../_models/userparams';
import { AccountService } from './account.service';
import { User } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  member:member[] = [];
  paginatedResults:PaginationResult<member[]> = new PaginationResult<member[]>();
  memberCache = new Map();
  user:User | undefined;
  userParams:UserParams | undefined;

  constructor(private http:HttpClient,private accountService:AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    })
   }

   getUserParams(){
    return this.userParams;
   }

   setUserParams(params:UserParams){
    this.userParams = params;
   }

   resetUserParams(){
    if(this.user){
      this.userParams = new UserParams(this.user)
      return this.userParams;
    }
    return; 
   }


  getMembers(userParams:UserParams){
    const response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response){     
      return of(response);
    } 

    let params = this.getPaginationHeaders(userParams);
    params = params.append('minAge',userParams.minAge);
    params = params.append('maxAge',userParams.maxAge);
    params = params.append('gender',userParams.gender);
    params = params.append('orderBy',userParams.orderBy);

    return this.GetPaginatedResults<member[]>(this.baseUrl+'Users/Getusers/',params).pipe(
      map(response => {
        this.memberCache.set(Object.values(userParams).join('-'),response);
        return response;
      })
    )
  }

  getMember(name:string){
    const member = [...this.memberCache.values()].reduce((arr,elem) => arr.concat(elem.result),[]).find((x:member) => x.userName === name);
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


  private GetPaginatedResults<T>(url:string,params: HttpParams) {
    const paginatedResult:PaginationResult<T> = new PaginationResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(userParams:UserParams):HttpParams{
    let params = new HttpParams();
    if(userParams){
      params = params.append('pageNumber',userParams.pageNumber);
      params = params.append('pageSize',userParams.pageSize);
    }
    return params;
  }


}
