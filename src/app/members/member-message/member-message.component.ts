import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css'],
  standalone:true,
  imports:[CommonModule,TimeagoModule,FormsModule]
})
export class MemberMessageComponent implements OnInit {
  @ViewChild('messageForm') messageForm?:NgForm
  @Input() message?:Message[];
  @Input() username?:string;
  messageContent:string = '';
  
  constructor(private messageService:MessageService){}

  ngOnInit(): void {
  
  }

  createMessage(){
    if(!this.username) return;

    this.messageService.sendMessage(this.username,this.messageContent).subscribe({
      next:message => {      
        this.message?.push(message);
        this.messageForm?.reset();
      }
    })
  }



}
