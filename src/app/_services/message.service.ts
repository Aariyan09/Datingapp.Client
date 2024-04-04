import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { GetPaginatedResults, getPaginationHeaders } from './paginationHelper';
import { Message } from '../_models/message';
import { member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  basrUrl = environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  getMessages(pageNumber:number,pageSize:number,container:string){
    let params = getPaginationHeaders(pageNumber,pageSize);
    params = params.append('Container',container);

    return GetPaginatedResults<Message[]>(this.basrUrl+'Message',params,this.http);
  }


  getMessageThread(username:string){
    return this.http.get<Message[]>(this.basrUrl+'message/thread/'+username);
  }


  sendMessage(username:string,content:string){
    return this.http.post<Message>(this.basrUrl+'message',{recipientUserName:username,content});
  }


  deleteMessage(id:number){
    return this.http.delete(this.basrUrl+'message/'+id);
  }
}
