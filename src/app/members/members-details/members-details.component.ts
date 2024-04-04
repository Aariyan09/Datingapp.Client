import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';
import { member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { MemberMessageComponent } from '../member-message/member-message.component';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-members-details',
  templateUrl: './members-details.component.html',
  styleUrls: ['./members-details.component.css'],
  standalone:true,
  imports:[CommonModule,TabsModule,GalleryModule,TimeagoModule,MemberMessageComponent]
})
export class MembersDetailsComponent implements OnInit {
  @ViewChild('memberTabs',{static:true}) memberTabs?:TabsetComponent;
  member:member = {} as member;
  images:GalleryItem[] = [];
  activeTab?:TabDirective;
  message?:Message[];

  constructor(private memberService:MembersService,private route:ActivatedRoute,private messageService:MessageService){}

  ngOnInit(): void {
    this.route.data.subscribe({
      next:data => this.member = data['member']
    })


    this.route.queryParams.subscribe({
      next: params => {
        console.log(params['tab'])
        params['tab'] && this.selectTab(params['tab'])
      }
    })

    this.getImages();
  }

  selectTab(heading:string){
    if(this.memberTabs){
      this.memberTabs.tabs.find(x => x.heading == heading)!.active = true;
    }
  }

  onTabActivated(data:TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading == 'Messages'){
      this.loadMessage();
    }
  }

  loadMessage(){
    if(this.member){
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => {
          this.message = messages;
        }
      })
    }
    
  }
  

  getImages(){
    if(!this.member)return;
    for (let image of this.member?.photos) {
      this.images.push(new ImageItem({src:image.url,thumb:image.url}))
    }
  }




}
