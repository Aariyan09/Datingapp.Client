import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message:Message[] | undefined;
  pagination?:Pagination;
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 5;

  constructor(private messageService:MessageService){}


  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container).subscribe({
      next: response => {
        this.message = response.result;
        this.pagination = response.pagination;
      }
    })
  }

  pageChanged(event:any){
    if(this.pageNumber && this.pageNumber !== event.pageNumber){
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }


  deleteMessage(id:number){
    this.messageService.deleteMessage(id).subscribe({
      next: _ => {
        this.message?.splice(this.message.findIndex(x => x.id == id),1)
      }
    })
  }
  
}
